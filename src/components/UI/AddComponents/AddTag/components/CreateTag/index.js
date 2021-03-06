import React from "react";
import PropTypes from "prop-types";
import { Colors, Characters } from "./options";
import { Form, Input } from "components/UI/PageComponents";
import DisplayTag from "components/UI/BoardComponents/Tags/DisplayTag";
import { notifyToast } from "utils";
import "./index.scss";

class CreateTag extends React.Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    onAcceptHandler: PropTypes.func,
    updateBoardContent: PropTypes.func,
    tag: PropTypes.object,
    onCancel: PropTypes.func
  };

  onAcceptHandler = form => {
    const { handleUpdate, onAcceptHandler, tag } = this.props;
    if (tag) {
      handleUpdate("tags", "UPDATE", {
        ...form,
        id: tag.id
      });
    } else {
      handleUpdate("tags", "ADD", {
        name: form.name,
        color: form.color === "" ? null : form.color,
        character: form.character === "" ? null : form.character
      });
    }
    notifyToast("success", `${tag ? "Updated" : "Created new"} tag`, { autoClose: 2000 });
    if (onAcceptHandler) {
      onAcceptHandler();
    }
  };

  render() {
    const { tag, onCancel } = this.props;
    return (
      <div className="create-tag">
        <Form
          ref={this.formRef}
          defaults={tag}
          onlyChanged={Boolean(tag)}
          submitBtnTitle={Boolean(tag) ? "Update" : "Add"}
          cancelBtnTitle={Boolean(tag) && "Reset"}
          onSubmit={this.onAcceptHandler}
          onCancel={onCancel}
        >
          {({ attach, value }) => {
            return (
              <div className="section create-tag-inputs">
                <div className="input-container">
                  <label>Preview Tag</label>
                  <DisplayTag className="lg" tag={value} />
                </div>
                <Input id="name" {...attach("name")} label="Tag Name" />
                <Colors id="color" {...attach("color")} label="Tag Color" />
                <Characters id="char" {...attach("character")} label="Tag Symbol" />
              </div>
            );
          }}
        </Form>
      </div>
    );
  }
}

export default CreateTag;
