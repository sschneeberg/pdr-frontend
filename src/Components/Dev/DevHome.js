import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Chat from '../Chat/Chat';

import GetNewBugs from './GetNewBugs';

const itemsFromBackend = [
    { id: uuid(), content: 'First Bug' },
    { id: uuid(), content: 'Second Bug' }
];

const columnsFromBackend = {
    [uuid()]: {
        name: 'Assigned Bugs',
        items: itemsFromBackend
    },
    [uuid()]: {
        name: 'In Review',
        items: []
    }
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
    } else {
    }
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
        ...columns,
        [source.droppableId]: {
            ...column,
            items: copiedItems
        }
    });
};

function DevHome(props) {
    const [columns, setColumns] = useState(columnsFromBackend);
    const [user, setUser] = useState(props.user);

    return (
        <>
            <div id="return-container">
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <div id="name">
                                <h2>{column.name}</h2>
                                <div style={{ margin: 8 }}>
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 500
                                                    }}>
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                padding: 16,
                                                                                margin: '0 0 8px 0',
                                                                                minHeight: '50px',
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? '#263B4A'
                                                                                    : '#456C86',
                                                                                color: 'white',
                                                                                ...provided.draggableProps.style
                                                                            }}>
                                                                            {item.content}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
            <Chat user={user} socket={props.socket} />
        </>
    );
}

export default DevHome;
