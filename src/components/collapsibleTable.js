import React, {useState, useEffect} from "react";
import ListItem from '@material-ui/core/ListItem';
import Axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import XMLParser from 'react-xml-parser';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"    }
  }
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [resep,setResep] = useState([]);
  const classes = useRowStyles();
  let id = row.id_coklat;
  // console.log(id);
  // let api = "http://localhost:3007/api/resep/" ;
  // // console.log(api);
  // let newapi = api.concat(id);
  // let params = api.bind(id);
  useEffect(()=>{
    soapGetResep();
    // Axios.get(newapi).then((response)=>{
    //   // console.log(response.data);
    //   setResep(response.data);
    //   rows = response.data;
    //   console.log(rows);
    // });
  },[]);
  const soapGetResep =() =>{
   
    const config = {headers:{'Content-Type':'text/xml;charset=utf-8'}};
    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cod="http://codejava.net/">' + 
                    '<soapenv:Header/>' + 
                    '<soapenv:Body>' + 
                      '<cod:getResepDatabase>' + 
                          '<arg0>' +id+'</arg0>'+
                      '</cod:getResepDatabase>'+
                    '</soapenv:Body>' + 
                '</soapenv:Envelope>';
    Axios.post("http://localhost:8080/wwfactory/ws/factory?wsdl",body,config)
    .then(res=>res.data)
    .then(data=> new XMLParser().parseFromString(data))
    .then(xml=>{
        
        var hasil_awal = xml.getElementsByTagName('return');
        var hasil = hasil_awal[0].value;
        var hasil_parse = JSON.parse(hasil);
        // console.log(hasil_parse);
        setResep(hasil_parse);
        console.log("resep:");
        console.log(resep);
        // setSaldo(saldo[0].value);
    })
    ;
  }


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        
        <TableCell >
          {row.nama_coklat}
        </TableCell>
        <TableCell align="right" >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
        {/* <TableCell >
          {row.nama_coklat}
        </TableCell> */}
        <TableCell>{row.stok}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderColor:"black"}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={5}>
              <Typography variant="h6" gutterBottom component="div">
                Resep
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Bahan</TableCell>
                    <TableCell>Jumlah</TableCell>
                    {/* <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resep.map((historyRow) => (
                    <TableRow key={historyRow.bahan}>
                      <TableCell >
                        {historyRow.nama_bahan}
                      </TableCell>
                      <TableCell>{historyRow.jumlah}</TableCell>
                      {/* <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [coklat,setcoklat] = useState([]);
  useEffect(()=>{
    soapGetDistinct();
    // Axios.get("http://localhost:3007/api/coklatresep").then((response)=>{
    //   // console.log(response.data);
    //   setcoklat(response.data);
    // //   rows = response.data;
    // //   console.log(rows);
    // });
  },[]);
  const soapGetDistinct =() =>{
   
    const config = {headers:{'Content-Type':'text/xml;charset=utf-8'}};
    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cod="http://codejava.net/">' + 
                      '<soapenv:Header/>' + 
                      '<soapenv:Body>' + 
                        '<cod:getDistinctIDCoklatDatabase/>' + 
                      '</soapenv:Body>' + 
                 ' </soapenv:Envelope>';
    Axios.post("http://localhost:8080/wwfactory/ws/factory?wsdl",body,config)
    .then(res=>res.data)
    .then(data=> new XMLParser().parseFromString(data))
    .then(xml=>{
        
        var hasil_awal = xml.getElementsByTagName('return');
        var hasil = hasil_awal[0].value;
        var hasil_parse = JSON.parse(hasil);
        console.log(hasil_parse);
        setcoklat(hasil_parse);
        console.log("distinct id:");
        console.log(coklat);
        // setSaldo(saldo[0].value);
    })
    ;
  }

  return (
    <div>
      <h1>Daftar Resep Coklat</h1>
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{borderColor:"black"}}/>
              <TableCell style={{borderColor:"black"}}>Nama Coklat</TableCell>
              <TableCell style={{borderColor:"black"}}></TableCell>
              <TableCell style={{borderColor:"black"}}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {coklat.map((row) => (
              <Row key={row.id_coklat} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}