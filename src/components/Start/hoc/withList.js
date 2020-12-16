import React from "react";
import { connect } from "react-redux";
import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

function isEmptyString(str) {
  if (str.replace(/\s/g, "") == "") {
    return true;
  } else return false;
}

const withList = (WrappedComponent, settings) => {
  const [addItem, removeItem] = settings.update;
  const { type } = settings;

  return connect(mapStateToProps, { addItem, removeItem })((props) => {
    const items = props[type];
    const [text, setText] = React.useState("");
    const [open, setOpen] = React.useState(false);

    function errorMessage(type) {
      switch (type) {
        case "criterias":
          if (isEmptyString(text)) return "Pole nie może być puste";
          else return "Takie kryterium już znajduje się na liście";

        case "variants":
          if (isEmptyString(text)) return "Pole nie może być puste";
          else return "Taki wariant już znajduje się na liście";

        default:
          break;
      }
    }

    const includes = (item, type) =>
      type === "criterias"
        ? props.criterias.includes(item)
        : props.variants.includes(item);

    const onTextChange = (e) => {
      setOpen(false);
      setText(e.target.value);
    };

    const onItemAdd = () => {
      if (includes(text, type) || isEmptyString(text)) {
        setOpen(true);
      } else {
        props.addItem(text);
        setText("");
      }
    };

    const onItemRemove = (removedItem) => {
      setOpen(false);
      props.removeItem(removedItem);
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };

    return (
      <div>
        <WrappedComponent
          {...props}
          items={items}
          onTextChange={onTextChange}
          onItemAdd={onItemAdd}
          onItemRemove={onItemRemove}
          text={text}
        />

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage(type)}
          </Alert>
        </Snackbar>
      </div>
    );
  });
};

const mapStateToProps = (state) => {
  return state;
};

export default withList;
