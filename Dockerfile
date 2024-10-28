# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración de npm (frontend y backend)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer los puertos necesarios (ajusta según sea necesario)
EXPOSE 10000 1000

# Comando para iniciar la aplicación
CMD ["sh", "-c", "npm run dev:backend & npm run dev:frontend"]
