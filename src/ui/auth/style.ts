import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    background: palette.secondary.light,
  },
}));

export default useStyles;
