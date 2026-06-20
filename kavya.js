/* ============================================
   KAVYA PORTFOLIO — JAVASCRIPT
   Premium Interactions & Animations
============================================ */
'use strict';
/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let fx = 0, fy = 0, mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  }
  animFollower();
  document.querySelectorAll('a, button, .project-card, .photo-frame, .tool-icon-card, .about-card, .dot').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();
/* ── PARTICLES ── */
(function initParticles() {
  const layer = document.getElementById('particlesLayer');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const dur  = Math.random() * 15 + 12;
    const delay = Math.random() * 15;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      opacity:0;
    `;
    layer.appendChild(p);
  }
})();
/* ── NAVBAR SCROLL ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    // Active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 150) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
  // Hamburger
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  ham.addEventListener('click', () => {
    mob.classList.toggle('open');
    ham.classList.toggle('open');
  });
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.classList.remove('open');
    });
  });
})();
/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const dur = 1800;
  const start = performance.now();
  function update(now) {
    const prog = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(eased * target);
    if (prog < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}
/* ── SKILL BAR ANIMATION ── */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}
/* ── INTERSECTION OBSERVER ── */
(function initObserver() {
  // Reveal elements
  document.querySelectorAll('.about-card, .project-card, .tool-icon-card, .testimonial-card, .contact-item').forEach(el => {
    el.classList.add('reveal');
  });
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  // Counters
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(animateCounter);
        counterObs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObs.observe(heroStats);
  // Skill bars
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateSkillBars(); skillObs.disconnect(); }
    });
  }, { threshold: 0.3 });
  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillObs.observe(skillsSection);
})();
/* ── CONTACT FORM ── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('form-submit-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    await new Promise(r => setTimeout(r, 1500));
    btn.innerHTML = '<span>✓ Message Sent!</span>';
    btn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
    form.reset();
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
})();
/* ── PARALLAX ON HERO ── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
})();
/* ── SECTION TITLE ANIMATIONS ── */
(function initTitleAnimations() {
  const titles = document.querySelectorAll('.section-title:not(.hero-title)');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  titles.forEach(t => {
    t.style.opacity = '0';
    obs.observe(t);
  });
})();
/* ── MAGNETIC BUTTONS ── */
(function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
console.log('%c✦ Kavya Muraleedharan Portfolio', 'color: #b78bff; font-size: 16px; font-weight: bold; font-family: Georgia;');
console.log('%cDesigned & Built with ♥', 'color: #f472b6; font-size: 12px;');
