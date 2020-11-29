import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import XMLParser from 'react-xml-parser';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function DataCoklat() {
  const classes = useStyles();
  const [coklat,setCoklat] = useState([]);
  useEffect(()=>{
    soapGetCoklat();
    // Axios.get("http://localhost:3007/api/datacoklat").then((response)=>{
    //   setCoklat(response.data);
    // });
  },[]);
  const soapGetCoklat =() =>{
   
    const config = {headers:{'Content-Type':'text/xml;charset=utf-8'}};
    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cod="http://codejava.net/">'+
                    '<soapenv:Header/>' +
                    '<soapenv:Body>' + 
                      '<cod:getCoklatDatabase/>' + 
                    '</soapenv:Body>' +
                '</soapenv:Envelope>';
    Axios.post("http://localhost:8080/wwfactory/ws/factory?wsdl",body,config)
    .then(res=>res.data)
    .then(data=> new XMLParser().parseFromString(data))
    .then(xml=>{
        
        var hasil_awal = xml.getElementsByTagName('return');
        var hasil = hasil_awal[0].value;
        var hasil_parse = JSON.parse(hasil);
        console.log(hasil_parse);
        setCoklat(hasil_parse);
        console.log(coklat);
        // setSaldo(saldo[0].value);
    })
    ;
  }

  return (
      <div>
        <h1>Data Coklat Pabrik</h1>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>ID Coklat</TableCell>
                <TableCell>Nama Coklat</TableCell>
                <TableCell >Stok Coklat</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {coklat.map((row) => (
                <TableRow key={row.id_coklat}>
                <TableCell>{row.id_coklat}</TableCell>
                <TableCell component="th" scope="row">
                    {row.namacoklat}
                </TableCell>
                <TableCell>{row.jumlah}</TableCell>
                {/* <TableCell align="right">{row.jumlah}</TableCell> */}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}