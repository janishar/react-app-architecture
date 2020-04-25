import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette, typography, breakpoints }: Theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    paddingTop: spacing(6),
    paddingBlockStart: spacing(10),
  },
  pad: {
    width: '100% !important',
    background: palette.background.paper,
    ...typography.body1,
    color: palette.common.white,
    resize: 'none',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    '-webkit-box-shadow': 'none',
    '-moz-box-shadow': 'none',
    marginTop: spacing(3),
    marginBottom: spacing(6),
    padding: spacing(6),
    paddingBlockStart: spacing(10),
    [breakpoints.down('md')]: {
      padding: spacing(2),
      marginBottom: spacing(2),
      marginTop: 0,
    },
  },
  speedDial: {
    position: 'fixed',
    top: 100,
    right: spacing(3),
  },
  progress: {
    top: 65,
    width: '100%',
    position: 'fixed',
    zIndex: 1000,
  },
}));

export default useStyles;
