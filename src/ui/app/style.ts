import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({}: Theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1444px',
    margin: '0 auto',
    float: 'none',
  },
  content: {
    marginTop: 60,
    minHeight: '62vh',
  },
}));

export default useStyles;
