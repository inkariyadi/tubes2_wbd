import React,{useState, useEffect} from 'react';
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
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import XMLParser from 'react-xml-parser';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"    }
  }
});

function createData(name, isApproved) {
  return {
    name,
    isApproved,
    resep: [
      { bahan: "Dark Chocolate", amount: 10 },
      { bahan: "Milk Chocolate", amount: 4 },
      { bahan: "coki coki", amount: 6 },
      { bahan: "chocoroco", amount: 1 }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >
          {row.name}
        </TableCell>
        <TableCell>{(row.isApproved)? "Approved" : "Not Approved"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderColor:"black"}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={5}>
              <Typography variant="h6" gutterBottom component="div">
                Pesanan (29 Februari 2018)
              </Typography>
              <Typography variant="h7" gutterBottom component="div">
                {row.isApproved? "\nApproved at 30 Februari 2018" : ""}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Nama Coklat</b></TableCell>
                    <TableCell><b>Jumlah</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.resep.map((historyRow) => (
                    <TableRow key={historyRow.bahan}>
                      <TableCell >
                        {historyRow.bahan}
                      </TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
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

const rows = [
  createData("Toko Coklat", false),
  createData("Willy Wangky child", false),
  createData("Coklat Mania", false),
  createData("Coklat CC", true)
];

export default function Pesanan() {
  const [pesanan,setPesanan] = useState([]);
  useEffect(()=>{
    soapGetAddStock();
  
    // Axios.get("http://localhost:3007/api/saldo").then((response)=>{
    //   setPesananList(response.data);
    //   console.log(response.data);
    // });
  },[]);
  const soapGetAddStock =() =>{
   
    const config = {headers:{'Content-Type':'text/xml;charset=utf-8'}};
    const body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cod="http://codejava.net/">' + 
                      '<soapenv:Header/>' + 
                      '<soapenv:Body>' + 
                        '<cod:getAddStockDatabase/>' + 
                      '</soapenv:Body>' + 
                  '</soapenv:Envelope>';
    Axios.post("http://localhost:8080/wwfactory/ws/factory?wsdl",body,config)
    .then(res=>res.data)
    .then(data=> new XMLParser().parseFromString(data))
    .then(xml=>{
        
        var saldo = xml.getElementsByTagName('return');
        var hasil = saldo[0].value;
        var hasil_parse = JSON.parse(hasil);
        console.log(hasil_parse);
        setPesanan(hasil_parse);
        console.log(pesanan);
        // setSaldo(saldo[0].value);
    })
    ;
  }
  
  return (
    <div>
      <h1>Daftar Pesanan</h1>
      <TableContainer component={Paper} style={{backgroundColor:"pink"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{borderColor:"black"}}>ID Coklat</TableCell>
            
            <TableCell style={{borderColor:"black"}}>Jumlah</TableCell>
            <TableCell style={{borderColor:"black"}}>Status</TableCell>
            <TableCell style={{borderColor:"black"}}/>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {ini punya jundu} */}
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
          {/* {ini punya inka} */}
          {pesanan.map((row) => (
              <TableRow key={row.id_coklat}>
                <TableCell component="th" scope="row">
                  {row.id_coklat}
                </TableCell>
                <TableCell align="left">{row.jumlah}</TableCell>
                <TableCell align="left">{row.pending=="1"? "Pending" : "Delivered"}</TableCell>
                <TableCell align="left">
                <IconButton
                  aria-label="expand row"
                  size="small"
                >
                  {row.pending=="1" ? <Button variant="contained" color="secondary" onClick={()=>{Axios.get("http://localhost:3007/api/deliverstok",{
      params: {
        id_addstock : row.id_addstock,
      }
    }).then((response)=>{
      console.log("berhasil approve");
      window.location.reload(false);
      
      
    });
  }}>Approve</Button>: <Button variant="contained" color="secondary" disabled>Approved</Button>}
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
    
  );
}
