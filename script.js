
/* =====================================================
   PERSONAL PORTFOLIO WEBSITE
   Main JavaScript
   Vanilla JavaScript Only
   Separate Landing Page Architecture (Option A)
===================================================== */

/* ===== PREVENT SCROLL RESTORATION ===== */

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

/* ===== WAIT FOR DOM ===== */

document.addEventListener("DOMContentLoaded", function () {

  // Main portfolio features
  initializeLandingTransition();
  initializeNavigation();
  initializeStickyHeader();
  initializeActiveLinks();
  initializeTypingEffect();
  initializeScrollReveal();
  initializeCopyrightYear();
  initializeContactForm();
  initializeProjectModal();
  initializeCertificateModal();

  // Landing page animation
  initializeLandingParticles();

});

/* ===== RESET LANDING PAGE POSITION ===== */

window.addEventListener("pageshow", function () {

  if (document.body.classList.contains("landing-page")) {
    window.scrollTo(0, 0);
  }

});


/* ===== MOBILE NAVIGATION ===== */

function initializeNavigation() {

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuToggle || !navMenu) return;

  function closeMenu() {

    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");

  }

  function toggleMenu() {

    const isOpen = !navMenu.classList.contains("active");

    navMenu.classList.toggle("active", isOpen);
    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    document.body.classList.toggle("menu-open", isOpen);

  }

  menuToggle.addEventListener("click", toggleMenu);

  navLinks.forEach(function (link) {

    link.addEventListener("click", closeMenu);

  });

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeMenu();
    }

  });

  document.addEventListener("click", function (event) {

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (
      navMenu.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {

      closeMenu();

    }

  });

  window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {
      closeMenu();
    }

  });

}


/* ===== STICKY HEADER ===== */

function initializeStickyHeader() {

  const header = document.getElementById("header");

  if (!header) return;

  function updateHeader() {

    header.classList.toggle("scrolled", window.scrollY > 30);

  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

}


/* ===== ACTIVE NAVIGATION LINKS ===== */

function initializeActiveLinks() {

  // No main-portfolio wrapper is needed in Option A.
  // The portfolio page is now a normal standalone document.

  const sections = document.querySelectorAll("main section[id]");

  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(

    function (entries) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) return;

        const currentHash = "#" + entry.target.id;

        navLinks.forEach(function (link) {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === currentHash
          );

        });

      });

    },

    {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }

  );

  sections.forEach(function (section) {

    observer.observe(section);

  });

}


/* ===== HERO TYPING EFFECT ===== */

function initializeTypingEffect() {

  const typingElement = document.getElementById("typing-text");

  if (!typingElement) return;

  const words = [
    "Web Developer",
    "Front-End Developer",
    "Programmer",
    "Creative Thinker"
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {

    typingElement.textContent = words[0];

    return;

  }

  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeText() {

    const currentWord = words[wordIndex];

    if (!deleting) {

      characterIndex++;

      typingElement.textContent = currentWord.substring(
        0,
        characterIndex
      );

      if (characterIndex >= currentWord.length) {

        deleting = true;

        window.setTimeout(typeText, 1500);

        return;

      }

    } else {

      characterIndex--;

      typingElement.textContent = currentWord.substring(
        0,
        characterIndex
      );

      if (characterIndex <= 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

      }

    }

    window.setTimeout(
      typeText,
      deleting ? 45 : 90
    );

  }

  typingElement.textContent = "";

  typeText();

}


/* ===== SCROLL REVEAL ANIMATIONS ===== */

function initializeScrollReveal() {

  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

    return;

  }

  const observer = new IntersectionObserver(

    function (entries, observerInstance) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observerInstance.unobserve(entry.target);

      });

    },

    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }

  );

  revealElements.forEach(function (element) {

    observer.observe(element);

  });

}


/* ===== AUTOMATIC COPYRIGHT YEAR ===== */

function initializeCopyrightYear() {

  const yearElement = document.getElementById("current-year");

  if (!yearElement) return;

  yearElement.textContent = new Date().getFullYear();

}


/* ===== CONTACT FORM ===== */


/* ===== CONTACT FORM ===== */

