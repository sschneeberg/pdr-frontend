/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import REACT_APP_SERVER_URL from '../../keys';
import Chat from '../Chat/ChatBubble';
import { Link } from 'react-router-dom';

function DevHome(props) {
    const columnsFromBackend = {
        [1]: {
            name: 'Assigned Bugs',
            items: []
        },
        [2]: {
            name: 'In Review',
            items: []
        },
        [3]: {
            name: 'Complete',
            items: []
        }
    };
    const [columns, setColumns] = useState(columnsFromBackend);
    const [bugMap, setBugMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    // Route to update status of ticket
    const updateTicket = (id, status) => {
        let socket = props.socket;
        if (status === '3') {
            socket.emit('statusUpdated', {
                ticket: bugMap[id]
            });
        }
        setLoading(true)
        axios.put(`${REACT_APP_SERVER_URL}/api/tickets/${id}`, { status })
        .then(response => {
            if (response.data.msg === "updated") {
                console.log(response.data.msg)
                setLoading(false)
            } else {
                setError(true)
                setLoading(false) 
            }
        })   
        .catch((e) => {
            console.log(e);
        });
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
            updateTicket(source.index, destination.droppableId);
        } else {
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
        }
    };

    const displaybugs = (bugs) => {
        const updatedColumns = { ...columns };
        bugs.forEach((bug) => {
            if (bug.status === 1) {
                updatedColumns['1'].items.push(bug);
            } else if (bug.status === 2) {
                updatedColumns['2'].items.push(bug);
            } else {
                updatedColumns['3'].items.push(bug);
            }
        });
        setColumns(updatedColumns);
    };

    const getBugs = () => {
        setLoading(true)
        axios
            .get(`${REACT_APP_SERVER_URL}/api/dashboard`)
            .then((response) => {
                if (response.data.msg) {
                    setLoading(false)
                    setError(true)
                } else {
                    const data = response.data.tickets;
                displaybugs(data);
                mapBugs(data);
                setLoading(false)
                }
                
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const mapBugs = (bugs) => {
        let map = {};
        bugs.forEach((bug) => {
            map[bug._id] = { id: bug._id, title: bug.title, user: bug.createdBy };
        });
        setBugMap(map);
    };

    useEffect(() => {
        getBugs();
        return function cleanup() {
            setColumns(columnsFromBackend);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="return-container">
            {error ? (
                            <p>
                                An error occurred, please reload the page to try again. Contact us if the problem
                                persists.
                            </p>
                        ): null}
            {loading ? <p>Loading...</p> : null}
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div id="name" key={id}>
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
                                                    minHeight: 550,
                                                    maxHeight: 550,
                                                    overflow: 'scroll'
                                                }}>
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={index} draggableId={item._id} index={item._id}>
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
                                                                            textAlign: 'center',
                                                                            ...provided.draggableProps.style
                                                                        }}>
                                                                        <Link
                                                                            style={{ color: 'white' }}
                                                                            to={{
                                                                                pathname: `/bugdetails/${item._id}`,
                                                                                state: item
                                                                            }}>
                                                                            {item.title}
                                                                            <br></br>
                                                                            {item.product}
                                                                            <br></br>
                                                                            Priority: {item.priority}
                                                                        </Link>
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
            <div id="account-info">
                <Link className="btn btn-primary float-left" to="/profile">
                    Account Information
                </Link>
                <Chat user={props.user} socket={props.socket} setSocket={props.setSocket} />
            </div>
        </div>
    );
}

export default DevHome;
