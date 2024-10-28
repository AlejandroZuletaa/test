# Etapa de construcción del frontend
FROM node:20.18.0 AS build-frontend

# Establece el directorio de trabajo
WORKDIR /app/frontend

# Copia los archivos package.json y package-lock.json
COPY frontend/package*.json ./ 

# Instala las dependencias del frontend
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY frontend/ .

# Construye la aplicación Angular para producción
RUN npm run build

# Etapa de construcción del backend
FROM node:20 AS build-backend

# Establece el directorio de trabajo
WORKDIR /app/backend

# Copia los archivos package.json y package-lock.json
COPY backend/package*.json ./ 

# Instala las dependencias del backend
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY backend/ .

# Exponemos el puerto en el que se ejecuta la aplicación backend
EXPOSE 8000

# Etapa de ejecución para el backend
FROM node:20 AS run-backend

# Establece el directorio de trabajo
WORKDIR /app/backend

# Copia el backend construido
COPY --from=build-backend /app/backend .

# Exponemos el puerto
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

# Etapa de ejecución para Nginx
FROM nginx:alpine AS production

# Copia los archivos de construcción del frontend al contenedor de Nginx
COPY --from=build-frontend /app/frontend/dist/frontend/browser /usr/share/nginx/html

# Exponemos el puerto 80 para el frontend
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
