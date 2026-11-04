import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <section className="container-x flex min-h-[calc(100dvh-4rem)] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-(--shadow-card) sm:p-10">
        <p className="font-mono text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">Admin</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Sign in to update prices</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-body">
          Use the email and password set up in Supabase for price updates.
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
