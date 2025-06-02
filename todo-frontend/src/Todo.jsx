import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]); // Make sure it's an array
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then((res) => res.json())
            .then((data) => setTodos(data || [])) // default to empty array
            .catch((err) => console.error('Fetch todos failed:', err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            setMessage('Please fill in both fields.');
            return;
        }

        if (editId) {
            fetch(`http://localhost:5000/todos/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            })
                .then((res) => res.json())
                .then((updatedTodo) => {
                    setTodos((prev) =>
                        prev.map((todo) =>
                            todo._id === editId ? updatedTodo : todo
                        )
                    );
                    resetForm();
                    setMessage('Todo updated successfully!');
                })
                .catch((err) => console.error('Update failed:', err));
        } else {
            fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            })
                .then((res) => res.json())
                .then((newTodo) => {
                    setTodos((prev) => [...prev, newTodo]);
                    resetForm();
                    setMessage('Todo added successfully!');
                })
                .catch((err) => console.error('Add failed:', err));
        }
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' })
            .then(() => {
                setTodos((prev) => prev.filter((todo) => todo._id !== id));
                setMessage('Todo deleted!');
            })
            .catch((err) => console.error('Delete failed:', err));
    };

    const handleEdit = (todo) => {
        setTitle(todo.title);
        setDescription(todo.description);
        setEditId(todo._id);
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setEditId(null);
    };

    // ✅ Moved this safely AFTER todos is defined
    const filteredTodos = todos?.filter((todo) =>
        todo?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="row p-3 bg-success text-light">
                <h1 className="text-center">ToDo Project with MERN stack</h1>
            </div>

            <div className="row mt-4 px-2">
                <h3>{editId ? 'Edit Todo' : 'Add Todo'}</h3>
                {message && <p className="text-info">{message}</p>}
                <form className="form-group d-flex gap-2" onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        placeholder="Enter title..."
                        required
                    />
                    <input
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        type="text"
                        placeholder="Enter description..."
                        required
                    />
                    <button className="btn btn-dark" type="submit">
                        {editId ? 'Update' : 'Add'}
                    </button>
                    {editId && (
                        <button className="btn btn-secondary" onClick={resetForm} type="button">
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <div className="row mt-4 px-2">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search todos by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <h4>Your Todos</h4>
                {filteredTodos?.length === 0 ? (
                    <p>No matching todos found.</p>
                ) : (
                    <ul className="list-group">
                        {filteredTodos.map((todo) => (
                            <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{todo.title}:</strong> {todo.description}
                                </div>
                                <div className="btn-group">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleEdit(todo)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Todo;
