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
  return (
    <TableContainer component={Paper} style={{backgroundColor:"pink"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{borderColor:"black"}}/>
            <TableCell style={{borderColor:"black"}}>Nama Pemesan</TableCell>
            <TableCell style={{borderColor:"black"}}/>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
