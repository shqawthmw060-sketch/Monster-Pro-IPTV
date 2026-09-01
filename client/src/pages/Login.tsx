/**
 * MONSTER IPTV access gate — dark broadcast identity, clear trust boundaries,
 * and no client-side persistence of raw credentials.
 */
import { FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, LockKeyhole, MessageCircle, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInWithAccessDetails } from "@/lib/access";
import iconOnlyUrl from "../../../assets/icon-only.png";

const whatsappUrl =
  "https://wa.me/201508536392?text=" +
  encodeURIComponent("مرحباً، أريد الاشتراك في MONSTER IPTV.");

export default function Login() {
  const [, navigate] = useLocation();
  const [macAddress, setMacAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const result = await signInWithAccessDetails({
      macAddress,
      username,
      password,
    });
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate("/sections");
  }

  return (
    <main className="min-h-screen bg-[#07111d] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden border border-white/10 bg-[#0b1c2f] shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden flex-col justify-between border-r border-white/10 bg-[#06101a] p-10 lg:flex">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm text-slate-300 hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to MONSTER
            </Link>
            <div>
              <div className="mb-7 flex size-20 items-center justify-center rounded-2xl bg-[#07111d] ring-1 ring-[#00b8ff]/35">
                <img
                  src={iconOnlyUrl}
                  alt="MONSTER IPTV"
                  className="size-16 rounded-xl object-cover"
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ffc300]">
                Private broadcast access
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight">
                Your signal is waiting.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                Use the access details assigned to you by MONSTER IPTV. Your
                session is remembered securely by the server after a successful
                sign in.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Authorized accounts only. No public credentials are accepted.
            </p>
          </section>

          <section className="p-6 sm:p-10 lg:p-14">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img
                src={iconOnlyUrl}
                alt="MONSTER IPTV"
                className="size-11 rounded-xl object-cover"
              />
              <div>
                <p className="font-black tracking-[0.18em]">MONSTER</p>
                <p className="text-[10px] font-bold tracking-[0.4em] text-[#00b8ff]">
                  IPTV
                </p>
              </div>
            </div>
            <div className="max-w-md">
              <div className="flex items-center gap-2 text-[#73d9ff]">
                <Radio className="size-5" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.24em]">
                  Connect your service
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-black">Sign in to watch</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter the MAC address and credentials issued from the Control
                Hub.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block text-sm font-semibold text-slate-200">
                  MAC Address
                  <input
                    required
                    value={macAddress}
                    onChange={event => setMacAddress(event.target.value)}
                    placeholder="00:11:22:33:44:55"
                    className="mt-2 h-12 w-full border border-white/15 bg-[#07111d] px-4 text-white outline-none transition focus:border-[#00b8ff]"
                    autoComplete="username"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-200">
                  Username
                  <input
                    required
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    placeholder="Your assigned username"
                    className="mt-2 h-12 w-full border border-white/15 bg-[#07111d] px-4 text-white outline-none transition focus:border-[#00b8ff]"
                    autoComplete="username"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-200">
                  Password
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="Your assigned password"
                    className="mt-2 h-12 w-full border border-white/15 bg-[#07111d] px-4 text-white outline-none transition focus:border-[#00b8ff]"
                    autoComplete="current-password"
                  />
                </label>
                {error ? (
                  <p
                    role="alert"
                    className="border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                  >
                    {error}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  disabled={busy}
                  className="h-12 w-full bg-[#00b8ff] font-bold text-[#03101c] hover:bg-[#42caff]"
                >
                  <LockKeyhole className="mr-2 size-4" aria-hidden="true" />
                  {busy ? "Checking access…" : "Sign in"}
                </Button>
              </form>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">
                  Don’t have access details yet?
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 border border-[#25d366]/45 bg-[#25d366]/10 px-4 py-3 text-sm font-bold text-[#8ff0b0] transition hover:bg-[#25d366]/20"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Request subscription on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
