import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette, breakpoints }: Theme) => ({
  root: {
    flexGrow: 1,
    background: palette.background.default,
    paddingBottom: spacing(4),
  },
  blogContent: {
    padding: spacing(6),
    minBlockSize: '55vh',
    background: palette.background.default,
    [breakpoints.down('md')]: {
      padding: spacing(2),
    },
  },
  author: {
    background: palette.background.default,
  },
}));

export default useStyles;
