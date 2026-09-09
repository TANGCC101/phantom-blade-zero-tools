import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.xml':'application/xml','.txt':'text/plain','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
 try{
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if((await stat(file)).isDirectory())file=path.join(file,'index.html');
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(await readFile(file));
 }catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(path.join(root,'404.html')));}
}).listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:'+ (process.env.PORT||3000)));
