const roles = [
  "Web Developer",
  "C++ Problem Solver",
  "MCA Student",
  "LeetCode Grinder",
  "Frontend Enthusiast"
];
let rIdx = 0, cIdx = 0, deleting = false;
const el = document.getElementById("typed-text");
 
function type() {
  const word = roles[rIdx];
  if (!deleting) {
    el.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();
 
// ---- SKILLS DATA ----
const skills = [
  { icon: "🔵", name: "C++", level: 80, label: "Intermediate" },
  { icon: "☕", name: "Java", level: 45, label: "Basic" },
  { icon: "🌐", name: "HTML/CSS", level: 85, label: "Proficient" },
  { icon: "⚡", name: "JavaScript", level: 70, label: "Intermediate" },
  { icon: "🗄️", name: "SQL", level: 65, label: "Intermediate" },
  { icon: "🧠", name: "Problem Solving", level: 75, label: "Strong" },
  { icon: "🔧", name: "Git", level: 60, label: "Comfortable" },
  { icon: "📦", name: "OOP Concepts", level: 78, label: "Good" },
];
 
const grid = document.getElementById("skillsGrid");
skills.forEach(s => {
  grid.innerHTML += `
    <div class="skill-card">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-width="${s.level}"></div>
      </div>
      <div class="skill-level">${s.level}% — ${s.label}</div>
    </div>
  `;
});
 
// ---- COUNTER ANIMATION ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + "+"; clearInterval(timer); }
    else el.textContent = Math.floor(start);
  }, 16);
}
 
// ---- SCROLL REVEAL + SKILL BAR ANIMATION ----
const reveals = document.querySelectorAll('.reveal');
const bars = document.querySelectorAll('.skill-bar-fill');
let countersStarted = false, barsAnimated = false;
 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
 
      // Animate skill bars when skills section is visible
      if (!barsAnimated && entry.target.closest('#skills') || entry.target.id === 'skills') {
        // handled separately
      }
    }
  });
}, { threshold: 0.15 });
 
reveals.forEach(r => observer.observe(r));
 
// Bar & counter observer
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !barsAnimated) {
      barsAnimated = true;
      bars.forEach(bar => {
        const w = bar.getAttribute('data-width');
        bar.style.width = w + '%';
      });
    }
  });
}, { threshold: 0.3 });
 
const skillsSection = document.getElementById('skills');
if (skillsSection) barObserver.observe(skillsSection);
 
// Counter
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounter(document.getElementById('lc-counter'), 60);
    }
  });
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) counterObserver.observe(heroSection);
 
// ---- ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

 