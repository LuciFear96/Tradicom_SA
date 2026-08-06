/**
 * Script de interactividad para el sitio web de Tradicom S.A.
 * Desarrollado con JavaScript puro (Vanilla JS) y comentado en español.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. Barra de Navegación y Efecto Sticky al Desplazarse
  // ==========================================================================
  const header = document.querySelector('header') || document.querySelector('.scandi-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  // Añade la clase 'scrolled' a la cabecera cuando el usuario baja la página
  let scrollTicking = false;
  const controlDesplazamientoCabecera = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };
  
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        controlDesplazamientoCabecera();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
  controlDesplazamientoCabecera(); // Comprobación inmediata al cargar la página

  // ==========================================================================
  // 2. Menú Hamburguesa para Dispositivos Móviles
  // ==========================================================================
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Cierra el menú cuando se hace clic en cualquier enlace
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Cierra el menú al hacer clic en cualquier parte fuera del menú
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 3. Carrusel de Fotos Automático de la Página de Inicio (Inicio)
  // ==========================================================================
  const fotosCarouselInicio = document.querySelectorAll('.intro-carousel-img');
  let indiceFotoActual = 0;
  const tiempoTransicionFotos = 4000; // Rotación cada 4 segundos

  if (fotosCarouselInicio.length > 0) {
    const rotarFotosInicio = () => {
      // Quita la clase activa de la imagen actual
      fotosCarouselInicio[indiceFotoActual].classList.remove('active');
      
      // Incrementa el índice de manera circular
      indiceFotoActual = (indiceFotoActual + 1) % fotosCarouselInicio.length;
      
      // Añade la clase activa a la siguiente imagen
      fotosCarouselInicio[indiceFotoActual].classList.add('active');
    };
    
    // Inicia el intervalo de cambio automático
    setInterval(rotarFotosInicio, tiempoTransicionFotos);
  }

  // ==========================================================================
  // 4. Deslizador Interactivo de la Sección 'Sobre Nosotros'
  // ==========================================================================
  const diapositivas = document.querySelectorAll('.slide');
  const contenedorPuntos = document.querySelector('.slider-dots');
  const botonPrev = document.querySelector('.slider-control-prev');
  const botonNext = document.querySelector('.slider-control-next');
  
  // Ejecuta la lógica del slider únicamente si los elementos existen en la página activa
  if (diapositivas.length > 0 && contenedorPuntos) {
    let diapositivaActual = 0;
    let temporizadorSlider;
    const tiempoCambioDiapositiva = 6000; // 6 segundos por diapositiva

    // Genera dinámicamente los puntos indicadores inferiores
    diapositivas.forEach((_, index) => {
      const punto = document.createElement('button');
      punto.classList.add('slider-dot');
      if (index === 0) punto.classList.add('active');
      punto.setAttribute('aria-label', `Ir a diapositiva ${index + 1}`);
      contenedorPuntos.appendChild(punto);
    });

    const puntos = document.querySelectorAll('.slider-dot');

    // Función para mostrar una diapositiva específica
    const mostrarDiapositiva = (n) => {
      // Oculta todas las diapositivas y desactiva los puntos
      diapositivas.forEach(slide => slide.classList.remove('active'));
      puntos.forEach(dot => dot.classList.remove('active'));
      
      // Calcula el índice circular
      diapositivaActual = (n + diapositivas.length) % diapositivas.length;
      
      // Activa la diapositiva y el punto correspondiente
      diapositivas[diapositivaActual].classList.add('active');
      puntos[diapositivaActual].classList.add('active');
    };

    // Funciones de navegación
    const avanzarDiapositiva = () => {
      mostrarDiapositiva(diapositivaActual + 1);
    };

    const retrocederDiapositiva = () => {
      mostrarDiapositiva(diapositivaActual - 1);
    };

    // Controladores de eventos para los botones laterales
    if (botonNext) {
      botonNext.addEventListener('click', () => {
        avanzarDiapositiva();
        reiniciarTemporizador();
      });
    }

    if (botonPrev) {
      botonPrev.addEventListener('click', () => {
        retrocederDiapositiva();
        reiniciarTemporizador();
      });
    }

    // Controladores de eventos para los puntos indicadores
    puntos.forEach((punto, index) => {
      punto.addEventListener('click', () => {
        mostrarDiapositiva(index);
        reiniciarTemporizador();
      });
    });

    // Gestión del ciclo automático de reproducción
    const iniciarTemporizador = () => {
      temporizadorSlider = setInterval(avanzarDiapositiva, tiempoCambioDiapositiva);
    };

    const reiniciarTemporizador = () => {
      clearInterval(temporizadorSlider);
      iniciarTemporizador();
    };

    // Inicializa el slider automático
    iniciarTemporizador();
  }

  // ==========================================================================
  // 5. Envío de Formulario y Redirección a WhatsApp Corporativo (Contacto)
  // ==========================================================================
  const formularioContacto = document.getElementById('contactForm');
  const botonWhatsapp = document.getElementById('whatsappBtn');

  // Simulación de envío del formulario
  if (formularioContacto) {
    formularioContacto.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Captura de datos ingresados por el usuario
      const nombre = document.getElementById('name').value.trim();
      const telefono = document.getElementById('phone').value.trim();
      const correo = document.getElementById('email').value.trim();
      
      const botonEnviar = formularioContacto.querySelector('button[type="submit"]');
      const textoOriginalBoton = botonEnviar.textContent;
      
      // Micro-interacción visual de carga
      botonEnviar.disabled = true;
      botonEnviar.textContent = 'Enviando...';
      botonEnviar.style.backgroundColor = 'var(--brand-green)';
      
      setTimeout(() => {
        botonEnviar.textContent = '✓ Mensaje Enviado';
        
        // Ventana emergente con mensaje personalizado de éxito
        alert(`¡Gracias, ${nombre}! Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo en tu correo (${correo}) o número telefónico (${telefono}) a la brevedad.`);
        
        formularioContacto.reset();
        
        // Regresa el botón a su estado original después de unos segundos
        setTimeout(() => {
          botonEnviar.disabled = false;
          botonEnviar.textContent = textoOriginalBoton;
          botonEnviar.style.backgroundColor = 'var(--brand-orange)';
        }, 3000);
      }, 1500);
    });
  }

  // Lógica para enviar mensajes y redirigir directamente a WhatsApp Web
  if (botonWhatsapp) {
    botonWhatsapp.addEventListener('click', () => {
      // Lee los campos del formulario en caso de que el usuario ya los esté digitando
      const nombre = document.getElementById('name').value.trim();
      const empresa = document.getElementById('company').value.trim();
      const mensaje = document.getElementById('message').value.trim();
      
      // Mensaje base preconfigurado
      let mensajeWhatsapp = 'Hola Tradicom S.A., me gustaría recibir más información sobre sus servicios de transporte y logística.';
      
      // Adapta dinámicamente el mensaje si hay datos en el formulario
      if (nombre) {
        mensajeWhatsapp = `Hola Tradicom S.A., mi nombre es ${nombre}.`;
        if (empresa) {
          mensajeWhatsapp += ` Escribo en representación de la empresa ${empresa}.`;
        }
        if (mensaje) {
          mensajeWhatsapp += ` Mi consulta es la siguiente: ${mensaje}`;
        } else {
          mensajeWhatsapp += ` Me gustaría recibir información sobre sus servicios de transporte nacional.`;
        }
      }
      
      // Número telefónico destino corporativo (+58 414-3809062)
      const telefonoDestino = '584143809062'; 
      const mensajeCodificado = encodeURIComponent(mensajeWhatsapp);
      const urlWhatsapp = `https://wa.me/${telefonoDestino}?text=${mensajeCodificado}`;
      
      // Abre la URL en una nueva pestaña del navegador
      window.open(urlWhatsapp, '_blank');
    });
  }

  // ==========================================================================
  // 6. Pestañas de Sector en Hero Fusion
  // ==========================================================================
  const sectorTabs = document.querySelectorAll('.sector-tab');
  if (sectorTabs.length > 0) {
    sectorTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sectorTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }
});

