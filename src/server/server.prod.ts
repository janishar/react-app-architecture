import app from './app';
import routes from './routes';
import { Request, Response, NextFunction } from 'express';

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('INTERNAL SERVER ERROR');
});

app
  .listen(process.env.PORT || 3001, () => {
    console.log(`🚧 server listening on port : ${process.env.PORT || 3001}`);
  })
  .on('error', (e) => console.log(e));
