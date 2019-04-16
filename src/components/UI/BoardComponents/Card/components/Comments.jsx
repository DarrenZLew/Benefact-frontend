import React from "react";
import moment from "moment";
import { UsersConsumer } from "components/Users/UsersContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "react-textarea-autosize";
import "./Comments.scss";
import MarkdownEditor from "components/UI/MarkdownEditor/MarkdownEditor";

class Comments extends React.Component {
  render() {
    const {
      comments = [],
      onUpdateComment,
      onChangeComment,
      editComment = {},
      onFocusEditComment
    } = this.props;
    return (
      <UsersConsumer>
        {users => {
          return (
            <div id="editor-activity-container">
              {comments.map(({ id, text, userId, createdTime, editedTime }) => {
                const userData = users.find(user => user.id === userId) || {name: "", email: ""};
                const userName = userData["name"];
                const userEmail = userData["email"];
                return (
                  <div key={id} className="editor-activity">
                    <div className="editor-activity-header">
                      <div className="editor-activity-header-left">
                        <div className="editor-activity-name">
                          {userName ? (
                            <div>{userName}</div>
                          ) : (
                            <div>{userEmail}</div>
                          )}
                        </div>
                        <div className="editor-activity-time">
                          {editedTime ? (
                            <div>
                              <span>
                                {moment
                                  .unix(editedTime)
                                  .format("MMM D [at] h:mm A z")}
                              </span>
                              <span>(Edited)</span>
                            </div>
                          ) : (
                            moment
                              .unix(createdTime)
                              .format("MMM D [at] h:mm A z")
                          )}
                        </div>
                      </div>
                      <div className="editor-activity-header-right">
                        <FontAwesomeIcon
                          icon={"trash"}
                          size="sm"
                          className="delete"
                          onClick={() => onUpdateComment("delete", id)}
                        />
                      </div>
                    </div>
                    <div className="editor-activity-text-container">
                      <MarkdownEditor
                        value={
                          editComment.id === id ? editComment.message : text
                        }
                        onFocus={() => onFocusEditComment(id, text)}
                        onChange={e => onChangeComment(e, "edit", id)}
                      />
                      {editComment.id === id && (
                        <button
                          className="editor-comments-save edit-comment-save"
                          onMouseDown={() => {
                            onUpdateComment("edit", id);
                          }}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }}
      </UsersConsumer>
    );
  }
}

export default Comments;
