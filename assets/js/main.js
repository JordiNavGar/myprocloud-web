// --- GLOBAL ERROR CATCHER FOR DEBUGGING ---
window.addEventListener('error', (event) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '10px';
  errorDiv.style.left = '10px';
  errorDiv.style.background = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.padding = '15px';
  errorDiv.style.borderRadius = '8px';
  errorDiv.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
  errorDiv.style.zIndex = '999999';
  errorDiv.style.fontFamily = 'monospace';
  errorDiv.style.fontSize = '12px';
  errorDiv.innerHTML = `<strong>JS Error:</strong> ${event.message} <br> <em>at ${event.filename}:${event.lineno}</em>`;
  document.body.appendChild(errorDiv);
});

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

  // --- BANNER DE COOKIES TÉCNICAS DISCRETO ---
  let cookieAccepted = false;
  try {
    cookieAccepted = localStorage.getItem('cookies_accepted');
  } catch (e) {
    console.warn('LocalStorage is not accessible (this is normal when opening local files):', e);
  }

  const url = window.location.href.toLowerCase();
  const isCookiePolicyPage = url.includes('politica-cookies.html') || url.includes('cookie-policy.html');

  // Si acceden directamente a la página de políticas de cookies, auto-aceptamos para no molestar al usuario en su lectura
  if (isCookiePolicyPage) {
    try {
      localStorage.setItem('cookies_accepted', 'true');
    } catch (e) {
      console.warn('Could not write to LocalStorage:', e);
    }
    cookieAccepted = true;
  }

  if (!cookieAccepted && !document.querySelector('.pc-cookie-banner')) {
    const lang = (document.documentElement.lang || 'es').toLowerCase().split('-')[0];
    const isBlog = /\/blog\//i.test(url) || /\\blog\\/i.test(url);
    const prefix = isBlog ? '../' : '';

    const bannerTexts = {
      es: {
        text: 'Utilizamos cookies técnicas necesarias para el funcionamiento, la seguridad y la protección del formulario. No utilizamos cookies publicitarias ni de seguimiento comercial.',
        btnAccept: 'Entendido',
        btnPolicy: 'Política de cookies',
        policyUrl: prefix + 'politica-cookies.html'
      },
      ca: {
        text: 'Utilitzem cookies tècniques necessàries per al funcionament, la seguretat i la protecció del formulari. No utilitzem cookies publicitàries ni de seguiment comercial.',
        btnAccept: 'Entès',
        btnPolicy: 'Política de cookies',
        policyUrl: prefix + 'politica-cookies.html'
      },
      en: {
        text: 'We use technical cookies required for operation, security and form protection. We do not use advertising or commercial tracking cookies.',
        btnAccept: 'Understood',
        btnPolicy: 'Cookie policy',
        policyUrl: prefix + 'cookie-policy.html'
      }
    };

    const cfg = bannerTexts[lang] || bannerTexts['es'];

    const banner = document.createElement('div');
    banner.className = 'pc-cookie-banner';
    banner.innerHTML = `
      <p class="pc-cookie-text">${cfg.text}</p>
      <div class="pc-cookie-actions">
        <a href="${cfg.policyUrl}" class="pc-cookie-btn pc-cookie-btn-policy">${cfg.btnPolicy}</a>
        <button class="pc-cookie-btn pc-cookie-btn-accept" id="pc-cookie-accept">${cfg.btnAccept}</button>
      </div>
    `;

    document.body.appendChild(banner);

    // Animación de entrada suave
    setTimeout(() => {
      banner.classList.add('show');
    }, 500);

    const acceptBtn = banner.querySelector('#pc-cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        acceptBtn.style.opacity = '0.7';
        acceptBtn.innerText = '...';
        try {
          localStorage.setItem('cookies_accepted', 'true');
        } catch (err) {
          console.warn('Could not write to LocalStorage:', err);
        }
        banner.classList.remove('show');
        setTimeout(() => {
          banner.remove();
        }, 500);
      });
    }
  }
});

