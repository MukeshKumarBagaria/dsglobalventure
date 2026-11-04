"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});
  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-ink">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-ink">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </label>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-700 font-semibold text-white shadow-[0_12px_30px_-12px_rgb(30_99_214/0.75)] transition-opacity disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
