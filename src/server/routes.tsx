import express, { Response } from 'express';
import React from 'react';
import pageBuilder from './pageBuilder';
import Landing from '../ui/landing';
import { PublicRequest } from 'server-types';

const router = express.Router();

router.get('/', sendLandingPage);
router.use('*', sendNotFoundPagePage);

function sendLandingPage(req: PublicRequest, res: Response) {
	res.send(pageBuilder(req, <Landing />));
}

function sendNotFoundPagePage(req: PublicRequest, res: Response) {
	res.status(404).send('<html><body><h1>PAGE NOT FOUND</h1></body></html>');
}

export default router;
