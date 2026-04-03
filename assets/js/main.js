/* ═══════════════════════════════
   GALIH PORTFOLIO — main.js
═══════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Progress ── */
  const bar = document.getElementById('scrollProgress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / max * 100) + '%';
    }, { passive: true });
  }

  /* ── Active Nav ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === page) a.classList.add('active');
  });

  /* ── Generic Reveal on Scroll ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Skill Bars ── */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
          setTimeout(() => { fill.style.width = fill.dataset.pct + '%'; }, 100);
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skills-list').forEach(el => skillObs.observe(el));

  /* ── Timeline ── */
  const tlObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        tlObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.timeline-item').forEach(el => tlObs.observe(el));

  /* ── Project Cards ── */
  const projObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        projObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.project-card').forEach(el => projObs.observe(el));

  /* ── Project Filter ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
      });
    });
  });

  /* ── Contact form feedback ── */
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitBtn.textContent = '✓  Pesan Terkirim';
      submitBtn.style.background = '#2d6a4f';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = 'Kirim Pesan →';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    });
  }

});
