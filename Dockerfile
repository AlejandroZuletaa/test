# Usa Node.js como base para el entorno de desarrollo
FROM node:20

# Establece el directorio de trabajo en la raíz del proyecto
WORKDIR /app

# Exposición de puertos del contenedor de desarrollo
EXPOSE 10000 10000

# Comando por defecto para que el contenedor no se cierre inmediatamente
CMD ["tail", "-f", "/dev/null"]
