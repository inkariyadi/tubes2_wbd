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
    Axios.get("http://localhost:3006/api/datacoklat").then((response)=>{
      // console.log(response.data);
      setCoklat(response.data);
    //   rows = response.data;
    //   console.log(rows);
    });
  },[]);

  return (
      <div>
        <h1>Data Coklat Pabrik</h1>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Nama Coklat</TableCell>
                <TableCell >Stok Coklat</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {coklat.map((row) => (
                <TableRow key={coklat.id_coklat}>
                <TableCell component="th" scope="row">
                    {row.nama_coklat}
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