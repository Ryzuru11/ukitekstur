/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 32,
  coverflowEffect: {
    rotate: 0,
  },
});

/*==================== VIDEO ====================*/
const videoFile = document.getElementById("video-file"),
  videoButton = document.getElementById("video-button"),
  videoIcon = document.getElementById("video-icon");

function playPause() {
  if (videoFile.paused) {
    // Play video
    videoFile.play();
    // We change the icon
    videoIcon.classList.add("ri-pause-line");
    videoIcon.classList.remove("ri-play-line");
  } else {
    // Pause video
    videoFile.pause();
    // We change the icon
    videoIcon.classList.remove("ri-pause-line");
    videoIcon.classList.add("ri-play-line");
  }
}

if (videoButton) {
  videoButton.addEventListener("click", playPause);
}

function finalVideo() {
  // Video ends, icon change
  videoIcon.classList.remove("ri-pause-line");
  videoIcon.classList.add("ri-play-line");
}
// ended, when the video ends
if (videoFile) {
  videoFile.addEventListener("ended", finalVideo);
}

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const activeLink = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );
      if (activeLink) {
        activeLink.classList.add("active-link");
      }
    } else {
      const activeLink = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );
      if (activeLink) {
        activeLink.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  distance: "60px",
  duration: 2800,
  // reset: true,
});

sr.reveal(
  `.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,
  {
    origin: "top",
    interval: 100,
  }
);

sr.reveal(
  `.about__data, 
           .video__description,
           .subscribe__description`,
  {
    origin: "left",
  }
);

sr.reveal(
  `.about__img-overlay, 
           .video__content,
           .subscribe__form`,
  {
    origin: "right",
    interval: 100,
  }
);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
  themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

/*==================== FLOATING SOCIAL ICONS ====================*/
// Toggle floating social icons
const toggleBtn = document.getElementById("toggleSocials");
const socialIcons = document.getElementById("socialIcons");

if (toggleBtn && socialIcons) {
  toggleBtn.addEventListener("click", () => {
    socialIcons.classList.toggle("show");
  });
}

/*==================== DISCOVER DROPDOWN CLICK ====================*/
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector(".dropdown__toggle");
  const dropdownParent = dropdownToggle?.closest(".nav__dropdown");

  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Close all other dropdowns first
      document.querySelectorAll(".nav__dropdown").forEach((dropdown) => {
        if (dropdown !== dropdownParent) {
          dropdown.classList.remove("active");
        }
      });

      // Toggle current dropdown
      dropdownParent.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!dropdownParent.contains(e.target)) {
        dropdownParent.classList.remove("active");
      }
    });

    // Close dropdown when clicking on dropdown links
    const dropdownLinks = dropdownParent.querySelectorAll(".dropdown__link");
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", () => {
        dropdownParent.classList.remove("active");
      });
    });
  }
});

/*==================== SMOOTH SCROLLING ====================*/
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/*==================== MOBILE DROPDOWN HANDLER ====================*/
// Handle dropdown for mobile devices
function handleMobileDropdown() {
  const dropdownToggles = document.querySelectorAll(".dropdown__toggle");

  dropdownToggles.forEach((toggle) => {
    const dropdown = toggle.closest(".nav__dropdown");
    const dropdownMenu = dropdown.querySelector(".dropdown__menu");

    // For mobile, add click handler
    if (window.innerWidth <= 767) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
    }
  });
}

// Call on window resize
window.addEventListener("resize", handleMobileDropdown);

/*==================== PRELOADER (Optional) ====================*/
// Hide preloader when page is loaded
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
// Alternative to ScrollReveal for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe elements with animation class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

   document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll('.timeline__item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  });

  items.forEach(item => {
    observer.observe(item);
  });
});


//galery
const filterButtons = document.querySelectorAll('.filter-button');
const galleryItems = document.querySelectorAll('.gallery__item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      if (categories.includes(filter) || filter === 'Best Project') {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});


//contact html
// Word counter logic for the contact textarea
const textarea = document.querySelector(".contact__textarea");
const wordCount = document.querySelector(".word__count");

if (textarea && wordCount) {
  textarea.addEventListener("input", () => {
    wordCount.textContent = `${textarea.value.length} of 300 max words.`;
  });
}

