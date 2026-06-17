document.addEventListener('DOMContentLoaded', () => {
  // --- MENÚ MÓVIL ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainNavigation = document.getElementById('main-navigation');

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener('click', () => {
      mainNavigation.classList.toggle('mobile-open');
    });

    // Cerrar el menú al hacer clic en un enlace (importante para navegación interna o UX)
    const navLinks = mainNavigation.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNavigation.classList.remove('mobile-open');
      });
    });
  }

  // --- BOTÓN SCROLL AL INICIO ---
  const scrollTopButton = document.getElementById('ast-scroll-top');

  if (scrollTopButton) {
    // Mostrar/ocultar el botón basado en el scroll vertical
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopButton.classList.add('show');
      } else {
        scrollTopButton.classList.remove('show');
      }
    });

    // Acción de scroll suave hacia arriba al hacer clic
    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
