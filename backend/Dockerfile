# Usa la imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 8001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
