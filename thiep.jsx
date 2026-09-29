/* Browser-native JavaScript, intentionally valid without JSX compilation.
 * Open index.html directly. No React, GSAP or icon-library dependency.
 * Fill PARTY.date and the second venue when those details are confirmed.
 */
(() => {
  'use strict';
  const PARTY = { date: null, dressCode: 'Lên đồ thật chất. Mang theo năng lượng thật cháy.' };
  const STOPS = [
    { theme: 'amber', time: '19:00', title: 'The Gangs Central', kicker: 'Nâng ly cùng đồng đội', address: '87 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM', note: 'Gặp nhau, ăn thật ngon và nâng ly cho những gì chúng ta đã cùng làm được.' },
    { theme: 'violet', time: '23:00', title: 'Hẹn nhau dưới ánh đèn', kicker: 'Đêm còn dài, mình còn cháy', address: 'Địa điểm club sẽ được bật mí sớm trong nhóm. Cứ lên đồ, phần còn lại để cả đội lo.', note: 'Sau bữa tiệc, mình nối tiếp cuộc vui bằng âm nhạc và những bước nhảy hết mình.' }
  ];
  const app = document.getElementById('app');
  if (!app) return;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let svgId = 0;
  function trophy(tone = 'gold', cls = '') {
    const id = `metal-${svgId++}`;
    const colors = tone === 'bronze' ? ['#fff0c5','#e0a473','#75462c','#dfaa7b'] : tone === 'silver' ? ['#ffffff','#c2ced5','#566773','#e5edf4'] : ['#fffad3','#ffdb65','#926017','#fbe39a'];
    return `<svg class="${cls}" viewBox="0 0 240 280" fill="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="43" y1="80" x2="196" y2="125" gradientUnits="userSpaceOnUse"><stop stop-color="${colors[0]}"/><stop offset=".27" stop-color="${colors[1]}"/><stop offset=".55" stop-color="${colors[2]}"/><stop offset=".82" stop-color="${colors[1]}"/><stop offset="1" stop-color="${colors[3]}"/></linearGradient></defs><g stroke="${colors[1]}" stroke-width="9"><path d="M65 61H30v30c0 35 22 51 49 51"/><path d="M175 61h35v30c0 35-22 51-49 51"/></g><path d="M60 43h120l-9 70c-3 32-20 49-44 55v35h27v17H86v-17h27v-35c-24-6-41-23-44-55z" fill="url(#${id})"/><ellipse cx="120" cy="43" rx="60" ry="12" fill="${colors[3]}"/><ellipse cx="120" cy="43" rx="50" ry="6" fill="${colors[2]}"/><path d="M79 59l7 49c3 20 9 31 17 37" stroke="white" stroke-opacity=".45" stroke-width="4"/><path d="m120 73 7 15 17 2-12 12 3 17-15-8-15 8 3-17-12-12 17-2z" fill="${colors[0]}" opacity=".8"/><path d="M76 221h88l9 27H67z" fill="url(#${id})"/><rect x="63" y="246" width="114" height="13" rx="3" fill="${colors[2]}"/><rect x="92" y="228" width="56" height="14" rx="1" fill="${colors[0]}" opacity=".7"/></svg>`;
  }
  const letters = (text, offset=0) => [...text].map((letter,i)=>`<span class="jump" style="--i:${i+offset}">${letter}</span>`).join('');
  const awards = [
    ['gold','Giải Nhất','01 / RỰC RỠ NHẤT','Hành Trình Khát Vọng'],
    ['bronze','Giải Ba','02 / HẾT MÌNH','Tốp ca Chí Lớn Dựng Cơ Đồ'],
    ['bronze','Giải Ba','03 / BỨT PHÁ','Tứ ca Giọt Tiềm Năng'],
    ['bronze','Giải Ba','04 / TỎA SÁNG','Sáng tác Nhạc Giọt Tiềm Năng'],
    ['silver','Khuyến khích','05 / ĐÁNG TỰ HÀO','Sáng tác Nhạc Chí Lớn Dựng Cơ Đồ']
  ];
  function renderInvitations() {
    return `<div class="invitation-deck" aria-label="Lịch hẹn hai tăng">
      <div class="invitation-window">${STOPS.map((stop,i)=>`
        <article class="invitation ${stop.theme}" data-stop="${i}" ${i?'hidden':''}>
          <button class="envelope-cover" aria-expanded="false" aria-controls="invite-details-${i}">
            <span class="envelope-top">THE ENCORE / TĂNG 0${i+1}<b>${stop.time}</b></span>
            <span class="envelope-flap" aria-hidden="true"></span>
            <span class="envelope-seal" aria-hidden="true">✳</span>
            <span class="envelope-caption"><strong>${stop.kicker}</strong><span>CHẠM ĐỂ MỞ THIỆP ↗</span></span>
          </button>
          <div class="invite-details" id="invite-details-${i}" hidden>
            <div class="ticket-top"><span>TĂNG 0${i+1} / ${i?'AFTER HOURS':'DINNER & CHEERS'}</span><span>✦ YOU’RE INVITED</span></div>
            <div class="invite-heading"><span class="invite-time">${stop.time}</span><button class="close-envelope" aria-label="Gấp lại thiệp tăng ${i+1}">Gấp thiệp ↙</button></div>
            <h3>${stop.title}</h3><p class="invite-address">${stop.address}</p>
            <p class="invite-note">${stop.note}</p>
            <div class="invite-meta"><span>NGÀY HẸN</span><strong>${escapeHTML(PARTY.date||'Sẽ thông báo trong nhóm')}</strong></div>
            <div class="invite-meta"><span>DRESS CODE</span><strong>${escapeHTML(PARTY.dressCode)}</strong></div>
            <div class="ticket-foot"><span>ĐỦ MẶT MỚI ĐỦ VUI.</span><span class="mini-bars" aria-hidden="true"></span></div>
          </div>
        </article>`).join('')}</div>
      <div class="invitation-controls"><span class="stop-count" role="status" aria-live="polite">01 / 02 · TĂNG 1</span><div><button id="previous-stop" aria-label="Xem thiệp tăng 1" disabled>↑</button><button id="next-stop" aria-label="Xem thiệp tăng 2">↓</button></div></div>
    </div>`;
  }
  app.innerHTML = `
    <div class="world" aria-hidden="true"><div class="aura gold-aura"></div><div class="aura club-aura"></div><div class="orbit"></div><div class="orbit two"></div><div class="coordinates">GOOD PEOPLE / GREAT MEMORIES / ALL THE WAY UP</div><div class="grid-floor"></div><div class="beam"></div><div class="beam b2"></div></div>
    <canvas id="particles" aria-hidden="true"></canvas>
    <div class="boot-intro" role="dialog" aria-modal="true" aria-label="Mở màn: System load, We Slayed">
      <div class="boot-scanlines" aria-hidden="true"></div>
      <div class="boot-content">
        <p class="boot-label">ESTABLISHING CONNECTION / OUR MOMENT</p>
        <div class="boot-title" data-text="SYSTEM LOAD…" aria-hidden="true">SYSTEM LOAD…</div>
        <div class="boot-track" aria-hidden="true"><span></span></div>
        <p class="boot-status" role="status">Đang khởi động đêm của chúng ta…</p>
      </div>
      <button class="boot-skip">Bỏ qua mở màn ↗</button>
    </div>
    <main id="main" inert>
      <section class="scene" data-scene="0" aria-labelledby="hero-title"><div class="intro-corner">VOL. 01 / THE VICTORY LAP</div><div class="hero-layout"><div class="hero-copy"><div class="eyebrow">Dành cho những người đã hết mình</div><h1 class="hero-title" id="hero-title" aria-label="WE SLAY."><span class="word" aria-hidden="true">${letters('WE')}</span><span class="word slay" aria-hidden="true">${letters('SLAY.',2)}</span></h1><div class="hero-bottom"><span class="little-star" aria-hidden="true">✳</span><p class="copy"><strong>Chúng ta không chỉ bước lên sân khấu.<br>Chúng ta đã để lại dấu ấn.</strong><br>Và đây là khoảnh khắc của tất cả chúng ta.</p></div><div class="actions"><button class="primary" data-go="1">MỞ KHÓA CHIẾN TÍCH <span>↗</span></button><span class="hint">01 / MỘT HÀNH TRÌNH ĐÁNG NHỚ</span></div></div><div class="hero-art" aria-hidden="true"><div class="art-ring"></div><div class="art-ring r2"></div><span class="art-cross">✦</span><span class="art-cross second">✳</span>${trophy('gold','hero-trophy')}<span class="sticker lime">100% TEAM ENERGY ↗</span><span class="sticker outline">BORN TO SHINE.</span><span class="barcode"></span><span class="art-label">THE STAGE WAS OURS. SO IS TONIGHT.</span></div></div><div class="marquee" aria-hidden="true"><div class="marquee-track">${Array.from({length:4},()=>'<span>WE SHOWED UP <b>✳</b> WE GAVE IT ALL <b>✳</b> WE MADE IT <b>✳</b> NOW WE CELEBRATE <b>✳</b></span>').join('')}</div></div></section>
      <section class="scene" data-scene="1" hidden aria-labelledby="awards-title"><div class="section-head"><div><div class="eyebrow">01 / Những nỗ lực đã thành hình</div><h2 class="section-title" id="awards-title" tabindex="-1">Hết mình.<br><em>Hái vinh quang.</em></h2></div><p class="copy">Từ những buổi tập đến ánh đèn sân khấu.<br><strong>5 giải thưởng. Một tinh thần đồng đội.</strong></p></div><div class="award-grid">${awards.map(([tone,title,label,performance],i)=>`<article class="award-card" style="--i:${i}"><span class="award-no">${label}</span>${trophy(tone,'award-icon')}<h3>${title}</h3><p class="performance-name">${performance}</p></article>`).join('')}</div><div class="award-total"><p>01 NHẤT &nbsp; / &nbsp; 03 BA &nbsp; / &nbsp; 01 KHUYẾN KHÍCH</p><div class="actions"><button class="text-button" id="celebrate">Thêm một tràng pháo hoa ✳</button><button class="primary" data-go="2">GỬI NHỮNG NGƯỜI ĐỒNG ĐỘI <span>↗</span></button></div></div></section>
      <section class="scene" data-scene="2" hidden aria-labelledby="letter-title"><div class="letter-layout"><div class="letter-heading"><div class="eyebrow">02 / Behind every spotlight</div><h2 class="section-title" id="letter-title" tabindex="-1">Cúp là của đội.<br><em>Tự hào là<br>của chúng ta.</em></h2><p class="copy">Có những điều ánh đèn sân khấu không chiếu tới. Nhưng chúng ta đều nhớ.</p><span class="scribble">THIS ONE'S FOR YOU ↗</span></div><article class="letter-paper"><div class="letter-meta"><span>MỘT LÁ THƯ, THẬT LÒNG.</span><span>♥ / TO OUR TEAM</span></div><h3>Gửi những người đã cùng cháy,</h3><p>Cảm ơn những buổi tập đến quên giờ, những lần làm lại “thêm một lần nữa”, và cả những lúc mệt nhưng chẳng ai bỏ cuộc.</p><p>Từ người đứng giữa sân khấu đến những người lặng lẽ phía sau, <strong>mỗi người đều là một phần không thể thiếu</strong> của chiến thắng này.</p><p><strong>1 giải Nhất, 3 giải Ba và 1 giải Khuyến khích.</strong> Đó là thành tích. Còn điều tuyệt nhất là chúng ta đã cùng nhau làm được.</p><p>Sân khấu đã hạ màn. Giờ thì cất những lo lắng đi, giữ lại niềm tự hào và dành một đêm thật vui cho chính mình nhé!</p><div class="signature"><strong>Thương và tự hào về cả đội.</strong><span>✳</span></div><p class="tiny">P.S. Chương tiếp theo cần bạn lên đồ thật chất.</p></article></div><div class="actions"><button class="text-button" data-go="1">← Ngắm lại chiến tích</button><button class="primary fire-button" data-go="3"><span class="fire-label">ĐỌC XONG RỒI. LÊN ĐỒ! ↗</span><span class="button-flames" aria-hidden="true">${Array.from({length:12},(_,i)=>`<i style="--f:${i}"></i>`).join('')}</span></button></div></section>
      <section class="scene" data-scene="3" hidden aria-labelledby="party-title"><div class="party-layout"><div><div class="eyebrow">03 / After the stage, after dark</div><h2 class="party-title" id="party-title" tabindex="-1">LIGHTS OFF.<span>NIGHT ON.</span></h2><span class="party-tag">HẾT DIỄN RỒI. GIỜ TỚI LƯỢT MÌNH VUI.</span><p class="copy party-copy">Một đêm để nâng ly, kể lại những pha hú hồn và ăn mừng như cách chúng ta đã diễn:<br><strong>Hết mình. Hết cỡ. Cùng nhau.</strong></p><div class="actions"><button class="rsvp-button" id="confirm-attendance" aria-pressed="false" aria-describedby="rsvp-note"><span class="rsvp-inner"><span class="rsvp-front">🔥 XÁC NHẬN THAM GIA</span><span class="rsvp-back" aria-hidden="true">🔥 Game On!</span></span></button><button class="text-button" id="party-burst">Bật mood ✦</button></div><p class="rsvp-note" id="rsvp-note" role="status">Xác nhận được lưu trên thiết bị này, chưa gửi tới ban tổ chức.</p><p class="hint" style="margin-top:23px"><span class="equalizer" aria-hidden="true">${Array.from({length:5},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</span>GOOD VIBES ONLY / NO ONE LEFT BEHIND</p></div><div class="party-right"><div class="disco" aria-hidden="true"><canvas id="disco"></canvas><span class="disco-flare"></span></div>${renderInvitations()}</div></div></section>
    </main>
    <div class="transition-veil" aria-hidden="true"></div><div class="toast" role="status" aria-live="polite"></div>`;

  // Layer decorative details around the existing content, keeping the reading order intact.
  document.querySelector('.boot-intro').insertAdjacentHTML('afterbegin', '<div class="boot-orbit" aria-hidden="true"><span>✳</span></div><span class="boot-edition" aria-hidden="true">THE ENCORE / VICTORY SEQUENCE</span>');
  document.querySelectorAll('.award-card').forEach((card,i)=>{
    card.dataset.tone=awards[i][0];
    card.insertAdjacentHTML('beforeend', `<span class="award-spark s1" aria-hidden="true">✦</span><span class="award-spark s2" aria-hidden="true">✧</span><span class="award-pedestal" aria-hidden="true"></span><button class="award-touch" aria-label="Ăn mừng ${awards[i][1]}${i>0&&i<4?' số '+i:''}"><span>CHẠM ĐỂ TỎA SÁNG ↗</span></button>`);
  });
  document.querySelector('.letter-heading').insertAdjacentHTML('beforeend', `
    <div class="memory-stack" aria-label="Những điều làm nên chúng ta">
      <div class="memory-card"><span>01 / THE REHEARSALS</span><strong>Tập thêm<br>một lần nữa.</strong><i aria-hidden="true">↗</i></div>
      <div class="memory-card"><span>02 / THE MOMENT</span><strong>Cùng nhau.<br>Và làm được.</strong><i aria-hidden="true">✳</i></div>
    </div>`);
  document.querySelector('.letter-paper').insertAdjacentHTML('beforeend', `
    <div class="letter-reaction"><button id="send-love" aria-pressed="false"><span aria-hidden="true">♡</span> Giữ lại một trái tim</button><span class="letter-postmark" aria-hidden="true">ALL HEART<br>ALL TEAM ✳</span></div>`);
  document.querySelector('[data-scene="2"]').insertAdjacentHTML('afterbegin','<div class="letter-watermark" aria-hidden="true">TOGETHER.</div><span class="letter-float-star" aria-hidden="true">✳</span>');
  const heroArt=document.querySelector('.hero-art');
  heroArt.removeAttribute('aria-hidden');
  heroArt.querySelectorAll('div,span').forEach(el=>el.setAttribute('aria-hidden','true'));
  heroArt.insertAdjacentHTML('beforeend','<button class="hero-celebrate" aria-label="Chạm cúp để ăn mừng"><span>CHẠM CÚP ĐỂ ĂN MỪNG ✦</span></button>');

  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let calm = reducedQuery.matches;
  let current = 0, switching = false, toastTimer, pointer = {x: .65, y: .3};
  const scenes = [...document.querySelectorAll('.scene')];
  const veil = document.querySelector('.transition-veil');
  function syncMotion() {
    document.body.classList.toggle('calm', calm);
  }
  syncMotion();
  reducedQuery.addEventListener('change', event => {calm=event.matches;syncMotion();if(calm){sparks.length=0;finishIntro();}});
  function toast(message) { clearTimeout(toastTimer); const el=document.querySelector('.toast');el.textContent=message;el.classList.add('visible');toastTimer=setTimeout(()=>el.classList.remove('visible'),3600); }
  function go(next) {
    if (switching || next === current || next < 0 || next > 3) return;
    switching = true;
    document.querySelectorAll('[data-go]').forEach(button => button.disabled=true);
    veil.textContent = ['WE SLAY.','WE WON.','WITH LOVE.','LET’S PARTY.'][next];
    veil.style.background = next===3 ? '#d4b0ff' : '#d8ff3e';
    veil.classList.remove('run'); void veil.offsetWidth; veil.classList.add('run');
    setTimeout(() => {
      scenes[current].hidden = true;
      current=next;
      sparks=[];
      document.body.classList.remove('mode-0','mode-1','mode-2','mode-3');
      document.body.classList.add(`mode-${next}`);
      scenes[next].hidden=false;
      scenes[next].classList.remove('enter');void scenes[next].offsetWidth;scenes[next].classList.add('enter');
      window.scrollTo({top:0,behavior:'instant'});
      const heading=scenes[next].querySelector('h1,h2');heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
      if(next===1 || next===3) celebrate();
      // Release entry animation transforms so pointer tilt works after the reveal.
      setTimeout(()=>scenes[next].classList.remove('enter'),1200);
    },calm?0:430);
    setTimeout(()=>{switching=false;veil.classList.remove('run');document.querySelectorAll('[data-go]').forEach(button=>button.disabled=false);},calm?40:950);
  }
  document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>go(Number(button.dataset.go))));
  document.querySelector('#celebrate').addEventListener('click',celebrate);
  document.querySelector('#party-burst').addEventListener('click',celebrate);
  document.querySelector('.hero-celebrate').addEventListener('click',celebrate);
  let lastAwardBurst=0;
  document.querySelectorAll('.award-touch').forEach((button,i)=>button.addEventListener('click',()=>{
    if(Date.now()-lastAwardBurst<450)return;
    lastAwardBurst=Date.now();
    const card=button.closest('.award-card'),box=card.getBoundingClientRect();
    card.classList.remove('celebrating');void card.offsetWidth;card.classList.add('celebrating');
    burst(box.left+box.width/2,box.top+box.height*.42,50);
    toast(`${awards[i][1]}, ${awards[i][3]}. Tự hào về cả đội!`);
  }));
  document.querySelector('#send-love').addEventListener('click',event=>{
    const button=event.currentTarget,loved=button.getAttribute('aria-pressed')!=='true';
    button.setAttribute('aria-pressed',String(loved));
    button.innerHTML=loved?'<span aria-hidden="true">♥</span> Đã giữ lại trong tim':'<span aria-hidden="true">♡</span> Giữ lại một trái tim';
    if(loved){const box=button.getBoundingClientRect();burst(box.left+box.width/2,box.top,32);}
  });
  const rsvpButton=document.querySelector('#confirm-attendance');
  const rsvpNote=document.querySelector('#rsvp-note');
  const rsvpKey='the-encore-attendance-v1';
  let confirmed=false;
  try{confirmed=localStorage.getItem(rsvpKey)==='yes';}catch{}
  function displayConfirmation(){
    rsvpButton.classList.toggle('confirmed',confirmed);
    rsvpButton.setAttribute('aria-pressed',String(confirmed));
    rsvpButton.setAttribute('aria-label',confirmed?'Game On! Nhấn để bỏ xác nhận':'Xác nhận tham gia');
    rsvpButton.querySelector('.rsvp-front').setAttribute('aria-hidden',String(confirmed));
    rsvpButton.querySelector('.rsvp-back').setAttribute('aria-hidden',String(!confirmed));
    rsvpNote.textContent=confirmed?'Bạn đã chọn tham gia trên thiết bị này. Nhắn vào nhóm để cả đội biết nhé!':'Xác nhận được lưu trên thiết bị này, chưa gửi tới ban tổ chức.';
  }
  displayConfirmation();
  rsvpButton.addEventListener('click',()=>{
    confirmed=!confirmed;displayConfirmation();
    try{localStorage.setItem(rsvpKey,confirmed?'yes':'no');}catch{rsvpNote.textContent='Lựa chọn chỉ được giữ trong lần mở trang này. Nhắn vào nhóm để cả đội biết nhé!';}
    if(confirmed)celebrate();
  });
  const invitations=[...document.querySelectorAll('.invitation')];
  let activeStop=0,envelopeBusy=false,stopBusy=false;
  const prevStop=document.querySelector('#previous-stop'),nextStop=document.querySelector('#next-stop');
  function updateStopButtons(){prevStop.disabled=activeStop===0||envelopeBusy||stopBusy;nextStop.disabled=activeStop===1||envelopeBusy||stopBusy;}
  invitations.forEach(card=>{
    const cover=card.querySelector('.envelope-cover'),details=card.querySelector('.invite-details');
    cover.addEventListener('click',()=>{
      if(envelopeBusy||stopBusy)return;
      envelopeBusy=true;cover.disabled=true;cover.classList.add('unsealing');updateStopButtons();
      setTimeout(()=>{
        cover.hidden=true;cover.disabled=false;cover.setAttribute('aria-expanded','true');
        details.hidden=false;card.classList.add('is-open');
        details.querySelector('.close-envelope').focus({preventScroll:true});
        envelopeBusy=false;updateStopButtons();
      },calm?0:550);
    });
    card.querySelector('.close-envelope').addEventListener('click',()=>{
      details.hidden=true;cover.hidden=false;cover.classList.remove('unsealing');cover.setAttribute('aria-expanded','false');card.classList.remove('is-open');cover.focus({preventScroll:true});
    });
  });
  function selectStop(next){
    if(next===activeStop||next<0||next>=invitations.length||envelopeBusy||stopBusy)return;
    const direction=next>activeStop?1:-1;
    invitations[activeStop].hidden=true;activeStop=next;
    const card=invitations[next];card.style.setProperty('--slide-from',`${direction*45}px`);card.hidden=false;
    card.classList.remove('stop-arrive');void card.offsetWidth;card.classList.add('stop-arrive');
    document.querySelector('.stop-count').textContent=`0${next+1} / 02 · TĂNG ${next+1}`;
    stopBusy=true;updateStopButtons();
    setTimeout(()=>{
      stopBusy=false;card.classList.remove('stop-arrive');updateStopButtons();
      card.querySelector(card.classList.contains('is-open')?'.close-envelope':'.envelope-cover').focus({preventScroll:true});
    },calm?0:450);
  }
  prevStop.addEventListener('click',()=>selectStop(activeStop-1));
  nextStop.addEventListener('click',()=>selectStop(activeStop+1));
  document.querySelector('.invitation-controls').addEventListener('keydown',event=>{
    if(event.key==='ArrowUp'||event.key==='ArrowDown'){event.preventDefault();selectStop(activeStop+(event.key==='ArrowDown'?1:-1));}
  });
  window.addEventListener('pointermove',event=>{pointer={x:event.clientX/innerWidth,y:event.clientY/innerHeight};},{passive:true});
  // Card lighting follows the pointer; touch and keyboard users get the same celebration buttons.
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.award-card,.letter-paper,.hero-art,.ticket').forEach(el=>{
    el.addEventListener('pointermove',event=>{
      if(calm||!finePointer.matches)return;
      const rect=el.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
      el.style.setProperty('--light-x',`${x*100}%`);el.style.setProperty('--light-y',`${y*100}%`);
      el.style.setProperty('--tilt-x',`${(y-.5)*-5}deg`);el.style.setProperty('--tilt-y',`${(x-.5)*6}deg`);
    },{passive:true});
    el.addEventListener('pointerleave',()=>{el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg');el.style.setProperty('--light-x','50%');el.style.setProperty('--light-y','35%');});
  });

  // One animation loop for ambient dust, confetti, fireworks and spherical mirrors.
  const canvas=document.querySelector('#particles'), ctx=canvas.getContext('2d');
  const disco=document.querySelector('#disco'), dc=disco.getContext('2d');
  let width=innerWidth,height=innerHeight,dpr=1,sparks=[],last=0,lastPaint=0;
  const dust=Array.from({length:44},()=>({x:Math.random(),y:Math.random(),s:.5+Math.random()*1.7,v:.006+Math.random()*.018,phase:Math.random()*6}));
  function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);disco.width=disco.height=280*dpr;dc?.setTransform(dpr,0,0,dpr,0,0);}
  window.addEventListener('resize',resize,{passive:true});resize();
  function burst(x,y,count=65){if(calm)return;const palette=current===3?['#d4b0ff','#fff','#ff87bd','#d8ff3e']:['#ffdd75','#d8ff3e','#fff3c1','#e6a168'];for(let i=0;i<count;i++){const angle=Math.random()*Math.PI*2,speed=90+Math.random()*280;sparks.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-80,life:1.1+Math.random()*1.3,total:2.4,color:palette[i%4],size:2+Math.random()*4,rotation:Math.random()*6,confetti:i%3===0});}sparks=sparks.slice(-400);}
  function celebrate(){if(calm){toast('✦ 1 Nhất · 3 Ba · 1 Khuyến khích. Tự hào về cả đội!');return;}burst(width*.25,height*.35);burst(width*.73,height*.28);}
  // Project tile corners on a sphere, cull its back side, shade by rotating normal.
  function drawDisco(time){
    if(!dc)return;dc.clearRect(0,0,280,280);
    const cx=140,cy=140,r=116,rotation=calm?0:time*.00028;
    const halo=dc.createRadialGradient(cx,cy,70,cx,cy,138);halo.addColorStop(0,'#d9c7ff18');halo.addColorStop(.8,'#e3caff12');halo.addColorStop(1,'#d9c7ff00');dc.fillStyle=halo;dc.fillRect(0,0,280,280);
    dc.beginPath();dc.arc(cx,cy,r,0,Math.PI*2);dc.fillStyle='#151322';dc.fill();
    const rows=23,cols=44;
    function point(lat,lon){return {x:cx+r*Math.cos(lat)*Math.sin(lon),y:cy+r*Math.sin(lat),z:Math.cos(lat)*Math.cos(lon)};}
    for(let row=0;row<rows;row++){
      const lat1=-Math.PI/2+row*Math.PI/rows+.01,lat2=-Math.PI/2+(row+1)*Math.PI/rows-.01;
      for(let col=0;col<cols;col++){
        const lon1=col*Math.PI*2/cols+rotation+.012,lon2=(col+1)*Math.PI*2/cols+rotation-.012;
        const lat=(lat1+lat2)/2,lon=(lon1+lon2)/2;
        const nx=Math.cos(lat)*Math.sin(lon),ny=Math.sin(lat),nz=Math.cos(lat)*Math.cos(lon);
        if(nz<=.02)continue;
        const light=Math.max(0,-nx*.48-ny*.55+nz*.68);
        const spec=Math.pow(Math.max(0,-nx*.42-ny*.38+nz*.82),38);
        const variation=Math.sin(row*51+col*13)*10;
        const value=Math.min(99,16+light*56+spec*70+variation);
        dc.fillStyle=`hsl(${245+Math.sin(col*3+row)*20} ${spec>.3?8:15}% ${value}%)`;
        const pts=[point(lat1,lon1),point(lat1,lon2),point(lat2,lon2),point(lat2,lon1)];
        dc.beginPath();pts.forEach((p,i)=>i?dc.lineTo(p.x,p.y):dc.moveTo(p.x,p.y));dc.closePath();dc.fill();
      }
    }
    const gloss=dc.createRadialGradient(98,95,0,98,95,35);gloss.addColorStop(0,'#ffffffed');gloss.addColorStop(.15,'#fff9');gloss.addColorStop(1,'#fff0');dc.fillStyle=gloss;dc.fillRect(60,57,80,80);
    dc.strokeStyle='#eee3ff66';dc.lineWidth=.7;dc.beginPath();dc.arc(cx,cy,r,0,Math.PI*2);dc.stroke();
  }
  function frame(time){
    requestAnimationFrame(frame);
    if(document.hidden){last=time;return;}
    if(time-lastPaint<(calm?180:32))return;
    const dt=Math.min((time-(last||time))/1000,.05);last=time;lastPaint=time;
    if(ctx){ctx.clearRect(0,0,width,height);
      for(const p of dust){if(!calm)p.y=(p.y-dt*p.v+1)%1;const alpha=calm?.25:.14+(Math.sin(time*.0006+p.phase)+1)*.14;ctx.fillStyle=current===3?`rgba(220,185,255,${alpha})`:`rgba(221,245,161,${alpha})`;ctx.beginPath();ctx.arc(p.x*width+(calm?0:(pointer.x-.5)*p.s*8),p.y*height,p.s,0,Math.PI*2);ctx.fill();}
      if(current===3&&!calm){for(let i=0;i<14;i++){const x=width*(.5+.48*Math.sin(time*.00014+i*2.1)),y=height*(.5+.48*Math.cos(time*.00019+i*1.6));const light=ctx.createRadialGradient(x,y,0,x,y,13);light.addColorStop(0,'#e4c9ff45');light.addColorStop(1,'#e4c9ff00');ctx.fillStyle=light;ctx.fillRect(x-13,y-13,26,26);}}
      for(const p of sparks){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=135*dt;p.vx*=.99;p.rotation+=dt*3;ctx.globalAlpha=Math.max(0,Math.min(1,p.life));ctx.fillStyle=p.color;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rotation);ctx.fillRect(-p.size/2,-p.size/2,p.size,p.confetti?p.size*2.5:p.size);ctx.restore();}ctx.globalAlpha=1;sparks=sparks.filter(p=>p.life>0);
    }
    if(current===3)drawDisco(time);
  }
  requestAnimationFrame(frame);
  // Loading text -> letter replacement + lime/ivory glitch -> zoom through.
  // Timers are owned by the intro so skipping cannot leave a late overlay or locked page.
  const intro = document.querySelector('.boot-intro');
  const introTitle = document.querySelector('.boot-title');
  const introStatus = document.querySelector('.boot-status');
  const main = document.querySelector('#main');
  const introTimers = [];
  let introDone = false;
  document.body.classList.add('booting');
  function later(callback, delay) { introTimers.push(setTimeout(callback, delay)); }
  function setIntroText(text) {introTitle.textContent=text;introTitle.dataset.text=text;}
  function finishIntro() {
    if(introDone)return;
    introDone=true;
    introTimers.forEach(clearTimeout);
    intro.remove();
    main.inert=false;
    document.body.classList.remove('booting');
    const heading=document.querySelector('#hero-title');
    heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
    if(!calm)burst(width*.75,height*.4,60);
  }
  document.querySelector('.boot-skip').addEventListener('click',finishIntro);
  intro.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();finishIntro();}
    if(event.key==='Tab'){event.preventDefault();document.querySelector('.boot-skip')?.focus();}
  });
  document.querySelector('.boot-skip').focus({preventScroll:true});
  if(calm){
    later(()=>{setIntroText('WE SLAYED');introStatus.textContent='Khoảnh khắc này là của chúng ta.';},350);
    later(finishIntro,1000);
  }else{
    const from='SYSTEM LOAD…',to='WE SLAYED',steps=Math.max(from.length,to.length);
    later(()=>{intro.classList.add('morphing');introStatus.textContent='Connection established. Victory unlocked.';},1500);
    for(let i=1;i<=steps;i++)later(()=>setIntroText(to.slice(0,i)+from.slice(i)),1500+i*1000/steps);
    later(()=>{setIntroText(to);intro.classList.remove('morphing');intro.classList.add('resolved');introStatus.textContent='Khoảnh khắc này là của chúng ta.';},2500);
    later(()=>intro.classList.add('zooming'),3000);
    later(finishIntro,4000);
  }
})();
