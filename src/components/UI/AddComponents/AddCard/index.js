import React from "react";
import PropTypes from "prop-types";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";

const AddCard = props => {
  const { handleUpdate, ...rest } = props;
  return (
    <CardEditor
      {...rest}
      disableComponents
      updateBoardContent={({ title, description, tagIds, columnId, assigneeId }) =>
        handleUpdate("cards", "ADD", {
          title: title || "",
          description: description || "",
          tagIds: tagIds || [],
          columnId: columnId || props.columns[0].id,
          assigneeId: assigneeId || 0
        })
      }
    />
  );
};

AddCard.propTypes = {
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  handleUpdate: PropTypes.func,
  columns: PropTypes.array,
  columnId: PropTypes.number,
  onAcceptHandler: PropTypes.func,
  onClose: PropTypes.func,
  disableComponents: PropTypes.bool
};

export default AddCard;
