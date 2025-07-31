import express, { type Request, type Response } from "express";
import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable('x-powered-by')
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(morgan('dev'))
  .use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('test ok')
})

const server = app.listen(PORT, () => {
  console.log('Server running on: http://localhost:' + PORT);
})

const wss = new WebSocketServer({ server, path: '/ws' })

interface DataWs extends WebSocket {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface DataMessage {
  type: string;
  name: string;
  email: string;
  image: string;
}

const getOnlineUsers = () =>
  [...wss.clients]
    .map(c => {
      const s = c as DataWs;
      return {
        id: s.id,
        name: s.name,
        image: s.image,
        email: s.email,
      };
    })
    .filter(u => Boolean(u.id && u.name && u.image && u.email));

const notifyOnlineUsers = () => {
  const payload = JSON.stringify({
    type: 'online_users',
    data: getOnlineUsers(),
  });

  for (const client of wss.clients) {
    try { client.send(payload); } catch { }
  }
};

wss.on('connection', (ws: DataWs) => {

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());

    if (message instanceof Object && 'type' in message) {
      const newData: DataMessage = message;
      if (newData.type === 'join') {
        ws.id = uuid();
        ws.name = newData.name;
        ws.email = newData.email;
        ws.image = newData.image;

        notifyOnlineUsers();
      }
    }

    ws.on('close', () => {
      notifyOnlineUsers();
    });

  })
})
