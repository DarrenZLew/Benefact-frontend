import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./index.scss";

const NavbarList = props => {
  const { configs, onItemClick, currItem } = props;

  return (
    <div className="navbar-list">
      {configs.map(ulItem => {
        const { ulClassName, options = [] } = ulItem;
        return (
          <ul key={ulItem.id} className={ulClassName}>
            {options.map(item => {
              const { id, icon, image, title, liClassName = "", url } = item;
              if (url)
                return (
                  <Link to={url} key={id}>
                    <li
                      key={id}
                      className={`${liClassName}${
                        currItem === id ? "active-li" : ""
                      }`}
                    >
                      {icon && (
                        <FontAwesomeIcon icon={icon} size="lg" color="black" />
                      )}
                    </li>
                  </Link>
                );
              return (
                <li
                  key={id}
                  className={`${liClassName}${
                    currItem === id ? "active-li" : ""
                  }`}
                  onClick={e => {
                    if (liClassName !== "brand" && !url)
                      onItemClick(id, ulItem.id);
                  }}
                >
                  {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                  {title ? <span>{title}</span> : null}
                  {image && (
                    <img src={image} alt={image} width="45" height="45" />
                  )}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

NavbarList.propTypes = {
  configs: PropTypes.array,
  onItemClick: PropTypes.func,
  currItem: PropTypes.string
};

export default NavbarList;