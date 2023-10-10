"use strict";import{WebSocket,WebSocketServer as WebSocketService}from"ws";import{fetch,Request,Response}from"undici";import os from"node:os";import fs from"node:fs";import http from"node:http";import crypto from"node:crypto";
if(!globalThis.self){globalThis.self=globalThis};
"use strict";(()=>{var B=Object.defineProperty;var P=(e,t,s)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var a=(e,t,s)=>(P(e,typeof t!="symbol"?t+"":t,s),s);var p,S=(p=class{static get memUsed(){return process.memoryUsage()}static exit(e=0){process.exit(e)}},a(p,"os",os.platform()),a(p,"variant","Node"),a(p,"version",process.version.replace("v","")),a(p,"persist",!0),a(p,"networkDefer",!1),p),w="delete,get,has,set,toObject".split(","),x=new Proxy({get:(e,t)=>process.env[e]||t,set:(e,t)=>{process.env[e]=t},delete:e=>{delete process.env[e]},has:e=>!!process.env[e],toObject:()=>process.env},{get:(e,t)=>w.indexOf(t)<0&&t.constructor==String?e.get(t):e[t],set:(e,t,s)=>{if(w.indexOf(t)<0)if(t.constructor==String)e.set(t,s);else throw new TypeError("Invalid type for key");else throw new Error("Tried to write protected properties")},has:(e,t)=>w.indexOf(t)<0?t.constructor==String?e.has(t):e[t]!=null:!1,deleteProperty:(e,t)=>{if(w.indexOf(t)<0)if(t.constructor==String)e.delete(t);else throw new TypeError("Invalid type for key");else throw new Error("Tried to delete protected properties")}});var R=class{static async read(e,t){return new Uint8Array((await fs.promises.readFile(e,t)).buffer)}static async write(e,t,s){let r={flag:"w"};s.append&&(r.flag="a"),s.signal&&(r.signal=s.signal),s.mode&&(r.mode=s.mode),await fs.promises.writeFile(e,t,r)}},C=R;var I=class extends EventTarget{#e;#r;#n;#l;#i;#h;#d;#a;#o=[];#s=[];#t=3;#c=!1;CONNECTING=0;OPEN=1;CLOSING=2;CLOSED=3;get protocol(){return this.#e}get hostname(){return this.#r}get port(){return this.#n}get readyState(){return this.#t}get source(){return this.#d}get sink(){return this.#a}addEventListener(e,t,s){e=="open"&&this.readyState==this.OPEN&&t.call(this,new Event("open")),super.addEventListener(e,t,s)}send(e){if(this.#c)throw new Error("Cannot enqueue or send data on a freed connection");this.#t!=1?this.#o.push(e):this.#a?.desiredSize<0||this.#s.length?(this.#s.push(e),this.#a.ready.then(()=>{let t=this.#s.shift();t&&this.#a.write(t)})):this.#a.write(e)}async connect(){if(this.#c)throw new Error("Cannot restart a freed connection");switch(this.#t<this.CLOSING&&console.debug(`${this.#e.toUpperCase()} connection is already open.`),this.#t=this.CONNECTING,this.#e){case"tcp":break;default:throw this.free(),new Error(`Invalid protocol "${this.#e}"`)}this.#t=this.OPEN,this.dispatchEvent(new Event("open"))}close(){switch(this.#t>this.OPEN&&console.debug(`${this.#e.toUpperCase()} connection is already closed.`),this.#t=this.CLOSING,this.#e){case"tcp":break;default:throw this.free(),new Error(`Invalid protocol "${this.#e}"`)}this.#t=this.CLOSED,this.dispatchEvent(new Event("close"))}free(){return this.close(),this.#c=!0,this.#o.splice(0,this.#o.length)}constructor({proto:e,host:t,port:s},r){super(),e=e||"tcp",t=t||"127.0.0.1",s=s||80,this.#e=e,this.#r=t,this.#n=s,this.addEventListener("open",async()=>{this.#o.forEach(i=>{this.send(i)})}),this.addEventListener("close",()=>{this.#s.length&&this.#o.splice(0,0,this.#s.splice(0,this.#s.length))}),r&&this.connect()}},E,A=(E=class{},a(E,"RawClient",I),E),L=A;var O='<!DOCTYPE html><head><meta charset="utf-8"/><title>WingBlade error</title><style>body{background:#000;color:#ccc;}</style></head><body><div style="width:75vw;min-width:360px;max-width:1080px;margin:0 auto;"><p>WingBlade has encountered an error on ${runtime}.</p><pre>${stackTrace}</pre></div></body>\n';var G=class{#e;#r;#n=!1;#l=[];#i={open:[],message:[],error:[],close:[]};addEventListener(e,t){this.#e?e!="open"?this.#e.addEventListener(e,t):t(new Event("open")):this.#i[e].push(t)}get binaryType(){return this.#e?.binaryType||""}get bufferedAmount(){return this.#e?.bufferedAmount||0}get extensions(){return this.#e?.extensions||""}get readyState(){return this.#e?.readyState||0}get url(){return this.#e?.url||this.#r}attach(e){if(this.#n)return!1;if(this.#e)throw new Error("Already attached a WebSocket object");this.#e=e;let t=this;switch(e.readyState){case 0:case 1:{for(let r in this.#i)this.#i[r].forEach(i=>{e.addEventListener(r,i)});let s=new Event("open");this.#i.open.forEach(r=>{r(s)});break}case 2:case 3:{t.dispatchEvent(new Event("close"));break}}}close(...e){return this.#n=!0,this.#e?.close(...e)}send(e){this.#e?this.#e.send(e):this.#l.push(e)}constructor(e){this.#r=e.url.replace("http","ws"),this.addEventListener("open",t=>{for(;this.#l.length>0;)this.#e.send(this.#l.shift())})}},D=class{static serve(e,t={}){let s=`file://${process.cwd()}`,r=t.port||8e3,i=t.hostname||"0.0.0.0",u=http.createServer(async function(n,o){let f,g=new ReadableStream({type:"bytes",start:l=>{f=l},cancel:l=>{},autoAllocateChunkSize:65536}),h={method:n.method,headers:n.headers},N=["GET","HEAD"].indexOf(h.method)==-1;n.on("data",l=>{f.enqueue(l)}).on("end",()=>{f.close()}),N&&(h.body=g,h.duplex="half");let v=new Request(`${n.headers["x-forwarded-proto"]||"http"}://${n.headers.host}${n.url}`,h),c;try{c=await e(v),c?.constructor!=Response&&(c=new Response(JSON.stringify(c),{headers:{"Content-Type":"text/plain"}}))}catch(l){console.error(`Request error at ${v.method} ${v.url}
${l.stack}`),c=new Response(O.replace("${runtime}",WingBlade.rt.variant).replace("${stackTrace}",l.stack.replaceAll(s,"wingblade:app")),{status:502,headers:{"Content-Type":"text/html"}})}c?.headers?.forEach((l,m)=>{o.setHeader(m,l)}),o.statusCode=c?.status||200,c?.statusText&&(o.statusMessage=c.statusText),o.flushHeaders();let k=c.body.getReader(),y=!0;for(;y;)await k.read().then(({done:l,value:m})=>{l?(o.end(),y=!1):o.write(m)})});return u.on("upgrade",async(n,o,f)=>{let g={method:n.method,headers:n.headers},h=new Request(`${n.headers["x-forwarded-proto"]||"http"}://${n.headers.host}${n.url}`,g);h.raw={requester:n,socket:o,head:f},await e(h)}),u.listen(r,i,()=>{(t.onListen||function({port:n,hostname:o}){o&&(o="127.0.0.1"),console.error(`WingBlade serving at http://${o}:${n}`)})({port:r,hostname:i})}),u}static acceptWs(e,t){let s=new WebSocketService({noServer:!0}),r=new G(e);return s.handleUpgrade(e.raw.requester,e.raw.socket,e.raw.head,function(i){r.attach(i)}),{socket:r,response:new Response(null,{status:200})}}},$=D;var M=class{static randomInt(e){return Math.floor(Math.random()*e)}static sleep(e,t=0){return new Promise(s=>{AbortSignal.timeout(e+Math.floor(t*Math.random())).addEventListener("abort",()=>{s()})})}},T=M;var d,b=(d=class{},a(d,"args",process.argv.slice(2)),a(d,"rt",S),a(d,"env",x),a(d,"file",C),a(d,"net",L),a(d,"web",$),a(d,"util",T),d);var W=async function(e){WingBlade.web.serve(async(s,r)=>{switch(!0){case s.headers.get("upgrade")?.toLowerCase()=="websocket":{let{socket:i,response:u}=WingBlade.web.acceptWs(s);return i.addEventListener("open",()=>{console.debug("WS opened."),i.send("I like muffins!")}),i.addEventListener("message",n=>{i.send(n.data)}),i.addEventListener("close",()=>{console.debug("WS closed.")}),u;break}default:return`Hello from ${WingBlade.rt.variant} on ${WingBlade.rt.os}!`}}),new WingBlade.net.RawServer({port:8005},!0).addEventListener("accept",async s=>{console.debug("TCP accepted.");let r=s.data;r.addEventListener("open",()=>{console.debug("TCP opened."),r.send(new Uint8Array([240,67,16,247]))}),r.addEventListener("message",({data:i})=>{r.send(i)}),r.addEventListener("close",()=>{console.debug("TCP closed.")})})};self.WingBlade=b;W(b.args);})();