import React, { ReactElement } from 'react';
import importer from '@utils/importer';
import { Typography, Grid, Card, CardHeader, Avatar, CardContent, Button } from '@material-ui/core';
import useStyles from './style';

export default function Landing(): ReactElement {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AboutUs />
        </div>
    );
}

const AboutUs = () => {
    const afteracademyLogo = importer('@ui/header/assets/afteracademy-logo.svg');
    const mindorksLogo = importer('./assets/mindorks-logo.svg');
    const classes = useStyles();
    return (
        <Grid className={classes.aboutUsSection} container justify="center" alignItems="center">
            <Grid item xs={11} sm={11} md={11}>
                <Typography
                    className={classes.sectionHeading}
                    align="center"
                    variant="h4"
                    component="h2"
                >
                    About Us
                </Typography>
                <Grid container spacing={4} justify="center" alignItems="stretch">
                    <Grid item xs={12} sm={6} md={5}>
                        <InfoCard
                            imgUrl={afteracademyLogo}
                            href="https://afteracademy.com"
                            title="AfterAcademy"
                            description="A platform to learn programming, data structure & algorithms, webapps & backend development."
                            subtitle="Learn by doing principle"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <InfoCard
                            imgUrl={mindorksLogo}
                            href="https://mindorks.com"
                            title="MindOrks"
                            description="A platform to learn Android, Flutter, and React Native development. Stay ahead with lateset mobile tech."
                            subtitle="Learn from the best"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const InfoCard = ({
    imgUrl,
    href,
    title,
    subtitle,
    description,
    action = 'Learn More',
}: {
    imgUrl: string;
    href: string;
    title: string;
    subtitle: string;
    description: string;
    action?: string;
}) => {
    const classes = useStyles();
    return (
        <Card className={classes.infoCard} raised={true}>
            <CardHeader
                avatar={<Avatar className={classes.infoBigAvatar} src={imgUrl} />}
                title={title}
                subheader={subtitle}
            />
            <CardContent>
                <Typography variant="subtitle1" component="p">
                    {description}
                </Typography>
            </CardContent>
            <Button
                className={classes.infoButton}
                variant="contained"
                component="a"
                size="small"
                color="primary"
                href={href}
                target="_blank"
            >
                {action}
            </Button>
        </Card>
    );
};
