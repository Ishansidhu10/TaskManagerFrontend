import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface Task {
    id: number;
    task_name: string;
    description: string;
}

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskDescription, setCurrentDescription] = useState("");
    const [isReadModalOpen, setIsReadModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [newTask, setNewTask] = useState<Pick<Task, 'task_name' | 'description'>>({ task_name: "", description: "" });

    const GetAllTasks = async () => {
        const tempAllTasks: Task[] = [];
        try {
            const response = await fetch("http://localhost:5000/tasks");
            const json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tempAllTasks.push({
                    id: json[i].id,
                    task_name: json[i].task_name,
                    description: json[i].description,
                });
            }
            setTasks(tempAllTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRead = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`);
            const json = await response.json();
            if (response.status === 200) {
                setCurrentDescription(json.description);
                setIsReadModalOpen(true); // Open the modal
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateTask = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
            if (response.status === 201) {
                const createdTask = await response.json();
                setTasks([...tasks, createdTask]);
                setIsCreateModalOpen(false);
                setNewTask({ task_name: "", description: "" });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTask = async () => {
        if (!currentTask) return;

        try {
            const response = await fetch(`http://localhost:5000/tasks/${currentTask.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(currentTask),
            });
            if (response.status === 200) {
                const updatedTask = await response.json();
                setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
                setIsUpdateModalOpen(false);
                setCurrentTask(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "DELETE",
            });
            if (response.status === 200) {
                setTasks(tasks.filter(task => task.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        GetAllTasks();
    }, []);

    return (
        <div className="p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <div className="mb-4">
                <button
                    className="p-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Create Task
                </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="mb-2">
                        <div className="p-2 border border-gray-300 rounded mr-2">
                            <strong className='text-black'>{task.task_name}</strong>
                            <button
                                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleRead(task.id)}
                            >
                                Read
                            </button>
                            <button
                                className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                onClick={() => {
                                    setCurrentTask(task);
                                    setIsUpdateModalOpen(true);
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isReadModalOpen && (
                <Modal onClose={() => setIsReadModalOpen(false)}>
                    <div>
                        <p className="text-black">{taskDescription}</p>
                    </div>
                </Modal>
            )}
            {isCreateModalOpen && (
                <Modal onClose={() => setIsCreateModalOpen(false)}>
                    <div>
                        <h2 className="text-black text-xl mb-4">Create Task</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-4 w-full"
                            placeholder="Task Name"
                            value={newTask.task_name}
                            onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
                        />
                        <textarea
                            className="border border-gray-300 p-2 mb-4 w-full"
                            placeholder="Task Description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={handleCreateTask}
                        >
                            Submit
                        </button>
                    </div>
                </Modal>
            )}
            {isUpdateModalOpen && currentTask && (
                <Modal onClose={() => setIsUpdateModalOpen(false)}>
                    <div>
                        <h2 className="text-black text-xl mb-4">Update Task</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-4 w-full"
                            placeholder="Task Name"
                            value={currentTask.task_name}
                            onChange={(e) => setCurrentTask({ ...currentTask, task_name: e.target.value })}
                        />
                        <textarea
                            className="border border-gray-300 p-2 mb-4 w-full"
                            placeholder="Task Description"
                            value={currentTask.description}
                            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                        />
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={handleUpdateTask}
                        >
                            Submit
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <div className="text-black">{children}</div>
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
};

export default TasksPage;
