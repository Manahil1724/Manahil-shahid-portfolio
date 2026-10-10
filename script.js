/* Manahil Shahid portfolio behaviour */
(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches, fine=window.matchMedia('(pointer:fine)').matches, root=document.documentElement;
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};

/* 1. Load sequence */
root.classList.add('js');
var go=function(){requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.add('ready')})})};
if(document.readyState==='complete'||reduce) go(); else {window.addEventListener('load',go,{once:true}); setTimeout(go,1300)}
var sw=$('.steps-wrap'); if(sw){ if(reduce) sw.classList.add('in'); else new IntersectionObserver(function(es,o){if(es[0].isIntersecting){sw.classList.add('in'); o.disconnect()}},{threshold:.3}).observe(sw)}
var dock=$('#dock'), heroEl=$('.hero'); window.addEventListener('scroll',function(){dock.classList.toggle('show',window.scrollY>heroEl.offsetHeight*.8&&window.scrollY<document.documentElement.scrollHeight-window.innerHeight*1.6)},{passive:true});

/* 2. Reveal section content as it arrives */
var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in'); rv.unobserve(e.target)}})},{threshold:.15});
$$('[data-reveal]').forEach(function(el){reduce?el.classList.add('in'):rv.observe(el)});

var wv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.__wipe.classList.add('in'); wv.unobserve(e.target)}})},{threshold:.12});
$$('[data-wipe]').forEach(function(el){if(reduce){el.classList.add('in');return} el.parentElement.__wipe=el; wv.observe(el.parentElement)});
var fmt=function(n){return n.toLocaleString('en-US')};
var cu=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return; cu.unobserve(e.target); var el=e.target, end=+el.dataset.count, t0=performance.now(), dur=1400; (function tick(t){var k=Math.min(1,(t-t0)/dur), v=Math.round(end*(1-Math.pow(1-k,3))); el.textContent=fmt(v); if(k<1) requestAnimationFrame(tick)})(t0)})},{threshold:.6});
if(!reduce) $$('[data-count]').forEach(function(el){cu.observe(el)});

/* 3. Reading progress, active section, mobile menu */
var bar=$('#progress');
window.addEventListener('scroll',function(){var h=document.documentElement; bar.style.transform='scaleX('+clamp(h.scrollTop/(h.scrollHeight-h.clientHeight||1),0,1)+')'},{passive:true});
var links=$$('#navLinks a');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return; links.forEach(function(a){a.classList.toggle('is-active',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
links.forEach(function(a){var s=$(a.getAttribute('href')); if(s) io.observe(s)});
var mb=$('#navMenu'), menu=$('#navLinks');
var setMenu=function(o){menu.classList.toggle('open',o); mb.setAttribute('aria-expanded',String(o)); mb.textContent=o?'Close':'Menu'};
mb.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});
links.forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});

/* 4. Toast + copy email */
var toast=$('#toast'), tt;
var say=function(m){toast.textContent=m; toast.classList.add('on'); clearTimeout(tt); tt=setTimeout(function(){toast.classList.remove('on')},2200)};
function copyText(e,label){
  var fb=function(){var t=document.createElement('textarea'); t.value=e; t.style.position='fixed'; t.style.opacity='0'; document.body.appendChild(t); t.select(); try{document.execCommand('copy'); say(label)}catch(x){say(e)} t.remove()};
  if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(e).then(function(){say(label)},fb); else fb();
}
$$('[data-copy-email]').forEach(function(b){b.addEventListener('click',function(){copyText('manahil11shahid@gmail.com','Email copied')})});
$('#copyEmail').addEventListener('click',function(){
  var e='manahil11shahid@gmail.com';
  var fb=function(){var t=document.createElement('textarea'); t.value=e; t.style.position='fixed'; t.style.opacity='0'; document.body.appendChild(t); t.select(); try{document.execCommand('copy'); say('Email copied')}catch(x){say(e)} t.remove()};
  if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(e).then(function(){say('Email copied')},fb); else fb();
});

/* 5. Pointer tilt (unused) */
var tilt=null, art=null;
if(tilt&&fine&&!reduce){
  art.addEventListener('pointermove',function(e){var r=art.getBoundingClientRect(); var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; tilt.style.transform='rotateY('+(x*10).toFixed(2)+'deg) rotateX('+(-y*8).toFixed(2)+'deg)'});
  art.addEventListener('pointerleave',function(){tilt.style.transform=''});
}

