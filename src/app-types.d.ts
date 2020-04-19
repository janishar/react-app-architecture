import { Action as ReduxAction, Dispatch as ReduxDispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducers';

declare interface Action {
	type: string;
}

declare type Dispatch = ReduxDispatch<ReduxAction<Action>>;

declare type AsyncAction = ThunkAction<void, RootState, unknown, ReduxAction<string>>;

declare global {
	interface Window {
		__PRELOADED_STATE__: any;
	}
}

declare module '@material-ui/core/styles/createMuiTheme' {
	interface Theme {
		custom: {
			colors: {
				white: React.CSSProperties['color'];
				light: React.CSSProperties['color'];
				black: React.CSSProperties['color'];
				dark: React.CSSProperties['color'];
				gray: React.CSSProperties['color'];
				aliceBlue: React.CSSProperties['color'];
			};
		};
	}
	// allow configuration using `createMuiTheme`
	interface ThemeOptions {
		custom: {
			colors: {
				white: React.CSSProperties['color'];
				light: React.CSSProperties['color'];
				black: React.CSSProperties['color'];
				dark: React.CSSProperties['color'];
				gray: React.CSSProperties['color'];
				aliceBlue: React.CSSProperties['color'];
			};
		};
	}
}
