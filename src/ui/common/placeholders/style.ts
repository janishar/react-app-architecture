import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  box: {
    padding: spacing(2),
  },
  author: {
    marginTop: spacing(3),
  },
}));

export default useStyles;
