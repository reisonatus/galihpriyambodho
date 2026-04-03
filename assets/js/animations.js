/* ═══════════════════════════════════════
   NEXUS PORTFOLIO — animations.js
   Scroll progress, reveal animations,
   skill bars, project cards, timeline
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Progress Bar ── */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = (max > 0 ? (scrolled / max * 100) : 0) + '%';
    });
  }

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) link.classList.add('active');
  });

  /* ── Skill Bar Animation (IntersectionObserver) ── */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate cards in
        entry.target.querySelectorAll('.skill-card').forEach((card, i) => {
          setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        // Animate bars
        entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
          setTimeout(() => {
            fill.style.width = fill.dataset.pct + '%';
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

  /* ── Timeline Items ── */
  const tlObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.timeline-item').forEach(el => tlObserver.observe(el));

  /* ── Project Cards ── */
  const projObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s, box-shadow 0.35s';
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        projObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card').forEach(el => projObserver.observe(el));

  /* ── Generic Fade-In Elements ── */
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    fadeObserver.observe(el);
  });

  /* ── Project Filter Buttons ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── Glitch Effect (hero page only) ── */
  const glitchEl = document.querySelector('.hero-name .glow');
  if (glitchEl) {
    setInterval(() => {
      if (Math.random() < 0.15) {
        glitchEl.style.color      = '#ff006e';
        glitchEl.style.textShadow = '3px 0 0 #00f5ff, -3px 0 0 #ff006e';
        setTimeout(() => {
          glitchEl.style.color      = '';
          glitchEl.style.textShadow = '';
        }, 80);
      }
    }, 3000);
  }

});
