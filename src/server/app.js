// @flow
import path from 'path'
import express from 'express';
import { join } from 'path';
import cookiesMiddleware from 'universal-cookie-express';
import favicon from 'serve-favicon';
import register from 'ignore-styles';

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(express.static(join(__dirname, '../../dist'), { maxAge: '7d' }));//seven day cache
app.use(express.static(join(__dirname, '../../public'), { maxAge: '7d' }));
app.use(favicon(join(__dirname, '../../public', 'favicon.ico')));

global.navigator = { userAgent: 'all' };

// This is added so that @babel/register don't crash when compiling modular style dependencies
register(['.sass', '.scss', '.less', '.css', '.svg', '.eot', '.woff', '.woff2', '.ttf', '.png', '.jpg', '.jpeg']);

app.use(cookiesMiddleware());

// sitemap
app.use('/sitemap', (req, res, next) => res.sendFile(path.join(__dirname, '../../public/sitemap.xml')))

export default app;