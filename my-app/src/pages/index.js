import "react-notifications-component/dist/theme.css";

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import ReactNotification from "react-notifications-component";
import Routing from "../Routing";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";

const Layout = ({ dispatch, TOKEN, ERROR }) => {
  const snackbarHandleClose = () => {
    dispatch({ type: "HIDE_ERROR" });
  };

  const renderSnackbarMessage = () => {
    return <span id="message-id">{ERROR.message}</span>;
  };

  return (
    <div id="layout">
      {/* Notifivation */}
      <ReactNotification />

      {/* TOKEN change replace Routing DOM */}
      <Routing key={TOKEN} />

      {/* SNACKBAR */}
      <Snackbar
        id="snackbar"
        key={new Date(Date.now())}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={ERROR.show}
        onClose={snackbarHandleClose}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={renderSnackbarMessage()}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={snackbarHandleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        style={{ top: 10 }}
      />
    </div>
  );
};

const mapStateToProps = ({ ERROR, TOKEN }) => ({ ERROR, TOKEN });

export default connect(mapStateToProps)(Layout);
