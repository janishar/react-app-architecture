import React, { ReactElement, useEffect, useState } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import {
  removeMessage,
  deleteBlog,
  fetchDraftBlogs,
  fetchSubmittedBlogs,
  fetchPublishedBlogs,
} from './actions';
import { hydratePad } from '@ui/writer/writingpad/actions';
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
} from '@material-ui/core';
import { BlogDetail } from 'app-types';
import { Link } from 'react-router-dom';

const tabNames = ['drafts', 'submissions', 'published'];

type DialogState = {
  open: boolean;
  blog: BlogDetail | null;
};

export default function MyBlogs(): ReactElement {
  const classes = useStyles();
  const {
    data,
    isFetchingBlog,
    isDeletingBlog,
    isFetchingDrafts,
    isFetchingSubmissions,
    isFetchingPublished,
    message,
  } = useStateSelector((state) => state.writerBlogsState);

  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(0);
  const [deleteDialogState, setDeleteDialogState] = useState<DialogState>({
    open: false,
    blog: null,
  });

  useEffect(() => {
    if (!data) {
      !isFetchingDrafts && dispatch(fetchDraftBlogs());
      !isFetchingSubmissions && dispatch(fetchSubmittedBlogs());
      !isFetchingPublished && dispatch(fetchPublishedBlogs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBlogsForTab = () => {
    if (!data) return null;
    let blogs = null;
    if (tabNames[currentTab] === 'drafts') blogs = data['drafts'];
    else if (tabNames[currentTab] === 'submissions') blogs = data['submissions'];
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
              <Button
                color="primary"
                className={classes.button1}
                variant="contained"
                size="small"
                component={Link}
                to="/write/blog"
                onClick={() => {
                  dispatch(hydratePad.action(blog));
                }}
              >
                Edit
              </Button>
              {!blog.isSubmitted && !blog.isPublished && (
                <Button
                  className={classes.button2}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setDeleteDialogState({ open: true, blog: blog });
                  }}
                >
                  Delete
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
        {(isFetchingDrafts ||
          isFetchingSubmissions ||
          isFetchingPublished ||
          isFetchingBlog ||
          isDeletingBlog) && <LinearProgress color="secondary" />}
      </AppBar>
      <Grid className={classes.pannel} container justify="center" alignItems="center">
        <Grid item xs={11} sm={11} md={7}>
          <Grid container spacing={4} justify="center" alignItems="stretch">
            {getContent()}
          </Grid>
        </Grid>
      </Grid>
      <ConfirmationDialog
        open={deleteDialogState.open}
        title={deleteDialogState.blog !== null ? deleteDialogState.blog.title : ''}
        message="Are you sure you want to delete this draft. Once deleted this draft will be removed forever."
        onPositiveAction={() => {
          if (deleteDialogState.blog) dispatch(deleteBlog(deleteDialogState.blog));
          setDeleteDialogState({ open: false, blog: null });
        }}
        onNegativeAction={() => setDeleteDialogState({ open: false, blog: null })}
        positionText="Delete Now"
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
