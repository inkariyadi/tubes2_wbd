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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

export default function DaftarHarga() {
  const classes = useStyles();
  const [bahanList,setBahanList] = useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3005/api/harga").then((response)=>{
      // console.log(response.data);
      setBahanList(response.data);
    //   rows = response.data;
    //   console.log(rows);
    });
  },[]);
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
                  <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button>-</Button>
                    <Button disabled>0</Button>
                    <Button >+</Button>
                  </ButtonGroup>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary">
        Beli
      </Button>
      
    </div>
  );
}
