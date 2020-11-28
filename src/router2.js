import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Login from './login';
import Home from './components/home';
import DataCoklatResep from './dataCoklatResep';
import DaftarHarga from './components/daftarHarga';
import BeliBahan2 from './components/beliBahan2';
import CollapsibleTable from './components/collapsibleTable';

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import NoteIcon from '@material-ui/icons/Note';
import PersonIcon from '@material-ui/icons/Person';
import DomainIcon from '@material-ui/icons/Domain';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Pesanan from './components/pesanan';
import DaftarBahan from './components/daftarBahan';

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

function Router2() {
  const classes = useStyles();
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
          style={{ width: '220px',color:'black'}}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            {/* <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link> */}
            <Link to="/home" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/pesanan" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={"Pesanan"} />
              </ListItem>
            </Link>
            <Link to="/resep" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText primary={"Resep"} />
              </ListItem>
            </Link>
            <Link to="/bahan" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <DomainIcon />
                </ListItemIcon>
                <ListItemText primary={"Bahan"} />
              </ListItem>
            </Link>
            <Link to="/belibahan" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={"Beli Bahan"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Switch>
          {/* <Route exact path="/">
            <Container>
                <Login/>
            </Container>
          </Route> */}
          <Route exact path="/home">
            <Container>
                <Home/>
            </Container>
          </Route>
          <Route exact path="/pesanan">
            <Container>
                <Pesanan />
            </Container>
          </Route>
          <Route exact path="/resep">
            <Container>
                <CollapsibleTable/>
            </Container>
          </Route>
          <Route exact path="/bahan">
            <Container>
                <DaftarBahan />
            </Container>
          </Route>
          <Route exact path="/belibahan">
            <Container>
                <DaftarHarga/>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Router2;
