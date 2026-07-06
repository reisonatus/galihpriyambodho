/* ═══════════════════════════════
   GALIH PORTFOLIO — main.js
═══════════════════════════════ */

/* Penanda JS aktif: CSS hanya menyembunyikan elemen animasi kalau class ini ada,
   sehingga konten tetap terlihat saat JS gagal dimuat */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Progress ── */
  const bar = document.getElementById('scrollProgress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / max * 100) + '%';
    }, { passive: true });
  }

  /* ── Active Nav ──
     Cadangan bila atribut statis di HTML terlewat; idempoten */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === page) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ── Copy email (halaman kontak) ── */
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    const originalLabel = copyBtn.textContent;
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.email);
        copyBtn.textContent = '✓ Copied';
        copyBtn.classList.add('copied');
      } catch {
        // Clipboard API tidak tersedia (mis. non-HTTPS): tampilkan alamatnya saja
        copyBtn.textContent = copyBtn.dataset.email;
      }
      setTimeout(() => {
        copyBtn.textContent = originalLabel;
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  }

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

  /* ── Contact form submission ── */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');

  if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Mencegah reload halaman

      // Simpan teks asli tombol
      const originalText = submitBtn.innerHTML;

      // State loading
      submitBtn.innerHTML = 'Sending…';
      submitBtn.disabled = true;
      if (feedback) feedback.textContent = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          // Sukses
          submitBtn.innerHTML = '✓ Sent';
          submitBtn.style.background = '#2d6a4f';
          form.reset();
          if (feedback) {
            feedback.style.color = '#2d6a4f';
            feedback.textContent = "Thanks! I'll get back to you soon.";
          }
          // Kembalikan tombol; pesan sukses ikut dibersihkan
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            if (feedback) feedback.textContent = '';
          }, 4000);
        } else {
          // Error dari server
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.errors?.[0]?.message || 'Message failed to send');
        }
      } catch (err) {
        // Error jaringan / lainnya; pesan dibiarkan tampil, isi form tidak dihapus
        submitBtn.innerHTML = 'Failed to send';
        submitBtn.style.background = '#c1121f';
        if (feedback) {
          feedback.style.color = '#c1121f';
          feedback.textContent = (err.message || 'Something went wrong.') + ' Try again, or ';
          const mail = document.createElement('a');
          mail.href = 'mailto:galih.priyambodho@outlook.com';
          mail.textContent = 'email me directly';
          mail.style.color = 'inherit';
          feedback.appendChild(mail);
          feedback.appendChild(document.createTextNode('.'));
        }
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 4000);
      }
    });
  }

});
