import express from 'express';
import { join } from 'path';
import cookiesMiddleware from 'universal-cookie-express';
import favicon from 'serve-favicon';
import register from 'ignore-styles';
import { loadTemplateBlocking } from './template';

global.htmlTemplate = loadTemplateBlocking();

const app = express();
app.set('port', process.env.PORT || 3001);
app.use('/template.html', (req, res) => res.status(404).send('NOT FOUND'));
app.use(express.static(join(__dirname, '../../dist'), { maxAge: '7d' })); //seven day cache
app.use(express.static(join(__dirname, '../../public')));
app.use(favicon(join(__dirname, '../../public', 'favicon.ico')));
app.get('/sitemap', (req, res) => res.sendFile(join(__dirname, '../../public/sitemap.xml')));

global.navigator = { userAgent: 'all' };

// This is added so that @babel/register don't crash when compiling modular style dependencies
register([
  '.sass',
  '.scss',
  '.less',
  '.css',
  '.svg',
  '.eot',
  '.woff',
  '.woff2',
  '.ttf',
  '.png',
  '.jpg',
  '.jpeg',
]);

app.use(cookiesMiddleware());

export default app;
