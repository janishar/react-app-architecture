import React, { ReactElement, useState, MouseEvent } from 'react';
import useStyles from './style';
import importer from '@utils/importer';
import { Link } from 'react-router-dom';
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
} from '@material-ui/core';

import {
    Info as InfoIcon,
    Close as CloseIcon,
    Web as WebIcon,
    Email as EmailIcon,
    Menu as MenuIcon,
} from '@material-ui/icons';

import { mdiLogout } from '@mdi/js';

const afterAcademyLogo = importer('./assets/afteracademy-logo.svg');

export default function Header(): ReactElement {
    const classes = useStyles();
    const { isLoggedIn, data: authData } = useStateSelector(({ authState }) => authState);
    const user = authData ? authData.user : null;

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [popupMoreAnchorEl, setPopupMoreAnchorEl] = useState<HTMLElement | null>(null);
    const isPopupMenuOpen = Boolean(popupMoreAnchorEl);

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
                        <Avatar
                            className={classes.avatar}
                            aria-label={user.name}
                            src={user.profilePicUrl}
                        />
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
        >
            {isLoggedIn && renderProfileView(handlePopupMenuClose)}
            {isLoggedIn && (
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => {
                        // onLogout(data);
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
                        AfterAcademy
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
                                onClick={() => setOpenLoginDialog(true)}
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
        </div>
    );
}
