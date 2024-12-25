import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const app = express();
const port = 3000;

dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Node.js!');
});

const PORT = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
