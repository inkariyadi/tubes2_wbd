import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'count',
    label: 'Button',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, size,count) {
  const density = population / size;
  return { name, code, population, size, density,count };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263,1),
  createData('China', 'CN', 1403500365, 9596961,2),
  createData('Italy', 'IT', 60483973, 301340,3),
  createData('United States', 'US', 327167434, 9833520,4),
  createData('Canada', 'CA', 37602103, 9984670,5),
  createData('Australia', 'AU', 25475400, 7692024,6),
  createData('Germany', 'DE', 83019200, 357578,7),
  createData('Ireland', 'IE', 4857000, 70273,8),
  createData('Mexico', 'MX', 126577691, 1972550,9),
  createData('Japan', 'JP', 126317000, 377973,10),
  createData('France', 'FR', 67022000, 640679,11),
  createData('United Kingdom', 'GB', 67545757, 242495,12),
  createData('Russia', 'RU', 146793744, 17098246,13),
  createData('Nigeria', 'NG', 200962417, 923768,14),
  createData('Brazil', 'BR', 210147125, 8515767,15),
];

const useStyles = makeStyles({
root1: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height : '100%',
    padding: '0 30px',
    },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function increment(count) {
    return count+1;
  }



export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [counter,setCounter] = React.useState(0);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleIncrement = (event) => {
      setCounter(counter+1);
  }
  const handleDecrement = (event) => {
    setCounter(counter-1);
}

  return (
    <Paper className={classes.root1}>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if(column.id!="count"){
                        return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                    }
                    else{
                        return(
                            <TableCell key={column.id} align={column.align}>
                                {/* <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button>One</Button>
                                    <Button>Two</Button>
                                    <Button>Three</Button>
                                </ButtonGroup> */}
                                <ButtonGroup size="small" aria-label="small outlined button group">
                                    <Button onClick={handleDecrement}>-</Button>
                                    <Button disabled>{column.format(value)}</Button>
                                    <Button onClick={increment(column.format(value))}>+</Button>
                                </ButtonGroup>
                            </TableCell>
                        )
                    }
                    
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}