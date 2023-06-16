# CalendarioAPP

CalendarioAPP es una aplicación de calendario desarrollada utilizando la pila MERN (MongoDB, Express, React, Node.js). Permite a los usuarios gestionar eventos en un calendario interactivo y ofrece funcionalidades como la visualización de eventos en diferentes vistas (mes, semana, día y agenda), creación, edición y eliminación de eventos.

## Características principales

- Interfaz de usuario intuitiva con un gran calendario donde se muestran los eventos.
- Dos rutas principales: inicio de sesión y registro, ambos en el mismo lugar.
- Vistas de calendario disponibles: mes, semana, día y agenda.
- Persistencia de datos a través del uso de local storage para mantener la información después de recargar la página.
- Creación de eventos mediante una ventana modal al hacer clic en el botón de "más".
- Edición de eventos al hacer doble clic en ellos.
- Eliminación de eventos seleccionándolos y haciendo clic en el botón de eliminar.

## Tecnologías utilizadas

- Frontend:

  - React
  - Redux
  - React Router DOM
  - Moment.js
  - react-modal
  - react-datetime-picker
  - sweetalert2

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT)
