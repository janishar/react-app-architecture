import app from './app'

// app.use(function (err, req, res, next) {
// 	res.redirect('/404');
// });

app.listen(process.env.PORT || 3001,
	() => { console.log(`🚧 server listening on port : ${process.env.PORT || 3001}`); })
	.on('error', e => console.log(e));