/* 6. Skills globe */
var LIGHT={Design:'#84693F',Imaging:'#A8705F',Motion:'#557670',UIUX:'#6F5F8E',Tools:'#4A4644',Strengths:'#9A5466'};
var DARK={Design:'#D6BE8E',Imaging:'#E0A08C',Motion:'#8FC0B6',UIUX:'#B8A6E0',Tools:'#E6DED2',Strengths:'#E29AAE'};
var isDark=function(){return document.documentElement.getAttribute('data-theme')==='dark'};
var CATS=Object.assign({},isDark()?DARK:LIGHT);
var CATNAME={Design:'Design',Imaging:'Imaging',Motion:'Motion',UIUX:'UI/UX',Tools:'Tools',Strengths:'Strengths'};
var SK=[
 ['Graphic design','Design','Logos, banners, kiosk screensavers and menu boards for 35 restaurant clients.','AIO'],
 ['Brand identity','Design','Logos and brand assets for restaurant concepts, with every design matched to the restaurant\u2019s own branding.','AIO'],
 ['Logo design','Design','Logos for demo and live restaurants.','AIO'],
 ['Digital signage','Design','Kiosk screensavers and display graphics that run on-site in restaurants.','AIO'],
 ['Menu boards','Design','2 to 4 digital menu boards a week, and I designed menu boards as an intern in 2024.','AIO'],
 ['Typography','Design','Type and layout are part of every screensaver and menu board I make.','AIO'],
 ['Layout','Design','Arranging food imagery, text and branding so a screen reads at a glance.','AIO'],
 ['Photo retouching','Imaging','Food images for POS and kiosk menus: cleanup, cropping, resizing and backgrounds.','AIO'],
 ['Compositing','Imaging','Detailed retouching and compositing in Adobe Photoshop.','AIO'],
 ['Food imagery','Imaging','Menu food imagery for 35 restaurant clients, live on their screens.','AIO'],
 ['AI image generation','Imaging','Came up with the idea for an image tool with the design team, then built it with the AI team. A full day of work became 2 hours.','AIO'],
 ['Video editing','Motion','2 to 3 marketing videos a week for demo and live restaurants.','AIO'],
 ['Motion graphics','Motion','Short animated content for screensavers and digital displays.','AIO'],
 ['Wireframing','UIUX','Part of my UI/UX training and university web projects.','BIC University'],
 ['User flows','UIUX','Planned clear user journeys for an interactive shoe customisation website.','BIC University'],
 ['Interface design','UIUX','Designed the accessibility-focused interface for my sign language recognition project.','BIC University'],
 ['Responsive design','UIUX','Built a sports management web app that works across devices.','BIC University'],
 ['Accessibility','UIUX','A focus of my degree and my final year project.','BIC University'],
 ['Canva','Tools','Kiosk screensavers, digital signage and short animated videos.','AIO'],
 ['Photoshop','Tools','Retouching and compositing food images.','AIO'],
 ['Figma','Tools','Interface and UI/UX design.','Design tool'],
 ['Higgsfield AI','Tools','Creating realistic AI-assisted imagery for restaurants.','AIO'],
 ['Miro','Tools','Redesigned the menu image workflow, where the idea for our image tool began.','AIO'],
 ['Lucidchart','Tools','Diagramming and flow charts.','Design tool'],
 ['Draw.io','Tools','Diagramming and flow charts.','Design tool'],
 ['HTML and CSS','Tools','University web projects, including a shoe customisation website.','BIC University'],
 ['Painting','Strengths','Original paintings and a large-format office mural for VisionX in 2019.','Personal work'],
 ['Attention to detail','Strengths','Keeping every asset accurate and on-brand.','AIO'],
 ['Team training','Strengths','Trained 3 new night-shift team members using documented workflows.','AIO'],
 ['Client contact','Strengths','Main contact and escalation owner for 5 demo and 3 live restaurants a week.','AIO'],
 ['Documentation','Strengths','Improved night-shift processes and guidelines through documentation.','AIO']
];
var cv=$('#globe'), wrap=$('#orbit'), portraitBox=null;
if(cv){
  var ctx=cv.getContext('2d'), N=SK.length, pts=[], dots=[], i;
  for(i=0;i<N;i++){var y=1-(i+.5)/N*2, r=Math.sqrt(1-y*y), th=i*2.39996323; pts.push({x:Math.cos(th)*r,y:y,z:Math.sin(th)*r,s:SK[i]})}
  for(i=0;i<96;i++){var y2=1-(i+.5)/96*2, r2=Math.sqrt(1-y2*y2), t2=i*2.39996323+.7; dots.push({x:Math.cos(t2)*r2,y:y2,z:Math.sin(t2)*r2})}
  var ry=.4, rx=-.25, vy=reduce?0:.0022, vx=0, auto=!reduce, W=0,H=0,R=0,dpr=1, hover=-1, sel=-1, filter=null, target=null, visible=true, dragging=false, lastX=0, lastY=0, moved=0, proj=[];
  var nodes=pts.concat(dots), edges=[];
  nodes.forEach(function(a,ia){var near=nodes.map(function(b,ib){return [ib,(a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z)]}).filter(function(x){return x[0]!==ia}).sort(function(p,q){return p[1]-q[1]}).slice(0,3);
    near.forEach(function(x){var k1=Math.min(ia,x[0]),k2=Math.max(ia,x[0]),key=k1+'-'+k2; if(!edges[key]){edges[key]=1; edges.push([k1,k2])}})});
  var size=function(){var b=wrap.getBoundingClientRect(); dpr=Math.min(window.devicePixelRatio||1,2); W=b.width; H=b.height; cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); R=Math.min(W,H)*.41};
  size(); window.addEventListener('resize',size);
  var rot=function(p){var c=Math.cos(ry),s=Math.sin(ry); var x1=p.x*c+p.z*s, z1=-p.x*s+p.z*c; var c2=Math.cos(rx),s2=Math.sin(rx); var y2=p.y*c2-z1*s2, z2=p.y*s2+z1*c2; var k=1/(1-z2*.05); return {x:W/2+x1*R*k, y:H/2-y2*R*k, z:z2, k:k}};
  var font=function(px,w){return w+' '+px+'px "Open Sans", Arial, sans-serif'};
  function draw(){
    ctx.clearRect(0,0,W,H); PR=prect();
    // halo
    var g=ctx.createRadialGradient(W/2,H/2,R*.2,W/2,H/2,R*1.25); g.addColorStop(0,isDark()?'rgba(205,182,141,.08)':'rgba(132,105,63,.07)'); g.addColorStop(1,'rgba(132,105,63,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(W/2,H/2,R*1.25,0,7); ctx.fill();
    // network: every node joined to its nearest neighbours, shaded by depth
    var P=nodes.map(rot);
    edges.forEach(function(e){var a=P[e[0]],b=P[e[1]],z=(a.z+b.z)/2; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=isDark()?(z>0?'rgba(214,190,142,'+(.22+z*.30).toFixed(3)+')':'rgba(214,190,142,'+(.05+(z+1)*.05).toFixed(3)+')'):(z>0?'rgba(132,100,62,'+(.28+z*.32).toFixed(3)+')':'rgba(160,130,90,'+(.07+(z+1)*.07).toFixed(3)+')'); ctx.lineWidth=z>0?1:.7; ctx.stroke()});
    // dust
    for(var di=pts.length;di<P.length;di++){var dq=P[di]; ctx.beginPath(); ctx.arc(dq.x,dq.y,dq.z>0?1.6:1.1,0,7); ctx.fillStyle=isDark()?(dq.z>0?'rgba(214,190,142,.55)':'rgba(214,190,142,.15)'):(dq.z>0?'rgba(104,82,58,.55)':'rgba(132,105,63,.18)'); ctx.fill()}
    // skills, back to front
    proj=pts.map(function(pt,idx){var q=rot(pt); q.i=idx; return q}).sort(function(a,b){return a.z-b.z});
    
    var taken=[], allow={};
    for(var f=proj.length-1;f>=0;f--){var qq=proj[f], ss=pts[qq.i].s, sel2=qq.i===sel||qq.i===hover; if(!sel2&&((filter?qq.z<=-.45:qq.z<=.12)||(filter&&ss[1]!==filter))) continue;
      ctx.font=font(Math.round((W<500?.82:1)*(sel2?15:12.5)*qq.k),sel2?700:600); var w2=ctx.measureText(ss[0]).width+(sel2?20:0), lft=qq.x>W/2, bx2=lft?qq.x-12*qq.k-w2:qq.x+8*qq.k, box={x:bx2-4,y:qq.y-11,w:w2+8,h:22};
      if(!sel2&&(overlaps(box.x,box.y,box.w,box.h)||taken.some(function(t){return box.x<t.x+t.w&&box.x+box.w>t.x&&box.y<t.y+t.h&&box.y+box.h>t.y}))) continue;
      taken.push(box); allow[qq.i]=1}
    proj.forEach(function(q){
      var s=pts[q.i].s, col=CATS[s[1]], front=(q.z+1)/2, dim=filter&&s[1]!==filter;
      var alpha=dim?.10:(.18+front*.82), isH=q.i===hover, isS=q.i===sel;
      ctx.globalAlpha=alpha;
      if(!dim&&q.z>0){ctx.beginPath(); ctx.arc(q.x,q.y,(isS?14:9)*q.k,0,7); ctx.fillStyle=col+'22'; ctx.fill()}
      ctx.beginPath(); ctx.arc(q.x,q.y,(isS?6.5:isH?5.5:4)*q.k,0,7); ctx.fillStyle=col; ctx.fill();
      if(isS){ctx.beginPath(); ctx.arc(q.x,q.y,13*q.k,0,7); ctx.strokeStyle=col; ctx.lineWidth=1.2; ctx.stroke()}
      var showLabel=!!allow[q.i];
      if(showLabel){var fs=(W<500?.82:1)*(isS||isH?15:12.5)*q.k, left=q.x>W/2, off=(isS?18:10)*q.k, tx=left?q.x-off:q.x+off;
        ctx.font=font(Math.round(fs),isS||isH?700:600); ctx.textBaseline='middle'; ctx.textAlign=left?'right':'left';
        if(isS){var tw=ctx.measureText(s[0]).width, px=8, bx=left?tx-tw-px:tx-px; ctx.globalAlpha=1; ctx.fillStyle=isDark()?'rgba(23,20,26,.92)':'rgba(244,240,230,.92)'; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(bx,q.y-fs*.95,tw+px*2,fs*1.9,fs); else ctx.rect(bx,q.y-fs*.95,tw+px*2,fs*1.9); ctx.fill()}
        ctx.fillStyle=isS||isH?(isDark()?'#FFFFFF':'#2E2A28'):col; ctx.fillText(s[0],tx,q.y); ctx.textAlign='left'}
      ctx.globalAlpha=1;
    });
  }
  function frontAngles(pt){var y=Math.atan2(-pt.x,pt.z); var z1=-pt.x*Math.sin(y)+pt.z*Math.cos(y); return {ry:y,rx:Math.atan2(pt.y,z1)}}
  function norm(a){while(a>Math.PI)a-=2*Math.PI; while(a<-Math.PI)a+=2*Math.PI; return a}
  function loop(){
    if(visible&&!document.hidden){
      if(target){var dy=norm(target.ry-ry), dx=target.rx-rx; ry+=dy*.12; rx+=dx*.12; if(Math.abs(dy)<.002&&Math.abs(dx)<.002) target=null}
      else if(!dragging){ry+=vy; rx+=vx; vx*=.94; if(auto) vy+= (0.0022-vy)*.02; else vy*=.95; rx=clamp(rx,-1.1,1.1)}
      draw();
    }
    requestAnimationFrame(loop);
  }
  function prect(){return {L:-9999,T:-9999,W:0,H:0}}
  var PR=null;
  function overlaps(x,y,w,h){var r=PR||prect(); return x<r.L+r.W&&x+w>r.L&&y<r.T+r.H&&y+h>r.T}
  function behind(){return false}
  function pick(e){var b=cv.getBoundingClientRect(), x=e.clientX-b.left, y=e.clientY-b.top, best=-1, bd=22;
    for(var j=proj.length-1;j>=0;j--){var q=proj[j]; if(q.z<-.2||behind(q)) continue; var d=Math.hypot(q.x-x,q.y-y); if(d<bd){bd=d; best=q.i}} return best}
  cv.addEventListener('pointerdown',function(e){dragging=true; moved=0; lastX=e.clientX; lastY=e.clientY; cv.setPointerCapture(e.pointerId); cv.classList.add('dragging'); target=null});
  cv.addEventListener('pointermove',function(e){
    if(dragging){var dx=e.clientX-lastX, dy=e.clientY-lastY; moved+=Math.abs(dx)+Math.abs(dy); ry+=dx*.008; rx=clamp(rx+dy*.006,-1.1,1.1); vy=dx*.0012; vx=dy*.0008; lastX=e.clientX; lastY=e.clientY}
    else {hover=pick(e); cv.style.cursor=hover>=0?'pointer':'grab'}
  });
  cv.addEventListener('pointerup',function(e){dragging=false; cv.classList.remove('dragging'); if(moved<6){var h=pick(e); if(h>=0) choose(h,true)}});
  cv.addEventListener('pointerleave',function(){hover=-1});
  new IntersectionObserver(function(es){visible=es[0].isIntersecting},{threshold:0}).observe(wrap);
  if(reduce){draw()} requestAnimationFrame(loop);

  // card, filters and accessible list stay in sync with the globe
  var panel=$('#panel'), filters=$('#filters'), btns={};
  function renderPanel(cat){
    panel.innerHTML='';
    if(!cat){var h=document.createElement('p'); h.className='panel__hint'; h.textContent='Choose a type above, or select any point on the globe.'; panel.appendChild(h); return}
    var items=SK.map(function(s,k){return [s,k]}).filter(function(x){return x[0][1]===cat});
    var head=document.createElement('p'); head.className='panel__head'; var hb=document.createElement('b'); hb.textContent=CATNAME[cat]; var hs=document.createElement('span'); hs.textContent=items.length+' skills'; head.append(hb,hs); panel.appendChild(head);
    var ul=document.createElement('ul');
    items.forEach(function(x){var li=document.createElement('li'), bt=document.createElement('button'); bt.type='button'; bt.dataset.k=x[1]; bt.style.setProperty('--c',CATS[cat]);
      var nb=document.createElement('b'); nb.textContent=x[0][0]; var sm=document.createElement('small'); sm.textContent=x[0][2]+' ('+x[0][3]+')'; bt.append(nb,sm);
      bt.addEventListener('click',function(){choose(x[1],true)}); li.appendChild(bt); ul.appendChild(li)});
    panel.appendChild(ul); panel.classList.remove('swap-in'); void panel.offsetWidth; panel.classList.add('swap-in');
  }
  function setFilter(cat){filter=cat; Object.keys(btns).forEach(function(c){btns[c].setAttribute('aria-pressed',String(c===cat))}); renderPanel(cat); if(reduce) draw()}
  function choose(idx,spin){
    var s=SK[idx]; sel=idx; auto=false;
    if(filter!==s[1]) setFilter(s[1]);
    if(spin) target=frontAngles(pts[idx]);
    $$('button',panel).forEach(function(b){b.setAttribute('aria-current',String(+b.dataset.k===idx))});
    if(reduce) draw();
  }
  Object.keys(CATS).forEach(function(c){var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-pressed','false'); b.style.setProperty('--c',CATS[c]); b.innerHTML='<i></i>'; b.appendChild(document.createTextNode(CATNAME[c])); btns[c]=b;
    b.addEventListener('click',function(){if(filter===c){setFilter(null); sel=-1} else {setFilter(c); var first=SK.findIndex(function(s){return s[1]===c}); sel=-1; target=frontAngles(pts[first])}});
    filters.appendChild(b)});
}

