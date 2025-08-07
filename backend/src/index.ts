import express, { type Request, type Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use(express.json())
  .use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

const server = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
})

const wss = new WebSocketServer({ server, path: '/api/ws' })

// Cuando alguien se conecta
wss.on('connection', (ws: WebSocket) => {
  console.log('✅ Nueva conexión establecida');
  
  // Enviar mensaje de bienvenida
  ws.send(JSON.stringify({
    type: 'welcome',
    message: '¡Hola! Conectado al servidor WebSocket'
  }));

  // Escuchar mensajes del cliente
  ws.on('message', (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('📨 Mensaje recibido:', message);
      
      // Responder al cliente
      ws.send(JSON.stringify({
        type: 'response',
        message: `Servidor recibió: "${message.text}"`,
        timestamp: new Date().toISOString()
      }));
      
    } catch (error) {
      console.error('❌ Error al procesar mensaje:', error);
    }
  });

  // Cuando se cierra la conexión
  ws.on('close', () => {
    console.log('🔌 Conexión cerrada');
  });

  // Manejo de errores
  ws.on('error', (error) => {
    console.error('❌ Error WebSocket:', error);
  });
});
