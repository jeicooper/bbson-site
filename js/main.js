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

/* ─── Inquiry form → emailed via Web3Forms ─────────────── */
// 1) Get a free access key at https://web3forms.com (enter the company email that should receive inquiries)
// 2) Paste it below
const WEB3FORMS_ACCESS_KEY = '71442a3b-bdfc-415b-954f-eee18c184824';

const inquiryForm = document.getElementById('inquiry-form');
const submitBtn   = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');
const formError   = document.getElementById('form-error');

function flash(el) {
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 6000);
}

inquiryForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  formSuccess.classList.add('hidden');
  formError.classList.add('hidden');

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject:    'New website inquiry from ' + name,
        from_name:  'BBSON Website',
        name,
        email,                       // used as the reply-to address
        company:    company || '-',
        message,
        botcheck:   document.getElementById('botcheck').checked
      })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      inquiryForm.reset();
      flash(formSuccess);
    } else {
      console.error('Form error:', data);
      flash(formError);
    }
  } catch (err) {
    console.error('Form error:', err);
    flash(formError);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});

/* ─── Client carousel: duplicate cards for a seamless loop ─ */
(function () {
  const track = document.getElementById('client-track');
  if (!track) return;
  Array.from(track.children).forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();