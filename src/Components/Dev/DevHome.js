/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Chat from '../Chat/ChatBubble';
import { Link, Redirect } from 'react-router-dom';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { devDashHelp } from '../User/HelpText';

// Columns
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
    const [error, setError] = useState(false);
    const [user, setUser] = useState(props.user);
    const [redirect, setRedirect] = useState(false);
    const [assigned, setAssigned] = useState('');

    // Route to update status of ticket on the backend
    const updateTicket = (id, status) => {
        let socket = props.socket;
        if (status === '3') {
            socket.emit('statusUpdated', {
                ticket: bugMap[id]
            });
        }
        setLoading(true);
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/tickets/${id}`, { status })
            .then((response) => {
                if (response.data.msg === 'updated') {
                    setLoading(false);
                    setError(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            })
            .catch((e) => {
                setError(true);
                setLoading(false);
            });
    };

    // Function to move tickets from one column to the next (re-orders all items)
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

    // Displaying bugs in columns based on the status
    const displaybugs = (bugs) => {
        const updatedColumns = { ...columns };
        if (bugs.length === 0) {
            setAssigned('Nothing currently assigned');
        } else {
            setAssigned('');
        }
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

    // Getting all bugs assigned to dev
    const getBugs = () => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/dashboard`)
            .then((response) => {
                if (response.data.msg) {
                    setLoading(false);
                    setError(true);
                    console.log("ERROR")
                } else {
                    const data = response.data.tickets;
                    displaybugs(data);
                    mapBugs(data);
                    setLoading(false);
                    setError(false)
                }
            })
            .catch((e) => {
                setError(true);
                setLoading(false);
            });
    };

    // Displaying contents of bugs
    const mapBugs = (bugs) => {
        let map = {};
        bugs.forEach((bug) => {
            map[bug._id] = { id: bug._id, title: bug.title, user: bug.createdBy };
        });
        setBugMap(map);
    };

    useEffect(() => {
        if (!user) setRedirect(true);
        getBugs();
        return function cleanup() {
            setColumns(columnsFromBackend);
        };
    }, []);

    return (
        <>
            <div id="return-container">
                {redirect ? <Redirect to="/" /> : null}
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <div id="name" key={id}>
                                <h2>{column.name}</h2>
                                <div style={{ margin: 8 }}>
                                    {/* Area that can be dropped into */}
                                    <Droppable droppableId={id} key={id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="kanban"
                                                    style={{
                                                        background: snapshot.isDraggingOver ? '#FADA9E' : '#E2E2E2',
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 550,
                                                        maxHeight: 550,
                                                        overflow: 'scroll',
                                                        borderRadius: 5
                                                    }}>
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            // What is being dragged around
                                                            <Draggable
                                                                key={index}
                                                                draggableId={item._id}
                                                                index={item._id}>
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
                                                                                borderRadius: 5,
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? '#6aa3b4'
                                                                                    : '#6aa3b4',
                                                                                textAlign: 'center',
                                                                                ...provided.draggableProps.style
                                                                            }}>
                                                                            {/* Link to bug details page */}
                                                                            <Link
                                                                                style={{
                                                                                    color: 'white',
                                                                                    fontFamily: 'Helvetica'
                                                                                }}
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
                <div className="float-left" >
                <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay={
                        <Popover>
                            <Popover.Title as="h3">Dashboard Help</Popover.Title>
                            <Popover.Content>{devDashHelp}</Popover.Content>
                        </Popover>
                    }>
                    <Button variant="outline-secondary" style={{ borderRadius: '60%' }}>
                        ?
                    </Button>
                </OverlayTrigger>
            </div>
                <div id="account-info">
                    {user.permissions === 'dev' ? (
                        <Link className="btn" id="acct-info" to="/profile">
                            Account Information
                        </Link>
                    ) : null}
                    <Chat user={props.user} socket={props.socket} setSocket={props.setSocket} />
                </div>
            </div>
            {error ? (
                <p style={{ color: 'red' }}>
                    An error occurred, please reload the page and try again. Contact us if the problem persists.
                </p>
            ) : null}
            {loading ? <p>Loading...</p> : null}
            <h5 style={{ margin: '10px' }}>{assigned}</h5>
        </>
    );
}

export default DevHome;
