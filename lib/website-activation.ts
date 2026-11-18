import {ensureWebsiteZones} from "@/lib/zones";
const dnsProof=(w:any)=>Boolean(w?.verifiedAt&&(w.verificationMethod==="dns"||w.verification?.method==="dns"||w.verification?.type==="dns"));
export async function activateDnsVerifiedWebsite(d:any,w:any):Promise<boolean>{
  if(!dnsProof(w))return false;
  const now=new Date();
  if(w.status!=="approved"||w.reviewStatus!=="approved"){
    await d.collection("websites").updateOne({_id:w._id},{$set:{status:"approved",reviewStatus:"approved",reviewNote:"Automatically activated from previously completed DNS TXT ownership verification.",reviewedAt:now,updatedAt:now}});
  }
  await ensureWebsiteZones(d,w.websiteId,w.publisherId);
  return true;
}
export async function activateLegacyDnsWebsites(d:any,publisherId?:string):Promise<number>{
  const filter:any={verifiedAt:{$ne:null},$or:[{verificationMethod:"dns"},{"verification.method":"dns"},{"verification.type":"dns"}]};
  if(publisherId)filter.publisherId=publisherId;
  const websites=await d.collection("websites").find(filter).toArray();
  for(const website of websites)await activateDnsVerifiedWebsite(d,website);
  return websites.length;
}
