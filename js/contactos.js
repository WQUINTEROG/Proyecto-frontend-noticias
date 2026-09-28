// contacto.js
// Validaciones del formulario de contacto.
// Verifica que todos los campos estén completos y que el correo tenga formato válido.

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-contacto');
  if (!formulario) return;

  // Escuchar el evento submit del formulario
  formulario.addEventListener('submit', (e) => {
    // Evitar que el formulario se envíe por defecto
    e.preventDefault();

    // Obtener los valores de cada campo (sin espacios en blanco)
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Array para acumular los errores encontrados
    let errores = [];

    // Validar que los campos no estén vacíos
    if (nombre === '') errores.push('El nombre es obligatorio');
    if (correo === '') errores.push('El correo es obligatorio');
    if (asunto === '') errores.push('El asunto es obligatorio');
    if (mensaje === '') errores.push('El mensaje es obligatorio');

    // Validar el formato del correo con una expresión regular
    if (correo !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      errores.push('Correo inválido (debe incluir @ y un dominio)');
    }

    // Obtener el elemento donde se mostrarán los mensajes
    const mensajeError = document.getElementById('mensaje-error');

    // Si hay errores, mostrarlos en color rojo
    if (errores.length > 0) {
      mensajeError.innerHTML = errores.join('<br>');
      mensajeError.style.color = 'red';
    } else {
      // Si todo está bien, mostrar mensaje de éxito en verde
      mensajeError.innerHTML = '✅ ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.';
      mensajeError.style.color = 'green';

      // Limpiar el formulario
      formulario.reset();

      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        mensajeError.innerHTML = '';
      }, 5000);
    }
  });
});