# Usa Node.js como base para el entorno de desarrollo
FROM node:20

# Establece el directorio de trabajo en la raíz del proyecto
WORKDIR /app

# Exposición de puertos del contenedor de desarrollo
EXPOSE 10000 10000

# Agrega la clave y el repositorio de Cloud Foundry
RUN wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | apt-key add - && \
    echo "deb https://packages.cloudfoundry.org/debian stable main" | tee /etc/apt/sources.list.d/cloudfoundry-cli.list && \
    apt-get update && \
    apt-get install -y cf7-cli

# Instala el plugin multiapps de forma no interactiva
RUN cf7 install-plugin multiapps -f

# Comando por defecto para que el contenedor no se cierre inmediatamente
CMD ["tail", "-f", "/dev/null"]
