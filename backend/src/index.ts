import express, { json, type Request, type Response } from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('test ok')
})

app.listen(PORT, () => {
    console.log('Server running on: http://localhost:' + PORT );
})