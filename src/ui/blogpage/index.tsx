import React, { ReactElement, useEffect } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { removeMessage, clearPage, fetchBlogByEndpoint } from './actions';
import { useStateSelector } from '@core/reducers';
import { useRouteMatch } from 'react-router-dom';
import Snackbar from '@ui/common/snackbar';
import { CardActionArea, Avatar, Grid, LinearProgress, CardHeader } from '@material-ui/core';
import { convertToReadableDate } from '@utils/appUtils';
import { AuthorPlaceholder } from '@ui/common/placeholders';
import Skeleton from '@material-ui/lab/Skeleton';
import Markdown from '@ui/common/markdown';
import FirstLetter from '@ui/common/firstletter';

export default function BlogPage(): ReactElement {
  const classes = useStyles();
  const match = useRouteMatch<{ endpoint: string }>();
  const { data, isFetching, message } = useStateSelector((state) => state.blogState);
  const dispatch = useDispatch();

  useEffect(() => {
    const endpoint = match.params.endpoint;
    if (endpoint)
      if (!data) {
        dispatch(fetchBlogByEndpoint(endpoint));
      } else if (data.blogUrl !== endpoint) {
        dispatch(clearPage.action(endpoint));
        dispatch(fetchBlogByEndpoint(endpoint));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.endpoint]);

  const authorView = data ? (
    <div className={classes.author}>
      <CardActionArea>
        <CardHeader
          avatar={
            data.author.profilePicUrl ? (
              <Avatar aria-label={data.author.name} src={data.author.profilePicUrl} />
            ) : (
              <FirstLetter text={data.author.name} />
            )
          }
          title={data.author.name}
          subheader={convertToReadableDate(data.publishedAt)}
        />
      </CardActionArea>
    </div>
  ) : null;

  return (
    <div className={classes.root}>
      {isFetching && <LinearProgress />}
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={8} className={classes.blogContent}>
          {isFetching ? <AuthorPlaceholder /> : authorView}
          {isFetching ? (
            <Skeleton variant="rect" height={600} />
          ) : (
            data && data.text && <Markdown text={data.text} />
          )}
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
