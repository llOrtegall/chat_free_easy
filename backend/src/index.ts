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

interface UserWs extends WebSocket {
  email?: string;
  name?: string;
  image?: string;
}

interface JoinMessageData {
  email: string;
  name: string;
  image: string;
}

interface NewMessageData {
  message: string;
  receiver: string;
  sender: string;
  timestamp: string;
}

const wss = new WebSocketServer({ server, path: '/api/ws' })

function notifyOnlineUsers() {
  const onlineUsers = [...wss.clients]
    .filter((client): client is UserWs => {
      return client.readyState === WebSocket.OPEN && 
             'email' in client && 
             'name' in client && 
             'image' in client &&
             client.email !== undefined &&
             client.name !== undefined &&
             client.image !== undefined;
    })
    .map((client) => ({
      email: client.email!,
      name: client.name!,
      image: client.image!
    }));

  [...wss.clients].forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify({
          type: 'onlineUsers',
          data: onlineUsers
        }));
      } catch (error) {
        console.error('❌ Error enviando notificación:', error);
      }
    }
  });
}

// Cuando alguien se conecta
wss.on('connection', (ws: UserWs, _req) => {
  console.log('✅ Nueva conexión establecida');

  // Escuchar mensajes del cliente
  ws.on('message', (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type === 'join' && message.data) {
        const { email, name, image } = message.data as JoinMessageData;
        
        // Validar que los datos requeridos estén presentes
        if (email && name && image) {
          ws.email = email;
          ws.name = name;
          ws.image = image;
          
          console.log(`👤 Usuario ${name} se unió al chat`);
          
          // Notificar a todos los clientes DESPUÉS de que el usuario haga join
          notifyOnlineUsers();
        } else {
          console.error('❌ Datos de join incompletos:', message.data);
        }
      }

      if(message.type === 'newMessage' && message.data instanceof Object){
        const messageData = message.data as NewMessageData;
        
        [...wss.clients].forEach((c: UserWs) => {
          if(c.email === messageData.receiver){
            c.send(JSON.stringify({
              type: 'newMessage',
              data: messageData
            }))
          }
        })
      }
      
    } catch (error) {
      console.error('❌ Error al procesar mensaje:', error);
    }
  });

  // Cuando se cierra la conexión
  ws.on('close', () => {
    console.log('🔌 Conexión cerrada');
    // Notificar cambio en usuarios online cuando alguien se desconecta
    notifyOnlineUsers();
  });

  // Manejo de errores
  ws.on('error', (error) => {
    console.error('❌ Error WebSocket:', error);
  });
});