/* 7. Case studies */
var CASES=[
 {w:'AIO | Aug 2025 to present',t:'Restaurant screen design',g:[['The brief','Every restaurant needs screens that make its food look appetising and match its own brand, across POS systems and self-service kiosks.'],['My role','I design kiosk screensavers, digital menu boards, logos, banners and marketing videos, and work with internal teams to turn each restaurant\u2019s requirements into deployment-ready assets.'],['Approach','Start from the restaurant\u2019s branding and screen requirements, retouch and composite the food images in Photoshop, then build screensavers, signage and videos in Canva, using Higgsfield AI for realistic imagery.'],['Result','Designs for 35 restaurant clients, live on-site. Each week: 3 to 5 screensavers, 2 to 4 menu boards and 2 to 3 marketing videos.'],['Tools','Canva, Adobe Photoshop, Higgsfield AI, Miro']],n:''},
 {w:'AIO | 2025 to 2026',t:'AI image tool',g:[['The problem','Creating menu images took a full working day.'],['My role','Together with the design team, I came up with the idea for the tool. I then worked with the AI team over three months to build it.'],['Approach','The idea came about while I was redesigning our menu image workflow in Miro. From there, I worked with the AI team to turn it into a working tool.'],['Result','Menu images now take 2 hours instead of a full working day, and they look more realistic.']],n:''},
 {w:'VisionX | Mar to May 2019',t:'Office mural',g:[['The brief','Design and paint a mural for the VisionX office.'],['My role','Designer and painter.'],['Approach','Applied composition, colour and large-format visual design skills.'],['Result','A finished mural for the office.']],n:''},
 {w:'BIC University | Final year project',t:'Sign language recognition system',g:[['The goal','Recognise sign language using computer vision.'],['My role','My final year project for a BSc (Hons) in Software Engineering, which I finished with a Gold Medal.'],['Approach','Built a computer vision recognition system with an intuitive, accessibility-focused interface.']],n:''},
 {w:'BIC University | University project',t:'Shoe customisation website',g:[['The goal','Let people customise a shoe online.'],['Approach','Designed and built an interactive customisation experience focused on clear user journeys, usability and visual hierarchy.']],n:''},
 {w:'BIC University | University project',t:'Sports management system',g:[['The goal','A sports management web application.'],['Approach','Built it to be responsive, applying UI/UX and accessibility principles to improve usability across devices.']],n:''}
];
var cs=$('#cs'), csLast=null, csK=0;
function openCase(k,keep){csK=(k+CASES.length)%CASES.length; k=csK; var c=CASES[k]; if(!keep) csLast=document.activeElement; $('#csWhen').textContent=c.w; $('#csTitle').textContent=c.t;
  var g=$('#csGrid'); g.innerHTML=''; c.g.forEach(function(r){var d=document.createElement('div'), h=document.createElement('h4'), p=document.createElement('p'); h.textContent=r[0]; p.textContent=r[1]; d.append(h,p); g.appendChild(d)});
  var n=$('#csNote'); n.hidden=!c.n; n.textContent=c.n; $('#csPos').textContent=(k+1)+' of '+CASES.length; cs.hidden=false; document.body.style.overflow='hidden'; var box=$('.cs__box'); box.scrollTop=0; box.style.animation='none'; void box.offsetWidth; box.style.animation=''; if(!keep) $('#csClose').focus()}
