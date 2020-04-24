import express, { Response, NextFunction } from 'express';
import React from 'react';
import pageBuilder from './pageBuilder';
import { PublicRequest } from 'server-types';
import BlogList from '@ui/bloglist';
import Landing from '@ui/landing';
import NotFound from '@ui/notfound';
import { publicRequest } from '@utils/network';
import { Blog, defaultState as blogListDefaultState } from '@ui/blogpage/reducer';

const router = express.Router();

router.get('/blogs', sendBlogsPage);
router.get('/', sendLandingPage);
router.use('*', sendNotFoundPagePage);

async function sendBlogsPage(req: PublicRequest, res: Response, next: NextFunction) {
  try {
    const response = await publicRequest<null, Array<Blog>>({
      url: 'blogs/latest?pageNumber=1&pageItemCount=1000',
      method: 'GET',
    });
    res.send(
      pageBuilder(
        req,
        <BlogList />,
        {
          title: 'AfterAcademy | Open Source Blogs',
          description:
            'AfterAcademy opne source blogs and articles with latest developments and trends',
        },
        {
          // @ts-ignore
          blogListState: {
            ...blogListDefaultState,
            isFetching: false,
            data: response.data ? response.data : null,
          },
        },
      ),
    );
  } catch (e) {
    next(e);
  }
}

function sendLandingPage(req: PublicRequest, res: Response) {
  res.send(pageBuilder(req, <Landing />));
}

function sendNotFoundPagePage(req: PublicRequest, res: Response) {
  res.status(404).send(pageBuilder(req, <NotFound />));
}

export default router;
