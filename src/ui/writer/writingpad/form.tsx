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
import ChipInput from 'material-ui-chip-input';
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
      value = value.replace(/\s/g, '-');
      value = value.replace(/\//g, '-');
      value = value.replace(/\./g, '-');
      value = value.toLowerCase();
    }

    setLocalState({
      ...localState,
      [name]: value,
      isTitleError: false,
      isDescriptionError: false,
      isImgUrlError: false,
      isBlogUrlError: false,
      isTagsError: false,
      isAllDataSentToServer: false,
    });
  };

  const handleBlogDetailFormSubmit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (validateBlogDetailForm()) {
      if (!blog?._id) onCreate();
      else onSave();
    }
  };

  const validateBlogDetailForm = () => {
    const newstate = {
      ...localState,
      isTitleError: false,
      isDescriptionError: false,
      isBlogUrlError: false,
      isImgUrlError: false,
      isTagsError: false,
    };

    if (!newstate.title) newstate.isTitleError = true;
    if (!newstate.description) newstate.isDescriptionError = true;
    if (!newstate.blogUrl) newstate.isBlogUrlError = true;
    if (!validateUrl(newstate.imgUrl)) newstate.isImgUrlError = true;
    if (newstate.tags.length === 0) newstate.isTagsError = true;

    const isError =
      newstate.isTitleError ||
      newstate.isDescriptionError ||
      newstate.isBlogUrlError ||
      newstate.isTagsError ||
      newstate.isImgUrlError;

    setLocalState(newstate);
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
      scroll="body"
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
    >
      <DialogTitle id="form-dialog-title">Blog Details</DialogTitle>
      <DialogContent dividers={true}>
        <form>
          <TextField
            required={true}
            error={localState.isTitleError}
            margin="normal"
            variant="outlined"
            id="title"
            label="Title"
            value={localState.title}
            type="text"
            rows={1}
            onChange={handleBlogDetailChange('title')}
            fullWidth
          />
          <TextField
            required={true}
            error={localState.isDescriptionError}
            margin="normal"
            variant="outlined"
            multiline
            id="description"
            label="Description"
            value={localState.description}
            type="text"
            rows={3}
            rowsMax={5}
            onChange={handleBlogDetailChange('description')}
            fullWidth
          />
          <TextField
            required={true}
            error={localState.isBlogUrlError}
            margin="normal"
            variant="outlined"
            id="blogUrl"
            label="URL Endpoint"
            value={localState.blogUrl}
            type="text"
            rows={1}
            onChange={handleBlogDetailChange('blogUrl')}
            fullWidth
          />
          <TextField
            required={true}
            error={localState.isImgUrlError}
            margin="normal"
            variant="outlined"
            id="imgUrl"
            label="Image URL"
            value={localState.imgUrl}
            type="text"
            rows={1}
            onChange={handleBlogDetailChange('imgUrl')}
            fullWidth
          />
          <ChipInput
            value={localState.tags}
            error={localState.isTagsError}
            fullWidth={true}
            placeholder="Add tags for the blog"
            helperText="Press enter key or use comma separator to create a tag"
            newChipKeys={['Enter', ',']}
            classes={{
              root: classes.editTagsField,
              chip: classes.tag,
            }}
            onAdd={(chip: string) => {
              const values = [...localState.tags];
              values.push(chip.toUpperCase());
              setLocalState({ ...localState, tags: values });
            }}
            onDelete={(chip: string) => {
              const values = localState.tags.filter((tag) => tag !== chip);
              setLocalState({ ...localState, tags: values });
            }}
          />
        </form>
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
