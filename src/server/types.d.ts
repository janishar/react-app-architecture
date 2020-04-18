import { Request } from 'express';
import { Cookies } from 'react-cookie';

export declare interface PublicRequest extends Request {
	universalCookies: Cookies;
}
