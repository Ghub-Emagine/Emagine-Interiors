"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import BrandMark from "@/components/layout/BrandMark";
import { SITE_IMAGES } from "@/lib/site-images";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signError) {
      setError(signError.message);
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-16 overflow-hidden">
      <img
        src={SITE_IMAGES.apartmentWarm}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[var(--text-primary)]/75"
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-md border border-[var(--border)] bg-[var(--background)] p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <BrandMark size="admin" withStudio className="mb-8" />
        <h1 className="font-serif text-2xl mb-6">Sign in</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[var(--border)] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
