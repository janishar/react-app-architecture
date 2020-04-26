import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: spacing(1),
    },
  },
  primary: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main,
  },
}));

export default useStyles;
