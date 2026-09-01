/**
 * MONSTER IPTV access gate — server cookie verification on every protected entry.
 * The browser never receives or persists the raw access password.
 */
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { LoaderCircle } from "lucide-react";
import Login from "@/pages/Login";
import Sections from "@/pages/Sections";
import { getCurrentAccessAccount, type AccessAccount } from "@/lib/access";

export default function AccessGate({ children }: { children?: ReactNode }) {
  const [location] = useLocation();
  const [account, setAccount] = useState<AccessAccount | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCurrentAccessAccount()
      .then(currentAccount => {
        if (mounted) setAccount(currentAccount);
      })
      .catch(() => {
        if (mounted) setAccount(null);
      })
      .finally(() => {
        if (mounted) setChecked(true);
      });
    return () => {
      mounted = false;
    };
  }, [location]);

  if (!checked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111d] text-[#73d9ff]">
        <LoaderCircle
          className="size-8 animate-spin"
          aria-label="Checking access"
        />
      </main>
    );
  }

  if (!account) return <Login />;
  if (location === "/login" || location === "/" || location === "/subscribe")
    return <Sections account={account} />;
  if (location === "/sections") return <Sections account={account} />;

  return (
    <>
      {children ?? <Sections account={account} />}
      <div className="fixed bottom-4 left-4 z-50">
        <Link
          href="/sections"
          className="border border-white/15 bg-[#07111d]/90 px-3 py-2 text-xs font-bold text-slate-300 backdrop-blur hover:text-white"
        >
          ← Sections
        </Link>
      </div>
    </>
  );
}
