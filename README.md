# 📋 API de Videojuegos

Una API con una base de datos de videojuegos donde puedes crearte un usuario para ir guardando juegos en tus favoritos, y solo de esta lista borrarlos o editarlos.

![Node](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![Express](https://img.shields.io/badge/express-5-blue)
![Mongo](https://img.shields.io/badge/MongoDB-mongoose-yellow)

---

## 📑 Tabla de contenidos

- [Características](#-características)
- [Stack tecnológico](#-stack-tecnológico)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y puesta en marcha](#-instalación-y-puesta-en-marcha)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Modelos de datos](#-modelos-de-datos)
- [Autenticación](#-autenticación)
- [Documentación de la API](#-documentación-de-la-api)
- [Manejo de errores](#️-manejo-de-errores)

---

## ✨ Características

- 🔐 **Registro y login** de usuarios con contraseñas cifradas (bcrypt).
- 🎫 **Autenticación con JWT**: el login devuelve un token que protege las rutas privadas.
- 👤 **Aislamiento por usuario**: cada quien solo ve y modifica sus tareas.
- ✅ **CRUD completo** de tareas (crear, listar, ver, actualizar, borrar).
- 🧹 **Validación de entrada** con express-validator antes de tocar la base de datos.
- 🗂️ **Arquitectura MVC** con capas separadas (modelos, controladores, rutas, middlewares).

---

## 🛠 Stack tecnológico

| Herramienta           | Para qué                                          |
| --------------------- | ------------------------------------------------- |
| **Node.js**           | Entorno de ejecución de JavaScript en el servidor |
| **Express**           | Framework de rutas y middlewares                  |
| **MongoDB + Mongoose**| Base de datos de documentos y modelado de datos   |
| **bcrypt**            | Cifrado (hash) de contraseñas                     |
| **jsonwebtoken**      | Firma y verificación de tokens JWT                |
| **express-validator** | Validación de los datos de entrada                |
| **dotenv**            | Carga de variables de entorno desde `.env`        |

---

## 📌 Requisitos previos

Antes de empezar necesitas tener instalado:

- [Node.js](https://nodejs.org/) **v18 o superior** (`node --version`)
- [MongoDB](https://www.mongodb.com/) en local **o** una cuenta de [MongoDB Atlas](https://www.mongodb.com/atlas)
- Un cliente para probar la API: [Thunder Client](https://www.thunderclient.com/), Postman o `curl`

---

## 🚀 Instalación y puesta en marcha

```bash
# 1. Clona el repositorio
git clone https://github.com/zaxwtf/BackendProyect_m2.git
cd BackendProyect_m2

# 2. Instala las dependencias
npm install

# 3. Crea tu archivo de variables de entorno a partir del ejemplo
cp .env.example .env
#    ...y edita .env con tus valores (sobre todo MONGODB_URI y JWT_SECRET)

# 4. Arranca el servidor en modo desarrollo
npm run dev
```

Si todo va bien, verás en la terminal:

```
✅ Conectado a MongoDB
🚀 Servidor escuchando en http://localhost:3000
```

---

## 🔑 Variables de entorno

El proyecto **no funciona sin un `.env`**. Nunca subas este archivo al repositorio (está en `.gitignore`). En su lugar, se versiona un **`.env.example`** con las claves pero sin los valores secretos, para que cualquiera sepa qué tiene que rellenar.

```bash
# .env.example
PORT=3000
MONGODB_URI=cambia_esto_por_tu_enlace_de_conexion_a_mongoDB
JWT_SECRET=cambia_esto_por_una_cadena_larga_y_aleatoria
```


| Variable          | Descripción                                        | Ejemplo                                |
| ----------------- | -------------------------------------------------- | -------------------------------------- |
| `PORT`            | Puerto en el que escucha el servidor               | `3000`                                 |
| `MONGODB_URI`     | Cadena de conexión a MongoDB                       | `mongodb://localhost:27017/BackendProyect_m2` |
| `JWT_SECRET`      | Clave secreta para firmar los tokens (¡privada!)   | `aB3$...`                              |


---

## 📜 Scripts disponibles

| Comando         | Qué hace                                                   |
| --------------- | ---------------------------------------------------------- |
| `npm run dev`   | Arranca el servidor con recarga automática (`node --watch`)|
| `npm start`     | Arranca el servidor en modo producción                     |
| `npm test`      | Ejecuta todos los tests con Vitest (Sin Test activos en este momento)   |


---

## 🗂 Estructura del proyecto

```
BackendProyect_m2/
├── src/
│   ├── config/
│   │   └── db.js                   # Conexión a MongoDB
│   ├── controllers/
│   │   ├── juegos.test.js
│   │   ├── juegos.controller.js    # CRUD de tareas
│   │   └── usuarios.controller.js  # Registro, login, perfil 
│   ├── middlewares/
│   │   ├── validar.js              # Recoge los errores de express-validator
│   │   ├── validarJuego.js
│   │   ├── ValidarUser.js
│   │   ├── verificarToken.js       # Verifica el JWT y rellena req.usuario
│   │   └── verificarToken.test.js  # Test para comprobar si funciona verifyToken (sin funcionamiento ahora mismo)
│   ├── models/
│   │   ├── users.models.js              # Esquema de usuario
│   │   └── videojuegos.models.js                # Esquema de tarea
│   ├── routes/
│   │   ├── juegos.routes.js
│   │   └── usuarios.routes.js
│   └── app.js                   # Configura Express (sin arrancar el listen)
├── tests/                       # Tests con Vitest
├── .env.example
├── .gitignore
├── server.js                     # Punto de entrada: conecta a la BD y arranca el listen
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧱 Modelos de datos

### Usuario

| Campo       | Tipo     | Reglas                                      |
| ----------- | -------- | ------------------------------------------- |
| `nombre`    | String   | Requerido                                   |
| `apellido1`    | String   | Requerido                                   |
| `apellido2`    | String   |                                   |
| `userName`     | String   | Requerido                                   |
| `userNameUnico`     | String   | Requerido, único             |
| `email`    | String   | Requerido, formato email                                 |
| `password`  | String   | Requerido, se guarda **cifrado** (bcrypt)   |
| `juegosFav`    | ObjectId   | Requerido                                   |
| `createdAt` | Date     | Automático (timestamps)                     |
| `updatedAt` | Date     | Automático (timestamps)                     |

> 🔒 El campo `password` **nunca** se devuelve en las respuestas. El modelo transforma su salida JSON para eliminar `password` y `__v`, y renombrar `_id` a `id`.


### Tarea

| Campo         | Tipo               | Reglas                                  |
| ------------- | ------------------ | --------------------------------------- |
| `nombre`      | String             | Requerido                               |
| `precio` | Number            | Requerido                                |
| `género`     | String     | Requerido, que el género este dentro de la lsita de géneros disponibles      |
| `completado`  | Boolean            | Requerido                   |
| `createdAt`   | Date               | Automático (timestamps)                 |
| `updatedAt`   | Date               | Automático (timestamps)                 |

---

## 🔐 Autenticación

Las rutas marcadas con 🔒 requieren un **token JWT**. El flujo es:

1. Te **registras** (`POST /api/usuarios/crear`) o haces **login** (`POST /api/usuarios/login`).
2. La respuesta incluye un `token`.
3. En cada petición a una ruta protegida, envías ese token en la cabecera:

```http
Authorization: Bearer <tu_token>
```

Si el token falta, está caducado o es inválido, la API responde `401 Unauthorized`.


Las rutas marcadas con 👑 requiren el uso del superusuario

1. Haces **login** (`POST /api/usuarios/login`) usando las siguientes credenciales en el req.body:
```
email: admin@example.com
password: adminpassword
```
2. La respuesta incluye un `token`.
3. En cada petición a una ruta root, envías ese token en la cabecera:

```http
Authorization: Bearer <tu_token>
```
---

## 📡 Documentación de la API

**URL base:** `http://localhost:3000/api`

### Resumen de endpoints

| Método    | Endpoint                          | Auth  | Descripción                       |
| --------  | --------------------              | :--:  | --------------------------------- |
| `GET`     | `/health`                         |  —    | Comprueba que el servidor responde|
| `POST`    | `/usuarios/crear`              |  —    | Registra un nuevo usuario         |
| `POST`    | `/usuarios/login`                 |  —    | Inicia sesión y devuelve un token |
| `GET`     | `/usuarios/profile`               |  🔒  | Datos del usuario autenticado     |
| `GET`     | `/usuarios/profile/favs`          |  🔒  | Lista de juegos favoritos del usuario     |
| `POST`    | `/usuarios/profile/favs`          |  🔒  | Agregar juego a lista de juegos favoritos del usuario     |
| `DELETE`  | `/usuarios/profile/favs/delete`   |  🔒  | Borrar algo de la lista de juegos favoritos del usuario     |
| `GET`     | `/juegos`                         |  -  | Obtiene toda la lista de juegos de la API       |
| `GET`     | `/juegos/:id`                     |  -  | Busca un juego por su id                   |
| `POST`    | `/juegos/crear`                   |  👑  | Permite al superusuario agregar juegos a la API              |
| `DELETE`  | `/juegos/:id`                     |  👑  | Permite al superusuario borrar juegos de la API           |
| `PUT`     | `/juegos/cambiar/:id`              |  👑  | Permite al superusuario editar juegos de la API           |

---

### `POST /api/usuarios/crear`

Crea un usuario y devuelve su token de sesión.

**Body**

```json
{
  "nombre": "Ana",
  "apellido1": "López",
  "userName": "Anita564",
  "email": "ana@example.com",
  "password": "secreta123"
}
```

**Respuesta `201 Created`**

```json
{
  "usuario": {
    "id": "665f1b2c9d4e8a0012a3b4c5",
    "nombre": "Ana",
    "apellido1": "López",
    "userName": "Anita564",
    "userNameUnico": "Anita564#309",
    "email": "ana@example.com",
    "juegosFav": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores posibles:** `400` (datos inválidos), `409` (el email ya existe).

---

### `POST /api/usuarios/login`

Crea un usuario y devuelve su token de sesión.

**Body**

```json
{
  "email": "ana@example.com",
  "password": "secreta123"
}
```

**Respuesta `201 Created`**

```json
{
  "usuario": {
    "id": "665f1b2c9d4e8a0012a3b4c5",
    "nombre": "Ana",
    "apellido1": "López",
    "userName": "Anita564",
    "userNameUnico": "Anita564#309",
    "email": "ana@example.com",
    "juegosFav": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores posibles:** `400` (credenciales incorrectas)

---

### `GET /api/usuarios/profile`


Devuelve los datos del usuario dueño del token.

**Cabeceras**

```http
Authorization: Bearer <tu_token>
```

**Respuesta `200 OK`**

```json
{
  "id": "665f1b2c9d4e8a0012a3b4c5",
  "nombre": "Ana López",
  "email": "ana@example.com"
}
```

---

### `GET /api/usuarios/profile/favs` 🔒

Devuelve la lista de juegos favoritos del usuario dueño del token.

**Cabeceras**

```http
Authorization: Bearer <tu_token>
```

**Respuesta `200 OK`**

```json

  "juegosFav": [
    {
      "_id": "6a1eddbe0c0dbc621b8bbe14",
      "nombre": "Final Fantasy VII",
      "precio": 53,
      "genero": "rpg",
      "createdAt": "2026-06-02T13:42:22.806Z",
      "updatedAt": "2026-06-10T16:33:13.795Z",
      "__v": 0,
      "completado": true
    },
    {
      "_id": "6a1ee5c1d6ff594a1fcc5b5c",
      "nombre": "Tekken 8",
      "precio": 43,
      "genero": "lucha",
      "completado": false,
      "createdAt": "2026-06-02T14:16:33.983Z",
      "updatedAt": "2026-06-02T14:16:33.983Z",
      "__v": 0
    }
  ]
```

---


### `POST /api/usuarios/profile/favs` 🔒

Guarda un juego en la lista de favoritos del usuario como referencia en la lista de juegos de la API.

**Body**

```json
{
  "gameId": "sdgs6d76df7g6d7..."
}
```

**Respuesta `201 Created`**

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**Errores posibles:** `400` (falta el id), `401` (sin token).

---

### `DELETE /api/usuarios/profile/favs/delete` 🔒

Elimina un juego de la lista de favoritos del usuario.

**Body**

```json
{
  "gameId": "sdgs6d76df7g6d7..."
}
```

**Respuesta**

```json
{
  "juegosFav": [
    {
      "_id": "6a1eddbe0c0dbc621b8bbe14",
      "nombre": "Final Fantasy VII",
      "precio": 53,
      "genero": "rpg",
      "createdAt": "2026-06-02T13:42:22.806Z",
      "updatedAt": "2026-06-10T16:33:13.795Z",
      "__v": 0,
      "completado": true
    },
    {
      "_id": "6a1ee5c1d6ff594a1fcc5b5c",
      "nombre": "Tekken 8",
      "precio": 43,
      "genero": "lucha",
      "completado": false,
      "createdAt": "2026-06-02T14:16:33.983Z",
      "updatedAt": "2026-06-02T14:16:33.983Z",
      "__v": 0
    }
  ]
}
```
---

### `GET /api/juegos`

Devuelve lista de juegos de la API

**Respuesta `200 OK`**

```json
    {
      "_id": "6a1eddbe0c0dbc621b8bbe14",
      "nombre": "Final Fantasy VII",
      "precio": 53,
      "genero": "rpg",
      "createdAt": "2026-06-02T13:42:22.806Z",
      "updatedAt": "2026-06-10T16:33:13.795Z",
      "__v": 0,
      "completado": true
    },
    {
      "_id": "6a1ee5c1d6ff594a1fcc5b5c",
      "nombre": "Tekken 8",
      "precio": 43,
      "genero": "lucha",
      "completado": false,
      "createdAt": "2026-06-02T14:16:33.983Z",
      "updatedAt": "2026-06-02T14:16:33.983Z",
      "__v": 0
    }
```
---

### `GET /api/juegos/:id`

Devuelve el juego correspondiente a la id del endpoint

**Endpoint ejemplo**
```
/api/juegos/6a1eddbe0c0dbc621b8bbe14
```

**Respuesta `200 OK`**

```json
    {
      "_id": "6a1eddbe0c0dbc621b8bbe14",
      "nombre": "Final Fantasy VII",
      "precio": 53,
      "genero": "rpg",
      "createdAt": "2026-06-02T13:42:22.806Z",
      "updatedAt": "2026-06-10T16:33:13.795Z",
      "__v": 0,
      "completado": true
    }
```

---

### `POST /api/juegos/crear` 👑

Agrega juego a la lista de juegos de la API

**Body**

```json
{
    "nombre": "Final Fantasy VII",
    "precio": 53,
    "genero": "rpg"
}
```

**Respuesta**
```json
    {
      "_id": "6a1eddbe0c0dbc621b8bbe14",
      "nombre": "Final Fantasy VII",
      "precio": 53,
      "genero": "rpg",
      "createdAt": "2026-06-02T13:42:22.806Z",
      "updatedAt": "2026-06-10T16:33:13.795Z",
      "__v": 0,
      "completado": true
    }
```
---

### `DELETE /api/juegos/:id` 👑

Borra el juego que coincide con el id del endpoint de la lista de juegos de la API

**Endpoint ejemplo**
```
/api/juegos/6a1eddbe0c0dbc621b8bbe14
```

**Respuesta `200 OK`**

```json
    {
      "_id": "6a1eddbe0c0dbc621b8bbe14",
      "nombre": "Final Fantasy VII",
      "precio": 53,
      "genero": "rpg",
      "createdAt": "2026-06-02T13:42:22.806Z",
      "updatedAt": "2026-06-10T16:33:13.795Z",
      "__v": 0,
      "completado": true
    }
```

### `PUT /api/juegos/:id` 👑

Modifica el juego que coincide con el id del endpoint de la lista de juegos de la API y usando los datos intrucidos en el body de la request

**Endpoint ejemplo**
```
/api/juegos/6a1eddbe0c0dbc621b8bbe14
```

**Body**

```json
{
    "nombre": "Final Fantasy VII",
    "precio": 530,
    "genero": "rpg"
}
```

**Respuesta**
```json
    {
      "_id": "6a1eddbe0c0dbc621b8bbe14",
      "nombre": "Final Fantasy VII",
      "precio": 530,
      "genero": "rpg",
      "createdAt": "2026-06-02T13:42:22.806Z",
      "updatedAt": "2026-06-10T16:33:13.795Z",
      "__v": 0,
      "completado": true
    }
```

---

## ⚠️ Manejo de errores

Todos los errores devuelven un JSON con la **misma forma**, para que el frontend sepa siempre dónde mirar:

```json
{
  "mensaje": "Descripción legible del error"
}
```

Cuando el fallo es de **validación**, se añade el detalle campo a campo:

```json
{
  "mensaje": "Datos inválidos",
  "errores": [
    { "campo": "email", "error": "Debe ser un email válido" },
    { "campo": "password", "error": "Mínimo 6 caracteres" }
  ]
}
```

### Códigos de estado usados

| Código | Significado            | Cuándo                                            |
| ------ | ---------------------- | ------------------------------------------------- |
| `200`  | OK                     | Petición correcta con cuerpo de respuesta         |
| `201`  | Created                | Se creó un recurso (registro, nueva tarea)        |
| `204`  | No Content             | Operación correcta sin cuerpo (delete)            |
| `400`  | Bad Request            | Datos de entrada inválidos                        |
| `401`  | Unauthorized           | Token ausente/ inválido o credenciales erróneas   |
| `404`  | Not Found              | El recurso no existe (o no pertenece al usuario)  |
| `409`  | Conflict               | Conflicto, p. ej. email ya registrado             |
| `500`  | Internal Server Error  | Error inesperado del servidor                     |

---