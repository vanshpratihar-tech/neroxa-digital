gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   ELEMENTS
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor span");

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu nav a");

const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-title");
const heroSmallTitle = document.querySelector(".hero-small-title");
const heroBottomTitle = document.querySelector(".hero-title-bottom");
const heroDescription = document.querySelector(".hero-description");

const revealTexts = document.querySelectorAll(".reveal-text");

const serviceItems = document.querySelectorAll(".service-item");
const processItems = document.querySelectorAll(".process-item");
const projects = document.querySelectorAll(".project");

const magneticElements = document.querySelectorAll(".magnetic");


/* =========================================================
   CUSTOM CURSOR
========================================================= */

if (cursor) {

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const updateCursor = () => {

    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    gsap.set(cursor, {
      x: cursorX,
      y: cursorY
    });

    requestAnimationFrame(updateCursor);
  };

  updateCursor();


  const interactiveElements = document.querySelectorAll(
    "a, button, .service-item, .project, .magnetic"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });

  });

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (magneticElements.length) {

  magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      gsap.to(element, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.4,
        ease: "power3.out"
      });

    });


    element.addEventListener("mouseleave", () => {

      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)"
      });

    });

  });

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && mobileMenu) {

  let menuOpen = false;

  const openMenu = () => {

    menuOpen = true;

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu.classList.add("open");

    document.body.classList.add("menu-open");


    gsap.fromTo(
      mobileLinks,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.25
      }
    );

  };


  const closeMenu = () => {

    menuOpen = false;

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    gsap.to(mobileLinks, {
      y: -20,
      opacity: 0,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {

        mobileMenu.classList.remove("open");

        document.body.classList.remove(
          "menu-open"
        );

        gsap.set(mobileLinks, {
          y: 0,
          opacity: 1
        });

      }
    });

  };


  menuToggle.addEventListener("click", () => {

    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      if (menuOpen) {
        closeMenu();
      }

    });

  });

}


/* =========================================================
   HERO INTRO ANIMATION
========================================================= */

const heroTimeline = gsap.timeline({
  defaults: {
    ease: "power4.out"
  }
});


