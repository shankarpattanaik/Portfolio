"use strict";

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

/**
 * back to top & header
 */

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

window.addEventListener("load", () => {
  const popup = document.querySelector(".whatsapp-popup");
  popup.classList.add("show");
  // Hide popup after 6 seconds
  setTimeout(() => {
    popup.classList.remove("show");
  }, 5000);
});

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

        // Stagger animations by 300ms each
        setTimeout(() => {
          // Animate bar width
          bar.style.width = targetPercent + "%";

          // Animate number count
          let start = 0;
          const duration = 1500; // same as CSS transition
          const stepTime = Math.floor(duration / targetPercent);

          const counter = setInterval(() => {
            start++;
            dataElement.textContent = start + "%";
            if (start >= targetPercent) clearInterval(counter);
          }, stepTime);
        }, index * 300); // stagger delay
      });

      window.removeEventListener("scroll", animateSkills); // run once
    }
  };

  window.addEventListener("scroll", animateSkills);
  animateSkills(); // animate if already in view
});

const typedText = document.getElementById("typed-text");
const texts = [
  "Full Stack Developer",
  "Building modern, responsive web applications",
  "Software Engineer with a passion for innovation",
  "MERN Stack Developer",
  "Solving real-world problems with technology",
  "Building scalable digital solutions",
  "Creating apps that users love",
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

    // Preserve space characters
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

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Display user message
  chatBox.innerHTML += `<div class="user-msg">${message}</div>`;
  chatInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div class="bot-msg">Error: Could not reach server</div>`;
  }
}
