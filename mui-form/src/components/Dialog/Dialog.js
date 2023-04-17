import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "../../layouts";
import ShowUsers from "../ShowUsers/ShowUsers";
import { Link, useNavigate } from "react-router-dom";
import AddUser from "../User";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };
  const userName = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <ButtonGroup variant="contained">
        <Button variant="contained" component={Link} to={"/"}>
          Home
        </Button>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add User
        </Button>
        <Button variant="outlined" component={Link} to={"/all-users"}>
          All Users
        </Button>
      </ButtonGroup>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Log out
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add User Form
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <AddUser />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
