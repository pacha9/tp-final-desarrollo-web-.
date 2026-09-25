# Trabajo Integrador Final - Desarrollo Web

Este proyecto consiste en una aplicación web interactiva desarrollada con React y Vite, conectada a una base de datos relacional alojada en Supabase. Se implementó un CRUD completo (Create, Read, Update, Delete) que permite gestionar publicaciones en tiempo real de forma dinámica.

## Explicación de la Capa de Servicios

Toda la lógica de comunicación con la base de datos se encuentra centralizada y encapsulada dentro del archivo `src/services/publicaciones.js` mediante cuatro funciones principales:

* **obtenerPublicaciones()**: Ejecuta una consulta SELECT sobre la tabla "publicaciones" para traer los registros existentes y los ordena de forma descendente utilizando el campo "creado_en". Se invoca al cargar la aplicación a través de un hook useEffect.
* **crearPublicacion(datos)**: Realiza una operación INSERT enviando los campos de título y contenido capturados en el formulario. Se dispara al enviar una nueva publicación en la interfaz.
* **actualizarPublicacion(id, cambios)**: Realiza una acción UPDATE filtrando por el identificador único (ID) del registro seleccionado. Se utiliza para persistir las modificaciones editadas por el usuario.
* **eliminarPublicacion(id)**: Envía una petición DELETE para remover de forma física el registro correspondiente al ID indicado, actualizando el estado local de la aplicación.
