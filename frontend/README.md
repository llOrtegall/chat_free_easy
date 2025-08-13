# 💬 Chat Free Easy

Una aplicación de chat en tiempo real moderna y elegante construida con Next.js y WebSockets.

![Chat Free Easy](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características

- 🚀 **Mensajería en tiempo real** con WebSockets
- 🔐 **Autenticación segura** con Google OAuth (NextAuth.js)
- 👥 **Indicadores de presencia** - Ve quién está en línea
- 🎨 **Diseño moderno** con Tailwind CSS y efectos glassmorphism
- 📱 **Totalmente responsive** - Funciona en móvil y escritorio
- ⚡ **Rendimiento optimizado** con React 19 y Next.js 15
- 🌙 **Tema oscuro elegante** con gradientes y animaciones
- 🔄 **Arquitectura modular** con hooks personalizados y componentes reutilizables

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15.5.3 con App Router
- **UI Library**: React 19.1.0
- **Lenguaje**: TypeScript 5.0
- **Estilos**: Tailwind CSS 4.0
- **Autenticación**: NextAuth.js 5.0 (Google OAuth)
- **WebSockets**: Cliente WebSocket nativo

### Backend
- **Runtime**: Node.js con Express 5.1.0
- **Lenguaje**: TypeScript 5.9.2
- **WebSockets**: ws 8.18.3
- **CORS**: Habilitado para desarrollo cross-origin
- **Logging**: Morgan para logs de desarrollo

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de Google para OAuth

### 1. Clonar el repositorio
```bash
git clone https://github.com/llortegall/chat_free_easy.git
cd chat_free_easy
```

### 2. Configurar el Backend
```bash
cd backend
npm install

# Crear archivo .env
cp .env.example .env
```

Configurar las variables de entorno en `backend/.env`:
```env
PORT=5000
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
AUTH_SECRET=tu_auth_secret_aleatorio
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install

# Crear archivo .env.local
cp .env.example .env.local
```

Configurar las variables de entorno en `frontend/.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_auth_secret_aleatorio
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

### 4. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la Google+ API
4. Crea credenciales OAuth 2.0
5. Configura los URIs autorizados:
   - **Authorized Origins**: `http://localhost:3000`
   - **Authorized Redirect URIs**: `http://localhost:3000/auth/google/callback`

## 🏃‍♂️ Ejecutar la Aplicación

### Desarrollo
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **WebSocket**: ws://localhost:5000/api/ws

### Producción
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
chat_free_easy/
├── frontend/                 # Aplicación Next.js
│   ├── app/
│   │   ├── components/      # Componentes React
│   │   │   ├── auth/       # Componentes de autenticación
│   │   │   ├── Chat.tsx    # Componente principal del chat
│   │   │   └── ui/         # Componentes UI reutilizables
│   │   ├── hooks/          # Hooks personalizados
│   │   │   └── useWebSocket.ts
│   │   ├── dashboard/      # Página del dashboard
│   │   ├── api/           # API routes de Next.js
│   │   ├── globals.css    # Estilos globales
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Página de inicio
│   ├── public/            # Archivos estáticos
│   └── package.json
├── backend/                 # Servidor Node.js
│   ├── src/
│   │   └── index.ts        # Servidor principal con WebSockets
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🔧 Componentes Principales

### Frontend

#### `Chat.tsx`
Componente principal del chat con arquitectura modular:
- Gestión de estado con hooks personalizados
- Conexión WebSocket en tiempo real
- Lista de usuarios en línea
- Interfaz de mensajería

#### `useWebSocket.ts`
Hook personalizado para manejar:
- Conexión y reconexión automática
- Envío y recepción de mensajes
- Gestión de usuarios en línea
- Manejo de errores de conexión

#### Componentes de Autenticación
- `SignIn`: Botón de inicio de sesión con Google
- `SignOut`: Botón de cierre de sesión
- Integración completa con NextAuth.js

### Backend

#### WebSocket Server
- Gestión de conexiones en tiempo real
- Enrutamiento de mensajes entre usuarios
- Seguimiento de usuarios en línea
- Notificaciones de presencia

## 🎨 Diseño y UX

### Características de Diseño
- **Tema oscuro moderno** con gradientes slate/purple/blue
- **Efectos glassmorphism** con backdrop-blur
- **Animaciones suaves** en hover y transiciones
- **Tipografía profesional** con fuentes Geist
- **Iconografía SVG** para mejor rendimiento
- **Responsive design** mobile-first

### Paleta de Colores
- **Primarios**: Gradientes púrpura y azul
- **Fondo**: Tonos slate oscuros
- **Acentos**: Verde, púrpura, rosa, naranja para iconos
- **Texto**: Blanco y slate-300 para contraste

## 🔐 Seguridad

- **Autenticación OAuth 2.0** con Google
- **Validación de sesiones** en rutas protegidas
- **CORS configurado** para desarrollo seguro
- **Variables de entorno** para credenciales sensibles
- **Validación de tipos** con TypeScript

## 📱 Características Responsive

- **Mobile-first design** con Tailwind CSS
- **Navegación adaptativa** que se oculta en móvil
- **Componentes flexibles** que se adaptan al tamaño de pantalla
- **Tipografía escalable** con clases responsive
- **Espaciado optimizado** para diferentes dispositivos

## 🚀 Optimizaciones de Rendimiento

- **React.memo** para componentes optimizados
- **useCallback** para funciones memoizadas
- **Lazy loading** de componentes
- **WebSocket eficiente** con reconexión automática
- **Deduplicación de usuarios** en tiempo real
- **Auto-scroll inteligente** en mensajes

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**llortegall** - [GitHub](https://github.com/llortegall)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework increíble
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [NextAuth.js](https://next-auth.js.org/) por la autenticación simple
- [Vercel](https://vercel.com/) por el hosting y deployment

---

⭐ ¡Dale una estrella si te gusta este proyecto!
