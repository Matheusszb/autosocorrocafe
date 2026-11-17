const header = document.querySelector('header');
const menu = document.querySelector('.menu');
const nav = document.querySelector('header nav');

if (header) {
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30), { passive: true });
}
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}

const reveal = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('shown');
      observer.unobserve(entry.target);
    }
  }), { threshold: .15 });
  reveal.forEach(element => observer.observe(element));
} else {
  reveal.forEach(element => element.classList.add('shown'));
}

const dialog = document.querySelector('#lightbox');
if (dialog) {
  const modalImg = dialog.querySelector('img');
  document.querySelectorAll('.gallery button').forEach(button => button.addEventListener('click', () => {
    const image = button.querySelector('img');
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    dialog.showModal();
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
