import Link from "next/link";
import {ShieldCheck,ArrowLeft,MailCheck} from "lucide-react";
export default async function Verify({searchParams}:{searchParams:Promise<{email?:string;error?:string}>}){
  const p=await searchParams;
  const messages:Record<string,string>={INVALID_CODE:"Enter a valid 6-digit code.",INVALID_OR_EXPIRED_CODE:"This code is invalid or has expired. Request a new code and try again.",RATE_LIMITED:"Too many attempts. Please wait and try again."};
  const error=p.error?messages[p.error]||"We could not verify this code. Please try again.":"";
  return <main className="authwrap"><div className="authglow authglow-one"/><div className="authglow authglow-two"/>
    <form className="glass authcard authcard-premium" action="/api/auth/verify-code" method="post">
      <div className="auth-brand-row"><span className="brandmark auth-brandmark"><ShieldCheck size={20}/></span><span className="auth-brand-name">NUMELIXA <span>ADS</span></span><span className="auth-secure"><ShieldCheck size={13}/> SECURE</span></div>
      <div className="auth-orb"><MailCheck size={19}/></div><div className="eyebrow auth-eyebrow">EMAIL SECURITY CHECK</div>
      <h1 className="auth-heading">Check your email<span>.</span></h1>
      <p className="auth-description">Enter the 6-digit security code sent to <b>{p.email||"your email address"}</b>. The code expires in 10 minutes.</p>
      {error&&<div className="notice auth-error">{error}</div>}
      <input type="hidden" name="email" value={p.email||""}/>
      <div className="field auth-field"><label htmlFor="code">6-digit verification code</label><input id="code" className="input auth-code-input" name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" placeholder="000000" required/></div>
      <button className="btn auth-submit" type="submit">Verify and sign in <ShieldCheck size={16}/></button>
      <Link className="auth-back" href="/login"><ArrowLeft size={14}/> Back to sign in</Link>
      <div className="auth-trust"><LockKeyhole size={14}/> Never share your verification code with anyone.</div>
    </form><div className="auth-copyright">NUMELIXA ADS <span>·</span> SMARTER DIGITAL REACH</div>
  </main>;
}
