/* ─── Footer year ───────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─── Mobile menu toggle ────────────────────────────────── */
const menuToggle  = document.getElementById('menu-toggle');
const mobileMenu  = document.getElementById('mobile-menu');
const iconMenu    = document.getElementById('icon-menu');
const iconClose   = document.getElementById('icon-close');

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  iconMenu.classList.toggle('hidden', !isOpen);
  iconClose.classList.toggle('hidden', isOpen);
});

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  iconMenu.classList.remove('hidden');
  iconClose.classList.add('hidden');
}

/* ─── Sticky nav shadow on scroll ──────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('shadow-lg', window.scrollY > 10);
});

/* ─── Inquiry form (client-side only) ──────────────────── */
document.getElementById('inquiry-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const success = document.getElementById('form-success');

  if (!name || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Show success message (wire up to an email service later e.g. EmailJS / Formspree)
  this.reset();
  success.classList.remove('hidden');
  setTimeout(() => success.classList.add('hidden'), 5000);
});