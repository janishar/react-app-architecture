import React, { ReactElement, useState, MouseEvent } from 'react';
import useStyles from './style';
import importer from '@utils/importer';
import { Link, useHistory } from 'react-router-dom';
import { useStateSelector } from '@core/reducers';
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Button,
  IconButton,
  Menu,
  Fab,
  Drawer,
  CardActionArea,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SvgIcon,
  Divider,
} from '@material-ui/core';

import {
  Info as InfoIcon,
  Close as CloseIcon,
  Web as WebIcon,
  Email as EmailIcon,
  Menu as MenuIcon,
  List as ListIcon,
  Create as CreateIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from '@material-ui/icons';

import { mdiLogout, mdiLogin } from '@mdi/js';
import AuthDialog from '@ui/auth';
import { logout } from '@ui/auth/actions';
import { useDispatch } from 'react-redux';
import { checkRole } from '@utils/appUtils';
import { Roles } from '@ui/auth/reducer';

const afterAcademyLogo = importer('./assets/afteracademy-logo.svg');

export default function Header(): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const { isLoggedIn, data: authData } = useStateSelector(({ authState }) => authState);
  const user = authData?.user;

  const isWriter = checkRole(user, Roles.WRITER);
  const isEditor = checkRole(user, Roles.EDITOR);

  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popupMoreAnchorEl, setPopupMoreAnchorEl] = useState<HTMLElement | null>(null);
  const isPopupMenuOpen = Boolean(popupMoreAnchorEl);
  const dispatch = useDispatch();

  function handlePopupMenuClose() {
    setPopupMoreAnchorEl(null);
  }

  function handlePopupMenuOpen(event: MouseEvent<HTMLElement>) {
    setPopupMoreAnchorEl(event.currentTarget);
  }

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  const renderProfileView = (onClick: (event: MouseEvent<HTMLButtonElement>) => void) => {
    if (!user) return null;
    return (
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} aria-label={user.name} src={user.profilePicUrl} />
          }
          title={user.name.split(' ')[0]}
        />
      </CardActionArea>
    );
  };

  const popupMenuId = 'menu-popup';
  const popupMenu = (
    <Menu
      anchorEl={popupMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={popupMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isPopupMenuOpen}
      onClose={handlePopupMenuClose}
      PopoverClasses={{ paper: classes.paper }}
    >
      {isLoggedIn && renderProfileView(handlePopupMenuClose)}
      {isWriter && (
        <MenuItem
          className={classes.menuItem}
          onClick={() => {
            history.push('/write/blog');
            handlePopupMenuClose();
          }}
        >
          <IconButton color="inherit">
            <CreateIcon />
          </IconButton>
          <p>Write Blog</p>
        </MenuItem>
      )}
      {isWriter && (
        <MenuItem
          className={classes.menuItem}
          onClick={() => {
            history.push('/writer/blogs');
            handlePopupMenuClose();
          }}
        >
          <IconButton color="inherit">
            <ListIcon />
          </IconButton>
          <p>My Blogs</p>
        </MenuItem>
      )}
      {isEditor && (
        <MenuItem
          className={classes.menuItem}
          onClick={() => {
            history.push('/editor/blogs');
            handlePopupMenuClose();
          }}
        >
          <IconButton color="inherit">
            <SupervisorAccountIcon />
          </IconButton>
          <p>Blogs Admin</p>
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem
          className={classes.menuItem}
          onClick={() => {
            dispatch(logout());
            handlePopupMenuClose();
          }}
        >
          <IconButton color="inherit">
            <SvgIcon>
              <path d={mdiLogout} />
            </SvgIcon>
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileDrawerMenu = (
    <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer}>
      {isLoggedIn && renderProfileView(toggleDrawer)}
      <List component="nav">
        {[
          { title: 'About Project', link: '/about-project', icon: <InfoIcon /> },
          { title: 'Blogs', link: '/blogs', icon: <WebIcon /> },
          { title: 'Contact', link: '/contact', icon: <EmailIcon /> },
        ].map(({ title, link, icon }, position) => (
          <ListItem
            key={position}
            className={classes.drawerItem}
            button
            component={Link}
            to={link}
            onClick={toggleDrawer}
          >
            <ListItemIcon className={classes.drawerIcon}>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
        {isWriter && <Divider />}
        {isWriter &&
          [
            { title: 'Write Blog', link: '/write/blog', icon: <CreateIcon /> },
            { title: 'My Blogs', link: '/writer/blogs', icon: <WebIcon /> },
          ].map(({ title, link, icon }, position) => (
            <ListItem
              key={position}
              className={classes.drawerItem}
              button
              component={Link}
              to={link}
              onClick={toggleDrawer}
            >
              <ListItemIcon className={classes.drawerIcon}>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        <Divider />
        {isEditor && <Divider />}
        {isEditor &&
          [{ title: 'Blog Admin', link: '/editor/blogs', icon: <SupervisorAccountIcon /> }].map(
            ({ title, link, icon }, position) => (
              <ListItem
                key={position}
                className={classes.drawerItem}
                button
                component={Link}
                to={link}
                onClick={toggleDrawer}
              >
                <ListItemIcon className={classes.drawerIcon}>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ),
          )}
        {isLoggedIn && (
          <ListItem
            className={classes.drawerItem}
            onClick={() => {
              dispatch(logout());
              toggleDrawer();
            }}
            button
          >
            <ListItemIcon className={classes.drawerIcon}>
              <SvgIcon>
                <path d={mdiLogout} />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
        {!isLoggedIn && (
          <ListItem
            className={classes.drawerItem}
            onClick={() => {
              setOpenAuthDialog(true);
              toggleDrawer();
            }}
            button
          >
            <ListItemIcon className={classes.drawerIcon}>
              <SvgIcon>
                <path d={mdiLogin} />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
      <div className={classes.drawerCloseButtonContainer}>
        <IconButton className={classes.drawerCloseButton} onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </div>
    </Drawer>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="secondary" className={classes.appbar}>
        <Toolbar>
          <Avatar
            alt="Logo"
            src={afterAcademyLogo}
            className={classes.logo}
            component={Link}
            to={'/'}
          />
          <Typography variant="h6" className={classes.brandName}>
            AfterAcademy Tutorials
          </Typography>
          <div className={classes.sectionDesktop}>
            {[
              { title: 'About Project', link: '/about-project' },
              { title: 'Blogs', link: '/blogs' },
              { title: 'Contact', link: '/contact' },
            ].map(({ title, link }, position) => (
              <Button
                key={position}
                color="inherit"
                className={classes.button}
                component={Link}
                to={link}
              >
                {title}
              </Button>
            ))}
            {user?.profilePicUrl && (
              <Avatar alt={user.name} src={user.profilePicUrl} className={classes.avatar} />
            )}
            {isLoggedIn ? (
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                onClick={handlePopupMenuOpen}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="login"
                className={classes.loginButton}
                onClick={() => setOpenAuthDialog(true)}
              >
                Login
              </Fab>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {popupMenu}
      {mobileDrawerMenu}
      <AuthDialog open={openAuthDialog} onClose={() => setOpenAuthDialog(false)} />
    </div>
  );
}
