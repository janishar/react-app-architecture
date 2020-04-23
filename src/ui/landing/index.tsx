import React, { ReactElement } from 'react';
import importer from '@utils/importer';
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Button,
  CardActionArea,
  CardMedia,
  CardActions,
} from '@material-ui/core';
import useStyles from './style';

export default function Landing(): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AboutUs />
      <LearningResources />
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
        <Typography className={classes.sectionHeading} align="center" variant="h4" component="h2">
          About Us
        </Typography>
        <Grid container spacing={4} justify="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={5}>
            <InfoCard
              imgUrl={afteracademyLogo}
              href="https://afteracademy.com"
              title="AfterAcademy"
              description="A platform to learn programming, data structure & algorithms, webapps & backend development."
              subtitle="Learn by doing"
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
        avatar={<Avatar className={classes.avatar} src={imgUrl} />}
        title={title}
        subheader={subtitle}
      />
      <CardContent>
        <Typography variant="subtitle1" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button
          className={classes.button}
          variant="contained"
          component="a"
          size="small"
          color="primary"
          href={href}
          target="_blank"
        >
          {action}
        </Button>
      </CardActions>
    </Card>
  );
};

const ReasourceCard = ({
  href,
  imgUrl,
  title,
  description,
  action,
}: {
  href: string;
  imgUrl: string;
  title: string;
  description: string;
  action: string;
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} raised={true} elevation={4}>
      <CardActionArea href={href} target="_blank">
        <CardMedia component="img" alt={title} src={imgUrl} title={title} />
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button component="a" size="small" color="primary" href={href} target="_blank">
          {action}
        </Button>
      </CardActions>
    </Card>
  );
};

const LearningResources = () => {
  const classes = useStyles();
  const blog = importer('./assets/afteracademy-blog.jpg');
  const youtube = importer('./assets/afteracademy-youtube.jpg');
  const opensource = importer('./assets/mindorks-opensource.jpg');
  const mBlog = importer('./assets/mindorks-blog.jpg');
  const mMedium = importer('./assets/mindorks-medium-blog.jpg');
  const mYoutube = importer('./assets/mindorks-youtube.jpg');
  return (
    <Grid className={classes.resourcesSection} container justify="center" alignItems="center">
      <Grid item xs={11} sm={11} md={11}>
        <Typography className={classes.sectionHeading} align="center" variant="h4" component="h2">
          Our Free Learning Resources
        </Typography>
        <Grid container spacing={4} justify="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4}>
            <ReasourceCard
              href="https://afteracademy.com/blogs"
              imgUrl={blog}
              title="AfterAcademy Blogs"
              action="Read"
              description="Blogs and articles for Android, Kotlin, Machine Learning, React Js, Node Js, iOS and IOT with best development and coding practices"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReasourceCard
              href="https://youtube.com/afteracademy"
              imgUrl={youtube}
              title="AfterAcademy Youtube"
              action="Watch"
              description="AfterAcademy host video lessons and tutorials on computer programming and software development."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReasourceCard
              href="https://github.com/MindorksOpenSource"
              imgUrl={opensource}
              title="MindOrks OpenSource"
              action="Explore"
              description="Open source project used by thousands of apps and companies. Being among highest ranked respositories in the world."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReasourceCard
              href="https://blog.mindorks.com"
              imgUrl={mBlog}
              title="MindOrks Publication"
              action="Read"
              description="Blogs and articles for Android, Kotlin, Machine Learning, React Js, Node Js, iOS and IOT with best development and coding practices"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReasourceCard
              href="https://medium.com/mindorks"
              imgUrl={mMedium}
              title="MindOrks Community Blogs"
              action="Read"
              description="Our community publishes stories worth reading on software development and design, Android and Machine learning."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReasourceCard
              href="https://youtube.com/mindorks"
              imgUrl={mYoutube}
              title="MindOrks YouTube"
              action="Watch"
              description="Video lessons on software development including Java, Android, iOS, Machine learning, Web and Mobile development. domains."
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
