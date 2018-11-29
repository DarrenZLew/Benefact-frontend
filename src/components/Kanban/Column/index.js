import React from "react";
import { Card } from "..";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddCard from "./AddCard";
import "./index.scss";

class InnerList extends React.Component {
  render() {
    return this.props.cards.map((card, index) => (
      <Card
        key={card.id}
        card={card}
        index={index}
        updateCardContent={this.props.updateCardContent}
      />
    ));
  }
}

class Column extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.cards === this.props.cards) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <div
            id="column-draggable"
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{ ...provided.draggableProps.style }}
          >
            <h3 {...provided.dragHandleProps}>{this.props.column.title}</h3>
            <Droppable droppableId={this.props.column.id} type="card">
              {(provided, snapshot) => (
                <div
                  id="column-droppable"
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "skyblue"
                      : "inherit"
                  }}
                  {...provided.droppableProps}
                >
                  <InnerList
                    cards={this.props.cards}
                    updateCardContent={this.props.updateCardContent}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddCard
              addNewCard={this.props.addNewCard}
              columnId={this.props.column.id}
              updateCardContent={this.props.updateCardContent}
              cardMap={this.props.cardMap}
            />
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;
