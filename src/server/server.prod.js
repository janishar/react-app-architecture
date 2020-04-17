import app from './app'
import routes from './routes';

// app.use(function (err, req, res, next) {
// 	res.redirect('/404');
// });

app.use(routes)

app.listen(process.env.PORT || 3001,
	() => { console.log(`🚧 server listening on port : ${process.env.PORT || 3001}`); })
	.on('error', e => console.log(e));