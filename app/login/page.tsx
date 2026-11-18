import Link from "next/link";
import {Megaphone,ShieldCheck,ArrowRight,LockKeyhole,Sparkles} from "lucide-react";
const messages:Record<string,string>={
  INVALID_CREDENTIALS:"The email address or password is incorrect.",
  RATE_LIMITED:"Too many attempts. Please wait a moment and try again.",
  "SPACEMAIL_SMTP_PASSWORD is missing in Numelixa Ads Production environment.":"Email delivery is temporarily unavailable. Please contact support.",
  "SESSION_SECRET must be at least 32 characters":"The authentication service is not configured correctly. Please contact support."
};
export default async function Login({searchParams}:{searchParams:Promise<{error?:string;reset?:string}>}){
  const p=await searchParams;
  const error=p.error?messages[p.error]||"We could not sign you in. Please check your details and try again.":"";
  return <main className="authwrap">
    <div className="authglow authglow-one"/><div className="authglow authglow-two"/>
    <form className="glass authcard authcard-premium" action="/api/auth/login" method="post">
      <div className="auth-brand-row"><span className="brandmark auth-brandmark"><Megaphone size={20}/></span><span className="auth-brand-name">NUMELIXA <span>ADS</span></span><span className="auth-secure"><ShieldCheck size={13}/> SECURE</span></div>
      <div className="auth-orb"><Sparkles size={19}/></div>
      <div className="eyebrow auth-eyebrow">ADVERTISING NETWORK · CONTROL CENTER</div>
      <h1 className="auth-heading">Welcome back<span>.</span></h1>
      <p className="auth-description">Sign in to manage your campaigns, websites and publisher workspace.</p>
      {p.reset==="success"&&<div className="notice auth-success">Your password has been updated. You can now sign in.</div>}
      {error&&<div className="notice auth-error"><b>Sign-in failed</b><div>{error}</div></div>}
      <div className="field auth-field"><label htmlFor="email">Email address</label><input id="email" className="input" name="email" type="email" autoComplete="username" placeholder="name@example.com" required/></div>
      <div className="field auth-field"><div className="auth-label-row"><label htmlFor="password">Password</label><Link href="/forgot-password">Forgot password?</Link></div><input id="password" className="input" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required/></div>
      <button className="btn auth-submit" type="submit">Continue securely <ArrowRight size={16}/></button>
      <div className="auth-trust"><LockKeyhole size={14}/> Your account is protected with email verification.</div>
      <div className="auth-footer">New to Numelixa Ads? <Link href="/register">Create a publisher account</Link></div>
    </form>
    <div className="auth-copyright">NUMELIXA ADS <span>·</span> SMARTER DIGITAL REACH</div>
  </main>;
}
