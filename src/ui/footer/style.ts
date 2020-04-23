import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    padding: spacing(4),
  },
  listItem: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    marginRight: spacing(1),
  },
}));

export default useStyles;
