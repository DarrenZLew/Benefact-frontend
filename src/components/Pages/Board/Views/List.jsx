import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Card } from "../../../UI/BoardComponents";
import { TagsProvider } from "../../../UI/BoardComponents/Tags/TagsContext";
import "./List.scss";

const InnerList = props => {
  const { cards, ...rest } = props;
  return cards.map((card, index) => (
    <Card key={card.id} card={card} index={index} {...rest} />
  ));
};

InnerList.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  updateBoardContent: PropTypes.func,
  deleteComponent: PropTypes.func
};

const List = props => {
  const {
    cards,
    columns,
    tags,
    updateBoardContent,
    deleteComponent,
    listOnDragEnd,
    groupName
  } = props;
  return (
    <div id="list-board">
      <DragDropContext
        onDragEnd={res => listOnDragEnd(res, groupName)}
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
      >
        <Droppable droppableId={"column-droppable"} type="card">
          {(provided, snapshot) => (
            <TagsProvider value={tags}>
              <div
                id="column-droppable"
                ref={provided.innerRef}
                className={
                  snapshot.isDraggingOver ? "list-col-is-dragging" : ""
                }
                // style={{
                //   backgroundColor: snapshot.isDraggingOver
                //     ? "skyblue"
                //     : "inherit"
                // }}
                {...provided.droppableProps}
              >
                <InnerList
                  cards={cards}
                  columns={columns}
                  updateBoardContent={updateBoardContent}
                  deleteComponent={deleteComponent}
                />
                {provided.placeholder}
              </div>
            </TagsProvider>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

List.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  tags: PropTypes.array,
  updateBoardContent: PropTypes.func,
  deleteComponent: PropTypes.func,
  listOnDragEnd: PropTypes.func,
  groupName: PropTypes.string
};

export default List;