heroTimeline
  .from(".site-header", {
    y: -40,
    opacity: 0,
    duration: 1
  })

  .from(".hero-top", {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, "-=0.55")

  .from(heroSmallTitle, {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, "-=0.35")

  .from(heroTitle, {
    y: 120,
    opacity: 0,
    duration: 1.2,
    skewY: 4
  }, "-=0.45")

  .from(heroBottomTitle, {
    y: 80,
    opacity: 0,
    duration: 1
  }, "-=0.8")

  .from(heroDescription, {
    y: 40,
    opacity: 0,
    duration: 0.8
  }, "-=0.65")

  .from(".hero-bottom", {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, "-=0.55");


/* =========================================================
   HERO PARALLAX
========================================================= */

if (hero) {

  gsap.to(".hero-title", {
    yPercent: -18,

    ease: "none",

    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });


  gsap.to(".hero-description", {
    yPercent: -35,

    ease: "none",

    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });


  gsap.to(".hero-bottom", {
    yPercent: -60,

    ease: "none",

    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

}


/* =========================================================
   GENERAL SECTION REVEALS
========================================================= */

revealTexts.forEach((element) => {

  gsap.from(element, {

    y: 100,
    opacity: 0,

    duration: 1.2,

    ease: "power4.out",

    scrollTrigger: {
      trigger: element,

      start: "top 85%",

      toggleActions:
        "play none none reverse"
    }

  });

});


/* =========================================================
   SECTION LABELS
========================================================= */

gsap.utils.toArray(".section-label").forEach((label) => {

  gsap.from(label, {

    y: 20,
    opacity: 0,

    duration: 0.8,

    scrollTrigger: {
      trigger: label,

      start: "top 88%",

      toggleActions:
        "play none none reverse"
    }

  });

});


/* =========================================================
   INTRO TEXT
========================================================= */

gsap.utils.toArray(".intro-side p").forEach((paragraph, index) => {

  gsap.from(paragraph, {

    y: 45,
    opacity: 0,

    duration: 0.9,

    delay: index * 0.1,

    ease: "power3.out",

    scrollTrigger: {
      trigger: paragraph,

      start: "top 88%",

      toggleActions:
        "play none none reverse"
    }

  });

});


/* =========================================================
   SERVICES ANIMATION
========================================================= */

serviceItems.forEach((item, index) => {

  gsap.from(item, {

    y: 70,
    opacity: 0,

    duration: 0.8,

    delay: index * 0.04,

    ease: "power3.out",

    scrollTrigger: {
      trigger: item,

      start: "top 92%",

      toggleActions:
        "play none none reverse"
    }

  });

});


/* =========================================================
   SERVICE HOVER
========================================================= */

serviceItems.forEach((item) => {

  const title = item.querySelector("h3");
  const number = item.querySelector(".service-number");
  const arrow = item.querySelector(".service-arrow");

  item.addEventListener("mouseenter", () => {

    gsap.to(title, {
      x: 12,
      duration: 0.45,
      ease: "power3.out"
    });

    gsap.to(number, {
      x: 5,
      color: "#f4f4f0",
      duration: 0.35
    });

    gsap.to(arrow, {
      x: 7,
      y: -7,
      duration: 0.4,
      ease: "power3.out"
    });

  });


  item.addEventListener("mouseleave", () => {

    gsap.to(title, {
      x: 0,
      duration: 0.5,
      ease: "power3.out"
    });

    gsap.to(number, {
      x: 0,
      color: "#999994",
      duration: 0.35
    });

    gsap.to(arrow, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power3.out"
    });

  });

});


/* =========================================================
   WORK HEADER
========================================================= */

gsap.from(".work-header h2", {

  y: 100,
  opacity: 0,

  duration: 1.1,

  ease: "power4.out",

  scrollTrigger: {
    trigger: ".work-header",

    start: "top 82%",

    toggleActions:
      "play none none reverse"
  }

});


gsap.from(".work-header p", {

  y: 45,
  opacity: 0,

  duration: 0.9,

  delay: 0.15,

  scrollTrigger: {
    trigger: ".work-header",

    start: "top 82%",

    toggleActions:
      "play none none reverse"
  }

});


/* =========================================================
   PROJECT REVEALS
========================================================= */

projects.forEach((project, index) => {

  gsap.from(project, {

    y: 90,
    opacity: 0,

    duration: 1,

    delay: index * 0.1,

    ease: "power4.out",

    scrollTrigger: {
      trigger: project,

      start: "top 88%",

      toggleActions:
        "play none none reverse"
    }

  });

});


/* =========================================================
   PROJECT IMAGE MOVEMENT
========================================================= */

projects.forEach((project) => {

  const visual =
    project.querySelector(".project-visual");

  const placeholder =
    project.querySelector(".project-placeholder");


  project.addEventListener("mousemove", (event) => {

    const rect =
      project.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
      rect.height -
      0.5;


    gsap.to(placeholder, {

      x: x * 16,
      y: y * 16,

      duration: 0.6,

      ease: "power3.out"

    });

  });


  project.addEventListener("mouseleave", () => {

    gsap.to(placeholder, {

      x: 0,
      y: 0,

      duration: 0.7,

      ease: "elastic.out(1, 0.45)"

    });

  });

});


/* =========================================================
   STATEMENT REVEAL
========================================================= */

gsap.from(".statement-content h2", {

  y: 120,
  opacity: 0,

  duration: 1.2,

  ease: "power4.out",

  scrollTrigger: {
    trigger: ".statement",

    start: "top 75%",

    toggleActions:
      "play none none reverse"
  }

});


/* =========================================================
   PROCESS ANIMATION
========================================================= */

processItems.forEach((item, index) => {

  gsap.from(item, {

    x: index % 2 === 0 ? -60 : 60,

    opacity: 0,

    duration: 0.9,

    delay: index * 0.08,

    ease: "power3.out",

    scrollTrigger: {
      trigger: item,

      start: "top 90%",

      toggleActions:
        "play none none reverse"
    }

  });

});


/* =========================================================
   PROCESS HOVER
========================================================= */

processItems.forEach((item) => {

  const heading =
    item.querySelector("h3");

  const icon =
    item.querySelector(".process-icon");


  item.addEventListener("mouseenter", () => {

    gsap.to(heading, {
      x: 10,
      duration: 0.45,
      ease: "power3.out"
    });

    gsap.to(icon, {
      x: 6,
      y: -6,
      duration: 0.4
    });

  });


  item.addEventListener("mouseleave", () => {

    gsap.to(heading, {
      x: 0,
      duration: 0.5,
      ease: "power3.out"
    });

    gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 0.5
    });

  });

});


/* =========================================================
   ABOUT IMAGE REVEAL
========================================================= */

gsap.from(".about-image", {

  clipPath: "inset(0 0 100% 0)",

  duration: 1.4,

  ease: "power4.inOut",

  scrollTrigger: {
    trigger: ".about-image",

    start: "top 80%",

    toggleActions:
      "play none none reverse"
  }

});


/* =========================================================
   ABOUT CONTENT
========================================================= */

gsap.from(".about-content > *", {

  y: 60,
  opacity: 0,

  duration: 0.9,

  stagger: 0.1,

  ease: "power3.out",

  scrollTrigger: {
    trigger: ".about-content",

    start: "top 82%",

    toggleActions:
      "play none none reverse"
  }

});


/* =========================================================
   CONTACT REVEAL
========================================================= */

gsap.from(".contact-main h2", {

  y: 130,
  opacity: 0,

  duration: 1.2,

  ease: "power4.out",

  scrollTrigger: {
    trigger: ".contact-main",

    start: "top 75%",

    toggleActions:
      "play none none reverse"
  }

});


gsap.from(".contact-button", {

  scale: 0.5,
  opacity: 0,

  duration: 1,

  delay: 0.25,

  ease: "elastic.out(1, 0.5)",

  scrollTrigger: {
    trigger: ".contact-button",

    start: "top 88%",

    toggleActions:
      "play none none reverse"
  }

});


/* =========================================================
   FOOTER REVEAL
========================================================= */

gsap.from(".footer-top", {

  y: 40,
  opacity: 0,

  duration: 0.8,

  scrollTrigger: {
    trigger: ".site-footer",

    start: "top 90%",

    toggleActions:
      "play none none reverse"
  }

});


gsap.from(".footer-column", {

  y: 30,
  opacity: 0,

  duration: 0.7,

  stagger: 0.1,

  scrollTrigger: {
    trigger: ".footer-grid",

    start: "top 90%",

    toggleActions:
      "play none none reverse"
  }

});


/* =========================================================
   REFRESH SCROLLTRIGGER
========================================================= */

window.addEventListener("load", () => {

  ScrollTrigger.refresh();

});
/* =========================================================
   HEADER SCROLL BLUR
========================================================= */

const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const updateHeader = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 30);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });
}
/* =========================================================
   PAGE LOADER
========================================================= */

(() => {

  const loader = document.querySelector(".page-loader");
  const line = document.querySelector(".loader-line span");
  const percent = document.querySelector(".loader-percent");

  if (!loader || !line || !percent) return;

  let progress = 0;

  const interval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 2;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      line.style.width = "100%";
      percent.textContent = "100%";

      setTimeout(() => {
        loader.classList.add("is-loaded");
      }, 350);

      return;
    }

    line.style.width = `${progress}%`;
    percent.textContent = `${progress}%`;

  }, 70);

})();
/* =========================================================
   NEROXA TYPOGRAPHY INTRO
========================================================= */

(() => {
  const loader = document.querySelector(".page-loader");

  if (!loader) return;

  const revealLoader = () => {
    setTimeout(() => {
      loader.classList.add("is-loaded");

      setTimeout(() => {
        loader.remove();
      }, 1100);

    }, 1450);
  };

  if (document.readyState === "complete") {
    revealLoader();
  } else {
    window.addEventListener("load", revealLoader, { once: true });
  }

})();
