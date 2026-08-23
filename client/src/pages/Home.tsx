/**
 * MONSTER IPTV home surface — cinematic broadcast landing view.
 * This page uses the existing React/Vite/Wouter architecture and does not
 * fabricate catalog items, ratings, streams, or provider credentials.
 */
import { Link } from "wouter";
import {
  ArrowRight,
  CirclePlay,
  Crown,
  LayoutGrid,
  Radio,
  Search,
  ShieldCheck,
  Tv2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import iconOnlyUrl from "../../../assets/icon-only.png";

const navigation = [
  { href: "/live", label: "Live TV", icon: Radio },
  { href: "/movies", label: "Movies", icon: CirclePlay },
  { href: "/series", label: "Series", icon: Tv2 },
  { href: "/sports", label: "Sports", icon: Crown },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Authorized access",
    body: "Playback stays behind your configured account and provider boundary.",
  },
  {
    icon: LayoutGrid,
    title: "One broadcast home",
    body: "Live channels, movies, series, and sports share one focused experience.",
  },
  {
    icon: Search,
    title: "Find what matters",
    body: "Search and discovery are ready for the catalog connected to your account.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07111d] text-white">
      <header className="border-b border-white/10 bg-[#07111d]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="MONSTER IPTV home"
          >
            <span className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#07111d] shadow-[0_0_28px_rgba(0,184,255,0.28)] ring-1 ring-[#00b8ff]/35">
              <img
                src={iconOnlyUrl}
                alt=""
                className="size-full object-cover"
                aria-hidden="true"
              />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black tracking-[0.18em] text-white">
                MONSTER
              </span>
              <span className="block pt-1 text-[10px] font-bold tracking-[0.42em] text-[#00b8ff]">
                IPTV
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/8 hover:text-white"
              >
                <Icon className="size-4 text-[#00b8ff]" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-200 hover:bg-white/8 hover:text-white"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button className="bg-[#ffc300] font-bold text-[#171106] hover:bg-[#ffd34d]">
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate border-b border-white/10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_16%,rgba(0,184,255,0.22),transparent_34%),linear-gradient(135deg,#07111d_0%,#0b1c2f_55%,#07111d_100%)]" />
          <div className="absolute right-[-12rem] top-[-10rem] -z-10 size-[34rem] rounded-full border border-[#00b8ff]/10" />
          <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#00b8ff]/30 bg-[#00b8ff]/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#73d9ff]">
                <span className="size-1.5 rounded-full bg-[#00b8ff] shadow-[0_0_10px_#00b8ff]" />
                Premium broadcast control
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.04em] text-white sm:text-7xl">
                Your screen.
                <span className="block text-[#00b8ff]">Your signal.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                MONSTER IPTV brings your authorized live and on-demand
                experience into one fast, cinematic home built for every screen.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/live">
                  <Button
                    size="lg"
                    className="gap-2 bg-[#00b8ff] font-bold text-[#03101c] hover:bg-[#42caff]"
                  >
                    Explore Live TV
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Connect account
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-[390px]">
              <div className="absolute inset-8 rounded-[2rem] border border-[#00b8ff]/20 bg-[#0d2236]/75 shadow-[0_30px_90px_rgba(0,0,0,0.38)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex size-56 items-center justify-center rounded-full border border-[#00b8ff]/30 bg-[#07111d] shadow-[0_0_80px_rgba(0,184,255,0.18)] sm:size-64">
                  <div className="absolute inset-5 rounded-full border border-dashed border-[#ffc300]/45" />
                  <img
                    src={iconOnlyUrl}
                    alt="MONSTER IPTV"
                    className="size-36 rounded-full object-cover sm:size-44"
                  />
                  <span className="absolute bottom-7 rounded-full bg-[#ffc300] px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-[#171106]">
                    On air
                  </span>
                </div>
              </div>
              <div className="absolute left-0 top-8 rounded-xl border border-white/10 bg-[#102941] px-4 py-3 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Signal
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Ready when you are
                </p>
              </div>
              <div className="absolute bottom-8 right-0 rounded-xl border border-white/10 bg-[#102941] px-4 py-3 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Experience
                </p>
                <p className="mt-1 text-sm font-semibold text-[#73d9ff]">
                  Built for big screens
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffc300]">
              The MONSTER standard
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A sharper way to watch.
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              No invented catalog, no fake ratings, and no placeholder
              dashboard. The home surface stays ready for the real services
              connected to your account.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="border-l-2 border-[#00b8ff]/60 bg-white/[0.035] p-6"
              >
                <Icon className="size-6 text-[#00b8ff]" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#050c14]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-sm font-semibold text-white">
                Ready to connect your experience?
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Sign in to continue with your authorized service.
              </p>
            </div>
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full border-[#00b8ff]/40 text-[#73d9ff] hover:bg-[#00b8ff]/10 hover:text-white sm:w-auto"
              >
                Open sign in
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
