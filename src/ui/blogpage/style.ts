import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    paddingTop: 0,
    paddingBlockStart: spacing(10),
  },
  author: {
    marginTop: spacing(3),
  },
}));

export default useStyles;