function initializeContactForm() {

  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (!contactForm || !formMessage) return;

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  if (!submitButton) return;

  const originalButtonContent = submitButton.innerHTML;

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get form values
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const website = document.getElementById("contact-website").value.trim();

    // Clear previous messages
    formMessage.textContent = "";
    formMessage.classList.remove("success", "error");

    // Basic validation
    if (!name || !email || !subject || !message) {

      formMessage.textContent =
        "Please complete all fields before submitting.";

      formMessage.classList.add("error");

      return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      formMessage.textContent =
        "Please enter a valid email address.";

      formMessage.classList.add("error");

      return;

    }

    // Prevent duplicate submissions
    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";
    contactForm.setAttribute("aria-busy", "true");

    formMessage.textContent = "Sending your message...";

    try {

      // Send contact form data to Express backend
      const response = await fetch(
        "https://alfie-gonzales-portfolio.onrender.com/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            website: website
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {

        throw new Error(
          result.message || "Unable to send your message."
        );

      }

      // Successful email delivery
      formMessage.textContent =
        result.message || "Your message has been sent successfully!";

      formMessage.classList.add("success");

      contactForm.reset();

    } catch (error) {

      console.error("Contact form submission error:", error);

      formMessage.textContent =
        error.message ||
        "Something went wrong. Please try again later.";

      formMessage.classList.add("error");

    } finally {

      // Restore submit button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonContent;

      contactForm.removeAttribute("aria-busy");

    }

  });

}



/* ===== SHARED MODAL HELPERS ===== */

function getVisibleFocusableElements(container) {

  const elements = container.querySelectorAll(
    'a[href]:not([hidden]), button:not([disabled]):not([hidden]), ' +
    'input:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), ' +
    'select:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
  );

  return Array.from(elements).filter(function (element) {

    return element.getClientRects().length > 0;

  });

}


function trapModalFocus(event, modal, dialog) {

  if (event.key !== "Tab") return;

  const focusableElements = getVisibleFocusableElements(modal);

  if (!focusableElements.length) {

    event.preventDefault();

    if (dialog) dialog.focus();

    return;

  }

  const firstElement = focusableElements[0];

  const lastElement = focusableElements[focusableElements.length - 1];

  if (
    event.shiftKey &&
    (
      document.activeElement === firstElement ||
      !modal.contains(document.activeElement)
    )
  ) {

    event.preventDefault();

    lastElement.focus();

  } else if (
    !event.shiftKey &&
    (
      document.activeElement === lastElement ||
      !modal.contains(document.activeElement)
    )
  ) {

    event.preventDefault();

    firstElement.focus();

  }

}


/* ===== PROJECT PREVIEW MODAL ===== */

function initializeProjectModal() {

  const modal = document.getElementById("project-modal");

  if (!modal) return;

  const dialog = modal.querySelector(".project-modal-dialog");

  const closeButton = document.getElementById("project-modal-close");

  const modalImage = document.getElementById("project-modal-image");

  const modalCategory = document.getElementById("project-modal-category");

  const modalTitle = document.getElementById("project-modal-title");

  const modalDescription = document.getElementById("project-modal-description");

  const modalTags = document.getElementById("project-modal-tags");

  const demoLink = document.getElementById("project-modal-demo");

  const githubLink = document.getElementById("project-modal-github");

  if (
    !dialog ||
    !closeButton ||
    !modalImage ||
    !modalCategory ||
    !modalTitle ||
    !modalDescription ||
    !modalTags ||
    !demoLink ||
    !githubLink
  ) return;

  let previouslyFocusedElement = null;


  function setOptionalLink(modalLink, sourceLink) {

    const href = sourceLink
      ? (sourceLink.getAttribute("href") || "").trim()
      : "";

    if (!href || href === "#") {

      modalLink.hidden = true;

      modalLink.removeAttribute("href");
      modalLink.removeAttribute("target");
      modalLink.removeAttribute("rel");

      return;

    }

    modalLink.hidden = false;

    modalLink.href = href;

    if (sourceLink.target) {

      modalLink.target = sourceLink.target;

      if (sourceLink.target === "_blank") {

        modalLink.rel = "noopener noreferrer";

      }

    } else {

      modalLink.removeAttribute("target");
      modalLink.removeAttribute("rel");

    }

  }


  function openModal(card, trigger) {

    const image = card.querySelector(".project-image img");

    const title = card.querySelector(".project-content h3");

    const description = card.querySelector(".project-content > p");

    const category = card.querySelector(".project-category");

    const tags = card.querySelectorAll(".project-tags span");

    const sourceLinks = card.querySelectorAll(".project-links a");

    if (!image || !title || !description) return;

    previouslyFocusedElement = trigger || document.activeElement;

    const imageSource = image.currentSrc || image.src;

    if (imageSource) {

      modalImage.src = imageSource;

    } else {

      modalImage.removeAttribute("src");

    }

    modalImage.alt = image.alt || title.textContent.trim();

    modalCategory.textContent = category
      ? category.textContent.trim()
      : "PROJECT";

    modalTitle.textContent = title.textContent.trim();

    modalDescription.textContent = description.textContent.trim();

    modalTags.replaceChildren();

    tags.forEach(function (sourceTag) {

      const tag = document.createElement("span");

      tag.textContent = sourceTag.textContent.trim();

      modalTags.appendChild(tag);

    });

    setOptionalLink(demoLink, sourceLinks[0]);

    setOptionalLink(githubLink, sourceLinks[1]);

    modal.classList.add("is-open");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    closeButton.focus();

  }


  function closeModal() {

    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function" &&
      document.contains(previouslyFocusedElement)
    ) {

      previouslyFocusedElement.focus();

    }

  }


  document.addEventListener("click", function (event) {

    const target = event.target;

    if (!(target instanceof Element)) return;

    const trigger = target.closest("[data-project-preview]");

    if (!trigger) return;

    const card = trigger.closest(".project-card");

    if (card) openModal(card, trigger);

  });


  closeButton.addEventListener("click", closeModal);


  modal.addEventListener("click", function (event) {

    const target = event.target;

    if (
      target instanceof Element &&
      target.matches("[data-modal-close]")
    ) {

      closeModal();

    }

  });


  document.addEventListener("keydown", function (event) {

    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {

      event.preventDefault();

      closeModal();

      return;

    }

    trapModalFocus(event, modal, dialog);

  });

}


