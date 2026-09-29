/* ====== EDIT DI SINI ====== */
// GANTI semua URL placeholder dengan link asli Anda.
const SOCIALS=[
 {label:"Wattpad",href:"https://www.wattpad.com/"},
 {label:"Instagram",href:"https://www.instagram.com/"},
 {label:"TikTok",href:"https://www.tiktok.com/"},
 {label:"YouTube",href:"https://www.youtube.com/"},
 {label:"Email",href:"mailto:GANTI@email.com"}];
// Tambah cerita: salin satu objek. cover kosong = placeholder. slug harus unik, tanpa spasi.
const STORIES=[
 {title:"Judul Cerita Pertama",slug:"judul-cerita-pertama",cover:"",genre:"Fantasy",status:"Ongoing",description:"Deskripsi singkat cerita. Ganti dengan deskripsi asli Anda.",wattpadUrl:"https://www.wattpad.com/",
  synopsis:"Sinopsis lengkap akan diisi di sini.",characters:[{name:"Nama Karakter",role:"Peran karakter"}],world:"Deskripsi dunia / latar cerita akan diisi di sini.",note:"Catatan penulis akan diisi di sini."},
 {title:"Judul Cerita Kedua",slug:"judul-cerita-kedua",cover:"",genre:"Genre",status:"Coming Soon",description:"Deskripsi singkat cerita kedua.",wattpadUrl:"https://www.wattpad.com/"}];
// Galeri: isi src dengan nama file foto (taruh di folder yang sama), mis. "foto1.jpg".
const GALLERY=[1,2,3,4,5,6].map(i=>({src:"",alt:"Dokumentasi placeholder "+i+" — ganti dengan foto asli"}));
/* ========================== */
const PH="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a0d14"/><stop offset="1" stop-color="#0c0a0b"/></linearGradient></defs><rect width="400" height="600" fill="url(#g)"/><rect x="20" y="20" width="360" height="560" fill="none" stroke="#d4af5f" stroke-opacity=".5"/><text x="200" y="310" fill="#d4af5f" font-family="Georgia" font-size="26" text-anchor="middle">Placeholder</text></svg>');
const NAV=[["index.html","Home"],["about.html","About"],["stories.html","Stories"],["activities.html","Activities"],["gallery.html","Gallery"],["contact.html","Contact"]];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $=id=>document.getElementById(id);
const cur=(location.pathname.split("/").pop()||"index.html").replace(/^$/,"index.html");
const isCur=h=>h===cur||h.replace(".html","")===cur||(h==="index.html"&&cur==="");
const soc=SOCIALS.map(s=>`<li><a href="${esc(s.href)}" ${s.href.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""}>${esc(s.label)}</a></li>`).join("");
const links=NAV.map(([h,l])=>`<li><a href="${h}" ${isCur(h)?'class="on" aria-current="page"':""}>${l}</a></li>`).join("");
$("hdr").innerHTML=`<header><div class="wrap bar"><a class="logo" href="index.html">CLOVE Fma</a><nav id="nav" aria-label="Main"><ul>${links}</ul></nav><a class="btn cta-nav" href="${esc(SOCIALS[0].href)}" target="_blank" rel="noopener noreferrer">Read on Wattpad</a><button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button></div></header>`;
$("ftr").innerHTML=`<footer><div class="wrap fg"><div><p class="logo" style="color:var(--gold)">CLOVE Fma</p><p>Writer • Storyteller • Creator</p></div><nav aria-label="Footer"><ul>${links}</ul></nav><ul class="socials">${soc}</ul></div><p class="copy">© 2026 CLOVE Fma. All rights reserved.</p></footer><div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Image viewer"><button class="btn" id="lbClose">Close</button><img id="lbImg" alt=""></div>`;
const burger=$("burger"),nav=$("nav");
burger.onclick=()=>{const o=nav.classList.toggle("open");burger.setAttribute("aria-expanded",o)};
const card=s=>`<article class="glass card"><a href="story.html?slug=${encodeURIComponent(s.slug)}"><img src="${esc(s.cover||PH)}" alt="Cover cerita ${esc(s.title)} oleh CLOVE Fma" width="400" height="600" loading="lazy"></a><div class="b"><small>${esc(s.genre)} · ${esc(s.status)}</small><h3><a href="story.html?slug=${encodeURIComponent(s.slug)}">${esc(s.title)}</a></h3><p>${esc(s.description)}</p><a class="btn ghost" href="${esc(s.wattpadUrl)}" target="_blank" rel="noopener noreferrer">Read on Wattpad</a></div></article>`;
if($("storyGrid"))$("storyGrid").innerHTML=STORIES.map(card).join("");
if($("featuredGrid"))$("featuredGrid").innerHTML=STORIES.slice(0,3).map(card).join("");
if($("socialList"))$("socialList").innerHTML=soc;
if($("galGrid")){
 $("galGrid").innerHTML=GALLERY.map((g,i)=>`<li><button data-i="${i}" aria-label="Open ${esc(g.alt)}"><img src="${esc(g.src||PH)}" alt="${esc(g.alt)}" loading="lazy" width="400" height="500"></button></li>`).join("");
 const lb=$("lb"),im=$("lbImg"),close=()=>lb.classList.remove("on");
 $("galGrid").onclick=e=>{const b=e.target.closest("button");if(!b)return;const g=GALLERY[b.dataset.i];im.src=g.src||PH;im.alt=g.alt;lb.classList.add("on");$("lbClose").focus()};
 lb.onclick=e=>{if(e.target!==im)close()};document.addEventListener("keydown",e=>e.key==="Escape"&&close());
}
if($("detail")){
 const s=STORIES.find(x=>x.slug===new URLSearchParams(location.search).get("slug"));
 if(!s)$("detail").innerHTML='<h1 class="t">Cerita tidak ditemukan</h1><p>Periksa tautan, atau <a href="stories.html" style="color:var(--gold)">lihat semua cerita</a>.</p>';
 else{
  document.title=s.title+" | CLOVE Fma";
  const ch=(s.characters||[{name:"Segera hadir",role:""}]).map(c=>`<li><strong>${esc(c.name)}</strong>${c.role?" — "+esc(c.role):""}</li>`).join("");
  $("detail").innerHTML=`<div class="two"><img src="${esc(s.cover||PH)}" alt="Cover cerita ${esc(s.title)} oleh CLOVE Fma" width="400" height="600"><div><small style="color:var(--gold)">${esc(s.genre)} · ${esc(s.status)}</small><h1 class="t">${esc(s.title)}</h1><section><h2>Synopsis</h2><p>${esc(s.synopsis||s.description)}</p></section><section><h2>Characters</h2><ul style="padding-left:20px">${ch}</ul></section><section><h2>World / Setting</h2><p>${esc(s.world||"Segera hadir.")}</p></section><section><h2>Author's Note</h2><p>${esc(s.note||"Segera hadir.")}</p></section><a class="btn" href="${esc(s.wattpadUrl)}" target="_blank" rel="noopener noreferrer">Read on Wattpad</a></div></div>`;
  const ld=document.createElement("script");ld.type="application/ld+json";
  ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:s.title,description:s.description,author:{"@type":"Person",name:"CLOVE Fma"}});document.head.appendChild(ld);
 }
}
