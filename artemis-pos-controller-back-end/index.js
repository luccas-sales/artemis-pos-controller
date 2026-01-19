import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import posRouter from './routes/pos.js';
import { connectDb } from './config/db.js';

const app = express();
await connectDb();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api/pos', posRouter);
app.use((error, req, res, next) => {
  res.status(error.statusCode ?? 500).send(error);
});

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 1507;
  app.listen(PORT, () => {
    console.log(`API rodando localmente na porta ${PORT}`);
  });
}
