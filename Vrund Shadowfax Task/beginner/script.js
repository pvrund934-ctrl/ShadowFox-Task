/**
 * VRUND PATEL - FRONTEND DEVELOPER PORTFOLIO
 * Core JavaScript Logic: Typing animation, Theme toggle, Project filtering,
 * Skill filtering, Dynamic modals, and Rigorous Contact Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbar();
  initStatsCounter();
  initSkillFiltering();
  initProjectFiltering();
  initProjectModal();
  initContactFormValidation();
  initDownloadCV();
});

/* ===================================================================
   1. THEME SWITCHER (Dark / Light Mode with LocalStorage)
   =================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const currentTheme = localStorage.getItem('vrund-portfolio-theme') || 'dark';

  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('vrund-portfolio-theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun" style="color: #f59e0b;"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
}

/* ===================================================================
   2. DYNAMIC TYPING EFFECT IN HERO
   =================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const roles = [
    "Frontend Developer",
    "Creative UI/UX Engineer",
    "Responsive Web Specialist",
    "JavaScript & Modern Web Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before typing new word
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* ===================================================================
   3. NAVBAR BEHAVIOR (Sticky Blur, Mobile Drawer & Scrollspy)
   =================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll detection for navbar background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking any nav item
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section indicator via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ===================================================================
   4. ANIMATED COUNTER FOR STATS
   =================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-num');
  let hasAnimated = false;

  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 1400;
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const timer = setInterval(() => {
          count += 1;
          stat.textContent = count;
          if (count >= target) {
            stat.textContent = target;
            clearInterval(timer);
          }
        }, stepTime);
      });
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* ===================================================================
   5. SKILLS FILTERING
   =================================================================== */
function initSkillFiltering() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ===================================================================
   6. PROJECTS FILTERING
   =================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   7. PROJECT MODAL (Quick Preview Details)
   =================================================================== */
const projectsData = [
  {
    title: "LUMINA Botanical Skincare Storefront",
    category: "E-Commerce & Wellness",
    description: "A brand-focused wellness & skincare web application engineered for the ShadowFox Intermediate Task. Includes responsive product listings, real-time category filtering, dynamic product detail inspection drawers, promotional code calculations, and an interactive slide-over cart with full checkout simulation.",
    highlights: [
      "Custom brand identity design tailored to holistic botanical skincare",
      "Interactive cart drawer with dynamic price, tax, and discount engine",
      "Modal-based product deep-dives with ingredient analysis & reviews",
      "Full mobile-first responsiveness across all modern devices"
    ],
    stack: ["HTML5", "Modern CSS3", "JavaScript ES6+", "DOM Manipulation", "Responsive Grid"],
    demoLink: "../intermediate/index.html",
    bgClass: "mockup-skincare"
  },
  {
    title: "PulseFlow Enterprise Cloud & AI Agent Portal",
    category: "SaaS & Enterprise Dashboard",
    description: "A client-style enterprise frontend application engineered for the ShadowFox Advanced Task based on a comprehensive requirement brief. Provides real-time metrics telemetry via canvas charts, an interactive visual workflow runner, an ROI compute calculator, and team audit logs.",
    highlights: [
      "Live interactive canvas telemetry chart with 24H/7D/30D toggles",
      "AI workflow orchestrator simulating live task pipeline execution",
      "Resource & cost ROI tier calculator with instant plan suggestions",
      "Global Command Palette (Ctrl + K) & CSV log export functionality"
    ],
    stack: ["HTML5", "CSS Custom Properties", "Vanilla JS", "HTML5 Canvas", "State Management"],
    demoLink: "../advanced/index.html",
    bgClass: "mockup-saas"
  },
  {
    title: "TaskFlow Agile Kanban Workspace",
    category: "Productivity Web App",
    description: "A high-performance productivity board built with vanilla JavaScript and native HTML5 Drag and Drop API. Enables engineers and teams to organize sprints, assign story points, tag priorities, and save workflow states instantly to browser LocalStorage.",
    highlights: [
      "Native HTML5 Drag and Drop with smooth drop zone animations",
      "Persistent state management utilizing browser LocalStorage",
      "Real-time task filtering by priority and assigned developer",
      "Mobile-friendly touch interaction fallbacks"
    ],
    stack: ["HTML5 Drag & Drop", "CSS Grid", "LocalStorage API", "ES6 Modules"],
    demoLink: "#projects",
    bgClass: "mockup-kanban"
  },
  {
    title: "SkyCast Weather & Climate Intelligence",
    category: "Interactive Weather Portal",
    description: "A responsive weather application leveraging asynchronous REST API consumption, geolocation tracking, and dynamic SVG weather conditions. Displays 7-day temperature trends, humidity graphs, and UV indices.",
    highlights: [
      "Asynchronous Fetch API with comprehensive error & fallback handling",
      "Live geolocation integration with automatic city weather lookup",
      "Interactive charts and animated day/night atmospheric transitions",
      "High performance with sub-second initial paint times"
    ],
    stack: ["Fetch API", "Async/Await", "SVG Graphics", "CSS Glassmorphism"],
    demoLink: "#projects",
    bgClass: "mockup-weather"
  }
];

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const closeAction = document.getElementById('modal-close-action');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalStack = document.getElementById('modal-stack');
  const modalDemoLink = document.getElementById('modal-demo-link');
  const modalImageWrap = document.getElementById('modal-image-wrap');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projIndex = parseInt(btn.getAttribute('data-project'), 10);
      const data = projectsData[projIndex];
      if (!data) return;

      modalCategory.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalDemoLink.setAttribute('href', data.demoLink);

      // Populate highlights
      modalHighlights.innerHTML = data.highlights
        .map(h => `<li>${h}</li>`)
        .join('');

      // Populate stack pills
      modalStack.innerHTML = data.stack
        .map(s => `<span class="pill-tag">${s}</span>`)
        .join('');

      // Populate visual preview box
      modalImageWrap.className = `modal-image-wrap ${data.bgClass}`;
      modalImageWrap.style.minHeight = '180px';
      modalImageWrap.style.display = 'flex';
      modalImageWrap.style.alignItems = 'center';
      modalImageWrap.style.justifyContent = 'center';
      modalImageWrap.innerHTML = `
        <div style="text-align: center; color: #fff; padding: 1.5rem;">
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">${data.title}</h3>
          <p style="font-size: 0.85rem; opacity: 0.85;">${data.category}</p>
        </div>
      `;

      // Show modal
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeAction) closeAction.addEventListener('click', closeModal);

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ===================================================================
   8. CONTACT FORM WITH COMPREHENSIVE VALIDATION
   =================================================================== */
