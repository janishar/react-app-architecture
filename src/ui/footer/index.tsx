import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './style';
import { Divider, Link, Grid, Typography } from '@material-ui/core';
import { Copyright } from '@material-ui/icons';

export default function Component(): ReactElement {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Divider />
      <Grid className={classes.grid} container>
        <Grid className={classes.listItem} item xs={12} sm={6} md={3}>
          <Copyright className={classes.icon} />
          <Typography component="span" variant="h6">
            Copyright 2020
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            MindOrks Nextgen Private Limited
            <br />
            Gurgaon, Haryana, India
            <br />
          </Typography>
        </Grid>
        <Grid className={classes.listItem} item xs={12} sm={6} md={3}>
          <Typography component="p" variant="h6">
            Quick Links
          </Typography>
          <InternalLink link="/contact" name="Contact Us" />
          <br />
          <InternalLink link="/policies/privacy" name="Privacy Policy" />
          <br />
          <InternalLink link="/policies/terms-and-conditions" name="Terms And Conditions" />
          <br />
          <InternalLink link="/policies/cookie" name="Cookie Policy" />
          <br />
        </Grid>
        <Grid className={classes.listItem} item xs={12} sm={6} md={3}>
          <Typography component="p" variant="h6">
            About Us
          </Typography>
          <ExternalLink href="https://www.facebook.com/afteracademy" name="AfterAcademy" />
          <br />
          <ExternalLink href="https://www.facebook.com/mindorks.nextgen" name="MindOrks" />
          <br />
          <ExternalLink
            href="https://www.linkedin.com/in/amit-shekhar-iitbhu"
            name="Amit Shekhar"
          />
          <br />
          <ExternalLink href="https://www.linkedin.com/in/janishar-ali" name="Janishar Ali" />
        </Grid>
        <Grid className={classes.listItem} item xs={12} sm={6} md={3}>
          <Typography component="p" variant="h6">
            Free Resources
          </Typography>
          <ExternalLink href="https://blog.mindorks.com" name="Publication" />
          <br />
          <ExternalLink href="https://medium.com/mindorks" name="Medium" />
          <br />
          <ExternalLink href="https://www.youtube.com/mindorks" name="Video Lessons" />
          <br />
          <ExternalLink href="https://github.com/mindorksopensource" name="Mindorks Open Source" />
        </Grid>
      </Grid>
    </footer>
  );
}

const ExternalLink = ({ href, name }: { href: string; name: string }) => (
  <Link href={href} target="_blank" variant="subtitle1" color="textSecondary">
    {name}
  </Link>
);

const InternalLink = ({ link, name }: { link: string; name: string }) => (
  <Link component={RouterLink} to={link} color="textSecondary" variant="subtitle1">
    {name}
  </Link>
);
