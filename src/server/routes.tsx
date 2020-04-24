import express, { Response } from 'express';
import React from 'react';
import pageBuilder from './pageBuilder';
import { PublicRequest } from 'server-types';
import BlogList from '@ui/bloglist';
import Landing from '@ui/landing';
import NotFound from '@ui/notfound';

const router = express.Router();

router.get('/blogs', sendBlogsPage);
router.get('/', sendLandingPage);
router.use('*', sendNotFoundPagePage);

function sendBlogsPage(req: PublicRequest, res: Response) {
  res.send(
    pageBuilder(req, <BlogList />, {
      title: 'AfterAcademy | Open Source Blogs',
      description:
        'AfterAcademy opne source blogs and articles with latest developments and trends',
    }),
  );
}

function sendLandingPage(req: PublicRequest, res: Response) {
  res.send(pageBuilder(req, <Landing />));
}

function sendNotFoundPagePage(req: PublicRequest, res: Response) {
  res.status(404).send(pageBuilder(req, <NotFound />));
}

export default router;
