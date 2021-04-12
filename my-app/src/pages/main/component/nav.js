import { useState } from 'react';
import { darken, makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';

import ExploreIcon from '@material-ui/icons/ExploreOutlined'
import AddIcon from '@material-ui/icons/AddRounded'
import AddLocationIcon from '@material-ui/icons/AddLocationOutlined'
import PostAddIcon from '@material-ui/icons/PostAddRounded'
import AccountCircle from '@material-ui/icons/AccountCircleRounded'

import { GetMyEntities } from '../../services/authService';
import SearchBar from '../../followers_page/search'
import history from '../../history'


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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: darken(theme.palette.background.default, 0.05),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      width: '40%',
    },
  },
  searchIcon: {
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
      <MenuItem className={classes.menuItem} onClick={() => handleHistory('/createPost/rrr-1296')}>
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
            <IconButton edge="end" className={classes.rightButton} onClick={() => handleHistory('/createPost/rrr-1296')}>
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