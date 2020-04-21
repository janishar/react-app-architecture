import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({}: Theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '1444px',
        margin: '0 auto',
        float: 'none',
    },
    contentArea: {
        marginTop: 64,
    },
}));

export default useStyles;