function initContactFormValidation() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('msg-char-count');
  const submitBtn = document.getElementById('submit-btn');
  const formAlert = document.getElementById('form-alert');

  if (!form) return;

  // Real-time character counter for message
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      charCounter.textContent = messageInput.value.length;
    });
  }

  // Validation rules and predicates
  const validators = {
    name: (val) => {
      const trimmed = val.trim();
      return trimmed.length >= 3 && /^[a-zA-Z\s'-]+$/.test(trimmed);
    },
    email: (val) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(val.trim());
    },
    subject: (val) => val.trim().length >= 4,
    message: (val) => val.trim().length >= 15
  };

  // Helper: validate single field and update UI
  function validateField(input, testFn, errorElementId, customMsg) {
    const parentGroup = input.closest('.form-group');
    const errorEl = document.getElementById(errorElementId);
    const isValid = testFn(input.value);

    if (isValid) {
      parentGroup.classList.remove('has-error');
      parentGroup.classList.add('is-valid');
      return true;
    } else {
      parentGroup.classList.remove('is-valid');
      parentGroup.classList.add('has-error');
      if (customMsg && errorEl) {
        errorEl.textContent = customMsg;
      }
      return false;
    }
  }

  // Live validation on blur & input
  nameInput.addEventListener('blur', () => {
    validateField(nameInput, validators.name, 'name-error', 'Name must be at least 3 letters (letters & spaces only).');
  });
  nameInput.addEventListener('input', () => {
    if (nameInput.closest('.form-group').classList.contains('has-error')) {
      validateField(nameInput, validators.name, 'name-error');
    }
  });

  emailInput.addEventListener('blur', () => {
    validateField(emailInput, validators.email, 'email-error', 'Please provide a valid email format (e.g., name@domain.com).');
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-group').classList.contains('has-error')) {
      validateField(emailInput, validators.email, 'email-error');
    }
  });

  subjectInput.addEventListener('blur', () => {
    validateField(subjectInput, validators.subject, 'subject-error', 'Subject must be at least 4 characters.');
  });
  subjectInput.addEventListener('input', () => {
    if (subjectInput.closest('.form-group').classList.contains('has-error')) {
      validateField(subjectInput, validators.subject, 'subject-error');
    }
  });

  messageInput.addEventListener('blur', () => {
    validateField(messageInput, validators.message, 'message-error', 'Please write a message with at least 15 characters.');
  });
  messageInput.addEventListener('input', () => {
    if (messageInput.closest('.form-group').classList.contains('has-error')) {
      validateField(messageInput, validators.message, 'message-error');
    }
  });

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, validators.name, 'name-error', 'Please enter your full name (at least 3 characters).');
    const isEmailValid = validateField(emailInput, validators.email, 'email-error', 'Please enter a valid email address.');
    const isSubjectValid = validateField(subjectInput, validators.subject, 'subject-error', 'Subject must be at least 4 characters.');
    const isMessageValid = validateField(messageInput, validators.message, 'message-error', 'Message must be at least 15 characters.');

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      showAlert('Please correct the highlighted fields before submitting.', 'error');
      showToast('Form contains errors. Please check the fields.', 'error');
      return;
    }

    // Set loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    submitBtn.disabled = true;
    btnText.textContent = 'Sending Message...';
    btnIcon.classList.add('hidden');
    btnSpinner.classList.remove('hidden');

    // Simulate reliable dispatch
    setTimeout(() => {
      // Success feedback
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnIcon.classList.remove('hidden');
      btnSpinner.classList.add('hidden');

      const senderName = nameInput.value.trim();
      showAlert(`Thank you, ${senderName}! Your message has been sent successfully. I will get back to you shortly.`, 'success');
      showToast(`Message from ${senderName} received!`, 'success');

      // Reset form and UI classes
      form.reset();
      charCounter.textContent = '0';
      document.querySelectorAll('.form-group').forEach(grp => {
        grp.classList.remove('is-valid', 'has-error');
      });

      // Auto dismiss banner after 6s
      setTimeout(() => {
        formAlert.classList.add('hidden');
      }, 6000);
    }, 1200);
  });

  function showAlert(msg, type) {
    formAlert.textContent = msg;
    formAlert.className = `form-alert ${type}`;
    formAlert.classList.remove('hidden');
  }
}

