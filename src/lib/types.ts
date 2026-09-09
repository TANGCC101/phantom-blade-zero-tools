export type Reliability = { sourceType:'Official'|'Community'; stage:'Pre-release'|'Verified'; sourceUrl:string; sourceTitle:string; lastUpdated:string };
export type Weapon = Reliability & { slug:string; name:string; summary:string; category:string; notes:string[] };
export type Boss = Reliability & { slug:string; name:string; summary:string; status:'Confirmed'|'Unconfirmed'; notes:string[] };
export type Build = { id:string; name:string; weapon?:string; secondary?:string; accessory?:string; notes?:string };
