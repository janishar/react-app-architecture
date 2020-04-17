// @flow
import path from 'path'
import express from 'express'
import React from 'react'
import pageBuilder from './pageBuilder';
import Landing from '../client/ui/landing';

const router = express.Router();

router.use('/', landingPage)

function landingPage(req, res, next) {
	res.send(pageBuilder(req, <Landing />))
}

export default router;