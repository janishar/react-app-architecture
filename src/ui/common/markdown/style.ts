import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  root: {
    flexGrow: 1,
    fontSize: 16,
    maxWidth: '100%',
    '& a': {
      color: palette.common.white,
      textDecoration: 'underline',
    },
    '& pre': {
      padding: spacing(2),
      background: palette.secondary.dark,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      fontSize: 13,
      '& code': {
        background: palette.secondary.dark,
      },
    },
    '& h1': {
      fontFamily: 'Roboto Condensed,Roboto,sans-serif',
      lineHeight: 1.25,
    },
    '& p, ol, ul': {
      lineHeight: 1.8,
    },
    '& code': {
      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", "Courier", monospace;',
      display: 'inline',
      padding: '1px 5px 3px',
      borderRadius: 2,
      background: palette.grey[800],
    },
    '& img': {
      maxWidth: '100%',
    },
    '& li': {
      paddingBottom: spacing(1),
    },
  },
}));

export default useStyles;
