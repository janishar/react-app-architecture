import React, { ReactElement, useEffect, useState } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import {
  removeMessage,
  fetchBlog,
  publishBlog,
  unpublishBlog,
  fetchSubmittedBlogs,
  fetchPublishedBlogs,
  clearBlog,
} from './actions';
import { useStateSelector } from '@core/reducers';
import Snackbar from '@ui/common/snackbar';
import NotFound from '@ui/notfound';
import ConfirmationDialog from '@ui/common/confirmation';
import {
  Tab,
  AppBar,
  Tabs,
  LinearProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Chip,
  Button,
  Link,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import { BlogDetail, Author } from 'app-types';
import { convertToReadableDate } from '@utils/appUtils';
import FirstLetter from '@ui/common/firstletter';
import Preview from '@ui/common/preview';

const tabNames = ['submissions', 'published'];

type DialogState = {
  open: boolean;
  blog: BlogDetail | null;
};

export default function EditorBlogs(): ReactElement {
  const classes = useStyles();
  const {
    data,
    blog,
    isFetchingBlog,
    isPublishingBlog,
    isUnpublishingBlog,
    isFetchingSubmissions,
    isFetchingPublished,
    message,
  } = useStateSelector((state) => state.editorBlogState);

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState(0);

  const [publishDialogState, setPublishDialogState] = useState<DialogState>({
    open: false,
    blog: null,
  });
  const [unpublishDialogState, setUnpublishDialogState] = useState<DialogState>({
    open: false,
    blog: null,
  });

  useEffect(() => {
    if (!data) {
      !isFetchingSubmissions && dispatch(fetchSubmittedBlogs());
      !isFetchingPublished && dispatch(fetchPublishedBlogs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBlogsForTab = () => {
    if (!data) return null;
    let blogs = null;
    if (tabNames[currentTab] === 'submissions') blogs = data['submissions'];
    else if (tabNames[currentTab] === 'published') blogs = data['published'];
    return blogs;
  };

  const getContent = () => {
    if (!data) return null;
    const blogs = getBlogsForTab();
    if (!blogs) return <NotFound message="No blog in this category" />;
    const content = blogs.map((blog) => (
      <List className={classes.list} key={blog._id}>
        <ListItem divider={true}>
          <div>
            <Typography gutterBottom variant="h6">
              {blog.title}
            </Typography>
            {blog.isPublished === true && (blog.isDraft === true || blog.isSubmitted === true) && (
              <Chip
                size="small"
                variant="outlined"
                color="primary"
                label="MODIFIED"
                className={classes.chip}
              />
            )}
            <Typography variant="body1" color="textSecondary" component="p">
              {blog.description}
            </Typography>
            {blog.tags.map((tag) => (
              <Chip
                key={tag}
                variant="outlined"
                size="small"
                label={tag}
                className={classes.chip2}
              />
            ))}
            <div>
              {blog.imgUrl && (
                <Link href={blog.imgUrl} target="_blank" color="primary">
                  <Chip
                    color="secondary"
                    size="small"
                    label={'View Cover Image'}
                    className={classes.chip4}
                  />
                </Link>
              )}
              {blog.blogUrl && <Chip size="small" label={blog.blogUrl} className={classes.chip3} />}
            </div>
            {blog.author && <AuthorView author={blog.author} date={blog.publishedAt} />}
            <div>
              <Button
                color="primary"
                className={classes.button1}
                variant="contained"
                size="small"
                onClick={() => dispatch(fetchBlog(blog))}
              >
                Preview
              </Button>
              {blog.isSubmitted === true && blog.isPublished === false && (
                <Button
                  className={classes.button2}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => setPublishDialogState({ open: true, blog: blog })}
                >
                  Publish
                </Button>
              )}
              {blog.isSubmitted === true && blog.isPublished === true && (
                <Button
                  className={classes.button2}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => setPublishDialogState({ open: true, blog: blog })}
                >
                  Publish Update
                </Button>
              )}
              {blog.isPublished === true && (
                <Button
                  className={classes.button2}
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => setUnpublishDialogState({ open: true, blog: blog })}
                >
                  Unpublish
                </Button>
              )}
            </div>
          </div>
        </ListItem>
      </List>
    ));
    if (content.length === 0) return <NotFound message="No blog in this category" />;
    return content;
  };

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="sticky">
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="blogs tab"
        >
          {tabNames.map((name) => (
            <Tab
              className={classes.tab}
              key={name}
              label={name.toUpperCase()}
              id={`scrollable-auto-tab-${name}`}
              aria-controls={`scrollable-auto-tabpanel-${name}`}
            />
          ))}
        </Tabs>
        {(isFetchingSubmissions ||
          isFetchingPublished ||
          isFetchingBlog ||
          isPublishingBlog ||
          isUnpublishingBlog) && <LinearProgress color="secondary" />}
      </AppBar>
      <Grid className={classes.pannel} container justify="center" alignItems="center">
        <Grid item xs={11} sm={11} md={7}>
          <Grid container spacing={4} justify="center" alignItems="stretch">
            {getContent()}
          </Grid>
        </Grid>
      </Grid>
      {blog && <Preview blog={blog} open={true} onClose={() => dispatch(clearBlog.action())} />}
      <ConfirmationDialog
        open={publishDialogState.open}
        title={publishDialogState.blog !== null ? publishDialogState.blog.title : ''}
        message="Are you sure you want to publish this blog. Once published updates will be made live to public."
        onPositiveAction={() => {
          if (publishDialogState.blog) dispatch(publishBlog(publishDialogState.blog));
          setPublishDialogState({ open: false, blog: null });
        }}
        onNegativeAction={() => setPublishDialogState({ open: false, blog: null })}
        positionText="Publish Now"
        negativeText="Cancel"
      />
      <ConfirmationDialog
        open={unpublishDialogState.open}
        title={unpublishDialogState.blog !== null ? unpublishDialogState.blog.title : ''}
        message="Are you sure you want to unpublish this blog. Once unpublished blog will be removed from the public access."
        onPositiveAction={() => {
          if (unpublishDialogState.blog) dispatch(unpublishBlog(unpublishDialogState.blog));
          setUnpublishDialogState({ open: false, blog: null });
        }}
        onNegativeAction={() => setUnpublishDialogState({ open: false, blog: null })}
        positionText="Unpublish Now"
        negativeText="Cancel"
      />
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

const AuthorView = ({ author, date }: { author: Author; date?: string }) => {
  const classes = useStyles();
  return (
    <div className={classes.author}>
      {author.profilePicUrl ? (
        <CardHeader
          avatar={<Avatar aria-label={author.name} src={author.profilePicUrl} />}
          title={author.name}
          subheader={date ? convertToReadableDate(date) : ''}
        />
      ) : (
        <CardHeader
          avatar={<FirstLetter text={author.name} />}
          title={author.name}
          subheader={date ? convertToReadableDate(date) : ''}
        />
      )}
    </div>
  );
};
