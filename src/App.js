import React from 'react';
import clsx from 'clsx';
import Navigation from './components/nav';
import FamilyTree from './components/familyTree';
import Home from './components/home';
import Maps from './components/maps';
import About from './components/about';
import PersonForm from './components/personForm';
import SpouseForm from './components/spouseForm';
import { Route, Switch } from "react-router-dom"
import { AppBar, Toolbar, IconButton, Drawer, Divider, CssBaseline } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: "#354f52",
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#354f52"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#2f3e46',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: '100%'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <SpouseForm></SpouseForm>
          <PersonForm></PersonForm>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Navigation></Navigation>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Switch>
          <Route path='/person/:id' component={FamilyTree} />
          <Route path='/home' component={Home} />
          <Route path='/maps' component={Maps} />
          <Route path='/about' component={About} />
        </Switch>
      </main>
    </div>



    // <div key={'container'}>
    //   <div className={classes.root} key={'app-bar'}>
    //     <AppBar position="static">
    //       <Toolbar>
    //         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography variant="h6" className={classes.title}>
    //           Family Tree
    //         </Typography>
    //         <SpouseForm></SpouseForm>
    //         <PersonForm></PersonForm>
    //         <Button color="inherit">Login</Button>
    //       </Toolbar>
    //     </AppBar>
    //   </div>

    //   <Drawer anchor={'left'}
    //     open={state['left']}
    //     onClose={toggleDrawer('left', false)}
    //     onOpen={toggleDrawer('left', true)}
    //     key={'drawer'}
    //     variant="persistent"
    //     >
    //     <Navigation></Navigation>
    //   </Drawer>
    //   <div key={'content'} className={'custom-container'}>
    //     <Switch>
    //       <Route path='/person/:id' component={FamilyTree} />
    //       <Route path='/home' component={Home} />
    //       <Route path='/about' component={About} />
    //     </Switch>
    //   </div>
    // </div>

  );
}

export default App;
