import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(2) },
  first: {
    backgroundColor: "blue !important",
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: 800
  },
  second: {
    backgroundColor: "red  !important",
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: 800
  },
  third: {
    backgroundColor: "yellow  !important",
    fontSize: 16,
    fontWeight: 800
  },
  forth: {
    backgroundColor: "green  !important",
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: 800
  },
  fifth: {
    fontSize: 16
  }
}));
