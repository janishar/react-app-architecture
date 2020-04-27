import React, { ReactElement, useEffect } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { fetchLatestBlogs, removeMessage } from './actions';
import { useStateSelector } from '@core/reducers';
import Snackbar from '@ui/common/snackbar';
import { CardListPlaceholder } from '@ui/common/placeholders';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import importer from '@utils/importer';
import { Blog } from 'app-types';
import { Link } from 'react-router-dom';
import { convertToReadableDate } from '@utils/appUtils';
import FirstLetter from '@ui/common/firstletter';

export default function BlogList(): ReactElement {
  const classes = useStyles();
  const { data, isFetching, message } = useStateSelector((state) => state.blogListState);
  const dispatch = useDispatch();
  importer('./assets/blog-page-cover.jpg');

  useEffect(() => {
    if (!data && !isFetching) dispatch(fetchLatestBlogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blogCover = (
    <div className={classes.cover}>
      <div className={classes.coverBox}>
        <Typography component="h1" variant="h1" align="center" className={classes.coverTitle}>
          AfterAcademy
        </Typography>
        <Typography component="h2" variant="h3" align="center" className={classes.coverSubtitle}>
          Open Source Blogs
        </Typography>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      {blogCover}
      <Grid container justify="center" alignItems="center">
        <Grid item xs={11} sm={11} md={10} className={classes.cards}>
          <Grid container spacing={4} justify="flex-start" alignItems="flex-start">
            {isFetching && <CardListPlaceholder />}
            {data &&
              data.map((blog) => (
                <Grid key={blog._id} item xs={12} sm={6} md={4}>
                  <BlogCard blog={blog} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      {message && (
        <Snackbar
          message={message.text}
          variant={message.type}
          onClose={() => dispatch(removeMessage.action())}
        />
      )}
    </div>
  );
}

export const BlogCard = ({
  blog,
  selection,
}: {
  blog: Blog;
  selection?: (blog: Blog) => void;
}): ReactElement => {
  const classes = useStyles();

  const { title, description, author, imgUrl, blogUrl, publishedAt } = blog;

  return (
    <Card
      className={classes.card}
      raised={true}
      onClick={() => {
        selection && selection(blog);
      }}
    >
      <CardActionArea className={classes.cardContent} component={Link} to={'/blog/' + blogUrl}>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt={title}
          src={imgUrl}
          title={title}
        />
        <CardContent>
          <Typography variant="h6" component="h2" className={classes.cardTitle}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.cardDescription}
          >
            {description}
          </Typography>
        </CardContent>
        <CardHeader
          className={classes.cardAuthor}
          avatar={
            author.profilePicUrl ? (
              <Avatar aria-label={author.name} src={author.profilePicUrl} />
            ) : (
              <FirstLetter text={author.name} />
            )
          }
          title={author.name}
          subheader={convertToReadableDate(publishedAt)}
        />
      </CardActionArea>
    </Card>
  );
};
