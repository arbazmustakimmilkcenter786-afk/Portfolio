const projects=[{title:'Interactive Business Performance Dashboard',category:'Data Analytics',description:'An interactive business intelligence dashboard for exploring commercial performance, KPIs, revenue trends, and operational bottlenecks.',tech:['Power BI','SQL','Power Query','Excel'],link:'#'},{title:'Mustakim Fast Food Services',category:'Web Development',description:'A localized business web presence combining website development, database setup, WordPress customization, and digital branding.',tech:['HTML','CSS','WordPress','MySQL'],link:'#'},{title:'MatchPoint — Resume & JD Matcher',category:'AI / NLP',description:'An AI-powered Streamlit application that compares resumes with job descriptions using embeddings, cosine similarity, keyword gaps, and ATS checks.',tech:['Python','Streamlit','NLP','Cosine Similarity'],link:'https://github.com/arbazmustakimmilkcenter786-afk'}];
const experiences=[{date:'2026 — Present',title:'IBM SkillsBuild Virtual Internship',subtitle:'Data Analytics with Generative AI · Remote',points:['Learning data analytics workflows enhanced by generative AI tools.','Applying GenAI techniques to cleaning, analysis, and reporting tasks.','Building practical experience with Power BI, SQL, and AI-assisted analytics.']},{date:'Oct 2025 — Present',title:'Freelance Data & Technical Specialist',subtitle:'Self-employed · Navi Mumbai, India',points:['Cleaning and transforming operational datasets using Advanced Excel.','Creating formula automations with XLOOKUP, INDEX MATCH, and validation workflows.','Designing reporting templates and dashboard support systems for clients.']}];
const skillData={Programming:{description:'Programming fundamentals used for analysis, automation, and web development.',items:[['Java',75],['SQL',85],['JavaScript',65],['HTML & CSS',90]]},'Analytics & BI':{description:'Tools and methods for turning raw information into useful business insights.',items:[['Power BI',80],['Advanced Excel',90],['Data Visualization',82],['Dashboard Development',78]]},Databases:{description:'Database concepts and tools for storing, querying, and validating information.',items:[['MySQL',75],['Database Queries',80],['Data Validation',78],['DBMS Concepts',72]]},'Tools & Platforms':{description:'Everyday tools used to build, organize, and deliver projects.',items:[['VS Code',90],['Git',65],['WordPress',70],['Microsoft Office',88]]}};
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function renderExperience(){ $('#timeline').innerHTML=experiences.map(e=>`<article class="timeline-item reveal"><div class="timeline-date">${e.date}</div><h3>${e.title}</h3><h4>${e.subtitle}</h4><ul>${e.points.map(p=>`<li>${p}</li>`).join('')}</ul></article>`).join(''); }
function renderProjects(filter='All'){const list=filter==='All'?projects:projects.filter(p=>p.category===filter);$('#projectsGrid').innerHTML=list.map((p,i)=>`<article class="project-card reveal"><div class="project-top"><span class="project-index">0${i+1}</span><span class="project-category">${p.category}</span></div><h3>${p.title}</h3><p>${p.description}</p><div class="tag-list">${p.tech.map(t=>`<span class="tag">${t}</span>`).join('')}</div><button class="project-open" data-title="${p.title}" data-category="${p.category}" data-description="${p.description}" data-tech="${p.tech.join('|')}" data-link="${p.link}">View details ↗</button></article>`).join(''); observeReveals(); $$('.project-open').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset)));}
function renderFilters(){const cats=['All',...new Set(projects.map(p=>p.category))];$('#filters').innerHTML=cats.map(c=>`<button class="filter-btn ${c==='All'?'active':''}">${c}</button>`).join('');$$('.filter-btn').forEach(b=>b.addEventListener('click',()=>{$$('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProjects(b.textContent)}));}
function renderSkills(){const names=Object.keys(skillData);$('#skillTabs').innerHTML=names.map((n,i)=>`<button class="skill-tab ${i===0?'active':''}">${n}</button>`).join('');const show=n=>{const d=skillData[n];$('#skillPanel').innerHTML=`<h3>${n}</h3><p>${d.description}</p><div class="skill-bars">${d.items.map(x=>`<div><div class="bar-line"><span>${x[0]}</span><span>${x[1]}%</span></div><div class="bar"><i style="width:${x[1]}%"></i></div></div>`).join('')}</div>`};show(names[0]);$$('.skill-tab').forEach(b=>b.addEventListener('click',()=>{$$('.skill-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');show(b.textContent)}));}
function openModal(d){$('#modalCategory').textContent=d.category;$('#modalTitle').textContent=d.title;$('#modalDescription').textContent=d.description;$('#modalTags').innerHTML=d.tech.split('|').map(t=>`<span class="tag">${t}</span>`).join('');$('#modalLink').href=d.link;$('#projectModal').classList.add('open');$('#projectModal').setAttribute('aria-hidden','false');}
function closeModal(){$('#projectModal').classList.remove('open');$('#projectModal').setAttribute('aria-hidden','true');}
function observeReveals(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal:not(.visible)').forEach(e=>io.observe(e));}
renderExperience();renderFilters();renderProjects();renderSkills();observeReveals();
const nav=$('#navbar'),progress=$('#scrollProgress'),back=$('#backTop');window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${(scrollY/h)*100}%`;nav.classList.toggle('scrolled',scrollY>20);back.classList.toggle('show',scrollY>500);$$('.nav-link').forEach(a=>{const sec=$(a.getAttribute('href'));a.classList.toggle('active',sec&&scrollY>=sec.offsetTop-130&&scrollY<sec.offsetTop+sec.offsetHeight-130)})});
$('#menuBtn').addEventListener('click',()=>$('#navMenu').classList.toggle('open'));$$('.nav-link').forEach(a=>a.addEventListener('click',()=>$('#navMenu').classList.remove('open')));$('#backTop').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));if($('#themeToggle')){
  $('#themeToggle').addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    $('#themeToggle').textContent=document.body.classList.contains('dark')?'☀':'☾';
  });
}$('#modalClose').addEventListener('click',closeModal);$('#projectModal').addEventListener('click',e=>{if(e.target.id==='projectModal')closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const counters=$$('.counter');const counterObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,target=+el.dataset.target;let n=0;const step=Math.max(1,Math.ceil(target/35));const timer=setInterval(()=>{n=Math.min(n+step,target);el.textContent=n+(target===100?'%':'');if(n>=target)clearInterval(timer)},30);counterObserver.unobserve(el)}}),{threshold:.7});counters.forEach(c=>counterObserver.observe(c));
$('#contactForm').addEventListener('submit',e=>{e.preventDefault();$('#formStatus').textContent='Thanks! Your message is ready to be connected to a backend.';e.target.reset()});document.addEventListener('mousemove',e=>{$('.cursor-glow').style.left=e.clientX+'px';$('.cursor-glow').style.top=e.clientY+'px'});


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
