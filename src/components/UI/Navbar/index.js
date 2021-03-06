import React from "react";
import { NavbarList } from "./components";
import "./index.scss";
import { Modal } from "components/UI";

class Navbar extends React.Component {
  state = { modal: null, modalClassName: "" };
  onItemClick = (id, navbarRowId) => {
    const {
      configs: { listConfig = [] }
    } = this.props;
    const configOptions = listConfig[navbarRowId];
    const item = configOptions.length > 0 ? configOptions.find(item => item.id === id) : null;
    if (item && item.onClick) item.onClick();
    else this.setState({ modal: item, modalClassName: item.modalClassName || "" });
  };
  modalClose = () => this.setState({ modal: null, modalClassName: "" });
  render() {
    return (
      <div id="navbar">
        <NavbarList configs={this.props.configs || []} onItemClick={this.onItemClick} />
        {this.state.modal && (
          <Modal
            isOpen
            onClose={this.modalClose}
            modalClassName={this.state.modalClassName}
            title={this.state.modal.componentHeader}
          >
            <this.state.modal.component onClose={this.modalClose} {...this.state.modal.params} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Navbar;
