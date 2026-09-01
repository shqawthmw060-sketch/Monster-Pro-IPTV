/**
 * MONSTER IPTV category home — the post-login broadcast shelf.
 * It exposes navigation only; live/VOD items come from the authorized catalog API.
 */
import { Link, useLocation } from "wouter";
import { CirclePlay, Crown, LogOut, Radio, Search, Tv2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOutAccess, type AccessAccount } from "@/lib/access";
import iconOnlyUrl from "../../../assets/icon-only.png";

const sections = [
  {
    href: "/live",
    label: "Live TV",
    description: "Authorized live channels",
    icon: Radio,
    tone: "#00b8ff",
  },
  {
    href: "/movies",
    label: "Movies",
    description: "Your connected movie catalog",
    icon: CirclePlay,
    tone: "#ffc300",
  },
  {
    href: "/series",
    label: "Series",
    description: "Continue your series library",
    icon: Tv2,
    tone: "#73d9ff",
  },
  {
    href: "/sports",
    label: "Sports",
    description: "Sports from your provider",
    icon: Crown,
    tone: "#8ff0b0",
  },
];

export default function Sections({ account }: { account: AccessAccount }) {
  const [, navigate] = useLocation();

  async function handleSignOut() {
    await signOutAccess();
    navigate("/login");
  }

  return (
    <main className="min-h-screen bg-[#07111d] text-white">
      <header className="border-b border-white/10 bg-[#07111d]/95">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
          <Link
            href="/sections"
            className="flex items-center gap-3"
            aria-label="MONSTER IPTV sections"
          >
            <img
              src={iconOnlyUrl}
              alt="MONSTER IPTV"
              className="size-11 rounded-xl object-cover ring-1 ring-[#00b8ff]/35"
            />
            <div className="leading-none">
              <p className="font-black tracking-[0.18em]">MONSTER</p>
              <p className="pt-1 text-[10px] font-bold tracking-[0.42em] text-[#00b8ff]">
                IPTV
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs text-slate-500">Connected account</p>
              <p className="text-sm font-semibold text-slate-200">
                {account.username}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="mr-2 size-4" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ffc300]">
            Welcome back, {account.displayName}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Choose your signal.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-400">
            Your account is active. Select a section to continue to the content
            connected to your authorized provider.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {sections.map(({ href, label, description, icon: Icon, tone }) => (
            <Link
              key={href}
              href={href}
              className="group border border-white/10 bg-[#0b1c2f] p-7 transition hover:-translate-y-1 hover:border-white/25"
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex size-12 items-center justify-center bg-white/5"
                  style={{ color: tone }}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <Search
                  className="size-4 text-slate-600 transition group-hover:text-slate-300"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-8 text-2xl font-bold">{label}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                {description}
              </p>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#73d9ff]">
                Open section →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
