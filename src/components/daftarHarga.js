// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button,ButtonGroup} from '@material-ui/core';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'bahan', headerName: 'Nama Bahan', width: 130 },
  { field: 'stok', headerName: 'Last name', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${
        params.getValue('lastName') || ''
      }`,
  },
];

const rows = [
  { id:1, bahan: 'Gula', stok: '100', harga:'Rp 100'},
  { id:2, bahan: 'Biji Coklat', stok: '550', harga:'Rp 550'},
  { id:3, bahan: 'Madu', stok: '70', harga:'Rp 70'},
  { id:4, bahan: 'Gula Merah', stok: '210', harga:'Rp 210'}

]
class DaftarHarga extends React.Component{
  
  render(){
    return (

      <div>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
        <Button variant="contained" color="primary">Beli</Button>
      </div>
      
      
    );
  }

  
}

export default DaftarHarga;
