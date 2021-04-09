import React from 'react';
import { darken, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ExploreIcon from '@material-ui/icons/ExploreOutlined'
import AddIcon from '@material-ui/icons/AddRounded'
import AddLocationIcon from '@material-ui/icons/AddLocationOutlined'
import PostAddIcon from '@material-ui/icons/PostAddRounded'
import AccountCircle from '@material-ui/icons/AccountCircleRounded'
import history from '../../history'
import { GetMyEntities } from '../../services/authService';

import SearchBar from '../../followers_page/search-new'


const useStyles = makeStyles((theme) => ({
  appBar:{
    backgroundColor: theme.palette.background.default,
  },
  toolBar: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  rightButton: {
    color: theme.palette.primary.main,
    marginLeft:  theme.spacing(1),
  },
  header: {
    ...theme.typography.h6,
    color: theme.palette.primary.main,
    textAlign: 'left',
    marginRight: theme.spacing(2),
  },
  menuItem: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    }
  },
  menuButton: {
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 2, 0, 0),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const entityID = GetMyEntities();
  const classes = useStyles();
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleHistory = (page) => {
    setTimeout(() => {
      history.push(page);
    }, 500)
  }

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className={classes.menuItem} onClick={() => handleHistory('/createPost')}>
        <IconButton className={classes.menuButton} >
          <PostAddIcon />
        </IconButton>
        <span>Add Post</span>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={() => handleHistory('/restregister')}>
        <IconButton className={classes.menuButton}>
          <AddLocationIcon />
        </IconButton>
        <span>Add Restaurant</span>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant='dense' className={classes.toolBar}>
          <Typography className={classes.header} onClick={() => handleHistory('/main')}>
            mATE
          </Typography>
          <SearchBar/>
          {/*<IconButton edge='end' className={classes.rightButton}>
            <NotificationsIcon />
          </IconButton>*/}
          <>
          <div className={classes.sectionDesktop}>
            <IconButton edge="end" className={classes.rightButton} onClick={() => handleHistory('/createPost')}>
              <PostAddIcon />
            </IconButton>
            <IconButton edge="end" className={classes.rightButton} onClick={() => handleHistory('/restregister')}>
              <AddLocationIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton edge='end' className={classes.rightButton} onClick={handleMobileMenuOpen}>
              <AddIcon />
            </IconButton>
          </div>
          <IconButton edge="end" className={classes.rightButton} onClick={() => handleHistory('/Discover')}>
            <ExploreIcon />
          </IconButton>
          <IconButton edge="end" className={classes.rightButton} onClick={() => handleHistory(`/userprofile/${entityID}`)}>
            <AccountCircle />
          </IconButton>
          </>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}