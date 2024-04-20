import express from 'express';
import * as path from 'path';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { json } from 'body-parser';
import { authRouter } from './routes/auth.router';
import { verificarTokenJwt } from './util/jwt';
import { cartaRouter } from './routes/carta.router';

const app = express();

app.use(cors());  // Middleware de CORS.
app.use(json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Conectar ao MongoDB
MongoClient.connect('mongodb://127.0.0.1:2001/')
  .then(client => {
    console.log('Conectado ao MongoDB.');
    app.locals.db = client.db('app-deckmaster');

    // Iniciar o servidor Express
    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/api/carta', cartaRouter);
app.use('/api/auth', authRouter);
