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
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import XMLParser from 'react-xml-parser';

import { setPageStateUpdate } from '@material-ui/data-grid';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  table2:{
    maxWidth: 300,
  }
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

export default function DaftarHarga() {
  const classes = useStyles();
  const [dialog,setDialog] = useState(false);
  const [dialog2,setDialog2] = useState(false);
  const [id_bahan,setIdBahan] = useState (1);
  const [nama_bahan,setNamaBahan] = useState("bahan 1");//FIXME: get dari value
  const [harga,setHarga] = useState(0); //FIXME: get dari value
  const [jumlah, setJumlah] = useState(0);
  const [total,setTotal] = useState(0);
  const [bahanList,setBahanList] = useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3005/api/harga").then((response)=>{
      // console.log(response.data);
      console.log(response.data);
      setBahanList(response.data);
    //   rows = response.data;
    //   console.log(rows);
    });
  },[]);
  const handleCloseDialog = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setDialog(false);
  };
  const handleCloseDialog2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setDialog2(false);
  };

  const handleIncrement = () =>{
    setJumlah(prev => prev +1);
    setTotal(prev => prev + harga);
  }
  const handleDecrement = () =>{
    if(jumlah!=0){
      setJumlah(prev => prev -1);
      setTotal(prev => prev - harga);
    }
    
  }

  const transaction = () =>{
    Axios.get("http://localhost:3007/api/addbahan",{
      params: {
        id_bahan: id_bahan,
        nama_bahan : nama_bahan,
        jumlah : jumlah,
      }
    }).then((response)=>{
      // console.log(response.data);
      if(response.data=='berhasil'){
        setDialog(prev => true);
      }
      else if(response.data=='tidak'){
        setDialog2(prev => true);
      }
      else{
        alert("Something went wrong with Transaction");
      }
      
    });
  }
  const soaptransaction = () =>{
    const config = {headers:{'Content-Type':'text/xml;charset=utf-8'}};
    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cod="http://codejava.net/">'+
                      '<soapenv:Header/>' + 
                      '<soapenv:Body>' + 
                        '<cod:transaction>' + 
                            '<!--Optional:-->' + 
                            '<arg0>' + nama_bahan + '</arg0>' + 
                            '<arg1>' + jumlah + '</arg1>' +
                            '<arg2>' + harga + '</arg2>' + 
                        '</cod:transaction>' + 
                      '</soapenv:Body>' + 
                  '</soapenv:Envelope>';
    Axios.post("http://localhost:8080/wwfactory/ws/factory?wsdl",body,config)
    .then(res=>res.data)
    .then(data=> new XMLParser().parseFromString(data))
    .then(xml=>{
        console.log(xml);
        var hasil_awal = xml.getElementsByTagName('return');
        var hasil = hasil_awal[0].value;
        // var hasil_parse = JSON.parse(hasil);
        console.log(hasil);
        if(hasil=="Add Bahan Berhasil"){
          setDialog(prev => true);
        }
        else if(hasil=="Add Bahan tidak Berhasil"){
          setDialog2(prev => true);
        }
        else{
          alert("something went wrong with soap transaction");
        }
        
        // setResep(hasil_parse);
        // console.log("resep:");
        // console.log("yey");
        // setSaldo(saldo[0].value);
    })
    ;
  }

  const fetchData = () =>{
    fetch('http://localhost:8080/wwfactory/ws/hello')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })

    // setTimeout(() => {
    //     console.log('timeoutttt')
    // }, 5000);
  }
  return (
    <div>
      <h1>Daftar Harga Supplier</h1>
      
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Nama Bahan</TableCell>
              <TableCell align="right">Harga</TableCell>
              <TableCell align="right">Beli Bahan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bahanList.map((row) => (
              <TableRow key={row.id_bahan}>
                <TableCell component="th" scope="row">
                  {row.id_bahan}
                </TableCell>
                <TableCell align="right">{row.nama_bahan}</TableCell>
                <TableCell align="right">{row.harga_satuan}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={() => {setIdBahan(prev => row.id_bahan);setNamaBahan(prev=>row.nama_bahan);setHarga(prev=>row.harga_satuan);setJumlah(prev=>0);setTotal(prev=>0);}}> SELECT</Button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1>Beli Bahan</h1>
      <TableContainer component={Card}>
        <Table className={classes.table2} aria-label="simple table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="left">Pesanan</TableCell>
              <TableCell align="right">Keterangan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key={1}>
                <TableCell component="th" scope="row">
                  ID Bahan
                </TableCell>
                <TableCell align="right">{id_bahan}</TableCell>
              </TableRow>
              <TableRow key={1}>
                <TableCell component="th" scope="row">
                  Nama Bahan
                </TableCell>
                <TableCell align="right">{nama_bahan}</TableCell>
              </TableRow>
              <TableRow key={1}>
                <TableCell component="th" scope="row">
                  Harga
                </TableCell>
                <TableCell align="right">{harga}</TableCell>
              </TableRow>
              <TableRow key={1}>
                <TableCell component="th" scope="row">
                  Jumlah
                </TableCell>
                <TableCell align="right">
                <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button onClick={handleDecrement} >-</Button>
                  <Button>{jumlah}</Button>
                  
                  <Button onClick={handleIncrement}>+</Button>
                </ButtonGroup>
                </TableCell>
              </TableRow>
              <TableRow key={1}>
                <TableCell component="th" scope="row">
                  Total
                </TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
           
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" onClick={soaptransaction}>
        Beli
      </Button>
    
      
      <Snackbar open={dialog} autoHideDuration={1000} onClose={handleCloseDialog}>
        <Alert severity="success">
          Pembelian Berhasil
        </Alert>
      </Snackbar>
      <Snackbar open={dialog2} autoHideDuration={1000} onClose={handleCloseDialog2}>
        <Alert severity="error">
          Pembelian Tidak Berhasil
        </Alert>
      </Snackbar>
      
    </div>
  );
}
