import express, { Response, NextFunction } from 'express';
import React from 'react';
import pageBuilder from './pageBuilder';
import { PublicRequest } from 'server-types';
import { publicRequest } from '@utils/network';
import { defaultState as blogListDefaultState } from '@ui/blogpage/reducer';
import BlogList from '@ui/bloglist';
import BlogPage from '@ui/blogpage';
import Landing from '@ui/landing';
import NotFound from '@ui/notfound';
import WriterBlogs from '@ui/writer/myblogs';
import { Blog } from 'app-types';

const router = express.Router();

router.get('/blog/:endpoint', sendBlogPage);
router.get('/blogs', sendBlogsPage);
router.get('/writer/blogs', sendWriterBlogsPage);
router.get('/', sendLandingPage);
router.use('*', sendNotFoundPagePage);

async function sendBlogPage(req: PublicRequest, res: Response) {
  try {
    const response = await publicRequest<null, Blog>({
      url: 'blog/url',
      method: 'GET',
      params: {
        endpoint: req.params.endpoint,
      },
    });
    if (!response.data) throw new Error('Not Found');
    res.send(
      pageBuilder(
        req,
        <BlogPage />,
        {
          title: response.data.title,
          description: response.data.description,
        },
        {
          blogState: {
            ...blogListDefaultState,
            isFetching: false,
            data: response.data,
          },
        },
      ),
    );
  } catch (e) {
    sendNotFoundPagePage(req, res);
  }
}

async function sendBlogsPage(req: PublicRequest, res: Response, next: NextFunction) {
  try {
    const response = await publicRequest<null, Array<Blog>>({
      url: 'blogs/latest',
      method: 'GET',
      params: { pageNumber: 1, pageItemCount: 1000 },
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

function sendWriterBlogsPage(req: PublicRequest, res: Response) {
  res.send(pageBuilder(req, <WriterBlogs />));
}

function sendLandingPage(req: PublicRequest, res: Response) {
  res.send(pageBuilder(req, <Landing />));
}

function sendNotFoundPagePage(req: PublicRequest, res: Response) {
  res.status(404).send(pageBuilder(req, <NotFound />));
}

export default router;
