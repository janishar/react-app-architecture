import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette, breakpoints }: Theme) => ({
  title: {
    marginLeft: spacing(2),
    flex: 1,
  },
  blogContent: {
    marginTop: spacing(3),
    padding: spacing(6),
    background: palette.background.default,
    paddingBlockStart: spacing(10),
    [breakpoints.down('md')]: {
      padding: spacing(2),
      marginTop: 0,
    },
  },
  paper: {
    background: palette.background.default,
  },
}));

export default useStyles;
