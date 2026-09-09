export function downloadJson(name:string, raw:string) {
  const url=URL.createObjectURL(new Blob([raw],{type:'application/json'}));
  const anchor=document.createElement('a');anchor.href=url;anchor.download=name;anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
