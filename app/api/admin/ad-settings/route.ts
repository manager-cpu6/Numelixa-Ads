import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {getSession} from "@/lib/security";
export const dynamic="force-dynamic";
const DEFAULT_SECONDS=10;
export async function GET(){
 const s=await getSession();if(!s)return NextResponse.json({error:"UNAUTHENTICATED"},{status:401});if(s.role!=="admin")return NextResponse.json({error:"FORBIDDEN"},{status:403});
 const row=await (await db()).collection("platform_settings").findOne({key:"ad_display"});
 return NextResponse.json({interstitialSeconds:typeof row?.interstitialSeconds==="number"?row.interstitialSeconds:DEFAULT_SECONDS});
}
export async function POST(req:Request){
 const s=await getSession();if(!s)return NextResponse.json({error:"UNAUTHENTICATED"},{status:401});if(s.role!=="admin")return NextResponse.json({error:"FORBIDDEN"},{status:403});
 try{const body=await req.json();const n=body?.interstitialSeconds;if(!Number.isInteger(n)||n<0||n>120)return NextResponse.json({error:"INVALID_TIMER"},{status:400});
 const d=await db();await d.collection("platform_settings").updateOne({key:"ad_display"},{$set:{key:"ad_display",interstitialSeconds:n,updatedAt:new Date(),updatedBy:s.userId}},{upsert:true});
 return NextResponse.json({ok:true,interstitialSeconds:n});
 }catch{return NextResponse.json({error:"INVALID_REQUEST"},{status:400})}
}
