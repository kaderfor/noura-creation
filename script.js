// =============================================
// NOURA CREATION — Script Principal
// =============================================

// ── 1. NAVBAR scroll ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── 2. BURGER MENU ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ── 3. NAV LIEN ACTIF ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── 4. SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.catalogue-card, .feature-card, .section-header, ' +
  '.apropos-block, .contact-item, .value-item, .team-card'
).forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

// ── 5. SECTION HEADERS animation ──
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section-header, .about-text-wrap').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  headerObserver.observe(el);
});

// ── 6. COMPTEUR STATS ──
function animateCounter(el) {
  const target = parseInt(el.textContent);
  const suffix = el.textContent.replace(/[0-9]/g, '');
  let current = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

// ── 7. SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── 8. HOVER PARALLAX cartes catalogue ──
if (window.innerWidth > 768) {
  document.querySelectorAll('.catalogue-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s ease';
    });
  });
}

// ── 9. FORMULAIRE ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = 'Message envoyé ✓';
    btn.style.background = '#3fb950';
    this.reset();
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
    }, 3500);
  });
}

// ── 10. CURSOR CUSTOM (desktop) ──
if (window.innerWidth > 1024) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; width: 8px; height: 8px;
    background: #C9A84C; border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
  `;
  const cursorRing = document.createElement('div');
  cursorRing.style.cssText = `
    position: fixed; width: 32px; height: 32px;
    border: 1px solid #C9A84C66; border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
  `;
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .catalogue-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursorRing.style.width = '44px';
      cursorRing.style.height = '44px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursorRing.style.width = '32px';
      cursorRing.style.height = '32px';
    });
  });
}