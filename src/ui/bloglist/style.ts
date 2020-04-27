import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, breakpoints }: Theme) => ({
  root: {
    flexGrow: 1,
  },
  cards: {
    marginTop: spacing(6),
    marginBottom: spacing(8),
  },
  cover: {
    width: '100%',
    height: 300,
    padding: 0,
    backgroundImage: "url('/assets/blog-page-cover.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    [breakpoints.down('xs')]: {
      height: 200,
    },
  },
  coverBox: {
    padding: spacing(10),
    height: '100%',
    background: 'rgba(0,0,0, 0.2)',
    [breakpoints.down('xs')]: {
      padding: spacing(8),
    },
  },
  card: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
  },
  cardMedia: {
    height: 220,
  },
  cardAuthor: {
    height: 55,
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: spacing(1),
  },
  cardTitle: {
    lineHeight: '1.3',
  },
  cardDescription: {
    marginTop: spacing(1),
    marginBottom: 50,
    minHeight: 80,
  },
  coverTitle: {
    [breakpoints.down('xs')]: {
      fontSize: 32,
    },
  },
  coverSubtitle: {
    [breakpoints.down('xs')]: {
      fontSize: 22,
    },
  },
}));

export default useStyles;
