export const dynamic="force-dynamic";
import {DashboardShell} from "@/components/DashboardShell";
import {db} from "@/lib/db";
import {getSession} from "@/lib/security";
import {ObjectId} from "mongodb";
import {notFound,redirect} from "next/navigation";
import {VerifyControls} from "@/components/VerifyControls";
import {ResubmitReview} from "@/components/ResubmitReview";
export default async function Detail({params}:{params:Promise<{id:string}>}){
 const {id}=await params;if(!ObjectId.isValid(id))notFound();
 const s=await getSession();if(!s)redirect("/login");
 const d=await db();const w=await d.collection("websites").findOne({_id:new ObjectId(id),publisherId:s.userId});if(!w)notFound();
 const zones=await d.collection("zones").find({websiteId:w.websiteId,status:"active"}).toArray();
 const installCode="<script async src='https://cdn-ads.virtunumber.online/sdk.js' data-website-id='"+w.websiteId+"'></script>";
 const isVexdou=w.domain==="vexdou.space";
 return <DashboardShell>
  <div className="topbar" style={{alignItems:"flex-start"}}><div><div className="eyebrow">PUBLISHER · WEBSITE CONTROL</div><h1 className="h1">{w.domain}</h1><p className="sub">Ownership verification, domain routing and advertising delivery</p></div><span className="pill">{w.status==="approved"?"ADS APPROVED":String(w.status).toUpperCase()}</span></div>
  <div className="glass panel"><div className="actions">{w.verifiedAt&&<span className="pill">Ownership verified</span>}{w.status==="approved"&&<span className="pill">Ad zones active</span>}{w.reviewStatus==="under_review"&&<span className="pill review">Under review</span>}{w.reviewStatus==="changes_requested"&&<span className="pill pending">Changes requested</span>}</div>
   {w.verifiedAt&&<p className="sub">Verified {w.verifiedAt.toLocaleString()} · {String(w.verificationMethod||"").toUpperCase()}</p>}
   <p className="sub">{w.reviewNote||(w.status==="approved"?"Your domain is approved. Choose the integration method below to display ads.":"Add the DNS TXT record below. Successful TXT verification automatically approves the domain.")}</p>
   {!w.verifiedAt&&<VerifyControls id={id} v={w.verification}/>}
   {w.reviewStatus==="changes_requested"&&<ResubmitReview id={id}/>}
  </div>
  {w.status==="approved"&&<>
   <section className="glass panel" style={{marginTop:18}}>
    <div className="topbar"><div><div className="eyebrow">OPTION 1 · KEEP YOUR EXISTING WEBSITE</div><h2 className="paneltitle" style={{marginTop:6}}>Install the Numelixa Ads script</h2><p className="sub">This displays sponsored creatives inside your existing website without replacing its pages.</p></div><span className="pill">Site-wide SDK</span></div>
    <pre className="code" style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",padding:16,borderRadius:13,background:"#071326",border:"1px solid #29466d"}}>{installCode}</pre>
    <p className="sub">Add this once to the shared global layout or footer, immediately before the closing body tag. The SDK requests ads on page load and refreshes on SPA route changes.</p>
   </section>
   <section className="glass panel" style={{marginTop:18}}>
    <div className="topbar"><div><div className="eyebrow">OPTION 2 · NUMELIXA HOSTED AD PAGE</div><h2 className="paneltitle" style={{marginTop:6}}>Show a full-page Numelixa ad on this domain</h2><p className="sub">This makes the domain itself open a visual Numelixa campaign page with a clickable button to numelixa.com. It replaces the existing website on this domain while enabled.</p></div><span className="pill">Domain landing</span></div>
    {isVexdou?<div className="verifybox">
      <b>Vercel ownership TXT record</b><p className="code">Host: _vercel</p><p className="code">Value: vc-domain-verify=vexdou.space,cb46c4afc4703b8ca260</p>
      <p className="sub">The apex A record is already detected and matches Vercel's recommended address. Keep it unchanged for now. Add the TXT record above in Spaceship DNS, then the domain can be verified on the Numelixa Ads Vercel project.</p>
    </div>:<div className="verifybox">
      <b>Domain connection required</b>
      <p className="sub">DNS TXT ownership verification does not route website traffic. This domain must also be attached to the Numelixa Ads Vercel project and its apex A or subdomain CNAME record must point to Vercel. The exact Vercel verification TXT value is unique to each domain.</p>
    </div>}
    <p className="sub">Important: changing the domain's web A/CNAME record routes visitors away from the current website and to this Numelixa ad page. Email MX/TXT records should be preserved.</p>
   </section>
   <section className="glass panel" style={{marginTop:18}}>
    <div className="topbar"><div><h2 className="paneltitle">Ad zone status</h2><p className="sub">Ad placements provisioned for this verified domain.</p></div><span className="pill">{zones.length} active zones</span></div>
    <div className="grid stats" style={{gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))"}}>{["native","banner","html","in_article_video","floating_video"].map(f=><div className="glass stat" key={f}><div className="stathead">{f.replaceAll("_"," ")}</div><div className="statvalue" style={{fontSize:18}}>{zones.some(z=>z.format===f)?"Active":"Pending"}</div></div>)}</div>
   </section>
  </>}
 </DashboardShell>
}
