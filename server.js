var express = require('express');
var server = express();
var path = require('path');

/** Send all static assets. */
server.use(express.static(__dirname))

/** Send index.html file. */
server.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname + '/index.html')))

/** Send 404.html file. */
server.use((req, res) => res.status(404).sendFile(path.resolve(__dirname + '/404.html')))

server.listen(8080, console.info('Servidor iniciado en http://localhost:8080.'))