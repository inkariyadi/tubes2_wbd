import { makeStyles } from "@material-ui/core/styles";
import CollapsibleTable from './components/collapsibleTable';
import Grid from '@material-ui/core/Grid';
// import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  
function DataCoklatResep() {
  return (
    // <div style={{ padding: 40, backgroundColor:"black"}}>
    <div style={{ padding: 40, backgroundColor:"black"}}>
      <h1 style={{ color: 'pink' }}>Coklat yang tersedia</h1>
      <Grid container>
        <CollapsibleTable/>
      </Grid>
    </div>
    
  );
}

export default DataCoklatResep;
