import fs from 'fs';
import { join } from 'path';

const isDev = process.env.NODE_ENV === 'development';

const SITE_TITLE = '%SITE_TITLE%';
const SITE_URL = '%SITE_URL%';
const SITE_COVER_IMG_URL = '%SITE_COVER_IMG_URL%';
const SITE_DESCRIPTION = '%SITE_DESCRIPTION%';
const SITE_CSS = '/*SITE_CSS*/';
const APP_HTML = 'APP_HTML';
const SITE_PRELOADED_STATE = 'SITE_PRELOADED_STATE';
const SITE_SCRIPTS = '<!-- SITE_SCRIPTS -->';
const DEV_SCRIPTS =
  "<script type='text/javascript' src='/js/vendor.js'></script><script type='text/javascript' src='/js/app.js'></script>";

export interface RenderOption {
  html: string;
  css: string;
  preloadedState: any;
  siteUrl: string;
  title: string;
  coverImg: string;
  description: string;
}

export const loadTemplateBlocking = () => {
  try {
    const htmlPath = isDev
      ? join(__dirname, '../../public/template.html')
      : join(__dirname, '../../dist/template.html');
    if (!fs.existsSync(htmlPath)) {
      console.log(`${htmlPath} does not exists, loadTemplate failed`);
      return process.exit();
    }
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (!html) {
      console.log(`${htmlPath} does not exists, file empty`);
      return process.exit();
    }
    return isDev ? html.replace(SITE_SCRIPTS, DEV_SCRIPTS) : html;
  } catch (e) {
    console.error(e);
    process.exit();
  }
};

function replace(str: string, mapObj: any) {
  const re = new RegExp(
    Object.keys(mapObj)
      .map((key) => escapeRegExp(key))
      .join('|'),
    'gi',
  );
  return str.replace(re, function (matched) {
    return mapObj[matched];
  });
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function render({
  html,
  css,
  preloadedState,
  siteUrl,
  title,
  coverImg,
  description,
}: RenderOption): string {
  const htmlTemplate = global.htmlTemplate;
  return replace(htmlTemplate, {
    [SITE_TITLE]: title,
    [SITE_URL]: siteUrl,
    [SITE_COVER_IMG_URL]: coverImg,
    [SITE_DESCRIPTION]: description,
    [SITE_PRELOADED_STATE]: JSON.stringify(preloadedState).replace(/</g, '\\u003c'),
    [APP_HTML]: html,
    [SITE_CSS]: css,
  });
}
