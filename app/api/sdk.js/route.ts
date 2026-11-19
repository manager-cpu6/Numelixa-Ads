import {NextResponse} from "next/server";
export async function GET(){
 const js=`(()=>{"use strict";
 const script=document.currentScript;if(!script||script.dataset.numelixaAdsLoaded)return;script.dataset.numelixaAdsLoaded="1";
 const websiteId=script.dataset.websiteId,requestedZone=script.dataset.zoneId||"";if(!websiteId)return;
 const endpoint="https://api-ads.virtunumber.online/api/ads/serve?websiteId="+encodeURIComponent(websiteId)+(requestedZone?"&zoneId="+encodeURIComponent(requestedZone):"");
 let lastPath="",activeNode=null,requestNo=0;
 function makeFrame(html,title){const f=document.createElement("iframe");f.title=title;f.setAttribute("sandbox","allow-scripts allow-popups");f.referrerPolicy="strict-origin-when-cross-origin";f.srcdoc=html;return f}
 function showInterstitial(ad,seconds){
  const seenKey="numelixa-interstitial-seen:"+websiteId;try{if(sessionStorage.getItem(seenKey)==="1")return false;sessionStorage.setItem(seenKey,"1")}catch{}
  const secondsSafe=Math.max(0,Math.min(120,Number(seconds)||0)),overlay=document.createElement("div");
  overlay.setAttribute("role","dialog");overlay.setAttribute("aria-modal","true");overlay.setAttribute("aria-label","Sponsored advertisement");
  overlay.style.cssText="position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:16px;background:#020611ed;backdrop-filter:blur(12px)";
  const card=document.createElement("section");card.style.cssText="position:relative;display:flex;flex-direction:column;width:min(960px,100%);height:min(720px,calc(100dvh - 32px));overflow:hidden;border:1px solid #8db8ff55;border-radius:22px;background:#07162d;box-shadow:0 30px 100px #000b";
  const frame=makeFrame(ad.creative.html,"Sponsored advertisement");frame.style.cssText="display:block;width:100%;height:100%;min-height:240px;border:0;background:transparent;flex:1";
  const bar=document.createElement("div");bar.style.cssText="height:4px;flex:none;background:#ffffff20";
  const progress=document.createElement("div");progress.style.cssText="height:100%;width:0;background:linear-gradient(90deg,#43d9c5,#6b9cff);transition:width .2s linear";bar.append(progress);
  const close=document.createElement("button");close.type="button";close.textContent=secondsSafe?String(secondsSafe):"×";close.disabled=secondsSafe>0;close.setAttribute("aria-label",secondsSafe?"Close available after countdown":"Close advertisement");close.style.cssText="position:absolute;right:12px;top:12px;z-index:3;width:44px;height:44px;border:1px solid #ffffff55;border-radius:13px;background:#071326dd;color:#fff;font-size:22px;font-weight:800;cursor:pointer";
  close.addEventListener("click",()=>{if(!close.disabled)overlay.remove()});card.append(frame,close,bar);overlay.append(card);document.body.append(overlay);
  if(secondsSafe===0)return true;const start=Date.now(),timer=setInterval(()=>{const left=Math.max(0,secondsSafe-Math.floor((Date.now()-start)/1000));close.textContent=left?String(left):"×";close.disabled=left>0;close.setAttribute("aria-label",left?"Close available after countdown":"Close advertisement");progress.style.width=((secondsSafe-left)/secondsSafe*100)+"%";if(left===0)clearInterval(timer)},200);return true;
 }
 async function render(){const path=location.pathname+location.search;if(path===lastPath)return;lastPath=path;const request=++requestNo;if(activeNode){activeNode.remove();activeNode=null}
  try{const response=await fetch(endpoint,{credentials:"omit",mode:"cors",cache:"no-store"});if(!response.ok)return;const data=await response.json();if(request!==requestNo||!data||!data.ad||!data.ad.creative||typeof data.ad.creative.html!=="string")return;
   const ad=data.ad,key="numelixa-ads-frequency-"+ad.adId,day=new Date().toISOString().slice(0,10);let capped=false;
   try{const old=JSON.parse(localStorage.getItem(key)||"{}"),count=old.day===day?Number(old.count)||0:0,cap=Math.max(1,Number(ad.frequencyCap)||4);if(count>=cap)capped=true;else localStorage.setItem(key,JSON.stringify({day,count:count+1}))}catch{}
   if(capped)return;
   const first=showInterstitial(ad,data.interstitialSeconds);if(first)return;
   const wrap=document.createElement("div");wrap.dataset.numelixaAd="1";wrap.style.cssText="display:block;width:100%;max-width:760px;margin:20px auto;padding:0 10px;";const frame=makeFrame(ad.creative.html,"Sponsored content");frame.style.cssText="display:block;width:100%;height:220px;border:0;background:transparent";wrap.append(frame);
   const root=document.querySelector("main,[role=main]")||document.body,anchor=root.querySelector("h1,p,section,article")||root.firstElementChild;if(anchor&&anchor!==root)anchor.insertAdjacentElement("afterend",wrap);else root.append(wrap);activeNode=wrap;
  }catch{}
 }
 const schedule=()=>{if(location.pathname+location.search!==lastPath)render()};const push=history.pushState.bind(history),replace=history.replaceState.bind(history);
 history.pushState=function(){const r=push(...arguments);queueMicrotask(schedule);return r};history.replaceState=function(){const r=replace(...arguments);queueMicrotask(schedule);return r};addEventListener("popstate",schedule);if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render,{once:true});else render();
})();`;
 return new NextResponse(js,{headers:{"content-type":"application/javascript; charset=utf-8","cache-control":"public, max-age=300","access-control-allow-origin":"*","x-content-type-options":"nosniff"}});
}