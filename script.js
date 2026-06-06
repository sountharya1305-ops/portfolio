/**
 * Portfolio Website – Interactive JavaScript
 * Vijaya Sountharya Thamotharan | UI/UX Designer
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // PAGE LOADER
  // ==========================================
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 600);
  });

  // Fallback: hide loader after 3s max
  setTimeout(() => {
    pageLoader.classList.add('hidden');
  }, 3000);

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section[id]');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) {
          if (scrollPos >= top && scrollPos < bottom) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  window.addEventListener('scroll', () => {
    handleNavScroll();
    updateActiveNav();
  }, { passive: true });

  // ==========================================
  // MOBILE NAV TOGGLE
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link, .nav-cta').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================
  // CURSOR GLOW (Desktop only)
  // ==========================================
  const cursorGlow = document.getElementById('cursorGlow');

  if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
      });
    });
  } else {
    cursorGlow.style.display = 'none';
  }

  // ==========================================
  // CONTACT FORM HANDLING
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      Message Sent!
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    submitBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';

    setTimeout(() => {
      submitBtn.innerHTML = originalContent;
      submitBtn.style.background = '';
      submitBtn.style.boxShadow = '';
      contactForm.reset();
    }, 3000);
  });

  // ==========================================
  // TYPING EFFECT FOR HERO BADGE
  // ==========================================
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    const roles = [
      'Open to opportunities',
      'UI/UX Designer',
      'EEE Student',
      'Figma Enthusiast',
      'Design Thinker'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textNode = heroBadge.childNodes[heroBadge.childNodes.length - 1];

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        textNode.textContent = '\u00A0' + currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          setTimeout(() => { isDeleting = true; typeEffect(); }, 2500);
          return;
        }
      } else {
        textNode.textContent = '\u00A0' + currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      const speed = isDeleting ? 40 : 70;
      setTimeout(typeEffect, speed);
    }

    setTimeout(typeEffect, 3000);
  }

  // ==========================================
  // ANIMATED COUNTER FOR STATS
  // ==========================================
  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    counters.forEach((counter) => {
      const target = counter.textContent;
      const isPercentage = target.includes('%');
      const hasPlus = target.includes('+');
      const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

      if (isNaN(numericValue)) return;

      let current = 0;
      const duration = 1500;
      const step = Math.ceil(numericValue / (duration / 16));

      counter.textContent = '0' + (isPercentage ? '%' : hasPlus ? '+' : '');

      const interval = setInterval(() => {
        current += step;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(interval);
        }
        counter.textContent = current + (isPercentage ? '%' : hasPlus ? '+' : '');
      }, 16);
    });
  }

  // Trigger counter animation when hero section is visible
  const heroSection = document.getElementById('hero');
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 800);
          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  heroObserver.observe(heroSection);

  // ==========================================
  // INTERACTIVE SKILL ITEMS
  // ==========================================
  document.querySelectorAll('.skill-item').forEach((item) => {
    item.addEventListener('mouseenter', function () {
      this.querySelector('.skill-dot').style.transform = 'scale(1.5)';
      this.querySelector('.skill-dot').style.background = 'var(--accent)';
    });

    item.addEventListener('mouseleave', function () {
      this.querySelector('.skill-dot').style.transform = 'scale(1)';
      this.querySelector('.skill-dot').style.background = 'var(--primary)';
    });
  });

  // ==========================================
  // PARALLAX EFFECT ON HERO ORBS
  // ==========================================
  if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768) {
    const orbs = document.querySelectorAll('.bg-orb');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  }

  // ==========================================
  // HOVER TILT EFFECT ON CARDS
  // ==========================================
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.case-study-card, .testimonial-card').forEach((card) => {
      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 40;
        const rotateY = (centerX - x) / 40;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    });
  }

  // ==========================================
  // PROCESS STEP PROGRESS INDICATOR
  // ==========================================
  const processSteps = document.querySelectorAll('.process-step');
  let currentStep = 0;

  function highlightNextStep() {
    processSteps.forEach((step, index) => {
      if (index === currentStep) {
        step.style.borderColor = 'rgba(108, 99, 255, 0.3)';
        step.style.boxShadow = '0 4px 20px rgba(108, 99, 255, 0.1)';
      } else {
        step.style.borderColor = '';
        step.style.boxShadow = '';
      }
    });

    currentStep = (currentStep + 1) % processSteps.length;
  }

  // Auto-cycle through process steps
  setInterval(highlightNextStep, 2000);

  // ==========================================
  // KEYBOARD NAVIGATION SUPPORT
  // ==========================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('open');
    }
  });

  // Initial state
  handleNavScroll();
});
