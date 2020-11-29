import React, {useState, useEffect} from 'react';
import {Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Axios from 'axios';
import XMLParser from 'react-xml-parser';
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width:'100%',
        height:'100%',
        
      },
    saldo:{
    align:'right',
    },
    group:{
    float: 'left',
    },
    card:{
    maxWidth: 500,
    
    },
    drawerPaper: { width: 'inherit' },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }))

export default function Home() {
  const classes = useStyles();
  const [saldo,setSaldo] = useState(0);
  useEffect(()=>{
    soapGetSaldo();
  },[]);


  if (!localStorage.getItem('email')){
    return <Redirect to="/" />;
  }

  function handleSubmit() {
    localStorage.clear();
    return <Redirect to="/" />;
  }

  const soapGetSaldo =() =>{
    const config = {headers:{'Content-Type':'text/xml;charset=utf-8'}};
    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cod="http://codejava.net/">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>' +
        '<cod:getSaldoDatabase/>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
    Axios.post("http://localhost:8080/wwfactory/ws/factory?wsdl",body,config)
    .then(res=>res.data)
    .then(data=> new XMLParser().parseFromString(data))
    .then(xml=>{
        var saldo = xml.getElementsByTagName('return');
        // console.log(saldo[0].value);
        setSaldo(saldo[0].value);
    })
    ;
  }
  
  return (
    
    <div className={classes.root}> 
    <h1>Willy Wangky Factory</h1>
    {/* <Button variant="outlined" color="primary" onClick={soapRequestGetSaldo}>
            Saldo dari  JAXWS
    </Button> */}
    <Chip className = {classes.saldo} size="medium" label={"Saldo : Rp " + saldo} color="secondary" />
        
        <Card className={classes.card}>
            <Link to="/pesanan" className={classes.link}>
            <CardActionArea>
                {/* <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
                /> */}
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Pesanan
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
                </CardContent>
            </CardActionArea>
            </Link>
            
        </Card>
        <Card className={classes.card}>
            <Link to="/resep" className={classes.link}>
                <CardActionArea>
                    {/* <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    /> */}
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Resep
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
        <Card className={classes.card}>
            <Link to="/bahan" className={classes.link}>
                <CardActionArea>
                    {/* <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    /> */}
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Bahan
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
        <Card className={classes.card}>
            <Link to="/belibahan" className={classes.link}>
                <CardActionArea>
                    {/* <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    /> */}
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Beli Bahan
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Log Out
        </Button>
    </div>
    
    
  );
}