function closeCase(){cs.hidden=true; document.body.style.overflow=''; if(csLast) csLast.focus()}
$$('[data-case]').forEach(function(b){b.addEventListener('click',function(){openCase(+b.dataset.case)})});
$('#csClose').addEventListener('click',closeCase); $('#csNext').addEventListener('click',function(){openCase(csK+1,true)}); $('#csPrev').addEventListener('click',function(){openCase(csK-1,true)}); cs.addEventListener('click',function(e){if(e.target===cs) closeCase()});

/* 8. Experience */
var ROLES=[
 {t:'Operations Intern',o:'AIO, restaurant technology | May 2024 to Sep 2024',l:['Supported US-based restaurant brands across POS, kiosk, online ordering, menu, payment, payroll, inventory and marketing.','Edited menu item images and designed menu boards.']},
 {t:'Operations Associate',o:'AIO, restaurant technology | Aug 2025 to Aug 2026',l:['Delivered screen-ready visual assets for 35 restaurant clients, now live in their restaurants.','Designed kiosk screensavers and digital signage in Canva, matched to each restaurant\u2019s brand and screens.','Retouched food images for POS and kiosk menus, and created logos, brand assets and short animated videos.','Redesigned the menu image workflow in Miro and, with the design team, came up with the idea for an image tool.']},
 {t:'Senior Operations Associate',o:'AIO, restaurant technology | Aug 2026 to present',l:['Produce 3 to 5 kiosk screensavers, 2 to 4 menu boards and 2 to 3 marketing videos a week, plus logos and banners.','Worked with the AI team to build that image tool, cutting image production from a full working day to 2 hours.','Lead the menu team\u2019s night shift and trained 3 new team members using documented workflows.','Main contact and escalation owner for 5 demo and 3 live restaurants a week.']}
];
var steps=$$('.step'), detail=$('#detail');
function pickRole(i,anim){steps.forEach(function(s,k){s.setAttribute('aria-selected',String(k===i)); s.tabIndex=k===i?0:-1});
  $('#dTitle').textContent=ROLES[i].t; $('#dOrg').textContent=ROLES[i].o; var ul=$('#dList'); ul.innerHTML='';
  ROLES[i].l.forEach(function(x){var li=document.createElement('li'); li.textContent=x; ul.appendChild(li)});
  if(anim){detail.classList.remove('swap-in'); void detail.offsetWidth; detail.classList.add('swap-in')}}
