/**
 * MONSTER IPTV catalog: authenticated, server-sourced legal media only.
 * Reuses MediaCard and keeps playback metadata visible for attribution.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Loader2, Play } from "lucide-react";
import { MediaCard } from "@/components/media/MediaCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CatalogItem = {
  id: string;
  title: string;
  synopsis?: string | null;
  posterUrl?: string | null;
  releaseYear?: number | null;
  metadata?: Record<string, unknown> | null;
  playback: { kind: "external" | "embed"; url: string; provider: string };
};

export default function Catalog({ type }: { type: "movie" | "series" }) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/content/catalog?type=${type}`, { credentials: "include", headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load the authorized catalog.");
        return (await response.json()) as { items: CatalogItem[] };
      })
      .then((payload) => { if (active) setItems(payload.items); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : "Unable to load the catalog."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [type]);

  const label = type === "movie" ? "Movies" : "Series";
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/sections"><Button variant="ghost" className="mb-3 gap-2 px-0"><ArrowLeft className="size-4" />Back to sections</Button></Link>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Authorized catalog</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{label}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Metadata is supplied by TMDB. Playback is limited to verified Public Domain, Creative Commons, or official embed sources.</p>
          </div>
          <Badge variant="outline">No ratings or fabricated reviews</Badge>
        </div>

        {loading ? <div className="flex items-center gap-3 text-muted-foreground"><Loader2 className="size-5 animate-spin" />Loading authorized content…</div> : null}
        {error ? <Card><CardContent className="p-6 text-sm text-destructive">{error}</CardContent></Card> : null}
        {!loading && !error && items.length === 0 ? <Card><CardContent className="p-8 text-sm text-muted-foreground">No published legal {type} items are available yet. An administrator must import TMDB metadata, attach a verified playback source, and publish the item.</CardContent></Card> : null}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => <MediaCard key={item.id} title={item.title} poster={item.posterUrl ?? "/assets/icon-only.png"} type={type} meta={item.releaseYear ? String(item.releaseYear) : "Legal source"} description={item.synopsis ?? undefined} onSelect={() => setSelected(item)} />)}
        </div>

        {selected ? <Card className="overflow-hidden border-brand/40 bg-card"><CardContent className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-brand">Now selected</p><h2 className="mt-1 text-2xl font-semibold">{selected.title}</h2><p className="mt-2 text-sm text-muted-foreground">Provider: {selected.playback.provider}. Please retain the source attribution when sharing this content.</p></div><Button variant="ghost" onClick={() => setSelected(null)}>Close</Button></div>
          {selected.playback.kind === "embed" ? <div className="aspect-video overflow-hidden rounded-lg bg-black"><iframe title={`${selected.title} official player`} src={selected.playback.url} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div> : <Button asChild className="gap-2"><a href={selected.playback.url} target="_blank" rel="noreferrer"><Play className="size-4" />Open official source<ExternalLink className="size-4" /></a></Button>}
          <p className="text-xs text-muted-foreground">Playback is provided by the authorized source. MONSTER IPTV does not host or re-upload the media.</p>
        </CardContent></Card> : null}
      </div>
    </main>
  );
}
