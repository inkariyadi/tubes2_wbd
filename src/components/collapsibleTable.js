import React, {useState, useEffect} from "react";
import ListItem from '@material-ui/core/ListItem';
import Axios from 'axios';
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [resep,setResep] = useState([]);
  const classes = useRowStyles();
  let id = row.id_coklat;
  // console.log(id);
  let api = "http://localhost:3006/api/resep/" ;
  // console.log(api);
  let newapi = api.concat(id);
  // let params = api.bind(id);
  useEffect(()=>{
    Axios.get(newapi).then((response)=>{
      // console.log(response.data);
      setResep(response.data);
    //   rows = response.data;
    //   console.log(rows);
    });
  },[]);

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
        <TableCell >
          {row.nama_coklat}
        </TableCell>
        <TableCell>{row.stok}</TableCell>
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
                  {resep.map((historyRow) => (
                    <TableRow key={historyRow.bahan}>
                      <TableCell >
                        {historyRow.nama_bahan}
                      </TableCell>
                      <TableCell>{historyRow.jumlah}</TableCell>
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

export default function CollapsibleTable() {
  const [coklat,setcoklat] = useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3006/api/coklatresep").then((response)=>{
      // console.log(response.data);
      setcoklat(response.data);
    //   rows = response.data;
    //   console.log(rows);
    });
  },[]);

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
