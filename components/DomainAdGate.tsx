"use client";
import {useEffect,useState} from "react";
export function DomainAdGate({seconds,domain}:{seconds:number;domain:string}){
 const [visible,setVisible]=useState(false),[remaining,setRemaining]=useState(seconds);
 useEffect(()=>{
  const key="numelixa-ad-seen:"+domain;
  try{if(sessionStorage.getItem(key)==="1")return;sessionStorage.setItem(key,"1");}catch{}
  setVisible(true);setRemaining(seconds);
  if(seconds<=0)return;
  const start=Date.now();
  const timer=window.setInterval(()=>{const left=Math.max(0,seconds-Math.floor((Date.now()-start)/1000));setRemaining(left);if(left===0)window.clearInterval(timer)},250);
  return()=>window.clearInterval(timer);
 },[seconds,domain]);
 if(!visible)return null;
 return <div role="dialog" aria-modal="true" aria-label="Sponsored advertisement" style={{position:"fixed",inset:0,zIndex:99999,display:"grid",placeItems:"center",padding:18,background:"#020611df",backdropFilter:"blur(13px)"}}>
  <section style={{position:"relative",width:"min(920px,100%)",overflow:"hidden",display:"grid",gridTemplateColumns:"1.1fr .9fr",alignItems:"center",gap:24,padding:"clamp(22px,5vw,48px)",borderRadius:26,border:"1px solid #8db8ff44",background:"radial-gradient(ellipse at 80% 15%,#3159a966,transparent 45%),linear-gradient(135deg,#08162c,#122d55 65%,#21194b)",boxShadow:"0 35px 120px #000b",color:"#f7f9ff",fontFamily:"Inter,Arial,sans-serif"}}>
   <div><div style={{fontSize:10,fontWeight:900,letterSpacing:2,color:"#b9d4ff"}}>NUMELIXA ADS · SPONSORED</div>
    <h2 style={{fontSize:"clamp(32px,5vw,58px)",lineHeight:1,letterSpacing:-2,margin:"18px 0 14px",fontWeight:900}}>Numbers,<br/><span style={{color:"#a9b8ff"}}>without the noise.</span></h2>
    <p style={{fontSize:15,lineHeight:1.7,color:"#c1d0e8",maxWidth:430}}>Get virtual numbers for SMS verification. Simple, fast and built for your workflow.</p>
    <a href="https://www.numelixa.com" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",marginTop:14,padding:"13px 19px",borderRadius:12,background:"linear-gradient(100deg,#347eff,#7656ef)",color:"white",fontWeight:850,textDecoration:"none"}}>Explore Numelixa ↗</a>
    <div style={{marginTop:22,fontSize:10,letterSpacing:1.4,color:"#8298bd"}}>POWERED BY NUMELIXA</div>
   </div>
   <div style={{display:"grid",placeItems:"center"}}><svg viewBox="0 0 300 330" style={{width:"100%",maxWidth:290,filter:"drop-shadow(0 24px 30px #0008)"}} role="img" aria-label="Virtual number on a smartphone"><defs><linearGradient id="ng-phone" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a9d5ff"/><stop offset="1" stopColor="#7168ff"/></linearGradient><linearGradient id="ng-screen" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#172f58"/><stop offset="1" stopColor="#101a3a"/></linearGradient></defs><circle cx="150" cy="165" r="140" fill="#6a8dff" opacity=".13"/><rect x="82" y="16" width="136" height="298" rx="30" fill="url(#ng-phone)" transform="rotate(7 150 165)"/><rect x="91" y="27" width="118" height="276" rx="23" fill="url(#ng-screen)" transform="rotate(7 150 165)"/><rect x="126" y="38" width="48" height="6" rx="3" fill="#9dbbff" transform="rotate(7 150 165)"/><circle cx="150" cy="104" r="29" fill="#347dff" opacity=".25"/><path d="M136 104l10 10 19-22" fill="none" stroke="#9cebd7" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/><rect x="111" y="153" width="78" height="31" rx="10" fill="#244a7e" transform="rotate(7 150 168)"/><rect x="111" y="196" width="78" height="31" rx="10" fill="#263c70" transform="rotate(7 150 211)"/><rect x="124" y="245" width="52" height="10" rx="5" fill="#81b5ff" transform="rotate(7 150 250)"/></svg></div>
   <button type="button" aria-label={remaining>0?"Advertisement close available soon":"Close advertisement"} disabled={remaining>0} onClick={()=>setVisible(false)} style={{position:"absolute",right:14,top:14,width:42,height:42,borderRadius:13,border:"1px solid #ffffff38",background:remaining>0?"#ffffff12":"#ffffff24",color:"#fff",fontSize:remaining>0?13:25,fontWeight:800,cursor:remaining>0?"not-allowed":"pointer",opacity:remaining>0?.72:1}}>{remaining>0?remaining:"×"}</button>
   <div style={{position:"absolute",left:0,right:0,bottom:0,height:3,background:"#ffffff16"}}><div style={{height:"100%",width:seconds>0?((seconds-remaining)/seconds*100)+"%":"100%",background:"linear-gradient(90deg,#43d9c5,#6b9cff)",transition:"width .2s linear"}}/></div>
  </section>
  <style>{'@media(max-width:650px){[role="dialog"] section{grid-template-columns:1fr!important;gap:8px!important;text-align:center;padding:28px 22px 34px!important}[role="dialog"] section>div:nth-child(2){grid-row:1}[role="dialog"] section svg{max-width:145px!important;max-height:155px}[role="dialog"] section p{margin-left:auto;margin-right:auto}}'}</style>
 </div>
}
