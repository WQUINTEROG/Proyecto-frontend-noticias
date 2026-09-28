// detalle.js
// Carga el detalle de una noticia según el ID que llega por la URL.
// También configura el botón "Volver" según el origen del usuario
// y verifica si la noticia está guardada en favoritos.

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('detalle-contenido');
  const enlaceVolver = document.getElementById('volver');
  if (!contenedor) return;

  // Obtener parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  let id = parseInt(params.get('id'));
  const desde = params.get('desde');

  // Cargar todas las noticias
  const noticias = await cargarNoticias();

  // Si no hay ID, usar la última noticia vista o la primera
  // (guardada en localStorage) o la primera noticia del array
  if (!id || isNaN(id)) {
    const ultimaVista = localStorage.getItem('ultimaNoticia');
    id = ultimaVista ? parseInt(ultimaVista) : noticias[0].id;
  }

  const noticia = noticias.find(n => n.id === id);

  if (!noticia) {
    contenedor.innerHTML = '<p>Noticia no encontrada.</p>';
    return;
  }

  // Guardar la noticia actual como última vista
  localStorage.setItem('ultimaNoticia', noticia.id);

  // Configura el boton "volver"
  if (enlaceVolver) {
    // Se lee el parámetro "desde" de la URL para saber
    // desde dónde vino el usuario (listado, favoritos o home)
    // y así mostrar el botón "Volver" correcto
    if (desde === 'favoritos') {
      enlaceVolver.href = 'favoritos.html';
      enlaceVolver.textContent = '← Volver a favoritos';
    } else if (desde === 'listado') {
      enlaceVolver.href = 'listado.html';
      enlaceVolver.textContent = '← Volver al listado';
    } else {
      enlaceVolver.href = 'index.html';
      enlaceVolver.textContent = '← Volver al inicio';
    }
  }

  // Verificar si ya esta en favoritos
  const esFavorito = obtenerFavoritos().includes(noticia.id);

  // Renderizar el detalle
  // El contenido se divide por párrafos (\n\n) y cada uno
// se convierte en una etiqueta <p> para mejor presentación.
  contenedor.innerHTML = `
    <img src="${noticia.imagen}" alt="${noticia.titulo}" class="detalle-imagen">
    <span class="badge">${noticia.categoria}</span>
    <h1>${noticia.titulo}</h1>
    <p class="metadatos">Por: ${noticia.autor} | Fecha: ${noticia.fecha}</p>
    <div class="contenido">
      ${noticia.contenido.split('\n\n').map(p => `<p>${p}</p>`).join('')}
    </div>
    <div class="detalle-botones">
      <button 
        class="btn-favorito ${esFavorito ? 'activo' : ''}" 
        id="btn-favorito-detalle"
        onclick="toggleFavoritoDetalle(${noticia.id}, this)">
        ${esFavorito ? '❤ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
      <a href="contacto.html" class="btn-secundario">📧 Contactar</a>
    </div>
  `;
});