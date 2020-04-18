import app from './app';
import routes from './routes';
import { Request, Response } from 'express';

app.use(routes);

app.use((err: Error, req: Request, res: Response) => {
	res.status(404);
	res.redirect('/404');
});

app.listen(process.env.PORT || 3001, () => {
	console.log(`🚧 server listening on port : ${process.env.PORT || 3001}`);
}).on('error', (e) => console.log(e));
