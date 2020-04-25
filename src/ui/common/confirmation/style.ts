import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }: Theme) => ({
  paper: {
    background: palette.secondary.light,
  },
}));

export default useStyles;
