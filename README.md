# 💬 Chat Free Easy

Un chat en tiempo real, moderno y minimalista para demostrar mis habilidades como programador. Construido con Next.js (TypeScript), Auth.js (Google y GitHub), y WebSockets (ws) sobre un backend con Express.

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Auth.js](https://img.shields.io/badge/Auth.js-5.0-000?style=for-the-badge)
![ws](https://img.shields.io/badge/ws-8.18.3-blue?style=for-the-badge)

## ✨ ¿Qué demuestra este proyecto?

- Arquitectura completa Frontend + Backend en TypeScript.
- Autenticación moderna con Auth.js y proveedores de Google y GitHub.
- Comunicación en tiempo real con WebSockets y manejo de presencia de usuarios.
- UI responsiva y moderna con Tailwind CSS.
- Buenas prácticas: modularidad con hooks y componentes, y despliegue con Docker.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Auth**: Auth.js 5 con proveedores de **Google** y **GitHub** (`frontend/auth.ts`)
- **Backend**: Node.js + Express 5, TypeScript, WebSocket server con `ws`
- **Infra**: Docker y docker-compose (multi-stage para Next.js)

## 📁 Estructura del Proyecto

```
chat_free_easy/
├── frontend/                 # Aplicación Next.js (TypeScript + Tailwind + Auth.js)
│   ├── app/
│   ├── auth.ts               # Configuración Auth.js (Google/GitHub)
│   ├── next.config.ts
│   └── ...
├── backend/                  # Servidor Express + ws (TypeScript)
│   ├── src/index.ts          # HTTP + WebSocketServer en /api/ws
│   └── ...
├── docker-compose.yml        # Orquestación de Frontend/Backend
└── README.md                 # Este archivo (documentación raíz)
```

## ⚙️ Variables de Entorno

### Frontend (`frontend/.env.local`)
- `NEXTAUTH_URL` URL pública del frontend (ej. http://localhost:3000)
- `AUTH_SECRET` Secreto de Auth.js
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` Credenciales OAuth de Google
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` Credenciales OAuth de GitHub
- `NEXT_PUBLIC_WS_URL` URL del WebSocket (ej. ws://localhost:5000 para local; ws://localhost:4000 en Docker)

Nota: Los providers se configuran en `frontend/auth.ts` usando estas variables.

### Backend (`backend/.env`)
- `PORT` Puerto HTTP/WebSocket (por defecto `5000` en local)

## 🔐 Configuración OAuth

Configura los proveedores en Google Cloud y GitHub Developer settings.

- **Google**
  - Authorized Origins: `http://localhost:3000`
  - Authorized Redirect URIs: `http://localhost:3000/api/auth/callback/google`
- **GitHub**
  - Homepage URL: `http://localhost:3000`
  - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

Asegúrate de colocar los IDs/Secrets en las variables `AUTH_GOOGLE_*` y `AUTH_GITHUB_*`.

## 🏃‍♂️ Ejecutar en Desarrollo

En dos terminales separadas:

```bash
# Terminal 1 - Backend
cd backend
pnpm install # o npm/yarn
pnpm dev     # levanta Express y WebSocket (por defecto en http://localhost:5000)

# Terminal 2 - Frontend
cd frontend
pnpm install # o npm/yarn
pnpm dev     # app en http://localhost:3000
```

Rutas útiles:
- Frontend: http://localhost:3000
- Backend (HTTP): http://localhost:5000
- WebSocket: ws://localhost:5000/api/ws

## 🐳 Ejecutar con Docker

Con variables de entorno preparadas (ver `docker-compose.yml`):

```bash
docker-compose build
docker-compose up -d
```

- Frontend en `http://localhost:3000`
- Backend expuesto en el contenedor por el puerto `4000` (mapeado como `4000:4000`)
- WebSocket en `ws://localhost:4000/api/ws`

## 🧩 Características Clave

- Autenticación con **Auth.js**: Google y GitHub.
- Tiempo real con **WebSocket** (`ws`) y presencia de usuarios.
- UI moderna y responsive con **Tailwind CSS**.
- Código en **TypeScript** extremo a extremo.
- Arquitectura modular (hooks personalizados, componentes reutilizables).

## 🤝 Contribuir

1. Haz fork del proyecto.
2. Crea una rama (`feat/mi-mejora`).
3. Commits claros y pequeños.
4. Pull Request con descripción del cambio y motivación.

## 📄 Licencia

MIT — libre para aprender, usar y mejorar.

---

⭐ Si te resulta útil, ¡déjale una estrella en GitHub!
