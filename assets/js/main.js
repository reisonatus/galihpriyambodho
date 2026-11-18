/* ═══════════════════════════════
   GALIH PORTFOLIO — main.js
═══════════════════════════════ */

/* Penanda JS aktif: CSS hanya menyembunyikan elemen animasi kalau class ini ada,
   sehingga konten tetap terlihat saat JS gagal dimuat */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  /* ── Active Nav ──
     Cadangan bila atribut statis di HTML terlewat; idempoten */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === page) {
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
        copyBtn.textContent = 'Copied';
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

  /* ── Reveal on scroll: satu gaya masuk untuk semua, stagger kecil ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.filter(e => e.isIntersecting).forEach((e, i) => {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Contact form submission ── */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');

  if (form && submitBtn) {
    const originalText = submitBtn.textContent;
    const setFeedback = (kind, text) => {
      if (!feedback) return;
      feedback.className = 'form-feedback' + (kind ? ' ' + kind : '');
      feedback.textContent = text;
    };
    const resetBtn = () => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Mencegah reload halaman

      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
      setFeedback('', '');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.errors?.[0]?.message || 'The message didn’t go through.');
        }

        form.reset();
        submitBtn.textContent = 'Sent';
        setFeedback('ok', 'Got it. I’ll reply to the email you gave.');
        setTimeout(() => { resetBtn(); setFeedback('', ''); }, 5000);
      } catch (err) {
        // Pesan dibiarkan tampil, isi form tidak dihapus
        setFeedback('err', (err.message || 'Something went wrong.') + ' Try again, or ');
        if (feedback) {
          const mail = document.createElement('a');
          mail.href = 'mailto:galih.priyambodho@outlook.com';
          mail.textContent = 'email me directly';
          feedback.appendChild(mail);
          feedback.appendChild(document.createTextNode('.'));
        }
        resetBtn();
      }
    });
  }

});
