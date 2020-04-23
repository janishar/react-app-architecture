import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
  },
  menuButton: {
    marginRight: spacing(2),
  },
  brandName: {
    flexGrow: 1,
  },
  logo: {
    margin: 10,
  },
  button: {
    margin: spacing(1),
    textTransform: 'none',
    fontSize: 16,
  },
  loginButton: {
    margin: spacing(1),
    paddingLeft: 40,
  },
  sectionDesktop: {
    display: 'none',
    [breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerItem: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
  },
  drawerIcon: {
    color: palette.common.white,
  },
  drawerCloseButton: {
    marginLeft: '45%',
  },
  drawerCloseButtonContainer: {
    margin: spacing(1),
  },
  avatar: {
    margin: 5,
    width: 40,
    height: 40,
  },
  menuItem: {
    minWidth: 300,
  },
  paper: {
    background: palette.secondary.light,
  },
}));

export default useStyles;
