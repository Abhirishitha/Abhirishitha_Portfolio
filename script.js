const navLinks = [...document.querySelectorAll('.nav-menu a')];
const sections = [...document.querySelectorAll('main section[id]')];
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const portfolioEmail = 'abhirishithanaraharisetti@gmail.com';

document.getElementById('contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);

  const subject = encodeURIComponent(
    `Portfolio contact from ${data.get('name')}`
  );

  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
  );

  window.location.href =
    `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});
