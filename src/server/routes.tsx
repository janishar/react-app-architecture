import express, { Response, NextFunction } from 'express';
import pageBuilder from './pageBuilder';
import { PublicRequest } from 'server-types';
import { publicRequest } from '@utils/network';
import { defaultState as blogListDefaultState } from '@ui/blogpage/reducer';
import { Blog } from 'app-types';

const router = express.Router();

router.get('/blog/:endpoint', sendBlogPage);
router.get('/blogs', sendBlogsPage);
router.get('*', sendPage);

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
    sendNotFoundPage(res);
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
        {
          title: 'AfterAcademy | Open Source Blogs',
          description:
            'AfterAcademy open source blogs and articles with latest developments and trends',
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

function sendPage(req: PublicRequest, res: Response) {
  res.send(pageBuilder(req));
}

function sendNotFoundPage(res: Response) {
  res.redirect('/404');
}

export default router;
