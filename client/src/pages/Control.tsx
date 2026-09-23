/**
 * MONSTER Control Hub: dark operational layout, server-authorized data only.
 * Empty or unavailable backend data is shown explicitly; no demo metrics are rendered.
 */
import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BarChart3,
  Database,
  FileText,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Admin = {
  email: string;
  role: "admin" | "super_admin";
};

type AdminMeResponse = {
  admin: Admin;
  needsSetup?: boolean;
};

type Counts = {
  users: number;
  devices: number;
  movies: number;
  series: number;
  accessAccounts: number;
  subscriptions: number;
  auditEvents: number;
};

const navigation = [
  ["/control", "Dashboard", LayoutDashboard],
  ["/control/users", "Users", Users],
  ["/control/devices", "Devices", Wifi],
  ["/control/content", "Content", Video],
  ["/control/sources", "Sources", Database],
  ["/control/analytics", "Analytics", BarChart3],
  ["/control/logs", "Audit logs", FileText],
] as const;

export default function Control() {
  const [, navigate] = useLocation();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [counts, setCounts] = useState<Counts | null>(null);

  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState(false);

  // First-time administrator setup
  const [needsSetup, setNeedsSetup] = useState(false);
  const [setupEmail, setSetupEmail] = useState("");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupConfirm, setSetupConfirm] = useState("");
  const [setupError, setSetupError] = useState("");
  const [setupBusy, setSetupBusy] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch("/api/admin/me", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then(async response => {
        if (!response.ok) {
          navigate("/admin/login");
          return;
        }

        const payload =
          (await response.json()) as AdminMeResponse;

        if (mounted) {
          setAdmin(payload.admin);
          setNeedsSetup(payload.needsSetup === true);
          setSetupEmail(payload.admin.email);
        }
      })
      .then(() =>
        fetch("/api/admin/overview", {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }),
      )
      .then(async response => {
        if (!response?.ok) {
          if (mounted) {
            setDataError(true);
          }

          return;
        }

        const payload = (await response.json()) as {
          connected: boolean;
          counts?: Counts;
        };

        if (mounted) {
          setCounts(payload.counts ?? null);
          setDataError(!payload.connected);
        }
      })
      .catch(() => {
        if (mounted) {
          setDataError(true);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [navigate]);

  async function completeInitialSetup(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSetupError("");
    setSetupBusy(true);

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: setupEmail,
          password: setupPassword,
          confirmPassword: setupConfirm,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        admin?: Admin;
      };

      if (!response.ok) {
        setSetupError(
          payload.error ??
            "Unable to complete administrator setup.",
        );
        return;
      }

      if (payload.admin) {
        setAdmin(payload.admin);
      }

      setNeedsSetup(false);
      setSetupPassword("");
      setSetupConfirm("");
      setSetupError("");
    } catch {
      setSetupError(
        "Unable to reach the administrator setup service.",
      );
    } finally {
      setSetupBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/admin/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050b12] p-8 text-white">
        Checking administrative session…
      </main>
    );
  }

  if (!admin) {
    return null;
  }

  const metrics = [
    ["Users", counts?.users],
    ["Devices", counts?.devices],
    ["Movies", counts?.movies],
    ["Series", counts?.series],
    ["Access accounts", counts?.accessAccounts],
    ["Subscriptions", counts?.subscriptions],
    ["Audit events", counts?.auditEvents],
  ] as const;

  return (
    <main className="min-h-screen bg-[#050b12] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#071321] p-5 lg:block">
          <p className="mb-8 px-3 text-xs font-bold uppercase tracking-[0.26em] text-[#00b8ff]">
            MONSTER CONTROL
          </p>

          <nav className="space-y-1">
            {navigation.map(([href, label, Icon]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-7 sm:px-8">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#00b8ff]">
                MONSTER CONTROL HUB
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight">
                Operations dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                {admin.email} ·{" "}
                {admin.role === "super_admin"
                  ? "Super Admin"
                  : "Admin"}
              </p>
            </div>

            <Button
              variant="outline"
              onClick={logout}
              className="gap-2"
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </header>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {navigation.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* FIRST-TIME ADMINISTRATOR SETUP */}
          {needsSetup && (
            <section className="mt-6 rounded-2xl border border-[#00b8ff]/30 bg-[#0b1c2f] p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#00b8ff]/10 text-[#73d9ff]">
                  <ShieldCheck className="size-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#73d9ff]">
                    First-time administrator setup
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Create your permanent admin account
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    You entered using the bootstrap administrator
                    credentials. Create the real Control Hub email
                    and password now. The password will be stored as
                    a secure hash.
                  </p>
                </div>
              </div>

              <form
                onSubmit={completeInitialSetup}
                className="mt-6 grid gap-5 md:grid-cols-2"
              >
                <label className="block text-sm font-semibold text-slate-200">
                  New admin email

                  <input
                    required
                    type="email"
                    value={setupEmail}
                    onChange={event =>
                      setSetupEmail(event.target.value)
                    }
                    className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#07111d] px-4 text-white outline-none focus:border-[#00b8ff]"
                    autoComplete="email"
                  />
                </label>

                <div />

                <label className="block text-sm font-semibold text-slate-200">
                  New password

                  <input
                    required
                    minLength={10}
                    type="password"
                    value={setupPassword}
                    onChange={event =>
                      setSetupPassword(event.target.value)
                    }
                    className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#07111d] px-4 text-white outline-none focus:border-[#00b8ff]"
                    autoComplete="new-password"
                  />

                  <span className="mt-2 block text-xs text-slate-500">
                    Minimum 10 characters.
                  </span>
                </label>

                <label className="block text-sm font-semibold text-slate-200">
                  Confirm password

                  <input
                    required
                    minLength={10}
                    type="password"
                    value={setupConfirm}
                    onChange={event =>
                      setSetupConfirm(event.target.value)
                    }
                    className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#07111d] px-4 text-white outline-none focus:border-[#00b8ff]"
                    autoComplete="new-password"
                  />
                </label>

                {setupError && (
                  <div className="md:col-span-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    {setupError}
                  </div>
                )}

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    disabled={setupBusy}
                    className="h-12 bg-[#00b8ff] px-6 font-bold text-[#03101b] hover:bg-[#73d9ff]"
                  >
                    <ShieldCheck className="mr-2 size-4" />

                    {setupBusy
                      ? "Saving administrator account…"
                      : "Save new administrator account"}
                  </Button>
                </div>
              </form>
            </section>
          )}

          {dataError && (
            <div className="mt-6 rounded-xl border border-[#ffc300]/30 bg-[#ffc300]/10 p-4 text-sm text-[#ffe69a]">
              Database metrics are not available right now. No
              numbers are being estimated or displayed.
            </div>
          )}

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value]) => (
              <Card
                key={label}
                className="border-white/10 bg-[#0b1c2f]"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-3xl font-black text-white">
                    {value === undefined || dataError
                      ? "Not connected"
                      : value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2">
            <Card className="border-white/10 bg-[#0b1c2f]">
              <CardHeader>
                <ShieldCheck className="size-6 text-[#73d9ff]" />

                <CardTitle className="text-white">
                  Security boundary
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm leading-6 text-slate-400">
                Access is verified by an HttpOnly signed server
                session. Customer MAC sessions cannot authorize
                these routes, and sensitive mutations must remain
                server-side.
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0b1c2f]">
              <CardHeader>
                <Video className="size-6 text-[#73d9ff]" />

                <CardTitle className="text-white">
                  Legal content boundary
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm leading-6 text-slate-400">
                Only TMDB metadata paired with a verified Public
                Domain, Creative Commons, or official embed source
                may become published content.
              </CardContent>
            </Card>
          </section>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/">
              <Button variant="ghost">
                Return to customer app
              </Button>
            </Link>

            <Link href="/control/content">
              <Button className="bg-[#00b8ff] text-[#03101b] hover:bg-[#73d9ff]">
                Review content
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}