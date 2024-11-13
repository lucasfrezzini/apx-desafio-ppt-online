# Clásico Piedra, Papel o Tijeras Online en Salas Privadas

## Descripción del Proyecto

Este proyecto es una implementación del clásico juego de Piedra, Papel o Tijeras en salas privadas online. El objetivo es llegar a tres victorias y aprender sobre los fundamentos de fullstack development utilizando tecnologías vanilla como Node.js, Express, y JavaScript puro en el frontend todo con Typescript.

## Tecnologías y Conceptos Aprendidos

### Backend

- **Node.js**: Uso de Node.js como entorno de ejecución para el servidor.
- **Express**: Framework para crear aplicaciones web y API REST.
- **API REST**: Diseño y implementación de endpoints RESTful.
- **Middlewares**: Uso de middlewares para manejar solicitudes y respuestas.
- **Express.Router**: Manejo de rutas con Express.Router.
- **Validaciones**: Validación de datos ingresados por los usuarios.
- **Manejo de Errores**: Manejo de errores y excepciones en el servidor.
- **Token Simple para Autenticación**: Implementación de un sistema de autenticación básico utilizando tokens.
- **Dotenv y Variables de Entorno**: Uso de variables de entorno con Dotenv.
- **Firebase**:
  - **Firebase Firestore**: Uso de Firestore para almacenar y recuperar datos.
  - **Firebase Realtime Database**: Uso de Realtime Database para sincronizar datos en tiempo real.
  - **Concepto de Rooms**: Creación y manejo de salas privadas utilizando Realtime Database.
- **Crear Usuarios, Rooms, Autenticación, Login**: Implementación de funcionalidades para crear usuarios, salas, autenticación y login.

### Frontend

- **Vanilla JavaScript + Typescript**: Uso de JavaScript puro sin librerías adicionales con Typescript.
- **WebComponents**: Creación de componentes web personalizados.
- **Router Vanilla JavaScript**: Implementación de un router para manejar rutas en la aplicación.
- **State Management**: Manejo del estado de la aplicación sin librerías adicionales.
- **Lógica de Usuarios**: Implementación de la lógica para manejar usuarios y sus interacciones.
- **Consulta a Endpoints y API**: Realización de solicitudes a los endpoints del servidor para crear usuarios, salas, etc.
- **Firebase Realtime y Sincronia de Rooms y Usuarios**: Uso de Firebase Realtime Database para sincronizar los datos de las salas y los usuarios en tiempo real.
- **Componentización**: División de la interfaz de usuario en componentes reutilizables.

## Enlace a la Documentación de Postman

Para acceder a la documentación completa de nuestra API en Postman, puedes seguir este enlace:

[Documentación de API en Postman](https://www.postman.com/lucasfrezzini/ppt-online/collection/krlw46p/ppt-online-api)

## Estructura del Proyecto

```plaintext
apx-n2-desafio-ppt-online/
├── back/
│   ├── index.ts
│   ├── routes/
│   │   ├── userRouter.ts
│   │   ├── roomsRouter.ts
│   │   └── authRoutes.ts
│   ├── middlewares/
│   │   ├── connectedMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   └── validators/
│   ├── db/
│   │   ├── database.ts
│   ├── utils/
│   │   ├── customErorres.ts
│   │   └── utils.ts
│   ├──.env
│   └── package.json
├── front/
│   ├── index.html
│   ├── main.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── bottomHands/
│   │   │   ├── button/
│   │   │   ├── counter/
│   │   ├── pages/
│   │   │   ├── Choice.ts
│   │   │   ├── ErrorRoom.ts
│   │   │   ├── Game.ts
│   │   │   ├── Home.ts
│   │   │   ├── InfoRoom.ts
│   │   │   ├── Lobby.ts
│   │   │   ├── Result.ts
│   │   │   ├── Rules.ts
│   │   │   ├── SetPlayer.ts
│   │   │   └── SetRoom.ts
│   │   ├── router/
│   │   ├── state/
│   │   ├── utils/
│   │   │   ├── database.ts
│   │   │   └── utils.ts
│   ├── main.ts
│   └── styles.css
├── README.md
└──.gitignore
```

## Instrucciones para Ejecutar el Proyecto

### Backend

1. **Instalar Dependencias**:
   ```bash
   cd back
   npm install
   ```
2. **Configurar Variables de Entorno**:
   - Crea un archivo `.env` en el directorio `back` y agrega tus variables de entorno.
3. **Iniciar el Servidor**:
   ```bash
   npm run dev
   ```

### Frontend

1. **Instalar Dependencias**:
   ```bash
   cd front
   npm install
   ```
2. **Iniciar el Servidor**:
   ```bash
   npm run dev
   ```

## Contribuir

Este proyecto es una iniciativa de aprendizaje y cualquier contribución es bienvenida. Si deseas contribuir, por favor:

1. **Fork el Repositorio**.
2. **Crea una Nueva Rama** para tus cambios.
3. **Realiza tus Cambios** y asegúrate de que todo funcione correctamente.
4. **Envía un Pull Request** con una descripción de tus cambios.

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

## Agradecimientos

Agradezco a todos aquellos que han contribuido y apoyado con ideas y sugerencias para que este proyecto funcione de manera exitosa. Agradezco en especial a la escuela de [APX.school](https://apx.school) que me ha esta formando y me ha enseñado muchisimo. ¡Espero que este proyecto te sea útil para aprender sobre fullstack development con sus bases en su maxima expresividad!
