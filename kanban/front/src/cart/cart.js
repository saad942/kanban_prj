import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Left from './left';

const apiUrl = 'http://localhost:3002/api';

function App() {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-info'));

  useEffect(() => {
    if (!user) {
      navigate('/');
      fetchTables();
    }
  }, [user, navigate]);

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tables`);
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const addTable = async () => {
    try {
      const response = await axios.post(`${apiUrl}/tables`);
      setTables([...tables, response.data]);
    } catch (error) {
      console.error('Error adding table:', error);
    }
  };

  const addColumn = async (tableId, title) => {
    try {
      const response = await axios.post(`${apiUrl}/tables/${tableId}/columns`, { title });
      const updatedTables = tables.map((tbl) =>
        tbl.id === tableId ? { ...tbl, columns: [...tbl.columns, response.data] } : tbl
      );
      setTables(updatedTables);
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const addTask = async (tableId, columnId, text) => {
    try {
      const response = await axios.post(`${apiUrl}/tables/${tableId}/tasks`, { columnId, text });
      const updatedTables = tables.map((tbl) =>
        tbl.id === tableId
          ? {
              ...tbl,
              columns: tbl.columns.map((col) =>
                col.id === columnId ? { ...col, tasks: [...col.tasks, response.data] } : col
              ),
            }
          : tbl
      );
      setTables(updatedTables);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const moveTask = async (tableId, taskId, sourceColumnId, newColumnId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/tables/${tableId}/columns/${sourceColumnId}/tasks/${taskId}`,
        { newColumnId }
      );

      const updatedTables = tables.map((tbl) =>
        tbl.id === tableId
          ? {
              ...tbl,
              columns: tbl.columns.map((col) =>
                col.id === newColumnId
                  ? { ...col, tasks: [...col.tasks, response.data] }
                  : col.id === sourceColumnId
                  ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
                  : col
              ),
            }
          : tbl
      );

      setTables(updatedTables);
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const onDragEnd = (result, table) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const taskId = parseInt(draggableId, 10);
    const sourceColumnId = parseInt(source.droppableId, 10);
    const destinationColumnId = parseInt(destination.droppableId, 10);

    if (sourceColumnId === destinationColumnId) {
      const sourceColumn = table.columns.find((col) => col.id === sourceColumnId);
      const [task] = sourceColumn.tasks.splice(source.index, 1);
      sourceColumn.tasks.splice(destination.index, 0, task);
      setTables((prevTables) =>
        prevTables.map((tbl) =>
          tbl.id === table.id ? { ...tbl, columns: [...table.columns] } : tbl
        )
      );
    } else {
      moveTask(table.id, taskId, sourceColumnId, destinationColumnId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/');
  }; 

  return (
    <div>    <Left />
    <div className="container">    

      <button onClick={addTable} className="btn btn-primary">
        Add Table
      </button>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
      {tables.map((table) => (
        <div key={table.id} className="mt-4">
          <h4>Table {table.id}</h4>
          <button onClick={() => addColumn(table.id, prompt('Enter column title:'))} className="btn btn-success">
            Add Column
          </button>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, table)}>
            <div className="row">
              {table.columns.map((column) => (
                <Droppable key={column.id.toString()} droppableId={column.id.toString()}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="col-md-2"
                      key={column.id}
                    >
                      <h6>{column.title}</h6>
                      <div>
                        {column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id.toString()}
                            draggableId={task.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="list-group-item"
                              >
                                {task.text}
                                <button onClick={() => console.log('Clicked')}>Click</button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add a task"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addTask(table.id, column.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="form-control mt-2"
                      />
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      ))}
    </div></div>

  );
}

export default App;
