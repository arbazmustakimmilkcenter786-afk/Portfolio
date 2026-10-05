const projects=[
  {title:'Interactive Business Performance Dashboard',category:'Data Analytics',description:'An interactive business intelligence dashboard for exploring commercial performance, KPIs, revenue trends, and operational bottlenecks.',tech:['Power BI','SQL','Power Query','Excel'],link:'#',live:'#'},
  {title:'Mustakim Fast Food Services',category:'Web Development',description:'A localized business web presence combining website development, database setup, WordPress customization, and digital branding.',tech:['HTML','CSS','WordPress','MySQL'],link:'#',live:'#'},
  {title:'MatchPoint — Resume & JD Matcher',category:'AI / NLP',description:'An AI-powered Streamlit application that compares resumes with job descriptions using embeddings, cosine similarity, keyword gaps, and ATS checks.',tech:['Python','Streamlit','NLP','Cosine Similarity'],link:'https://github.com/arbazmustakimmilkcenter786-afk',live:'https://matchpoint1-01.streamlit.app/'}
];
const experiences=[{date:'2026 — Present',title:'IBM SkillsBuild Virtual Internship',subtitle:'Data Analytics with Generative AI · Remote',points:['Learning data analytics workflows enhanced by generative AI tools.','Applying GenAI techniques to cleaning, analysis, and reporting tasks.','Building practical experience with Power BI, SQL, and AI-assisted analytics.']},{date:'Oct 2025 — Present',title:'Freelance Data & Technical Specialist',subtitle:'Self-employed · Navi Mumbai, India',points:['Cleaning and transforming operational datasets using Advanced Excel.','Creating formula automations with XLOOKUP, INDEX MATCH, and validation workflows.','Designing reporting templates and dashboard support systems for clients.']}];
const skillData={Programming:{description:'Programming fundamentals used for analysis, automation, and web development.',items:[['Java',75],['SQL',85],['JavaScript',65],['HTML & CSS',90]]},'Analytics & BI':{description:'Tools and methods for turning raw information into useful business insights.',items:[['Power BI',80],['Advanced Excel',90],['Data Visualization',82],['Dashboard Development',78]]},Databases:{description:'Database concepts and tools for storing, querying, and validating information.',items:[['MySQL',75],['Database Queries',80],['Data Validation',78],['DBMS Concepts',72]]},'Tools & Platforms':{description:'Everyday tools used to build, organize, and deliver projects.',items:[['VS Code',90],['Git',65],['WordPress',70],['Microsoft Office',88]]}};
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function renderExperience(){ $('#timeline').innerHTML=experiences.map(e=>`<article class="timeline-item reveal"><div class="timeline-date">${e.date}</div><h3>${e.title}</h3><h4>${e.subtitle}</h4><ul>${e.points.map(p=>`<li>${p}</li>`).join('')}</ul></article>`).join(''); }
function renderProjects(filter='All'){
  const list=filter==='All'?projects:projects.filter(p=>p.category===filter);
  $('#projectsGrid').innerHTML=list.map((p,i)=>`<article class="project-card reveal" data-category="${p.category}" style="--reveal-delay:${i*70}ms">
    <div class="project-preview" aria-hidden="true"><div class="preview-lines"><i></i><i></i><i></i></div><div class="preview-bars"><i></i><i></i><i></i><i></i></div></div>
    <div class="project-top"><span class="project-index">0${i+1}</span><span class="project-category">${p.category}</span></div>
    <h3>${p.title}</h3><p>${p.description}</p><div class="tag-list">${p.tech.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    <div class="project-actions">
      <button class="project-open" data-cursor="OPEN" data-title="${p.title}" data-category="${p.category}" data-description="${p.description}" data-tech="${p.tech.join('|')}" data-link="${p.link}" data-live="${p.live}">Details ↗</button>
      ${p.live && p.live !== '#' ? `<a class="project-live" href="${p.live}" target="_blank" rel="noopener noreferrer" data-cursor="OPEN">Live project ↗</a>` : ''}
    </div>
  </article>`).join('');
  observeReveals();
  bindProjectInteractions();
}
function renderFilters(){const cats=['All',...new Set(projects.map(p=>p.category))];$('#filters').innerHTML=cats.map(c=>`<button class="filter-btn ${c==='All'?'active':''}">${c}</button>`).join('');$$('.filter-btn').forEach(b=>b.addEventListener('click',()=>{$$('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProjects(b.textContent)}));}
function renderSkills(){const names=Object.keys(skillData);$('#skillTabs').innerHTML=names.map((n,i)=>`<button class="skill-tab ${i===0?'active':''}">${n}</button>`).join('');const show=n=>{const d=skillData[n];$('#skillPanel').classList.remove('skills-ready');$('#skillPanel').innerHTML=`<h3>${n}</h3><p>${d.description}</p><div class="skill-bars">${d.items.map(x=>`<div><div class="bar-line"><span>${x[0]}</span><span>${x[1]}%</span></div><div class="bar"><i style="--skill-level:${x[1]}"></i></div></div>`).join('')}</div>`;requestAnimationFrame(()=>requestAnimationFrame(()=>$('#skillPanel').classList.add('skills-ready')))};show(names[0]);$$('.skill-tab').forEach(b=>b.addEventListener('click',()=>{$$('.skill-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');show(b.textContent)}));}
function openModal(d){
  $('#modalCategory').textContent=d.category;
  $('#modalTitle').textContent=d.title;
  $('#modalDescription').textContent=d.description;
  $('#modalTags').innerHTML=d.tech.split('|').map(t=>`<span class="tag">${t}</span>`).join('');
  const link=$('#modalLink'), live=$('#modalLiveLink');
  link.href=d.link || '#';
  link.style.display=(d.link && d.link!=='#')?'inline-flex':'none';
  live.href=d.live || '#';
  live.style.display=(d.live && d.live!=='#')?'inline-flex':'none';
  $('#projectModal').classList.add('open');
  $('#projectModal').setAttribute('aria-hidden','false');
}
function closeModal(){$('#projectModal').classList.remove('open');$('#projectModal').setAttribute('aria-hidden','true');}
let revealObserver;
function observeReveals(){
  if(!('IntersectionObserver' in window)){$$('.reveal').forEach(e=>e.classList.add('visible'));return;}
  if(!revealObserver) revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  $$('.reveal:not(.visible)').forEach((e,i)=>{if(!e.style.getPropertyValue('--reveal-delay')) e.style.setProperty('--reveal-delay',`${(i%5)*60}ms`);revealObserver.observe(e)});
}
function bindProjectInteractions(){
  $$('.project-open').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset)));
  $$('.project-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
      const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty('--tilt-x',`${x*3.5}deg`);card.style.setProperty('--tilt-y',`${y*-3.5}deg`);card.style.setProperty('--shine-x',`${(x+.5)*100}%`);card.style.setProperty('--shine-y',`${(y+.5)*100}%`);card.style.setProperty('--preview-x',`${x*9}px`);card.style.setProperty('--preview-y',`${y*7}px`);
    },{passive:true});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');card.style.setProperty('--preview-x','0px');card.style.setProperty('--preview-y','0px')});
  });
}
renderExperience();renderFilters();renderProjects();renderSkills();observeReveals();

const nav=$('#navbar'),progress=$('#scrollProgress'),back=$('#backTop'),reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function smoothTo(target){const el=$(target);if(!el)return;const top=el.getBoundingClientRect().top+window.scrollY-76;window.scrollTo({top,behavior:reduceMotion.matches?'auto':'smooth'});}
function updateScrollUI(){
  const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);const pct=Math.min(1,Math.max(0,window.scrollY/max));
  progress.style.width=`${pct*100}%`;progress.setAttribute('aria-valuenow',Math.round(pct*100));nav.classList.toggle('scrolled',window.scrollY>20);back.classList.toggle('show',window.scrollY>500);
  document.documentElement.style.setProperty('--scroll-progress',pct);
  const hero=document.querySelector('.static-hero');
  if(hero){const progressInHero=Math.min(1,Math.max(0,window.scrollY/Math.max(1,hero.offsetHeight)));hero.style.setProperty('--hero-scroll',progressInHero);}
  const timeline=document.querySelector('.timeline');
  if(timeline){const r=timeline.getBoundingClientRect();const viewport=window.innerHeight;const p=Math.min(1,Math.max(0,(viewport*.72-r.top)/(r.height+viewport*.28)));timeline.style.setProperty('--timeline-progress',p.toFixed(3));}
}
let scrollRaf=0;const onScroll=()=>{if(scrollRaf)return;scrollRaf=requestAnimationFrame(()=>{scrollRaf=0;updateScrollUI()})};window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',updateScrollUI,{passive:true});updateScrollUI();

$('#menuBtn').addEventListener('click',()=>{const open=$('#navMenu').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',String(open));$('#menuBtn').setAttribute('aria-label',open?'Close menu':'Open menu');});$$('.nav-link').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();$('#navMenu').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');$('#menuBtn').setAttribute('aria-label','Open menu');smoothTo(a.getAttribute('href'))}));$('#backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion.matches?'auto':'smooth'}));$$('.static-cta[href^="#"],.resume-btn[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(href?.startsWith('#')){e.preventDefault();smoothTo(href)}}));if($('#themeToggle')){
  $('#themeToggle').addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    $('#themeToggle').textContent=document.body.classList.contains('dark')?'☀':'☾';
  });
}

if('IntersectionObserver' in window){
  const navSections=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){$$('.nav-link').forEach(a=>{const active=a.getAttribute('href')===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
  ['about','experience','projects','contact'].forEach(id=>{const sec=document.getElementById(id);if(sec)navSections.observe(sec)});
}

const counters=$$('.counter');const counterObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,target=+el.dataset.target;let n=0;const step=Math.max(1,Math.ceil(target/35));const timer=setInterval(()=>{n=Math.min(n+step,target);el.textContent=n+(target===100?'%':'');if(n>=target)clearInterval(timer)},30);counterObserver.unobserve(el)}}),{threshold:.7});counters.forEach(c=>counterObserver.observe(c));
$('#contactForm').addEventListener('submit',e=>{e.preventDefault();const status=$('#formStatus');status.textContent='Thanks! Your message is ready to be connected to a backend.';status.classList.add('show');e.target.reset();setTimeout(()=>status.classList.remove('show'),4200)});
$('#modalClose').addEventListener('click',closeModal);$('#projectModal').addEventListener('click',e=>{if(e.target.id==='projectModal')closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});


/* =========================================
   CURSOR-REACTIVE GLASS PORTRAIT
========================================= */
(function initGlassCursor(){
  const heroSection=document.querySelector('.hero');
  const frame=document.getElementById('heroImageWrap');
  const reveal=document.getElementById('heroReveal');
  const base=document.getElementById('heroImage');
  if(!heroSection||!frame) return;
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
  if(!finePointer.matches) return;
  let tx=0,ty=0,cx=0,cy=0,raf=0;
  const move=(e)=>{
    const r=heroSection.getBoundingClientRect();
    const x=e.clientX-r.left, y=e.clientY-r.top;
    const nx=(x/r.width-.5)*2, ny=(y/r.height-.5)*2;
    tx=nx; ty=ny;
    frame.style.setProperty('--local-x',`${((e.clientX-frame.getBoundingClientRect().left)/frame.offsetWidth)*100}%`);
    frame.style.setProperty('--local-y',`${((e.clientY-frame.getBoundingClientRect().top)/frame.offsetHeight)*100}%`);
    frame.style.setProperty('--highlight-opacity','1');
    frame.classList.add('is-hovering');
    heroSection.style.setProperty('--hero-mouse-x',`${x}px`);
    heroSection.style.setProperty('--hero-mouse-y',`${y}px`);
  };
  const leave=()=>{tx=0;ty=0;frame.style.setProperty('--highlight-opacity','0');frame.classList.remove('is-hovering');};
  heroSection.addEventListener('mousemove',move,{passive:true});
  heroSection.addEventListener('mouseleave',leave,{passive:true});
  const animate=()=>{
    cx+=(tx-cx)*.075; cy+=(ty-cy)*.075;
    frame.style.setProperty('--portrait-x',`${cx*8}px`);
    frame.style.setProperty('--portrait-y',`${cy*5}px`);
    frame.style.setProperty('--portrait-ry',`${cx*1.15}deg`);
    frame.style.setProperty('--portrait-rx',`${cy*-0.75}deg`);
    frame.style.setProperty('--grid-x',`${cx*-12}px`);
    frame.style.setProperty('--grid-y',`${cy*-8}px`);
    if(base){base.style.setProperty('--base-x',`${cx*2}px`);base.style.setProperty('--base-y',`${cy*1.5}px`);}
    if(reveal){reveal.style.setProperty('--reveal-x',`${cx*-4}px`);reveal.style.setProperty('--reveal-y',`${cy*-3}px`);}
    raf=requestAnimationFrame(animate);
  };
  animate();
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
})();

/* =========================================================
   STATIC HOME CURSOR REVEAL
   Matches the original Glass Hero interaction:
   moving the cursor reveals the glass anatomy layer.
========================================================= */
(function initStaticHomeCursorReveal(){
  const hero = document.querySelector('.static-hero');
  const base = hero?.querySelector('.layer-base');
  const reveal = hero?.querySelector('.layer-reveal');
  const grid = hero?.querySelector('.static-grid-layer');
  const glow = hero?.querySelector('.static-cursor-glow');
  if(!hero || !base || !reveal) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if(!finePointer.matches) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let rawX = -999, rawY = -999;
  let smoothX = -999, smoothY = -999;
  let targetRadius = 0, currentRadius = 0;
  let targetGridX = 0, targetGridY = 0;
  let currentGridX = 0, currentGridY = 0;
  let raf;

  function setPointer(event){
    const rect = hero.getBoundingClientRect();
    rawX = event.clientX - rect.left;
    rawY = event.clientY - rect.top;
    targetRadius = 235;
    hero.style.setProperty('--static-mouse-x', `${rawX}px`);
    hero.style.setProperty('--static-mouse-y', `${rawY}px`);
    hero.style.setProperty('--static-glow-opacity', '1');
  }

  hero.addEventListener('pointerenter', event => {
    if(event.pointerType === 'mouse') setPointer(event);
  }, {passive:true});

  hero.addEventListener('pointermove', event => {
    if(event.pointerType === 'mouse') setPointer(event);
  }, {passive:true});

  hero.addEventListener('pointerleave', event => {
    if(event.pointerType !== 'mouse') return;
    targetRadius = 0;
    hero.style.setProperty('--static-glow-opacity', '0');
  }, {passive:true});

  function tick(){
    const p = reducedMotion.matches ? 1 : .14;
    const r = reducedMotion.matches ? 1 : .12;
    smoothX += (rawX - smoothX) * p;
    smoothY += (rawY - smoothY) * p;
    currentRadius += (targetRadius - currentRadius) * r;

    targetGridX = (smoothX / Math.max(hero.clientWidth,1) - .5) * -18;
    targetGridY = (smoothY / Math.max(hero.clientHeight,1) - .5) * -12;
    currentGridX += (targetGridX-currentGridX)*.08;
    currentGridY += (targetGridY-currentGridY)*.08;

    hero.style.setProperty('--reveal-x', `${smoothX}px`);
    hero.style.setProperty('--reveal-y', `${smoothY}px`);
    hero.style.setProperty('--reveal-radius', `${Math.max(currentRadius,0)}px`);

    if(grid){
      grid.style.setProperty('--static-grid-x', `${currentGridX}px`);
      grid.style.setProperty('--static-grid-y', `${currentGridY}px`);
    }
    if(glow){
      glow.style.left = `${smoothX}px`;
      glow.style.top = `${smoothY}px`;
    }
    raf = requestAnimationFrame(tick);
  }
  tick();
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
})();


/* =========================================================
   Interaction system: custom cursor, magnetic controls, loader,
   ambient parallax, and accessibility-aware navigation.
========================================================= */
(function initPremiumInteractions(){
  const loader=document.getElementById('pageLoader');
  const cursor=document.getElementById('customCursor');
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hideLoader=()=>{if(loader)loader.classList.add('is-hidden');document.body.classList.add('page-ready');};
  window.addEventListener('load',()=>setTimeout(hideLoader,80),{once:true});
  setTimeout(hideLoader,450);

  if(!finePointer || reduced || !cursor){if(cursor)cursor.style.display='none';return;}
  let px=innerWidth/2,py=innerHeight/2,rx=px,ry=py,raf=0;
  const targets='a,button,.project-card,.stat-card,.info-card,.skill-tab,input,textarea';
  const setPointer=(x,y)=>{px=x;py=y;document.documentElement.style.setProperty('--cursor-x',`${x}px`);document.documentElement.style.setProperty('--cursor-y',`${y}px`)};
  document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;setPointer(e.clientX,e.clientY);const target=e.target.closest?.(targets);cursor.classList.toggle('cursor-hover',!!target);const label=target?.dataset?.cursor || (target?.matches('.project-card')?'EXPLORE':null);document.querySelector('.cursor-label').textContent=label||'';cursor.classList.toggle('cursor-label-visible',!!label)}, {passive:true});
  function tick(){rx+=(px-rx)*.28;ry+=(py-ry)*.28;document.documentElement.style.setProperty('--cursor-ring-x',`${rx}px`);document.documentElement.style.setProperty('--cursor-ring-y',`${ry}px`);raf=requestAnimationFrame(tick)}
  tick();window.addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});

  const magnetics=$$('.static-cta,.resume-link,.static-talk,.btn.primary,.back-top');
  magnetics.forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-(r.left+r.width/2))*0.16;const y=(e.clientY-(r.top+r.height/2))*0.16;el.style.setProperty('--mag-x',`${x}px`);el.style.setProperty('--mag-y',`${y}px`);el.style.transform=`translate3d(${x}px,${y}px,0)`},{passive:true});
    el.addEventListener('pointerleave',()=>{el.style.transform='';el.style.removeProperty('--mag-x');el.style.removeProperty('--mag-y')},{passive:true});
  });

  const hero=document.querySelector('.static-hero');
  const parallaxNodes=hero?[hero.querySelector('.static-grid-layer'),hero.querySelector('.static-tagline'),hero.querySelector('.static-headline')].filter(Boolean):[];
  let targetPX=0,targetPY=0,currentPX=0,currentPY=0;
  if(hero){
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();targetPX=(e.clientX-r.left-r.width/2)/r.width;targetPY=(e.clientY-r.top-r.height/2)/r.height;},{passive:true});
    const original=window.requestAnimationFrame;
    const loop=()=>{
      currentPX+=(targetPX-currentPX)*.10;currentPY+=(targetPY-currentPY)*.10;
      document.documentElement.style.setProperty('--parallax-x',`${currentPX*12}px`);document.documentElement.style.setProperty('--parallax-y',`${currentPY*10}px`);
      hero.style.setProperty('--hero-mouse-shift-x',`${currentPX*7}px`);hero.style.setProperty('--hero-mouse-shift-y',`${currentPY*5}px`);
      parallaxNodes.forEach((node,i)=>node.style.setProperty('--mouse-depth',`${(i+1)*4}`));
      original(loop);
    };loop();
  }
})();

/* Cursor metadata for the existing interface, without changing visible copy. */
(function tagInteractiveElements(){
  $$('.resume-link').forEach(el=>el.dataset.cursor='RESUME');
  $$('.static-talk').forEach(el=>el.dataset.cursor='TALK');
  $$('.github-cta').forEach(el=>el.dataset.cursor='OPEN');
  $$('.footer-links a').forEach(el=>el.dataset.cursor='OPEN');
  $$('.filter-btn').forEach(el=>el.dataset.cursor='FILTER');
  $$('.text-link').forEach(el=>el.dataset.cursor='VIEW');
})();