steps.forEach(function(s,i){s.addEventListener('click',function(){pickRole(i,true)}); s.addEventListener('keydown',function(e){if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return; var n=(i+(e.key==='ArrowRight'?1:-1)+steps.length)%steps.length; steps[n].focus(); pickRole(n,true)})});
pickRole(2,false);

/* 9. Gallery */
var works=$$('.thumb'), stage=$('#expoImg'), expo=$('#expo'), curX=0;
function swHTML(w){return w.dataset.sw.split(',').map(function(c){return '<i style="background:'+c+'"></i>'}).join('')}
function swButtons(w){var box=$('#expoSw'); box.innerHTML=''; w.dataset.sw.split(',').forEach(function(c){var b=document.createElement('button'); b.type='button'; b.className='swatch'; b.style.setProperty('--c',c); b.setAttribute('aria-label','Copy colour '+c); b.innerHTML='<i></i>'; b.appendChild(document.createTextNode(c)); b.addEventListener('click',function(){copyText(c,'Copied '+c)}); box.appendChild(b)})}
function select(i,instant){curX=(i+works.length)%works.length; var w=works[curX], im=$('img',w);
  var apply=function(){stage.src=im.src; stage.alt=im.alt; $('#expoTitle').textContent=w.dataset.title; $('#expoNo').textContent='No. '+(curX+1)+' of '+works.length; swButtons(w); requestAnimationFrame(function(){stage.classList.remove('leaving')})};
  works.forEach(function(t,k){t.setAttribute('aria-current',String(k===curX))});
  if(instant||reduce) apply(); else {stage.classList.add('leaving'); setTimeout(apply,260)}
  var strip=$('#expoThumbs'), r=w.getBoundingClientRect(), sr=strip.getBoundingClientRect(); if(r.left<sr.left||r.right>sr.right) strip.scrollBy({left:r.left-sr.left-sr.width/2+r.width/2,behavior:reduce?'auto':'smooth'});
}
var playBtn=$('#expoPlay'), bar=$('#expoBar'), playing=false, ptimer=null, SLIDE=5000;
function runBar(){bar.style.transition='none'; bar.style.width='0'; void bar.offsetWidth; bar.style.transition='width '+SLIDE+'ms linear'; bar.style.width='100%'}
function tick(){clearTimeout(ptimer); runBar(); ptimer=setTimeout(function(){select(curX+1); tick()},SLIDE)}
function play(){playing=true; expo.classList.add('is-playing'); playBtn.setAttribute('aria-pressed','true'); playBtn.textContent='Pause slideshow'; tick()}
function stop(){playing=false; clearTimeout(ptimer); expo.classList.remove('is-playing'); playBtn.setAttribute('aria-pressed','false'); playBtn.textContent='Play slideshow'; bar.style.transition='none'; bar.style.width='0'}
playBtn.addEventListener('click',function(){playing?stop():play()});
new IntersectionObserver(function(es){if(!es[0].isIntersecting&&playing) stop()},{threshold:.2}).observe(expo);
document.addEventListener('visibilitychange',function(){if(document.hidden&&playing) stop()});
works.forEach(function(t,i){t.addEventListener('click',function(){stop(); select(i)})});
$('#expoPrev').addEventListener('click',function(){stop(); select(curX-1)}); $('#expoNext').addEventListener('click',function(){stop(); select(curX+1)});
expo.addEventListener('keydown',function(e){if(!lb.hidden)return; if(e.key==='ArrowRight'){e.preventDefault(); stop(); select(curX+1)} if(e.key==='ArrowLeft'){e.preventDefault(); stop(); select(curX-1)}});
var sx=null; $('.expo__stage').addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
$('.expo__stage').addEventListener('touchend',function(e){if(sx===null)return; var d=e.changedTouches[0].clientX-sx; if(Math.abs(d)>45){stop(); select(curX+(d<0?1:-1))} sx=null});
select(0,true);

