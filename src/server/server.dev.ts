import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import app from './app';
import routes from './routes';
import webpackConfig from '../../webpack.config';

const serverOptions = {
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
};
// @ts-ignore
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.use(routes);

app
  .listen(process.env.PORT || 3001, () => {
    console.log(`🚧 server listening on port : ${process.env.PORT || 3001}`);
  })
  .on('error', (e) => console.log(e));
