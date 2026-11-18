export const dynamic = "force-dynamic";

import Link from "next/link";
import { DashboardShell } from "@/components/DashboardShell";
import { db } from "@/lib/db";
import { getSession } from "@/lib/security";
import { redirect } from "next/navigation";

const tools = [
  { title: "Website control", description: "Review ownership, inspect domains and manage publisher placements.", href: "/admin/websites", icon: "🌐" },
  { title: "Publisher accounts", description: "Review publisher accounts and their connected domain portfolios.", href: "/admin/publishers", icon: "👥" },
  { title: "Ads Studio", description: "Create campaigns, set schedules, choose placements and manage creatives.", href: "/admin/campaigns", icon: "📣" },
  { title: "Security activity", description: "Audit administrator actions and important platform events.", href: "/admin/logs", icon: "🛡️" },
];

export default async function Admin() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/dashboard");

  const d = await db();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [
    publishers, activePublishers, websites, verified, approved, unverified,
    rejected, zones, activeZones, campaigns, activeCampaigns, pausedCampaigns,
    impressions, clicks, impressions24h, clicks24h, queue, recent
  ] = await Promise.all([
    d.collection("users").countDocuments({ role: "publisher" }),
    d.collection("users").countDocuments({ role: "publisher", status: "active" }),
    d.collection("websites").countDocuments(),
    d.collection("websites").countDocuments({ verifiedAt: { $ne: null } }),
    d.collection("websites").countDocuments({ status: "approved" }),
    d.collection("websites").countDocuments({ status: "pending_verification" }),
    d.collection("websites").countDocuments({ status: "rejected" }),
    d.collection("zones").countDocuments(),
    d.collection("zones").countDocuments({ status: "active" }),
    d.collection("ads").countDocuments({ owner: "numelixa", status: { $ne: "deleted" } }),
    d.collection("ads").countDocuments({ owner: "numelixa", status: "active" }),
    d.collection("ads").countDocuments({ owner: "numelixa", status: "paused" }),
    d.collection("events").countDocuments({ kind: "impression", valid: true }),
    d.collection("events").countDocuments({ kind: "click", valid: true }),
    d.collection("events").countDocuments({ kind: "impression", valid: true, createdAt: { $gte: since } }),
    d.collection("events").countDocuments({ kind: "click", valid: true, createdAt: { $gte: since } }),
    d.collection("websites").find({ reviewStatus: "under_review" }).sort({ createdAt: -1 }).limit(8).toArray(),
    d.collection("audit_logs").find({}).sort({ createdAt: -1 }).limit(6).toArray(),
  ]);

  const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : "0.00";
  const ctr24 = impressions24h ? ((clicks24h / impressions24h) * 100).toFixed(2) : "0.00";
  const metrics = [
    ["Publishers", publishers, activePublishers + " active"],
    ["Connected domains", websites, verified + " verified"],
    ["Approved domains", approved, unverified + " awaiting DNS"],
    ["Ad zones", zones, activeZones + " active"],
    ["Campaigns", campaigns, activeCampaigns + " running · " + pausedCampaigns + " paused"],
    ["Total impressions", impressions, impressions24h + " in last 24h"],
    ["Total clicks", clicks, clicks24h + " in last 24h"],
    ["Click-through rate", ctr + "%", ctr24 + "% in last 24h"],
  ] as const;

  return <DashboardShell admin>
    <div className="topbar" style={{ alignItems: "flex-start", marginBottom: 20 }}>
      <div>
        <div className="eyebrow">NUMELIXA ADS · ADMINISTRATOR</div>
        <h1 className="h1">Command center</h1>
        <p className="sub">Live network overview, domain activation, campaign delivery and platform activity.</p>
      </div>
      <span className="pill">Admin session · {session.email}</span>
    </div>

    <section className="grid stats">
      {metrics.map(([name, value, note]) => <div className="glass stat" key={name}>
        <div className="stathead">{name}</div>
        <div className="statvalue">{typeof value === "number" ? value.toLocaleString() : value}</div>
        <div className="sub">{note}</div>
      </div>)}
    </section>

    <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14, margin: "22px 0" }}>
      {tools.map(tool => <Link key={tool.href} href={tool.href} className="glass panel" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>{tool.icon}</div>
        <h2 className="paneltitle">{tool.title}</h2>
        <p className="sub">{tool.description}</p>
        <span className="eyebrow">OPEN CONTROL →</span>
      </Link>)}
    </section>

    <section className="glass panel" style={{ marginBottom: 18 }}>
      <div className="topbar">
        <div><h2 className="paneltitle">Domain activation queue</h2><p className="sub">DNS TXT verified domains are automatically approved and receive active ad zones.</p></div>
        <Link className="btn secondary" href="/admin/websites">Manage domains</Link>
      </div>
      {queue.length ? <div className="tablewrap"><table className="table"><thead><tr><th>DOMAIN</th><th>PUBLISHER ID</th><th>VERIFIED</th><th>STATUS</th><th></th></tr></thead><tbody>
        {queue.map(w => <tr key={w._id.toString()}><td><b>{w.domain}</b></td><td>{w.publisherId}</td><td>{w.verifiedAt?.toLocaleString() || "Not verified"}</td><td>{w.status}</td><td><Link href={"/admin/websites/" + w._id.toString()}>Open →</Link></td></tr>)}
      </tbody></table></div> : <div className="empty">No websites are waiting for manual review.</div>}
      <div className="sub" style={{ marginTop: 12 }}>Domain status: {verified} verified · {approved} approved · {unverified} awaiting ownership proof · {rejected} rejected.</div>
    </section>

    <section className="glass panel">
      <div className="topbar"><div><h2 className="paneltitle">Recent administrator activity</h2><p className="sub">Latest security and platform audit records.</p></div><Link href="/admin/logs">All logs →</Link></div>
      {recent.length ? <div className="tablewrap"><table className="table"><thead><tr><th>TIME</th><th>ACTOR</th><th>ACTION</th><th>TARGET</th></tr></thead><tbody>
        {recent.map(log => <tr key={log._id.toString()}><td>{log.createdAt?.toLocaleString()}</td><td>{log.actorId || "system"}</td><td>{log.action}</td><td>{log.targetId || "—"}</td></tr>)}
      </tbody></table></div> : <div className="empty">No activity has been recorded yet.</div>}
    </section>
  </DashboardShell>;
}
