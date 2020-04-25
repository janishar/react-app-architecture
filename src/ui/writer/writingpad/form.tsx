import React, { ReactElement, ChangeEvent, MouseEvent } from 'react';
import useStyles from './style';
import { BlogDetail } from 'app-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Paper,
  PaperProps,
} from '@material-ui/core';

import { LocalState } from './index';
import { validateUrl } from '@utils/appUtils';

type Props = {
  blog: BlogDetail | null;
  localState: LocalState;
  setLocalState: React.Dispatch<React.SetStateAction<LocalState>>;
  onSave: () => void;
  onCreate: () => void;
  onSubmit: () => void;
};

export default function BlogDetailsForm({
  blog,
  localState,
  setLocalState,
  onSubmit,
  onSave,
  onCreate,
}: Props): ReactElement {
  const classes = useStyles();

  const handleBlogDetailChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); // to prevent from loosing focus
    let value = event.target.value;
    if (name == 'blogUrl') {
      value = value.replace(/\s/g, '');
      value = value.replace(/\//g, '-');
    }

    setLocalState({
      ...localState,
      [name]: value,
      isWriting: true,
      isTitleError: false,
      isDescriptionError: false,
      isImgUrlError: false,
      isBlogUrlError: false,
      isAllDataSentToServer: false,
    });
  };

  const handleBlogDetailFormSubmit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (validateBlogDetailForm()) {
      setLocalState({ ...localState, isWriting: false });
      if (!blog?._id) onCreate();
      else onSave();
    }
  };

  const validateBlogDetailForm = () => {
    const newstate = { ...localState };

    if (!newstate.title) newstate.isTitleError = true;
    if (!newstate.description) newstate.isDescriptionError = true;
    if (!newstate.blogUrl) newstate.isBlogUrlError = true;
    if (!validateUrl(newstate.imgUrl)) newstate.isImgUrlError = true;

    const isError =
      newstate.isTitleError ||
      newstate.isDescriptionError ||
      newstate.isBlogUrlError ||
      newstate.isImgUrlError;

    if (isError) setLocalState(newstate);
    return !isError;
  };

  return (
    <Dialog
      className={classes.root}
      open={localState.isBlogDetailsFormToShow}
      onClose={() =>
        setLocalState({
          ...localState,
          isBlogDetailsFormToShow: false,
          isForSubmission: false,
        })
      }
      PaperProps={{ className: classes.paper }}
      PaperComponent={PaperComponent}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Blog Details</DialogTitle>
      <DialogContent>
        {[
          {
            error: localState.isTitleError,
            name: 'title',
            title: 'Title',
            value: localState.title,
            rows: 1,
            maxRows: 1,
            helperText: '',
          },
          {
            error: localState.isDescriptionError,
            name: 'description',
            title: 'Description',
            value: localState.description,
            rows: 3,
            maxRows: 5,
            helperText: '',
          },
          {
            error: localState.isBlogUrlError,
            name: 'blogUrl',
            title: 'URL Endpoint',
            value: localState.blogUrl,
            rows: 1,
            maxRows: 1,
            helperText: 'Example: my-awesome-blog',
          },
          {
            error: localState.isImgUrlError,
            name: 'imgUrl',
            title: 'Image URL',
            value: localState.imgUrl,
            rows: 1,
            maxRows: 1,
            helperText: '',
          },
        ].map(({ error, name, title, value, rows, maxRows, helperText }, index) => (
          <TextField
            key={index}
            required={true}
            error={error}
            margin="normal"
            variant="outlined"
            id={title}
            label={title}
            value={value}
            type="text"
            rows={rows}
            rowsMax={maxRows}
            helperText={helperText}
            onChange={handleBlogDetailChange(name)}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        {blog?._id && localState.isForSubmission && localState.isAllDataSentToServer && (
          <Button onClick={onSubmit} color="primary">
            SUBMIT
          </Button>
        )}
        {!localState.isAllDataSentToServer && (
          <Button onClick={handleBlogDetailFormSubmit} color="primary">
            {!blog?._id ? 'CREATE' : 'UPDATE'}
          </Button>
        )}
        <Button
          onClick={() =>
            setLocalState({
              ...localState,
              isBlogDetailsFormToShow: false,
              isForSubmission: false,
            })
          }
          color="primary"
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const PaperComponent = (props: PaperProps) => <Paper {...props} />;
