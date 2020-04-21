import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
    root: {
        flexGrow: 1,
    },
    aboutUsSection: {
        paddingTop: spacing(6),
        paddingBottom: spacing(10),
        background: palette.secondary.light,
    },
    sectionHeading: {
        marginBottom: spacing(4),
    },
    infoCard: {
        height: '100%',
        padding: spacing(4),
        [breakpoints.down('sm')]: {
            padding: spacing(2),
        },
    },
    infoBigAvatar: {
        width: 60,
        height: 60,
    },
    infoButton: {
        marginLeft: spacing(2),
    },
}));

export default useStyles;
