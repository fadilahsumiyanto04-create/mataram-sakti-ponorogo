document.addEventListener('DOMContentLoaded', () => {
  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // Spotlight cursor glow (mengikuti mouse di seluruh halaman)
  document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mx', e.clientX + 'px');
    document.body.style.setProperty('--my', e.clientY + 'px');
  });

  // Efek tilt halus pada foto profil
  const photo = document.querySelector('.profile-photo');
  const wrap = document.querySelector('.profile-photo-wrap');
  if (photo && wrap) {
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      photo.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.04)`;
    });
    wrap.addEventListener('mouseleave', () => {
      photo.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  // Hitung naik untuk angka statistik
  document.querySelectorAll('.stat-strip .num').forEach(el => {
    const target = el.textContent.trim();
    const numericPart = parseInt(target.replace(/\D/g, ''), 10);
    if (isNaN(numericPart)) return;
    const suffix = target.replace(/[0-9]/g, '');
    let current = 0;
    const step = Math.max(1, Math.ceil(numericPart / 30));
    const counter = setInterval(() => {
      current += step;
      if (current >= numericPart) {
        current = numericPart;
        clearInterval(counter);
      }
      el.textContent = current + suffix;
    }, 30);
  });
});
