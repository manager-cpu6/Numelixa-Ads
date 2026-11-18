import nodemailer from "nodemailer";
const host=process.env.SPACEMAIL_SMTP_HOST||"mail.spacemail.com";
const port=Number(process.env.SPACEMAIL_SMTP_PORT||465);
const user=process.env.SPACEMAIL_SMTP_USER||"info@numelixa.com";
const from=process.env.SPACEMAIL_FROM||user;
export async function sendAuthCode(to:string,code:string,purpose:"login"|"password_reset"){
 const pass=process.env.SPACEMAIL_SMTP_PASSWORD||"";
 if(!pass)throw new Error("SPACEMAIL_SMTP_PASSWORD is missing in Numelixa Ads Production environment.");
 const subject=purpose==="login"?"Your Numelixa Ads sign-in code":"Your Numelixa Ads password reset code";
 const action=purpose==="login"?"complete your sign-in":"reset your password";
 const html=`<!doctype html><html><body style="margin:0;background:#071225;color:#eef5ff;font-family:Arial,sans-serif;padding:32px 14px"><main style="max-width:520px;margin:auto;background:#101f38;border:1px solid #294363;border-radius:22px;padding:28px"><div style="font-size:12px;letter-spacing:3px;font-weight:900;color:#7bb8ff">NUMELIXA ADS</div><h1 style="font-size:26px;margin:20px 0 8px">Your security code</h1><p style="color:#b8c9df;line-height:1.7">Use this code to ${action}. It expires in 10 minutes.</p><div style="margin:24px 0;padding:22px;background:#071629;border:1px solid #315078;border-radius:16px;text-align:center;font-size:34px;letter-spacing:9px;font-weight:900">${code}</div><p style="font-size:12px;color:#8fa8c7">Never share this code. If you did not request it, ignore this message.</p></main></body></html>`;
 const transporter=nodemailer.createTransport({host,port,secure:port===465,auth:{user,pass},tls:{minVersion:"TLSv1.2",servername:host},connectionTimeout:8000,greetingTimeout:8000});
 await transporter.sendMail({from:"Numelixa Ads <"+from+">",to,subject,text:"Your Numelixa Ads security code is "+code+". It expires in 10 minutes.",html});
}