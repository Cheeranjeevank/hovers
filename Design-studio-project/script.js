// Mobile Nav Toggle
const menuBtn = document.getElementById('menuBtn');
const primaryNav = document.getElementById('primaryNav');
if(menuBtn && primaryNav){
  menuBtn.addEventListener('click', ()=>{
    const open = primaryNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

// Smooth Scroll for same-page links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', (e)=>{
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
      primaryNav && primaryNav.classList.remove('open');
    }
  });
});

// Theme Toggle (persist with localStorage)
function setTheme(light){
  document.documentElement.classList.toggle('light', light);
  localStorage.setItem('nova-theme', light ? 'light' : 'dark');
}
(function(){
  const saved = localStorage.getItem('nova-theme');
  if(saved) document.documentElement.classList.toggle('light', saved==='light');
})();

const themeBtn = document.getElementById('themeBtn');
if(themeBtn){
  themeBtn.addEventListener('click', ()=> setTheme(!document.documentElement.classList.contains('light')));
}
const dashThemeBtn = document.getElementById('dashThemeBtn');
if(dashThemeBtn){
  dashThemeBtn.addEventListener('click', ()=> setTheme(!document.documentElement.classList.contains('light')));
}

// Footer year
const yearEl = document.getElementById('year');
if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

// Portfolio filtering
const chips = document.querySelectorAll('.chip');
const tiles = document.querySelectorAll('.tile');
chips.forEach(chip => {
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const cat = chip.dataset.filter;
    tiles.forEach(tile => {
      const ok = cat==='all' || tile.dataset.cat===cat;
      tile.style.display = ok ? '' : 'none';
    });
  });
});

// Contact form (demo)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  const formMsg = document.getElementById('formMsg');
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    formMsg.textContent = 'Thanks! I\'ll get back to you soon.';
    contactForm.reset();
  });
}

// Auth tabs & mock validation
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const authMsg = document.getElementById('authMsg');

tabs.forEach(tab => {
  tab.addEventListener('click', ()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    panels.forEach(p => p.classList.toggle('hidden', p.dataset.panel!==target));
  });
});

const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const pwd = loginForm.password.value.trim();
    if(!email || pwd.length < 6){
      authMsg.textContent = 'Enter a valid email and a 6+ char password.';
      return;
    }
    authMsg.textContent = 'Logged in! (demo)';
    setTimeout(()=> location.href = 'dashboard.html', 600);
  });
}

const signupForm = document.getElementById('signupForm');
if(signupForm){
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = signupForm.email.value.trim();
    const pwd = signupForm.password.value.trim();
    const name = signupForm.name.value.trim();
    if(!name || !email || pwd.length < 6){
      authMsg.textContent = 'Fill all fields (password 6+ chars).';
      return;
    }
    authMsg.textContent = 'Account created! (demo)';
    setTimeout(()=> location.href = 'dashboard.html', 700);
  });
}

// Dashboard sidebar toggle (mobile)
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
if(sidebar && sidebarToggle){
  sidebarToggle.addEventListener('click', ()=>{
    sidebar.classList.toggle('open');
  });
}