import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  root: {
    flexGrow: 1,
  },
  aboutUsSection: {
    paddingTop: spacing(6),
    paddingBottom: spacing(10),
    background: palette.secondary.dark,
  },
  sectionHeading: {
    marginBottom: spacing(6),
    marginTop: spacing(2),
  },
  infoCard: {
    height: '100%',
    [breakpoints.down('sm')]: {
      padding: spacing(2),
    },
    background: palette.secondary.light,
  },
  card: {
    height: '100%',
  },
  cardAction: {
    paddingBottom: spacing(3),
  },
  avatar: {
    width: 60,
    height: 60,
  },
  button: {
    marginLeft: spacing(2),
  },
  resourcesSection: {
    paddingTop: spacing(6),
    paddingBottom: spacing(10),
  },
}));

export default useStyles;