/* ===== CERTIFICATE PREVIEW MODAL ===== */

function initializeCertificateModal() {

  const modal = document.getElementById("certificate-modal");

  if (!modal) return;

  const dialog = modal.querySelector(".certificate-modal-dialog");

  const closeButton = document.getElementById("certificate-modal-close");

  const modalImage = document.getElementById("certificate-modal-img");

  const modalTitle = document.getElementById("certificate-modal-title");

  const modalOrganization = document.getElementById(
    "certificate-modal-organization"
  );

  const modalYear = document.getElementById("certificate-modal-year");

  if (
    !dialog ||
    !closeButton ||
    !modalImage ||
    !modalTitle ||
    !modalOrganization ||
    !modalYear
  ) return;

  let previouslyFocusedElement = null;


  function openCertificateModal(card, trigger) {

    const image = card.querySelector(".certification-image img");

    const title = card.querySelector(".certification-content h3");

    const organization = card.querySelector(".certification-content p");

    const year = card.querySelector(".certification-year");

    if (!image || !title) return;

    previouslyFocusedElement = trigger || document.activeElement;

    const imageSource = image.currentSrc || image.src;

    if (imageSource) {

      modalImage.src = imageSource;

    } else {

      modalImage.removeAttribute("src");

    }

    modalImage.alt = image.alt || title.textContent.trim();

    modalTitle.textContent = title.textContent.trim();

    modalOrganization.textContent = organization
      ? organization.textContent.trim()
      : "";

    modalYear.textContent = year
      ? year.textContent.trim()
      : "";

    modal.classList.add("is-open");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    closeButton.focus();

  }


  function closeCertificateModal() {

    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function" &&
      document.contains(previouslyFocusedElement)
    ) {

      previouslyFocusedElement.focus();

    }

  }


  document.addEventListener("click", function (event) {

    const target = event.target;

    if (!(target instanceof Element)) return;

    const trigger = target.closest("[data-certificate-preview]");

    if (!trigger) return;

    const card = trigger.closest(".certification-card");

    if (card) openCertificateModal(card, trigger);

  });


  closeButton.addEventListener("click", closeCertificateModal);


  modal.addEventListener("click", function (event) {

    const target = event.target;

    if (
      target instanceof Element &&
      target.matches("[data-certificate-close]")
    ) {

      closeCertificateModal();

    }

  });


  document.addEventListener("keydown", function (event) {

    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {

      event.preventDefault();

      closeCertificateModal();

      return;

    }

    trapModalFocus(event, modal, dialog);

  });

}


/* =========================================
   LANDING PAGE PARTICLE ANIMATION
========================================= */

