import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  root: {
    flexGrow: 1,
    padding: spacing(2),
    height: '62vh',
  },
  icon: {
    display: 'flex',
    margin: 'auto',
    height: 80,
    width: 80,
    color: palette.grey[600],
  },
  message: {
    marginTop: spacing(1),
    color: palette.grey[600],
  },
}));

export default useStyles;
