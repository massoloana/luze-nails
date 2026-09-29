(function () {
  document.documentElement.classList.add('js');

  // Barra superior: toma fondo al scrollear
  var barra = document.getElementById('barra');
  function actualizarBarra() {
    barra.classList.toggle('con-fondo', window.scrollY > 40);
  }
  actualizarBarra();
  window.addEventListener('scroll', actualizarBarra, { passive: true });

  // Filtros de la galería
  var filtros = document.querySelectorAll('.filtro');
  var trabajos = document.querySelectorAll('.trabajo');
  filtros.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var filtro = boton.dataset.filtro;
      filtros.forEach(function (b) { b.setAttribute('aria-pressed', b === boton ? 'true' : 'false'); });
      trabajos.forEach(function (t) { t.hidden = filtro !== 'todos' && t.dataset.tipo !== filtro; });
    });
  });

  // Aparición suave de los bloques
  var aparecen = document.querySelectorAll('.aparece');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    aparecen.forEach(function (el) { obs.observe(el); });
  } else {
    aparecen.forEach(function (el) { el.classList.add('visible'); });
  }

  // Tarjeta de fidelidad: los sellos se van llenando en loop
  var sellos = document.querySelectorAll('#sellos .sello');
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quieto) {
    for (var i = 0; i < 4; i++) sellos[i].classList.add('ok');
  } else {
    var n = 0;
    setInterval(function () {
      if (n === sellos.length) {
        sellos.forEach(function (s) { s.classList.remove('ok'); });
        n = 0;
        return;
      }
      sellos[n].classList.add('ok');
      n++;
    }, 700);
  }

  document.getElementById('anio').textContent = new Date().getFullYear();

  // Si el navegador bloquea el mapa de Google, queda visible el dibujo con el enlace
  document.addEventListener('securitypolicyviolation', function (e) {
    if (/frame-src|child-src|default-src/.test(e.violatedDirective) && /google/.test(e.blockedURI)) {
      var mapa = document.querySelector('.mapa iframe');
      if (mapa) mapa.remove();
    }
  });
})();
