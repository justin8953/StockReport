import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
export const useStyles = makeStyles({
  root: {
    paddingTop: 20
  },
  grid: {
    marginBottom: 10
  }
});

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 16,
    fontWeight: 800
  }
}))(TableCell);
