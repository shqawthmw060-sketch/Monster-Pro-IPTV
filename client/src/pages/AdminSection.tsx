/**
 * MONSTER Control Hub section shell: intentionally honest empty state until a real API is wired.
 * It is not a fake dashboard and never renders invented records or metrics.
 */
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

type Props = { title: string; description: string; scope: string };
export default function AdminSection({ title, description, scope }: Props) {
  return (
    <main className="min-h-screen bg-[#050b12] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-white/10 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#00b8ff]">
            MONSTER CONTROL HUB / {scope}
          </p>
          <h1 className="mt-3 text-3xl font-black">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>
        <section className="mt-8 rounded-2xl border border-[#00b8ff]/20 bg-[#0b1c2f] p-7">
          <p className="text-lg font-bold text-white">Not connected</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            This section is prepared for a server-authorized API. No records are
            shown until the corresponding Neon-backed endpoint is implemented.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/control">
              <Button className="bg-[#00b8ff] text-[#03101b] hover:bg-[#73d9ff]">
                Back to dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Customer app</Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
