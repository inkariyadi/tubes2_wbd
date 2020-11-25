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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 1),
  createData('Ice cream sandwich', 237, 9.0, 37, 2),
  createData('Eclair', 262, 16.0, 24, 3),
  createData('Cupcake', 305, 3.7, 67, 4),
  createData('Gingerbread', 356, 16.0, 49, 5),
];

export default function BasicTable() {
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
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={handleDecrement}>-</Button>
                    <Button disabled>{counter}</Button>
                    
                    <Button onClick={handleIncrement}>+</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