/* ===================================================================
   9. RESUME / CV DOWNLOAD GENERATOR
   =================================================================== */
function initDownloadCV() {
  const downloadBtn = document.getElementById('download-cv-btn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    // Generate a formatted, elegant text/markdown resume for Vrund Patel
    const resumeContent = `=================================================================
VRUND PATEL - FRONTEND DEVELOPER & UI ENGINEER
Email: vrund.patel.dev@gmail.com | Phone: +91 98765 43210
Location: Gujarat, India | Portfolio: https://vrund.dev
=================================================================

PROFESSIONAL SUMMARY:
Enthusiastic and detail-oriented Frontend Developer with deep expertise 
in modern HTML5 semantics, CSS3 layouts (Flexbox, CSS Grid), JavaScript 
(ES6+), and responsive web architectures. Proven ability to translate 
complex design specifications into accessible, high-performance web apps.

CORE COMPETENCIES:
• Web Fundamentals: HTML5, CSS3, JavaScript (ES6+), TypeScript Basics
• Frameworks & Tools: React.js, Tailwind CSS, Vite, Git, GitHub
• UI/UX: Mobile-First Responsive Design, Figma-to-Code, WCAG Accessibility
• Performance: Lighthouse Audits, Asset Optimization, Core Web Vitals

FEATURED PROJECTS:
1. LUMINA Botanical Skincare & Wellness Storefront
   - Brand-focused e-commerce application with product filtering, detail drawers,
     interactive cart slide-over, and complete checkout flow.
2. PulseFlow Enterprise Cloud & AI Agent Dashboard
   - Client-grade enterprise analytics portal with canvas telemetry, visual
     workflow runner, and real-time ROI calculator.
3. TaskFlow Agile Kanban Board
   - Drag-and-drop workflow system with persistent browser LocalStorage.

EDUCATION:
Bachelor of Technology (B.Tech) - Computer Science & Engineering
Relevant Coursework: Web Technologies, Data Structures, Software Engineering

AVAILABILITY:
Open for Frontend Developer Internships & Full-Time Junior Roles.
=================================================================`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vrund_Patel_Frontend_Developer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Resume downloaded successfully!', 'success');
  });
}

/* ===================================================================
   10. TOAST NOTIFICATION HELPER
   =================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: 'fa-solid fa-circle-check',
    error: 'fa-solid fa-circle-exclamation',
    info: 'fa-solid fa-circle-info'
  };

  toast.innerHTML = `
    <i class="${iconMap[type] || iconMap.info}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
