import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  success: {
    backgroundColor: '#C9ECD4',
    color: 'black',
  },
  error: {
    backgroundColor: '#FF9494',
    color: 'black',
  },
  info: {
    backgroundColor: '#fff0f0',
    color: 'black',
  },
  warning: {
    backgroundColor: '#FFC48C',
    color: 'black',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  contentMargin: {
    margin: spacing(1),
  },
}));

export default useStyles;
