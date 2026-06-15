/* HELGTRE · old-school kitsch behaviours */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
