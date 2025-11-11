"use strict";

// navbar toggle

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

// toggle the navbar when click any navbar link

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

// back to top & header

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// whatsApp popup

window.addEventListener("load", () => {
  const popup = document.querySelector(".whatsapp-popup");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 5000);
});

// skills animation

document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.getElementById("skills");
  const progressBars = document.querySelectorAll(".skills-item");

  const animateSkills = () => {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      progressBars.forEach((item, index) => {
        const bar = item.querySelector(".skills-progress");
        const dataElement = item.querySelector(".skills-data");
        const targetPercent = parseInt(dataElement.getAttribute("value"));
        setTimeout(() => {
          bar.style.width = targetPercent + "%";
          let start = 0;
          const duration = 1500;
          const stepTime = Math.floor(duration / targetPercent);

          const counter = setInterval(() => {
            start++;
            dataElement.textContent = start + "%";
            if (start >= targetPercent) clearInterval(counter);
          }, stepTime);
        }, index * 300);
      });
      window.removeEventListener("scroll", animateSkills);
    }
  };
  
  window.addEventListener("scroll", animateSkills);
  animateSkills();
});

// typeWriting

const typedText = document.getElementById("typed-text");
const texts = [
  "Full Stack Developer",
  "Software Engineer",
  "MERN Stack Developer",
  "Creating apps that users love",
  "UI/UX Designer",
  "Design, Code, Deploy",
  "Building Scalable Solutions",
];

let textIndex = 0;
let charIndex = 0;
let typingSpeed = 100;
let erasingSpeed = 50;
let delayBetweenTexts = 2000;

function type() {
  if (charIndex < texts[textIndex].length) {
    const char = texts[textIndex].charAt(charIndex);
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char === " " ? "\u00A0" : char;

    typedText.appendChild(span);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTexts);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.removeChild(typedText.lastChild);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});
