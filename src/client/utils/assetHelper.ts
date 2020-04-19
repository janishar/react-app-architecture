import { relative, join } from 'path';

/**
 * @alpha
 * @description Do not use this function. It is under development...
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function importer(path: string): string {
	try {
		if (!path || !path.startsWith('.') || !module || !module.parent) {
			console.error('importer invalid', path);
			return '';
		}

		const callerDir = module.parent.filename.substring(0, module.parent.filename.lastIndexOf('/'));
		const relativePath = relative(__dirname, callerDir); // this file to caller file path
		const absolutePath = join(relativePath, path);
		// import(absolutePath).catch((e) => console.error(e));

		const parts = path.split('/');
		const last = parts.pop() || parts.pop(); // handle potential trailing slash
		return `/assets/${last}`;
	} catch (e) {
		console.log('importer error', path);
		console.error(e);
		return '';
	}
}

export function asset(path: string): string {
	if (!path || !path.startsWith('.') || !module || !module.parent) {
		console.error('asset invalid', path);
		return '';
	}
	const parts = path.split('/');
	const last = parts.pop() || parts.pop(); // handle potential trailing slash
	return `/assets/${last}`;
}
