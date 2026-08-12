// ==========================================================================
// MOOVON SpreadPay™ - Uniform Header Controller
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  highlightCurrentPage();
});

function highlightCurrentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      if (href === 'contact.html') {
        link.classList.add('nav-contact-active');
      }
    } else {
      link.classList.remove('active');
      link.classList.remove('nav-contact-active');
    }
  });
}
