import React from "react";
import {
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = (theme: Theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      marginLeft: drawerWidth,

    },
    backgroundColor: "#5D88D2",
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
});

export interface NavigationProps {
  classes: any;
  token: any;
  isAdmin: boolean | undefined;
  window: number;
  clearToken: any;
}

export interface NavigationState {
  mobileOpen: boolean;
  nestedMenuOpen: boolean;
}

export interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

class Navigation extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = { mobileOpen: false, nestedMenuOpen: true };
  }

  handleDrawerToggle = () => {
    let newMobileOpen = !this.state.mobileOpen;
    this.setState({ mobileOpen: newMobileOpen });
  };

  handleMenuClick = () => {
    this.state.nestedMenuOpen ? this.setState({ nestedMenuOpen: false }) : this.setState({ nestedMenuOpen: true })
  };

  // ListItemLink(props: ListItemLinkProps) {
  //   const { primary, to } = props;

  //   const renderLink = React.useMemo(
  //     () =>
  //       React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
  //         <RouterLink to={to} ref={ref} {...itemProps} />
  //       )),
  //     [to],
  //   );

  //   return (
  //     <li>
  //       <ListItem button component={renderLink}>
  //         <ListItemIcon>
  //           <DashboardIcon/>
  //         </ListItemIcon>
  //         <ListItemText primary={primary} />
  //       </ListItem>
  //     </li>
  //   );
  // }

  render() {
    const { classes }: any = this.props;
    // const { window }: any = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List component="nav" >
          <ListItem button onClick={this.handleMenuClick} >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>My Boards</ListItemText>
            {this.state.nestedMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.nestedMenuOpen} timeout="auto" unmountOnExit >
            <List component="div" disablePadding >
              <ListItem button className={classes.nested} >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText>Board 1</ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Button variant="contained" color="primary" onClick={this.props.clearToken} >
          Logout
        </Button>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" elevation={1} className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => this.handleDrawerToggle()}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Vision Board
            </Typography>
          </Toolbar>
        </AppBar>
        <>
          {!this.props.token
            // || this.props.isAdmin 
            ? (
              <></>
            ) : (
              <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                  <Drawer
                    variant="temporary"
                    anchor="left"
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true,
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
              </nav>
            )}
        </>
      </div>
    );
  }
}

export default withStyles(useStyles)(Navigation);