function initializeLandingParticles() {

  const canvas = document.getElementById("particle-canvas");

  // The canvas exists only on landingpage.html.
  // Do nothing on portfolio.html.
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let width = 0;
  let height = 0;

  let particles = [];

  let animationId = null;

  let particlesStopped = false;

  const mouse = {
    x: null,
    y: null,
    radius: 150
  };

  const ripples = [];

  const colors = [
    "rgba(113, 104, 255,",
    "rgba(120, 170, 255,",
    "rgba(190, 150, 255,",
    "rgba(255, 255, 255,"
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


  function isMobile() {

    return window.innerWidth <= 600;

  }


  // Canvas sizing
  function resizeCanvas() {

    if (particlesStopped) return;

    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    width = window.innerWidth;

    height = window.innerHeight;

    canvas.width = Math.round(width * pixelRatio);

    canvas.height = Math.round(height * pixelRatio);

    canvas.style.width = width + "px";

    canvas.style.height = height + "px";

    ctx.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );

    createParticles();

    if (reducedMotion.matches) {

      drawScene();

    }

  }


  // Create particles
  function createParticles() {

    particles = [];

    const area = width * height;

    let particleCount = Math.floor(area / 11000);

    const maxParticles = isMobile() ? 45 : 110;

    const minParticles = isMobile() ? 20 : 40;

    particleCount = Math.max(
      minParticles,
      Math.min(particleCount, maxParticles)
    );

    for (let i = 0; i < particleCount; i++) {

      const color = colors[
        Math.floor(Math.random() * colors.length)
      ];

      particles.push({

        x: Math.random() * width,

        y: Math.random() * height,

        size: Math.random() * 2 + 0.7,

        speedX: (Math.random() - 0.5) * 0.5,

        speedY: (Math.random() - 0.5) * 0.5,

        color: color,

        opacity: Math.random() * 0.6 + 0.2

      });

    }

  }


  // Draw individual particles
  function drawParticles() {

    particles.forEach(function (particle) {

      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        particle.color + particle.opacity + ")";

      ctx.shadowBlur = 12;

      ctx.shadowColor =
        particle.color + "0.8)";

      ctx.fill();

    });

    ctx.shadowBlur = 0;

  }


  // Connect nearby particles
  function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

      for (let j = i + 1; j < particles.length; j++) {

        const dx = particles[i].x - particles[j].x;

        const dy = particles[i].y - particles[j].y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        const maxDistance = 120;

        if (distance < maxDistance) {

          const opacity =
            0.16 * (1 - distance / maxDistance);

          ctx.beginPath();

          ctx.moveTo(
            particles[i].x,
            particles[i].y
          );

          ctx.lineTo(
            particles[j].x,
            particles[j].y
          );

          ctx.strokeStyle =
            "rgba(113, 104, 255, " + opacity + ")";

          ctx.lineWidth = 0.7;

          ctx.stroke();

        }

      }

    }

  }


  // Connect particles to mouse
  function connectMouse() {

    if (mouse.x === null || mouse.y === null) return;

    particles.forEach(function (particle) {

      const dx = particle.x - mouse.x;

      const dy = particle.y - mouse.y;

      const distance = Math.sqrt(
        dx * dx + dy * dy
      );

      if (distance < mouse.radius) {

        const opacity =
          0.5 * (1 - distance / mouse.radius);

        ctx.beginPath();

        ctx.moveTo(mouse.x, mouse.y);

        ctx.lineTo(particle.x, particle.y);

        ctx.strokeStyle =
          "rgba(130, 140, 255, " + opacity + ")";

        ctx.lineWidth = 1;

        ctx.stroke();

      }

    });

  }


  // Draw click ripples
  function drawRipples() {

    for (let i = ripples.length - 1; i >= 0; i--) {

      const ripple = ripples[i];

      const opacity = Math.max(
        0,
        1 - ripple.radius / ripple.maxRadius
      );

      ctx.beginPath();

      ctx.arc(
        ripple.x,
        ripple.y,
        ripple.radius,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle =
        "rgba(137, 129, 255, " + opacity + ")";

      ctx.lineWidth = 2;

      ctx.stroke();

      ripple.radius += 5;

      if (ripple.radius >= ripple.maxRadius) {

        ripples.splice(i, 1);

      }

    }

  }


  // Move particles
  function updateParticles() {

    if (reducedMotion.matches) return;

    particles.forEach(function (particle) {

      particle.x += particle.speedX;

      particle.y += particle.speedY;

      // Keep particles inside the screen
      if (particle.x < 0 || particle.x > width) {

        particle.speedX *= -1;

      }

      if (particle.y < 0 || particle.y > height) {

        particle.speedY *= -1;

      }

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {

        const dx = mouse.x - particle.x;

        const dy = mouse.y - particle.y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < mouse.radius && distance > 0) {

          const force =
            (mouse.radius - distance) / mouse.radius;

          particle.x -=
            (dx / distance) * force * 1.5;

          particle.y -=
            (dy / distance) * force * 1.5;

        }

      }

    });

  }


  // Draw complete scene
  function drawScene() {

    ctx.clearRect(0, 0, width, height);

    drawParticles();

    connectParticles();

    connectMouse();

    drawRipples();

  }


  // Animation loop
  function animate() {

    if (particlesStopped) {

      animationId = null;

      return;

    }

    updateParticles();

    drawScene();

    if (ripples.length > 0 || !reducedMotion.matches) {

      animationId = window.requestAnimationFrame(animate);

    } else {

      animationId = null;

    }

  }


  // Start animation
  function startAnimation() {

    if (particlesStopped) return;

    if (animationId !== null) {

      window.cancelAnimationFrame(animationId);

      animationId = null;

    }

    if (reducedMotion.matches) {

      drawScene();

      return;

    }

    animationId = window.requestAnimationFrame(animate);

  }


  // Stop animation
  function stopAnimation() {

    particlesStopped = true;

    if (animationId !== null) {

      window.cancelAnimationFrame(animationId);

      animationId = null;

    }

    mouse.x = null;

    mouse.y = null;

    ripples.length = 0;

  }


  // Mouse movement
  window.addEventListener("pointermove", function (event) {

    if (particlesStopped || event.pointerType === "touch") return;

    mouse.x = event.clientX;

    mouse.y = event.clientY;

    if (reducedMotion.matches) {

      drawScene();

    }

  });


  // Remove mouse position when leaving screen
  document.addEventListener("pointerleave", function () {

    if (particlesStopped) return;

    mouse.x = null;

    mouse.y = null;

    if (reducedMotion.matches) {

      drawScene();

    }

  });


  // Click ripple effect
  window.addEventListener("pointerdown", function (event) {

    if (particlesStopped || reducedMotion.matches) return;

    ripples.push({

      x: event.clientX,

      y: event.clientY,

      radius: 0,

      maxRadius: 85

    });

    if (animationId === null) {

      startAnimation();

    }

  });


  // Handle window resizing
  window.addEventListener("resize", function () {

    if (particlesStopped) return;

    resizeCanvas();

    startAnimation();

  });


  // Handle reduced motion preference changes
  if (typeof reducedMotion.addEventListener === "function") {

    reducedMotion.addEventListener("change", function () {

      if (particlesStopped) return;

      startAnimation();

    });

  } else if (typeof reducedMotion.addListener === "function") {

    reducedMotion.addListener(function () {

      if (particlesStopped) return;

      startAnimation();

    });

  }


  // Initialize canvas and animation
  resizeCanvas();

  startAnimation();

}

/* =========================================
   LANDING PAGE TRANSITION
========================================= */

function initializeLandingTransition() {

  const welcomeScreen = document.getElementById("welcome-screen");
  const mainPortfolio = document.getElementById("main-portfolio");

  const enterButton = document.getElementById("enter-portfolio");
  const contactButton = document.getElementById("landing-contact");

  if (!welcomeScreen || !mainPortfolio) return;

  let transitionStarted = false;

  function showPortfolio(targetSection) {

    if (transitionStarted) return;

    transitionStarted = true;

    welcomeScreen.classList.add("fade-out");

    mainPortfolio.classList.add("show");
    mainPortfolio.removeAttribute("inert");
    mainPortfolio.setAttribute("aria-hidden", "false");

    document.body.classList.remove("landing-page");
    document.body.classList.add("portfolio-active");

    window.setTimeout(function () {

      const target = document.getElementById(targetSection);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    }, 650);
  }

  if (enterButton) {
    enterButton.addEventListener("click", function (event) {
      event.preventDefault();
      showPortfolio("home");
    });
  }

  if (contactButton) {
    contactButton.addEventListener("click", function (event) {
      event.preventDefault();
      showPortfolio("contact");
    });
  }

}
