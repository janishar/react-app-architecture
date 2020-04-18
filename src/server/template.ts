import { version } from '../../package.json';

export interface RenderOption {
	html: string;
	css: string;
	preloadedState: any;
	siteUrl: string;
	title: string;
	coverImg: string;
	description: string;
}

const appLoaderStyle = `
	<style>
	</style>
`;

export default ({ html, css, preloadedState, siteUrl, title, coverImg, description }: RenderOption): string =>
	`<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: http://ogp.me/ns#">
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
    <link rel="canonical" href="${siteUrl}">
    <meta name="keywords" content="afteracademy, github, opensource, react, redux, ssr"/>
    <meta property="og:title" content="${title}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${siteUrl}" />
    <meta property="og:image" content="${coverImg}" />
    <meta property="og:description" content="${description}" />
    <meta property="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image:src" content="${coverImg}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@after_academy">
    <meta name="description" content="${description}"/>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
	<style id="jss-server-side">${css}</style>
	
	<!-- If you use css files in addition to jss then uncomment the stylesheet below-->
	<!--   
	<link rel="stylesheet" type="text/css" href="/styles/vendor-${version}.css"/>
	<link rel="stylesheet" type="text/css" href="/styles/app-${version}.css"/>
	-->
	
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<!-- 
    <script async src="https://www.googleta/gmanager.com/gtag/js?id=<YOUR_GOOGLE_ANALYTICS_ID>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '<YOUR_GOOGLE_ANALYTICS_ID>');
    </script> 
	-->
	
    ${appLoaderStyle}
  </head>
  <body>
    <div id="appLoader" class="app-loader"></div>
    <div id="root">${html}</div>
    <script type='text/javascript'>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script type='text/javascript' src="/js/vendor-bundle-${version}.js"></script>
    <script type='text/javascript' src="/js/app-bundle-${version}.js"></script>
  </body>
</html>`;
