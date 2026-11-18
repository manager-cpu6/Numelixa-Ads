import {headers} from "next/headers";
import {notFound} from "next/navigation";
import {db} from "@/lib/db";
import {activateDnsVerifiedWebsite} from "@/lib/website-activation";
import {ensureWebsiteZones} from "@/lib/zones";
export const dynamic="force-dynamic";
export const runtime="nodejs";
export default async function DomainAd({searchParams}:{searchParams:Promise<{host?:string}>}){
 const h=await headers(),p=await searchParams;
 const raw=(p.host||h.get("x-forwarded-host")||h.get("host")||"").split(":")[0].toLowerCase().replace(/^www\./,"");
 if(!raw||raw==="localhost"||raw.endsWith(".vercel.app")||raw.endsWith(".virtunumber.online"))notFound();
 const d=await db();
 const w=await d.collection("websites").findOne({domain:raw});
 if(!w)notFound();
 if(w.status!=="approved"){
   const ok=await activateDnsVerifiedWebsite(d,w);
   if(!ok)notFound();
 }else await ensureWebsiteZones(d,w.websiteId,w.publisherId);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8ccaff"/><stop offset="1" stop-color="#7666ff"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#183c70"/><stop offset="1" stop-color="#101a3b"/></linearGradient></defs><circle cx="460" cy="300" r="270" fill="#5e80ff" opacity=".12"/><rect x="300" y="45" width="300" height="530" rx="54" fill="url(#a)" transform="rotate(7 450 310)"/><rect x="320" y="64" width="260" height="492" rx="40" fill="url(#b)" transform="rotate(7 450 310)"/><rect x="410" y="83" width="80" height="9" rx="5" fill="#a9caff" transform="rotate(7 450 310)"/><circle cx="450" cy="210" r="65" fill="#347dff" opacity=".24"/><path d="M420 210l22 22 44-50" fill="none" stroke="#9cebd7" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><rect x="365" y="310" width="170" height="65" rx="19" fill="#244a7e" transform="rotate(7 450 342)"/><rect x="365" y="395" width="170" height="65" rx="19" fill="#263c70" transform="rotate(7 450 427)"/><rect x="390" y="485" width="120" height="16" rx="8" fill="#81b5ff" opacity=".85" transform="rotate(7 450 493)"/><circle cx="700" cy="155" r="63" fill="#13c6b1"/><path d="M672 155l20 20 39-42" fill="none" stroke="#062d3a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><circle cx="210" cy="450" r="42" fill="#7e63f7"/><path d="M190 450h40M210 430v40" stroke="white" stroke-width="8" stroke-linecap="round"/></svg>`;
 const art="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
 return <main style={{minHeight:"100svh",background:"radial-gradient(ellipse at 75% 15%,#244b8b 0%,transparent 42%),linear-gradient(135deg,#050b19,#0b1730 58%,#17143a)",color:"#f7f9ff",display:"grid",placeItems:"center",padding:"clamp(20px,5vw,64px)",fontFamily:"Inter,Arial,sans-serif"}}>
  <section style={{width:"min(1120px,100%)",display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",gap:"clamp(24px,5vw,64px)",border:"1px solid #ffffff20",borderRadius:32,padding:"clamp(22px,5vw,58px)",background:"linear-gradient(145deg,#ffffff12,#ffffff05)",boxShadow:"0 35px 110px #0008",backdropFilter:"blur(22px)"}}>
   <div><div style={{display:"inline-flex",alignItems:"center",gap:9,border:"1px solid #6ca6ff55",background:"#357bff20",borderRadius:99,padding:"8px 13px",fontSize:11,fontWeight:800,letterSpacing:2,color:"#b9d4ff"}}><span style={{width:7,height:7,borderRadius:20,background:"#54e3c4"}}/> NUMELIXA · SPONSORED</div>
    <h1 style={{fontSize:"clamp(42px,6vw,72px)",lineHeight:.99,letterSpacing:"-3px",margin:"27px 0 18px",fontWeight:900}}>Numbers,<br/><span style={{background:"linear-gradient(90deg,#9bcaff,#a99aff)",backgroundClip:"text",color:"transparent"}}>without the noise.</span></h1>
    <p style={{fontSize:17,lineHeight:1.75,color:"#b7c7e2",maxWidth:480,margin:"0 0 28px"}}>Get virtual numbers for SMS verification. Simple, fast and built for your workflow.</p>
    <a href="https://www.numelixa.com" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 23px",borderRadius:14,background:"linear-gradient(100deg,#347eff,#7656ef)",boxShadow:"0 12px 30px #3d6cf255",color:"#fff",fontWeight:850,textDecoration:"none"}}>Explore Numelixa <span aria-hidden="true">↗</span></a>
    <p style={{fontSize:11,color:"#7489ac",marginTop:28,letterSpacing:1.4}}>POWERED BY NUMELIXA ADS</p>
   </div>
   <div style={{display:"grid",placeItems:"center",minWidth:0}}><img src={art} alt="Virtual number verification on a smartphone" style={{width:"100%",maxWidth:500,filter:"drop-shadow(0 30px 35px #0007)"}}/></div>
  </section>
  <style>{'@media(max-width:760px){main section{grid-template-columns:1fr!important;text-align:center}main section p{margin-left:auto!important;margin-right:auto!important}main section>div:last-child{grid-row:1}main section img{max-width:310px!important}}'}</style>
 </main>
}
