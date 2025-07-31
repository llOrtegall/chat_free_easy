import express, { type Request, type Response } from "express";
import { WebSocketServer } from "ws";
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
    console.log('Server running on: http://localhost:' + PORT );
})

const wss = new WebSocketServer({ server, path: '/ws' })

wss.on('connection', (ws) => {
    console.log('Client connected');
    console.log(ws);
})
