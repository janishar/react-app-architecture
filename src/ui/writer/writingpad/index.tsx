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
  withdrawBlog,
} from './actions';
import { useStateSelector } from '@core/reducers';
import Snackbar from '@ui/common/snackbar';
import { Blog, BlogDetail } from 'app-types';
import { Prompt } from 'react-router-dom';
import Preview from '@ui/common/preview';
import { Grid, TextareaAutosize, LinearProgress } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {
  ArrowDropDown as ArrowDropDownIcon,
  DoneAll as DoneAllIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Visibility as VisibilityIcon,
  Save as SaveIcon,
} from '@material-ui/icons';

import BlogDetailsForm from './form';

export type LocalState = {
  isForSubmission: boolean;
  isAllDataSentToServer: boolean;
  isBlogDetailsFormToShow: boolean;
  title: string;
  description: string;
  imgUrl: string;
  blogUrl: string;
  tags: Array<string>;
  isWriting: boolean;
  isTitleError: boolean;
  isDescriptionError: boolean;
  isImgUrlError: boolean;
  isBlogUrlError: boolean;
};

const mergeFormDataToBlog = (formData: LocalState, blog: BlogDetail): BlogDetail => ({
  ...blog,
  text: blog.draftText,
  title: formData.title,
  description: formData.description,
  blogUrl: formData.blogUrl,
  tags: formData.tags,
  imgUrl: formData.imgUrl,
});

export default function WritingPad({ blog }: { blog?: Blog }): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [preventBack, setPreventBack] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { data, isFetchingBlog, isSavingBlog, message } = useStateSelector(
    ({ writingPadState }) => writingPadState,
  );

  const [localState, setLocalState] = useState<LocalState>({
    isForSubmission: false,
    isAllDataSentToServer: false,
    isBlogDetailsFormToShow: false,
    title: '',
    description: '',
    imgUrl: '',
    blogUrl: '',
    tags: [],
    isWriting: false,
    isTitleError: false,
    isDescriptionError: false,
    isImgUrlError: false,
    isBlogUrlError: false,
  });

  useEffect(() => {
    if (blog && !isFetchingBlog) dispatch(fetchBlog(blog));
    return () => {
      dispatch(clearPad.action());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDoneClick = () => {
    setLocalState({
      ...localState,
      isBlogDetailsFormToShow: true,
      isForSubmission: true,
    });
  };

  const handleSaveClick = () => {
    if (!data?._id) {
      setLocalState({ ...localState, isBlogDetailsFormToShow: true });
    } else {
      setLocalState({ ...localState, isBlogDetailsFormToShow: false });
      data && dispatch(saveBlog(mergeFormDataToBlog(localState, data)));
    }
    setPreventBack(false);
  };

  const handleCreateClick = () => {
    setLocalState({ ...localState, isBlogDetailsFormToShow: false });
    data && dispatch(createBlog(mergeFormDataToBlog(localState, data)));
  };

  const handleSubmitClick = () => {
    setLocalState({ ...localState, isBlogDetailsFormToShow: false });
    data && dispatch(submitBlog(data));
  };

  const handleWithdrawClick = () => {
    setLocalState({ ...localState, isBlogDetailsFormToShow: false });
    data && dispatch(withdrawBlog(data));
  };

  const renderMenu = () => {
    if (!data) return null;
    return (
      <SpeedDial
        direction="down"
        ariaLabel="Blog Editor Menu"
        className={classes.speedDial}
        hidden={true}
        icon={<ArrowDropDownIcon />}
        open={true}
      >
        {data._id &&
          (data.isDraft ? (
            <SpeedDialAction
              key="Done"
              icon={<DoneAllIcon />}
              tooltipTitle="Done"
              onClick={handleDoneClick}
            />
          ) : data.isSubmitted ? (
            <SpeedDialAction
              key="Unsubmit"
              icon={<CloseIcon />}
              tooltipTitle="Remove Submission"
              onClick={handleWithdrawClick}
            />
          ) : (
            <SpeedDialAction
              key="Submit"
              icon={<SendIcon />}
              tooltipTitle="Submit Blog"
              onClick={handleSubmitClick}
            />
          ))}
        {data?.draftText && (
          <SpeedDialAction
            key="Blog Preview"
            icon={<VisibilityIcon />}
            tooltipTitle="Blog Preview"
            onClick={() => setShowPreview(true)}
          />
        )}
        {data?.draftText && (
          <SpeedDialAction
            key="Save Blog"
            icon={<SaveIcon />}
            tooltipTitle="Save Blog"
            onClick={handleSaveClick}
          />
        )}
      </SpeedDial>
    );
  };

  return (
    <div className={classes.root}>
      <Prompt
        when={preventBack}
        message={() => 'Are you sure you want to go without saving your work.'}
      />
      {(isFetchingBlog || isSavingBlog) && <LinearProgress className={classes.progress} />}
      <Grid className={classes.content} container justify="center">
        <Grid item xs={12} sm={12} md={7}>
          <TextareaAutosize
            className={classes.pad}
            aria-label="blog writing pad"
            rowsMin={15}
            value={data?.draftText}
            onChange={(e) => {
              dispatch(editBlog.action({ draftText: e.target.value }));
              if (!preventBack) setPreventBack(true);
            }}
            placeholder="Write something awesome today.."
          />
        </Grid>
      </Grid>
      {data && <Preview blog={data} open={showPreview} onClose={() => setShowPreview(false)} />}
      <BlogDetailsForm
        blog={data}
        localState={localState}
        setLocalState={setLocalState}
        onSubmit={handleSubmitClick}
        onCreate={handleCreateClick}
        onSave={handleSaveClick}
      />
      {renderMenu()}
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
