-- =============================================================================
-- DS Global Ventures — chemical spot prices
-- Run once in Supabase → SQL Editor → New query → Run. Safe to re-run.
--
-- Data flow: an admin uploads a SunSirs screenshot (or pastes the table) at /admin/prices; the page reads it,
-- the admin checks the rows and saves. Each save stores two days of prices (SunSirs shows the previous and the
-- latest day), so day-by-day history builds up on its own. /chemical-prices reads the `latest_commodity_prices`
-- view.
--
-- Security: anyone may READ prices (the site uses the publishable key). Only signed-in users whose email is in
-- `price_admins` may WRITE — enforced here by row-level security, not only by the website.
-- =============================================================================

-- One price per commodity per day -------------------------------------------------
create table if not exists public.commodity_prices (
  commodity   text           not null check (length(commodity) between 1 and 80),
  sector      text           not null default 'Chemical',
  price_date  date           not null,
  price       numeric(14, 2) not null check (price >= 0),
  currency    text           not null default 'RMB',
  source      text           not null default 'SunSirs',
  updated_at  timestamptz    not null default now(),
  primary key (commodity, price_date)
);

create index if not exists commodity_prices_date_idx on public.commodity_prices (price_date desc);

-- Who saved what, and when (also gives the page its "last updated" time) -----------
create table if not exists public.price_updates (
  id             bigint generated always as identity primary key,
  latest_date    date        not null,
  previous_date  date,
  row_count      integer     not null check (row_count >= 0),
  method         text        not null check (method in ('screenshot', 'paste', 'manual')),
  created_by     text        not null default (auth.jwt() ->> 'email'),
  created_at     timestamptz not null default now()
);

-- Emails allowed to publish prices ---------------------------------------------
create table if not exists public.price_admins (
  email text primary key
);

-- true when the signed-in user's email is in price_admins
create or replace function public.is_price_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.price_admins where email = lower(auth.jwt() ->> 'email')
  );
$$;

-- Row-level security -----------------------------------------------------------
alter table public.commodity_prices enable row level security;
alter table public.price_updates    enable row level security;
alter table public.price_admins     enable row level security;

drop policy if exists "Prices are public"     on public.commodity_prices;
drop policy if exists "Admins insert prices"  on public.commodity_prices;
drop policy if exists "Admins update prices"  on public.commodity_prices;
drop policy if exists "Admins delete prices"  on public.commodity_prices;
create policy "Prices are public"    on public.commodity_prices for select to anon, authenticated using (true);
create policy "Admins insert prices" on public.commodity_prices for insert to authenticated with check (public.is_price_admin());
create policy "Admins update prices" on public.commodity_prices for update to authenticated
  using (public.is_price_admin()) with check (public.is_price_admin());
create policy "Admins delete prices" on public.commodity_prices for delete to authenticated using (public.is_price_admin());

drop policy if exists "Update log is public" on public.price_updates;
drop policy if exists "Admins log updates"   on public.price_updates;
create policy "Update log is public" on public.price_updates for select to anon, authenticated using (true);
create policy "Admins log updates"   on public.price_updates for insert to authenticated with check (public.is_price_admin());

drop policy if exists "Admins see themselves" on public.price_admins;
create policy "Admins see themselves" on public.price_admins for select to authenticated
  using (email = lower(auth.jwt() ->> 'email'));

-- Latest and previous price per commodity, with % change ----------------------------
create or replace view public.latest_commodity_prices
with (security_invoker = true)
as
with ranked as (
  select commodity, sector, currency, price_date, price,
         row_number() over (partition by commodity order by price_date desc) as rn
  from public.commodity_prices
)
select l.commodity,
       l.sector,
       l.currency,
       l.price_date as latest_date,
       l.price      as latest_price,
       p.price_date as previous_date,
       p.price      as previous_price,
       round((l.price - p.price) / nullif(p.price, 0) * 100, 2) as change_pct
from ranked l
left join ranked p on p.commodity = l.commodity and p.rn = 2
where l.rn = 1;

grant select on public.latest_commodity_prices to anon, authenticated;

-- =============================================================================
-- Your admin login
-- 1. Supabase → Authentication → Users → Add user → "Create new user": your email + a strong password,
--    tick "Auto Confirm User".
-- 2. Supabase → Authentication → Sign In / Providers → Email: turn OFF "Allow new users to sign up".
-- 3. Allow that email to publish prices (lower-case), then run:
-- =============================================================================
-- insert into public.price_admins (email) values ('you@yourcompany.com') on conflict do nothing;
