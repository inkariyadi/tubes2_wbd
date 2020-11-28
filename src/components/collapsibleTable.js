import React from "react";
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"    }
  }
});

function createData(name, stok) {
  return {
    name,
    stok,
    resep: [
      { bahan: "Bubuk coklat", amount: 10 },
      { bahan: "Gula Merah", amount: 4 },
      { bahan: "Vanili", amount: 6 },
      { bahan: "pewarna", amount: 1 }
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
        
        <TableCell >
          {row.name}
        </TableCell>
        <TableCell>{row.stok}</TableCell>
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
                  {row.resep.map((historyRow) => (
                    <TableRow key={historyRow.bahan}>
                      <TableCell >
                        {historyRow.bahan}
                      </TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData("Dark Chocolate", 159),
  createData("Milk Chocolate", 237),
  createData("chocoroco", 262),
  createData("la vie en rose", 305),
  createData("coki coki coklat asli", 356),
  createData("bertabur mede gurih", 10),
  createData("coklat ke sekian", 39),
  createData("soes coklat", 87),
  createData("coklat 3", 100),
  createData("coklat enak", 2)
];

export default function CollapsibleTable() {
  return (
    <div>
      <h1>Daftar Coklat & Resep</h1>
      <TableContainer component={Paper} style={{backgroundColor:"pink"}}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{borderColor:"black"}}>Nama Coklat</TableCell>
              <TableCell style={{borderColor:"black"}}>Jumlah Stok</TableCell>
              <TableCell style={{borderColor:"black"}}/>
              
              {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
  );
}
