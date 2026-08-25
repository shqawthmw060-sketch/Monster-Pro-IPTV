/**
 * MONSTER IPTV admin entry: server-authenticated staff access only.
 * Customer MAC credentials are intentionally not accepted here.
 */
import { FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toUserError } from "@/lib/apiError";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      const response = await fetch("/api/admin/login", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email, password }) });
      const payload = await response.json().catch(() => ({})) as { error?: unknown };
      if (!response.ok) { setError(toUserError(payload.error, "Administrative sign-in failed.")); return; }
      navigate("/control");
    } catch { setError("Unable to reach the administrative service."); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen bg-[#050b12] px-5 py-8 text-white sm:px-8"><div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center justify-center"><section className="w-full border border-white/10 bg-[#0b1c2f] p-7 shadow-2xl sm:p-10"><Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="size-4" />Back to MONSTER IPTV</Link><div className="mt-10 flex size-14 items-center justify-center rounded-2xl bg-[#00b8ff]/10 text-[#73d9ff]"><ShieldCheck className="size-7" /></div><p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-[#73d9ff]">MONSTER CONTROL HUB</p><h1 className="mt-3 text-3xl font-black">Administrative sign in</h1><p className="mt-3 text-sm leading-6 text-slate-400">Use the owner or staff credentials configured securely on the server. Customer MAC credentials cannot access this area.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-semibold text-slate-200">Admin email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full border border-white/15 bg-[#07111d] px-4 text-white outline-none focus:border-[#00b8ff]" autoComplete="username" /></label><label className="block text-sm font-semibold text-slate-200">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full border border-white/15 bg-[#07111d] px-4 text-white outline-none focus:border-[#00b8ff]" autoComplete="current-password" /></label>{error ? <p role="alert" className="border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}<Button type="submit" disabled={busy} className="h-12 w-full bg-[#00b8ff] font-bold text-[#03101c] hover:bg-[#42caff]"><LockKeyhole className="mr-2 size-4" />{busy ? "Checking…" : "Enter Control Hub"}</Button></form></section></div></main>;
}