var lb=$('#lb'), img=$('#lbImg'), cur=0, last=null;
function show(i,first){cur=(i+works.length)%works.length; var w=works[cur], im=$('img',w);
  var swap=function(){img.src=im.src; img.alt=im.alt; $('#lbTitle').textContent=w.dataset.title; $('#lbSw').innerHTML=swHTML(w); $('#lbCount').textContent=(cur+1)+' of '+works.length; requestAnimationFrame(function(){img.classList.remove('leaving')})};
  if(first||reduce){swap(); return} img.classList.add('leaving'); setTimeout(swap,220)}
function openLb(){stop(); last=document.activeElement; lb.hidden=false; document.body.style.overflow='hidden'; show(curX,true); $('#lbClose').focus()}
function closeLb(){lb.hidden=true; document.body.style.overflow=''; select(cur,true); if(last) last.focus()}
$('#expoView').addEventListener('click',openLb); $('#expoFull').addEventListener('click',openLb);
$('#lbClose').addEventListener('click',closeLb); $('#lbPrev').addEventListener('click',function(){show(cur-1)}); $('#lbNext').addEventListener('click',function(){show(cur+1)});
lb.addEventListener('click',function(e){if(e.target===lb) closeLb()});
var x0=null; lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){if(x0===null)return; var d=e.changedTouches[0].clientX-x0; if(Math.abs(d)>50) show(cur+(d<0?1:-1)); x0=null});

