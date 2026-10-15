import { FormEvent, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Image, Link2, Plus, Radio, Save, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Notice = { type: "success" | "error"; text: string } | null;

const inputClass = "mt-2 h-11 w-full rounded-lg border border-white/15 bg-[#07111d] px-3 text-white outline-none focus:border-[#00b8ff]";

async function post(path: string, body: unknown) {
  const response = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as { error?: string; message?: string; code?: string };
  if (!response.ok) throw new Error(`${payload.error ?? "تعذر حفظ البيانات."}${payload.code ? ` [${payload.code}]` : ""}`);
  return payload;
}

export default function ControlContentManager() {
  const [notice, setNotice] = useState<Notice>(null);
  const [content, setContent] = useState({ kind: "movie", posterUrl: "", sourceUrl: "", isAuthorized: true });
  const [account, setAccount] = useState({ displayName: "", phoneNumber: "", macAddress: "", username: "", password: "", expiresAt: "" });
  const [visual, setVisual] = useState({ backgroundUrl: "", logoUrl: "", qrCodeText: "", customCode: "" });
  const [links, setLinks] = useState({ whatsapp: "01508536392", facebook: "", instagram: "", telegram: "", youtube: "" });
  const [createdCredentials, setCreatedCredentials] = useState<{ phoneNumber: string; macAddress: string; username: string; password: string } | null>(null);
  const [busy, setBusy] = useState(false);

  function update<T extends object>(setter: Dispatch<SetStateAction<T>>, key: keyof T, value: string | boolean) {
    setter(previous => ({ ...previous, [key]: value }));
  }

  async function submitContent(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null);
    try {
      await post("/api/admin/content", content);
      setNotice({ type: "success", text: "تم حفظ المحتوى والرابط بنجاح." });
      setContent(previous => ({ ...previous, posterUrl: "", sourceUrl: "" }));
    } catch (error) { setNotice({ type: "error", text: error instanceof Error ? error.message : "تعذر الحفظ." }); }
    finally { setBusy(false); }
  }

  async function submitAccount(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null);
    try {
      const result = await post("/api/admin/access-accounts", { ...account, macAddress: "", password: "" }) as { phoneNumber: string; macAddress: string; username: string; password: string };
      setCreatedCredentials({ phoneNumber: result.phoneNumber, macAddress: result.macAddress, username: result.username, password: result.password });
      setNotice({ type: "success", text: "تم إنشاء الاشتراك. يمكن للعميل استخدام MAC واسم المستخدم وكلمة المرور." });
      setAccount({ displayName: "", phoneNumber: "", macAddress: "", username: "", password: "", expiresAt: "" });
    } catch (error) { setNotice({ type: "error", text: error instanceof Error ? error.message : "تعذر إنشاء الاشتراك." }); }
    finally { setBusy(false); }
  }

  async function submitSettings(event: FormEvent) {
    event.preventDefault(); setBusy(true); setNotice(null);
    try {
      await post("/api/admin/settings", { visual, links });
      setNotice({ type: "success", text: "تم حفظ الخلفية والروابط والأكواد." });
    } catch (error) { setNotice({ type: "error", text: error instanceof Error ? error.message : "تعذر حفظ الإعدادات." }); }
    finally { setBusy(false); }
  }

  return <section className="mt-8 space-y-5">
    {notice && <div className={`rounded-xl border px-4 py-3 text-sm ${notice.type === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-red-400/30 bg-red-400/10 text-red-200"}`}>{notice.text}</div>}

    <div className="grid gap-5 xl:grid-cols-2">
      <Card className="border-white/10 bg-[#0b1c2f]"><CardHeader><CardTitle className="flex items-center gap-2 text-white"><Link2 className="size-5 text-[#73d9ff]" />إضافة رابط محتوى</CardTitle><p className="text-sm text-slate-400">اختر فيلمًا أو مسلسلًا أو قناة، ثم أدخل الرابط واللوجو فقط.</p></CardHeader><CardContent><form onSubmit={submitContent} className="grid gap-4">
        <label className="text-sm text-slate-200">النوع<select className={inputClass} value={content.kind} onChange={e => update(setContent, "kind", e.target.value)}><option value="movie">فيلم</option><option value="series">مسلسل</option><option value="channel">قناة</option></select></label>
        <label className="text-sm text-slate-200">رابط المشاهدة أو التضمين<input required type="url" className={inputClass} value={content.sourceUrl} onChange={e => update(setContent, "sourceUrl", e.target.value)} /></label>
        <label className="text-sm text-slate-200">رابط اللوجو<input type="url" className={inputClass} value={content.posterUrl} onChange={e => update(setContent, "posterUrl", e.target.value)} /></label>
        <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2"><input type="checkbox" checked={content.isAuthorized} onChange={e => update(setContent, "isAuthorized", e.target.checked)} />أؤكد أن المصدر قانوني ومصرح بعرضه</label>
        <Button disabled={busy} className="bg-[#00b8ff] font-bold text-[#03101b] hover:bg-[#73d9ff] sm:col-span-2"><Plus className="mr-2 size-4" />حفظ المحتوى</Button>
      </form></CardContent></Card>

      <Card className="border-white/10 bg-[#0b1c2f]"><CardHeader><CardTitle className="flex items-center gap-2 text-white"><Ticket className="size-5 text-[#73d9ff]" />إنشاء اشتراك عميل</CardTitle><p className="text-sm text-slate-400">سيتم توليد MAC وكلمة المرور تلقائيًا من الخادم بعد الحفظ.</p></CardHeader><CardContent><form onSubmit={submitAccount} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-200">اسم العميل<input required className={inputClass} value={account.displayName} onChange={e => update(setAccount, "displayName", e.target.value)} /></label>
        <label className="text-sm text-slate-200">رقم WhatsApp للعميل<input required type="tel" className={inputClass} value={account.phoneNumber} onChange={e => update(setAccount, "phoneNumber", e.target.value)} placeholder="2010XXXXXXXX" /></label>
        <div className="rounded-lg border border-dashed border-[#00b8ff]/30 bg-[#07111d] p-3 text-sm text-slate-400">MAC Address<br /><span className="text-[#73d9ff]">يُولّد تلقائيًا</span></div>
        <label className="text-sm text-slate-200">Username<input required className={inputClass} value={account.username} onChange={e => update(setAccount, "username", e.target.value)} /></label>
        <div className="rounded-lg border border-dashed border-[#00b8ff]/30 bg-[#07111d] p-3 text-sm text-slate-400">Password<br /><span className="text-[#73d9ff]">تُولّد تلقائيًا</span></div>
        <label className="text-sm text-slate-200 sm:col-span-2">تاريخ الانتهاء<input type="datetime-local" className={inputClass} value={account.expiresAt} onChange={e => update(setAccount, "expiresAt", e.target.value)} /></label>
        <Button disabled={busy} className="bg-emerald-500 font-bold text-black hover:bg-emerald-300 sm:col-span-2"><Radio className="mr-2 size-4" />إنشاء الاشتراك</Button>
      </form>{createdCredentials && <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100"><p className="font-bold">بيانات الاشتراك الجديدة</p><p className="mt-2">الرقم: <b>{createdCredentials.phoneNumber}</b></p><p>MAC: <b>{createdCredentials.macAddress}</b></p><p>Username: <b>{createdCredentials.username}</b></p><p>Password: <b>{createdCredentials.password}</b></p><Button type="button" className="mt-4 bg-[#25D366] font-bold text-black hover:bg-[#7af0a6]" onClick={() => { const message = encodeURIComponent(`بيانات اشتراك MONSTER IPTV\n\nMAC: ${createdCredentials.macAddress}\nUsername: ${createdCredentials.username}\nPassword: ${createdCredentials.password}`); window.open(`https://wa.me/${createdCredentials.phoneNumber.replace(/^\+/, "")}?text=${message}`, "_blank", "noopener,noreferrer"); }}>إرسال البيانات عبر WhatsApp</Button></div>}</CardContent></Card>
    </div>

    <Card className="border-white/10 bg-[#0b1c2f]"><CardHeader><CardTitle className="flex items-center gap-2 text-white"><Image className="size-5 text-[#73d9ff]" />الخلفيات والروابط الاجتماعية والأكواد</CardTitle><p className="text-sm text-slate-400">هذه القيم تحفظ في إعدادات التطبيق. لا تضع هنا مفاتيح سرية أو كلمات مرور.</p></CardHeader><CardContent><form onSubmit={submitSettings} className="grid gap-4 md:grid-cols-2">
      <label className="text-sm text-slate-200">رابط الخلفية<input type="url" className={inputClass} value={visual.backgroundUrl} onChange={e => update(setVisual, "backgroundUrl", e.target.value)} /></label>
      <label className="text-sm text-slate-200">رابط الشعار<input type="url" className={inputClass} value={visual.logoUrl} onChange={e => update(setVisual, "logoUrl", e.target.value)} /></label>
      <label className="text-sm text-slate-200">نص QR Code<input className={inputClass} value={visual.qrCodeText} onChange={e => update(setVisual, "qrCodeText", e.target.value)} placeholder="رابط الاشتراك أو الموقع" /></label>
      <label className="text-sm text-slate-200">كود مخصص / CSS<textarea className="mt-2 min-h-20 w-full rounded-lg border border-white/15 bg-[#07111d] p-3 text-white outline-none focus:border-[#00b8ff]" value={visual.customCode} onChange={e => update(setVisual, "customCode", e.target.value)} /></label>
      {(["whatsapp", "facebook", "instagram", "telegram", "youtube"] as const).map(key => <label key={key} className="text-sm text-slate-200">{key === "whatsapp" ? "WhatsApp" : key}<input type="url" className={inputClass} value={links[key]} onChange={e => update(setLinks, key, e.target.value)} /></label>)}
      <Button disabled={busy} className="bg-[#00b8ff] font-bold text-[#03101b] hover:bg-[#73d9ff] md:col-span-2"><Save className="mr-2 size-4" />حفظ الإعدادات</Button>
    </form></CardContent></Card>
  </section>;
}
