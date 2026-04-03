/* ═══════════════════════════════════════
   NEXUS PORTFOLIO — cursor.js
   Custom neon cursor behavior
═══════════════════════════════════════ */

(function () {
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand on interactive elements
  const interactiveSelector = 'a, button, .skill-card, .project-card, .contact-link, .filter-btn, input, textarea';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform      = 'translate(-50%,-50%) scale(1.8)';
      cursorRing.style.width      = '60px';
      cursorRing.style.height     = '60px';
      cursorRing.style.borderColor = 'rgba(0,245,255,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform      = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.width      = '36px';
      cursorRing.style.height     = '36px';
      cursorRing.style.borderColor = 'rgba(0,245,255,0.6)';
    });
  });
})();
