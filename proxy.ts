import {NextRequest,NextResponse} from "next/server";
const INTERNAL=["advertiser.virtunumber.online","publisher.virtunumber.online","docs-ads.virtunumber.online","api-ads.virtunumber.online","cdn-ads.virtunumber.online","numelixa-ads.vercel.app"];
export function proxy(req:NextRequest){
 const host=(req.headers.get("host")||"").split(":")[0].toLowerCase().replace(/^www\./,"");
 const url=req.nextUrl.clone(),path=url.pathname;
 if(host==="advertiser.virtunumber.online"&&path==="/")url.pathname="/admin";
 else if(host==="publisher.virtunumber.online"&&path==="/")url.pathname="/dashboard";
 else if(host==="docs-ads.virtunumber.online"&&path==="/")url.pathname="/docs";
 else if(host==="api-ads.virtunumber.online"){if(path==="/")url.pathname="/api/health";else if(path==="/v1/ads/serve")url.pathname="/api/ads/serve";else if(path==="/v1/ads/event")url.pathname="/api/ads/event";else if(path.startsWith("/v1/"))url.pathname="/api"+path.slice(3)}
 else if(host==="cdn-ads.virtunumber.online"&&path==="/sdk.js")url.pathname="/api/sdk.js";
 else if(!INTERNAL.includes(host)){url.pathname="/domain-ad";url.searchParams.set("host",host);}
 return NextResponse.rewrite(url);
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
