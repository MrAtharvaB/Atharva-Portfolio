/**
 * Advanced Portfolio Engine
 * Author: Atharva Babhane
 */

document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initNavigation();
  initThemeToggle();
  initTypingEffect();
  initParticles();
  initProfile3DTilt();
  initCustomCursor();
  initScrollProgress();
  initRevealAnimations();
  initCounters();
  initSkills();
  initProjects();
  initProjectModal();
  initContactForm();
  initBackToTop();
  initMagneticButtons();
});

function initLoadingScreen() {
  const loader = document.getElementById("loading-screen");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) loader.classList.add("fade-out");
    }, 400);
  });
}

function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !expanded);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      const targetLink = document.querySelector(`.nav-link[href*='${sectionId}']`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add("active");
        } else {
          targetLink.classList.remove("active");
        }
      }
    });
  }, { passive: true });
}

function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const targetTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("theme", targetTheme);
    });
  }
}

function initTypingEffect() {
  const target = document.getElementById("typing-text");
  if (!target) return;

  const roles = [
    "Google Student Ambassador",
    "AI Agents Developer",
    "Embedded Systems Builder",
    "Full Stack Engineer",
    "Open Source Contributor"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

function initParticles() {
  const container = document.getElementById("particles-container");
  if (!container || window.innerWidth < 768) return;

  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 10;

    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${posX}%`;
    p.style.bottom = `-10px`;
    p.style.animationDelay = `${delay}s`;
    p.style.animationDuration = `${duration}s`;

    container.appendChild(p);
  }
}

function initProfile3DTilt() {
  const stage = document.getElementById("profile-stage");
  if (!stage || window.innerWidth < 1024) return;

  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    stage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  stage.addEventListener("mouseleave", () => {
    stage.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  });
}

function initCustomCursor() {
  const dot = document.getElementById("cursor-dot");
  const outline = document.getElementById("cursor-outline");

  if (!dot || !outline || window.innerWidth <= 1024) return;

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 250, fill: "forwards" });
  }, { passive: true });

  const interactiveElements = document.querySelectorAll("a, button, .project-card, .glass-panel");
  interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
  }, { passive: true });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal-element");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

function initCounters() {
  const statCards = document.querySelectorAll(".stat-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetNumber = parseInt(entry.target.getAttribute("data-counter"), 10);
        const numberEl = entry.target.querySelector(".stat-number");
        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / targetNumber));

        const timer = setInterval(() => {
          start += 1;
          if (numberEl) numberEl.textContent = start;
          if (start >= targetNumber) {
            if (numberEl) numberEl.textContent = targetNumber;
            clearInterval(timer);
          }
        }, Math.max(stepTime, 20));

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => observer.observe(card));
}

function initSkills() {
  const skillsGrid = document.getElementById("skills-grid");
  if (!skillsGrid) return;

  const skillsData = [
    { name: "Python", pct: 90 },
    { name: "AI Agents & Generative AI", pct: 88 },
    { name: "AI Prompt Mastery", pct: 92 },
    { name: "Embedded Systems / C++", pct: 85 },
    { name: "Git & GitHub", pct: 90 },
    { name: "Full Stack Web Development", pct: 82 },
    { name: "Data Science & Remote Sensing", pct: 80 }
  ];

  skillsData.forEach(s => {
    const card = document.createElement("div");
    card.className = "skill-card glass-panel";
    card.innerHTML = `
      <div class="skill-card-top">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" data-pct="${s.pct}"></div>
      </div>
    `;
    skillsGrid.appendChild(card);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fillBars = entry.target.querySelectorAll(".skill-bar-fill");
        fillBars.forEach(bar => {
          const pct = bar.getAttribute("data-pct");
          bar.style.width = `${pct}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsGrid);
}

const projectsData = [
  {
    id: 1,
    title: "AI Student Assistant",
    desc: "A Python-based intelligent learning companion that generates personalized study plans, revision schedules, and focus guidance.",
    image: "AI Student Assistant.png",
    tags: ["Python 3", "OOP", "CLI", "EdTech"],
    problem: "Students struggle with managing revision schedules, prioritizing weak topics, and optimizing exam preparation.",
    solution: "Engineered a lightweight CLI tool that processes study hours, exam dates, and target subjects to output structured day-wise schedules.",
    github: "https://github.com/MrAtharvaB/ai-student-assistant",
    demo: "#"
  },
 
];

function initProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";

  projectsData.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card glass-panel reveal-element fade-up active";
    
    const tagsHTML = p.tags.map(t => `<span>${t}</span>`).join("");

    card.innerHTML = `
      <div class="project-img-wrapper">
        <img src="${p.image}" alt="${p.title}" class="project-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'250\' viewBox=\'0 0 400 250\'><rect width=\'100%\' height=\'100%\' fill=\'%230a0f1d\'/><text x=\'50%\' y=\'50%\' fill=\'%2300f2fe\' font-size=\'18\' font-family=\'sans-serif\' text-anchor=\'middle\'>${p.title}</text></svg>'">
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="tech-tags">${tagsHTML}</div>
        <div class="project-actions">
          <button class="btn btn-primary btn-sm view-project-btn" data-id="${p.id}">View Project</button>
          <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">GitHub</a>
        </div>
      </div>
    `;

    projectsGrid.appendChild(card);
  });
}

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body-content");
  const closeBtn = document.getElementById("modal-close");

  if (!modal || !modalBody || !closeBtn) return;

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-project-btn")) {
      const pId = parseInt(e.target.getAttribute("data-id"), 10);
      const project = projectsData.find(item => item.id === pId);

      if (project) {
        modalBody.innerHTML = `
          <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary);">${project.title}</h2>
          <p style="font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 1rem;">${project.tags.join(" • ")}</p>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">${project.desc}</p>
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--text-primary); font-size: 0.9rem;">Problem Statement:</strong>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${project.problem}</p>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <strong style="color: var(--text-primary); font-size: 0.9rem;">Engineered Solution:</strong>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${project.solution}</p>
          </div>
          <div style="display: flex; gap: 1rem;">
            <a href="${project.github}" target="_blank" class="btn btn-primary btn-sm">View Code Base</a>
          </div>
        `;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
      }
    }
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");

  if (!form || !statusMsg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("form-name");
    const email = document.getElementById("form-email");
    const subject = document.getElementById("form-subject");
    const message = document.getElementById("form-message");

    if (!name.value.trim()) {
      name.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      name.parentElement.classList.remove("invalid");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      email.parentElement.classList.remove("invalid");
    }

    if (!subject.value.trim()) {
      subject.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      subject.parentElement.classList.remove("invalid");
    }

    if (message.value.trim().length < 10) {
      message.parentElement.classList.add("invalid");
      isValid = false;
    } else {
      message.parentElement.classList.remove("invalid");
    }

    if (isValid) {
      statusMsg.style.color = "var(--accent-green)";
      statusMsg.textContent = "Message prepared! Form is client-side ready.";
      form.reset();
      setTimeout(() => { statusMsg.textContent = ""; }, 4000);
    } else {
      statusMsg.style.color = "#ef4444";
      statusMsg.textContent = "Please correct errors before submitting.";
    }
  });
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initMagneticButtons() {
  if (window.innerWidth < 1024) return;

  const magneticBtns = document.querySelectorAll(".magnetic-btn");

  magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}