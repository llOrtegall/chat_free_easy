import express, { type Request, type Response } from 'express';
import { WebSocketServer } from 'ws';
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

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (message) => {
    console.log('Message from client:', message)
    ws.send('Hello from server!')
  })
})
