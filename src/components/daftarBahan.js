import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import XMLParser from 'react-xml-parser';
import Axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, stok) {
  return { name, stok };
}

const rows = [
  createData('Bubuk coklat', 159),
  createData('Gula merah', 237),
  createData('Vanili', 262),
  createData('pewarna', 305)
];

export default function DaftarBahan() {
  const classes = useStyles();
  const [bahanList,setBahanList] = useState([]);
  const [counter,setCounter] = useState(0);
  const [counter2,setCounter2] = useState([]);

  const handleIncrement = () => {
    setCounter(counter+1);
  };
  const handleDecrement = () => {
    setCounter(counter-1);
  };

  useEffect(()=>{
    soapGetBahan();
    // console.log(counter2);
    // setCounter2(rows);
    // console.log(rows);
    // console.log(counter2);
    // console.log(counter2.name);
    },[]);
  const soapGetBahan =() =>{
  
    const config = {headers:{'Content-Type':'text/xml;charset=utf-8'}};
    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cod="http://codejava.net/">'+
                      '<soapenv:Header/>' + 
                      '<soapenv:Body>' + 
                        '<cod:getBahanDatabase/>' + 
                      '</soapenv:Body>' + 
                  '</soapenv:Envelope>';
    Axios.post("http://localhost:8080/wwfactory/ws/factory?wsdl",body,config)
    .then(res=>res.data)
    .then(data=> new XMLParser().parseFromString(data))
    .then(xml=>{
        console.log(xml);
        var hasil_awal = xml.getElementsByTagName('return');
        var hasil = hasil_awal[0].value;
        var hasil_parse = JSON.parse(hasil);
        // console.log(hasil_parse);
        setBahanList(hasil_parse);
        // console.log(bahanList);
        // setSaldo(saldo[0].value);
    })
    ;
  }
  return (
    <div>
    
      <h1>Daftar Bahan</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nama Bahan</TableCell>
              <TableCell align="right">Stok di pabrik</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bahanList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.nama_bahan}
                </TableCell>
                <TableCell align="right">
                  {row.jumlah}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  </div>
  );
}
