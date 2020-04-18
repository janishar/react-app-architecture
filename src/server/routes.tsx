import express, { Response } from 'express';
import React from 'react';
import pageBuilder from './pageBuilder';
import Landing from '../client/landing';
import { PublicRequest } from './types';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function landingPage(req: PublicRequest, res: Response) {
	res.send(pageBuilder(req, <Landing />));
}

router.use('/', landingPage);

export default router;
