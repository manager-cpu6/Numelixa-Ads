import {makeId} from "@/lib/ids";
const FORMATS=["floating_video","in_article_video","native","banner","html"] as const;
export async function ensureWebsiteZones(d:any,websiteId:string,publisherId:string){const now=new Date();for(const format of FORMATS){await d.collection("zones").updateOne({websiteId,format},{$set:{publisherId,status:"active",placement:{position:format==="floating_video"?"bottom-right":"in-content"},updatedAt:now},$setOnInsert:{zoneId:makeId("zn"),createdAt:now}},{upsert:true})}}