/* 10. Keyboard */
document.addEventListener('keydown',function(e){
  var dlg=!lb.hidden?lb:!cs.hidden?cs:null;
  if(e.key==='Escape'){if(!lb.hidden) closeLb(); else if(!cs.hidden) closeCase(); else if(menu.classList.contains('open')){setMenu(false); mb.focus()}}
  if(!lb.hidden){if(e.key==='ArrowRight') show(cur+1); if(e.key==='ArrowLeft') show(cur-1)}
  if(dlg&&e.key==='Tab'){var f=$$('button',dlg), a=f[0], z=f[f.length-1]; if(e.shiftKey&&document.activeElement===a){e.preventDefault(); z.focus()} else if(!e.shiftKey&&document.activeElement===z){e.preventDefault(); a.focus()}}
});

/* 11. Theme: light by default, dark on request, remembered */
var themeBtn=$('#themeToggle');
function applyTheme(dark){
  if(dark) root.setAttribute('data-theme','dark'); else root.removeAttribute('data-theme');
  themeBtn.setAttribute('aria-pressed',String(dark)); themeBtn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  var meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.setAttribute('content',dark?'#17141A':'#F4F0E6');
  if(typeof CATS!=='undefined'){var src=dark?DARK:LIGHT; Object.keys(src).forEach(function(k){CATS[k]=src[k]}); $$('#filters button').forEach(function(b,i){b.style.setProperty('--c',CATS[Object.keys(CATS)[i]])}); $$('#panel li button').forEach(function(b){b.style.setProperty('--c',CATS[SK[+b.dataset.k][1]])})}
}
applyTheme(isDark());
themeBtn.addEventListener('click',function(){var d=!isDark(); applyTheme(d); try{localStorage.setItem('ms-theme',d?'dark':'light')}catch(e){}});

