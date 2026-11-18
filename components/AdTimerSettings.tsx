"use client";
import {useState} from "react";
export function AdTimerSettings({initialSeconds}:{initialSeconds:number}){
 const [seconds,setSeconds]=useState(String(initialSeconds)),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 async function save(){const n=Number(seconds);if(!Number.isInteger(n)||n<0||n>120){setMessage("Enter a whole number between 0 and 120 seconds.");return}setBusy(true);setMessage("");try{const r=await fetch("/api/admin/ad-settings",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({interstitialSeconds:n})});const j=await r.json();if(!r.ok)throw new Error(j.error||"Could not save settings");setMessage("Saved. New domain visits will use this timer.");}catch(e){setMessage(e instanceof Error?e.message:"Could not save settings");}finally{setBusy(false)}}
 return <section className="glass panel" style={{maxWidth:760,marginTop:22}}>
  <div className="eyebrow">DOMAIN INTERSTITIAL</div><h2 className="paneltitle" style={{marginTop:8}}>Advertisement display timer</h2>
  <p className="sub">Controls how long the close button stays locked when a visitor first opens a connected domain. The countdown is shown on the sponsored ad. Default: 10 seconds.</p>
  <div className="field" style={{maxWidth:300}}><label htmlFor="ad-seconds">Close button delay (seconds)</label><input id="ad-seconds" className="input" type="number" min="0" max="120" step="1" value={seconds} onChange={e=>setSeconds(e.target.value)}/></div>
  <div className="actions"><button className="btn" type="button" disabled={busy} onClick={save}>{busy?"Saving…":"Save timer"}</button><span className="sub">0 = close immediately · Maximum 120 seconds</span></div>
  {message&&<p className="sub" role="status" style={{marginTop:13}}>{message}</p>}
 </section>
}
