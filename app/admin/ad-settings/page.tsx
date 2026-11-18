export const dynamic="force-dynamic";
import {DashboardShell} from "@/components/DashboardShell";
import {AdTimerSettings} from "@/components/AdTimerSettings";
import {db} from "@/lib/db";
import {getSession} from "@/lib/security";
import {redirect} from "next/navigation";
export default async function AdSettings(){
 const s=await getSession();if(!s)redirect("/login");if(s.role!=="admin")redirect("/dashboard");
 const row=await (await db()).collection<any>("platform_settings").findOne({key:"ad_display"});
 const timerValue=row?.interstitialSeconds;
 const seconds=typeof timerValue==="number"?timerValue:10;
 return <DashboardShell admin><div className="eyebrow">NUMELIXA ADS · ADMIN SETTINGS</div><h1 className="h1">Ad experience</h1><p className="sub">Manage the first-visit sponsored advertisement shown on connected domains.</p><AdTimerSettings initialSeconds={seconds}/></DashboardShell>
}
