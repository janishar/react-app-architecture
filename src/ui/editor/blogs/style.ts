import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: spacing(1),
  },
  pannel: {
    paddingTop: spacing(4),
  },
  tab: {
    minHeight: 65,
    textTransform: 'none',
    fontSize: 16,
  },
  button1: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  button2: {
    marginLeft: spacing(1),
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  list: {
    width: '100%',
  },
  chip: {
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
  chip2: {
    marginTop: spacing(1),
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
  chip3: {
    marginLeft: spacing(1),
    marginTop: spacing(1),
  },
  chip4: {
    marginTop: spacing(1),
    cursor: 'pointer',
  },
  author: {
    marginTop: spacing(1),
  },
}));

export default useStyles;