/* 12. Sheets: quick view and CV preview */
var openSheetEl=null, sheetLast=null;
function openSheet(id){var s=$('#'+id); if(!s) return; if(openSheetEl) closeSheet(true); sheetLast=document.activeElement; s.hidden=false; openSheetEl=s; document.body.style.overflow='hidden'; var box=$('.sheet__box',s); box.scrollTop=0; var f=$('[data-close]',s); if(f) f.focus()}
function closeSheet(keepFocus){if(!openSheetEl) return; openSheetEl.hidden=true; openSheetEl=null; document.body.style.overflow=''; if(!keepFocus&&sheetLast) sheetLast.focus()}
$$('[data-cv]').forEach(function(b){b.addEventListener('click',function(){openSheet('cvm')})});
$('#qvOpen').addEventListener('click',function(){openSheet('qv')});
$('#dockQuick').addEventListener('click',function(){openSheet('qv')});
$$('.sheet').forEach(function(s){s.addEventListener('click',function(e){if(e.target===s) closeSheet()}); $$('[data-close]',s).forEach(function(b){b.addEventListener('click',function(){closeSheet()})})});
document.addEventListener('keydown',function(e){
  if(!openSheetEl) return;
  if(e.key==='Escape'){e.stopPropagation(); closeSheet(); return}
  if(e.key==='Tab'){var f=$$('a[href],button',openSheetEl).filter(function(x){return x.offsetParent!==null}), a=f[0], z=f[f.length-1]; if(e.shiftKey&&document.activeElement===a){e.preventDefault(); z.focus()} else if(!e.shiftKey&&document.activeElement===z){e.preventDefault(); a.focus()}}
},true);
})();
