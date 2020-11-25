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
  const [counter,setCounter] = useState(0);
  const [counter2,setCounter2] = useState([]);

  const handleIncrement = () => {
    setCounter(counter+1);
  };
  const handleDecrement = () => {
    setCounter(counter-1);
  };

  useEffect(()=>{
    // console.log(counter2);
    setCounter2(rows);
    // console.log(rows);
    console.log(counter2);
    console.log(counter2.name);
    },[]);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Bahan</TableCell>
            <TableCell align="right">Stok di pabrik</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.stok}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
