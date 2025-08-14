# Backend Dockerfile
FROM node:22.19-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copiar config de TypeScript y el código fuente
COPY tsconfig.json ./
COPY src ./src

# Compilar a dist/
RUN npm run build

# Ajustes de runtime
ENV NODE_ENV=production
EXPOSE 4000

# Ejecutar el artefacto compilado
CMD ["node", "./dist/index.js"]
