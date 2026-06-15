/* HELGTRE · old-school kitsch behaviours */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- professional frisbee cursor (side view) ---- */
  if(!reduce){
    var disc = document.createElement('div');
    disc.id = 'disc-cursor';
    // Realistic Ultimate disc side profile: white with blue accent, clear dome + rim
    disc.innerHTML = '<svg viewBox="0 0 110 34" xmlns="http://www.w3.org/2000/svg">'
      // drop shadow
      + '<ellipse cx="55" cy="31" rx="46" ry="3.5" fill="rgba(0,0,0,0.22)"/>'
      // rim underside
      + '<ellipse cx="55" cy="26" rx="50" ry="7" fill="#c8d0e0"/>'
      // flight plate top
      + '<ellipse cx="55" cy="23" rx="50" ry="7" fill="#eef2ff" stroke="#b0bcd8" stroke-width="0.6"/>'
      // dome
      + '<path d="M12 23 Q55 3 98 23" fill="#dde6ff" stroke="#b0bcd8" stroke-width="0.7"/>'
      // dome highlight (gloss)
      + '<path d="M28 16 Q55 6 82 16" fill="none" stroke="rgba(255,255,255,0.95)" stroke-width="2.5" stroke-linecap="round"/>'
      // blue accent ring
      + '<ellipse cx="55" cy="22" rx="22" ry="4.5" fill="none" stroke="#2B55E0" stroke-width="1.4"/>'
      // centre hub
      + '<ellipse cx="55" cy="22" rx="7" ry="2.2" fill="#2B55E0" opacity="0.5"/>'
      // rim edge highlight
      + '<ellipse cx="55" cy="23" rx="50" ry="7" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="0.8"/>'
      + '</svg>';
    document.body.appendChild(disc);

    var mx=-200, my=-200, cx=-200, cy=-200, tilt=0, prevX=-200;
    document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; }, {passive:true});

    (function fly(){
      var dx = mx - cx;
      cx += dx * 0.045;
      cy += (my - cy) * 0.045;
      // tilt based on horizontal velocity
      tilt += (dx * 0.6 - tilt) * 0.08;
      disc.style.transform = 'translate('+cx+'px,'+cy+'px) rotateZ('+Math.max(-22,Math.min(22,tilt))+'deg)';
      requestAnimationFrame(fly);
    })();
  }

  /* ---- cursor trail dots ---- */
  if(!reduce){
    var last=0;
    document.addEventListener('mousemove', function(e){
      var now=Date.now();
      if(now-last<28) return;
      last=now;
      var d=document.createElement('div');
      d.className='trail-dot';
      d.style.left=e.clientX+'px';
      d.style.top=e.clientY+'px';
      var s=0.55+Math.random()*0.9;
      d.style.width=(9*s)+'px'; d.style.height=(9*s)+'px';
      document.body.appendChild(d);
      setTimeout(function(){ d.remove(); }, 620);
    }, {passive:true});
  }

  /* ---- mobile menu ---- */
  document.addEventListener('click', function(e){
    var b=e.target.closest('.burger');
    if(b){
      var links=document.querySelector('.nav-links');
      if(links) links.classList.toggle('open');
    }
  });

  /* ---- contact form ---- */
  function wireForm(){
    var f=document.getElementById('joinform');
    if(!f) return;
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var box=document.getElementById('formwrap');
      var name=(f.querySelector('[name=naam]')||{}).value||'speler';
      box.innerHTML='<div class="sent"><h3>Tot op het veld, '+name.replace(/[<>]/g,'')+'! ✶</h3>'+
        '<p>We hebben je bericht binnen. Kom gerust al langs op de eerstvolgende training — maandag of vrijdag, 20u. Eerste keer gratis, geen inschrijving nodig.</p></div>';
    });
  }
  if(document.readyState!=='loading') wireForm();
  else document.addEventListener('DOMContentLoaded', wireForm);
})();
