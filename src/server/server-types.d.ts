import { Cookies } from 'react-cookie';
import { Request } from 'express';

declare interface PublicRequest extends Request {
  universalCookies: Cookies;
}

declare global {
  namespace NodeJS {
    interface Global {
      navigator: any;
      htmlTemplate: string;
    }
  }
}
