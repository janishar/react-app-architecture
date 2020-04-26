import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette, typography, breakpoints }: Theme) => ({
  root: {
    flexGrow: 1,
    background: palette.background.paper,
  },
  content: {
    paddingTop: 0,
  },
  pad: {
    width: '100% !important',
    background: palette.background.default,
    ...typography.body2,
    color: palette.grey[200],
    resize: 'none',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", "Courier", monospace;',
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
  paper: {
    background: palette.secondary.light,
  },
  editTagsField: {
    paddingBottom: spacing(1),
    marginBottom: spacing(3),
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    margin: spacing(0.25),
    fontWeight: 500,
    fontSize: 14,
  },
}));

export default useStyles;
