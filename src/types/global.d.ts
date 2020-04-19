declare interface Window {
	__PRELOADED_STATE__: any;
}

declare namespace NodeJS {
	interface Global {
		navigator: any;
		htmlTemplate: string;
	}
}
