AOS.init({
  duration: 1000,
  once: true
});

const toggleBtn = document.getElementById("themeToggle");
const circle = document.getElementById("toggleCircle");
const html = document.documentElement;

function updateToggle() {
  if (!circle) return;

  if (html.classList.contains("dark")) {
    circle.style.transform = "translateX(28px)";
    circle.textContent = "☀️";
  } else {
    circle.style.transform = "translateX(0)";
    circle.textContent = "🌙";
  }
}

updateToggle();

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    updateToggle();
  });
}

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

const buttons = document.querySelectorAll(".filterBtn");
const projects = document.querySelectorAll(".project");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    buttons.forEach((b) => {
      b.classList.remove("bg-indigo-500", "text-white");
      b.classList.add("bg-gray-200");
    });

    btn.classList.remove("bg-gray-200");
    btn.classList.add("bg-indigo-500", "text-white");

    projects.forEach((p) => {
      if (filter === "all" || p.classList.contains(filter)) {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
  });
});

const progressBar = document.createElement("div");

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "3px";
progressBar.style.background = "linear-gradient(90deg,#6366F1,#06B6D4)";
progressBar.style.zIndex = "9999";
progressBar.style.width = "0%";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / height) * 100;
  progressBar.style.width = progress + "%";
});

const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "0.1s";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
    card.style.transition = "0.5s";
  });
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("backdrop-blur", "bg-white/70", "dark:bg-gray-900/70");
  } else {
    header.classList.remove("backdrop-blur", "bg-white/70", "dark:bg-gray-900/70");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

const magnets = document.querySelectorAll("button,a[href^='#']");

magnets.forEach((btn) => {
  btn.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    this.style.transform = `translate(${x * 0.2}px,${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translate(0,0)";
  });
});

const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(99,102,241,0.4)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

const transition = document.createElement("div");

transition.style.position = "fixed";
transition.style.top = "0";
transition.style.left = "0";
transition.style.width = "100%";
transition.style.height = "100%";
transition.style.background = "#0f172a";
transition.style.zIndex = "99999";
transition.style.transform = "translateY(100%)";
transition.style.transition = "0.6s";

document.body.appendChild(transition);

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href && !href.startsWith("#") && !href.startsWith("tel:")) {
      e.preventDefault();

      transition.style.transform = "translateY(0)";

      setTimeout(() => {
        window.location = href;
      }, 600);
    }
  });
});

window.addEventListener("load", () => {
  transition.style.transform = "translateY(-100%)";

  setTimeout(() => {
    transition.remove();
  }, 600);
});

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const typingElement = document.querySelector(".typing");

if (typingElement) {
  const words = ["Web Developer", "Frontend Developer", "UI Designer", "JavaScript Developer"];

  let wordIndex = 0;
  let charIndex = 0;
  let typing = true;

  function type() {
    const currentWord = words[wordIndex];

    if (typing) {
      typingElement.textContent = currentWord.slice(0, charIndex++);

      if (charIndex > currentWord.length) {
        typing = false;
        setTimeout(type, 1500);
        return;
      }
    } else {
      typingElement.textContent = currentWord.slice(0, charIndex--);

      if (charIndex === 0) {
        typing = true;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, 80);
  }

  type();
}

const track = document.getElementById("skillsTrack");

if (track) {
  track.innerHTML += track.innerHTML;

  let pos = 0;
  let speed = 0.4;
  let paused = false;

  track.addEventListener("mouseenter", () => (paused = true));
  track.addEventListener("mouseleave", () => (paused = false));

  function animate() {
    if (!paused) {
      pos -= speed;

      if (Math.abs(pos) >= track.scrollWidth / 2) {
        pos = 0;
      }

      track.style.transform = `translateX(${pos}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}
