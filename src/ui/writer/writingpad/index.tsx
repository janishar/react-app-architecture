import React, { ReactElement, useEffect, useState } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import {
  clearPad,
  removeMessage,
  editBlog,
  saveBlog,
  fetchBlog,
  submitBlog,
  createBlog,
} from './actions';
import { useStateSelector } from '@core/reducers';
import Snackbar from '@ui/common/snackbar';
import { Blog } from 'app-types';
import { Prompt } from 'react-router-dom';
import { Grid, TextareaAutosize } from '@material-ui/core';

export default function Component({ blog }: { blog?: Blog }): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data, isFetchingBlog, isSavingBlog, message } = useStateSelector(
    (state) => state.writingPadState,
  );
  const [preventBack, setPreventBack] = useState(false);

  useEffect(() => {
    if (blog && !isFetchingBlog) dispatch(fetchBlog(blog));
    return () => {
      dispatch(clearPad.action());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Prompt
        when={preventBack}
        message={() => 'Are you sure you want to go without saving your work.'}
      />
      <Grid className={classes.content} container justify="center">
        <Grid item xs={12} sm={12} md={7}>
          <TextareaAutosize
            className={classes.pad}
            aria-label="blog writing pad"
            rowsMin={10}
            value={data?.draftText}
            onChange={(e) => dispatch(editBlog.action({ draftText: e.target.value }))}
            placeholder="Write something awesome today.."
          />
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
