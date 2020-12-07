import React from "react";
import { connect } from "react-redux";

const withList = (WrappedComponent, settings) => {
  const [addItem, removeItem] = settings.update;
  const { type } = settings;

  return connect(mapStateToProps, { addItem, removeItem })((props) => {
    const items = props[type];

    const [text, setText] = React.useState("");

    const onTextChange = (e) => {
      setText(e.target.value);
    };

    const onItemAdd = () => {
      props.addItem(text);
      setText("");
    };

    const onItemRemove = (removedItem) => {
      props.removeItem(removedItem);
    };

    return (
      <WrappedComponent
        {...props}
        items={items}
        onTextChange={onTextChange}
        onItemAdd={onItemAdd}
        onItemRemove={onItemRemove}
        text={text}
      />
    );
  });
};

const mapStateToProps = (state) => {
  return state;
};

export default withList;
