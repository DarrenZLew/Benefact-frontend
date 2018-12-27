import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const SelectTag = props => {
  const { tagsList, onChangeHandler, cardTags, handleOptionSelect } = props;
  return (
    <div id="select-tag">
      <ul className="tags-ul">
        {tagsList.map((tag, index) => (
          <li key={index}>
            <div
              style={{
                backgroundColor: tag.color ? tag.color : "#DDDDDD"
              }}
              className="tags-li-container"
              onClick={() => onChangeHandler(tag.id, "tag")}
            >
              <div className="tags-label">
                {tag.character ? (
                  <FontAwesomeIcon
                    icon={tag.character}
                    size="sm"
                    color="#000"
                  />
                ) : (
                  tag.name
                )}
              </div>
              {cardTags.find(cardTag => cardTag.id === tag.id) && (
                <FontAwesomeIcon icon="check" size="sm" />
              )}
            </div>
            <div
              className="tags-edit-label"
              onClick={() => {
                handleOptionSelect("create", tag);
              }}
            >
              <FontAwesomeIcon icon="edit" size="sm" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectTag;