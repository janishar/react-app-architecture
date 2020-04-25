import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({}: Theme) => ({
  root: {
    flexGrow: 1,
    '& a': {
      color: 'red',
    },
  },
}));

export default useStyles;
