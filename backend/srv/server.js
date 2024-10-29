const cds = require('@sap/cds');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = async function cds_server(options) {
  const origin = process.env.ORIGINS || 'http://localhost:4200'; // Origen permitido

  // Preparar la aplicación express
  const defaults = {};
  const o = { ...options, __proto__: defaults };
  const app = (cds.app = o.app || require('express')());
  cds.emit('bootstrap', app);
  app.use(bodyParser.json());

  const corsOptions = {
    origin: origin, // Orígenes permitidos
    optionsSuccessStatus: 200, // Código de éxito para solicitudes preflight
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    exposedHeaders: 'Content-Type, Sap-Messages, sap-messages', // Cabeceras expuestas al cliente
    credentials: true, // Indica si se permite el uso de cookies
    preflightContinue: false, // No continuar con las solicitudes preflight
  };

  app.use(cors(corsOptions)); // Aplicar middleware CORS

  // Cargar y preparar los modelos
  const csn = await cds.load('*').then(cds.minify);
  cds.model = cds.compile.for.nodejs(csn);
  cds.emit('loaded', cds.model);

  // Conectar a la base de datos si es requerida
  if (cds.requires.db) {
    cds.db = await cds.connect.to('db');
  }

  // Servir todos los servicios declarados en los modelos
  await cds.serve('all').in(app);
  await cds.emit('served', cds.services);

  // Iniciar el servidor http
  const port = o.port || process.env.PORT || 8000;
  return (app.server = app.listen(port));
};
