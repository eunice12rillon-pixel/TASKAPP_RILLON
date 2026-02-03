import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className=" mt-7 text-3xl font-bold text-center mb-8 text-[#ac521e]">
        <br />
        Task List
      </h1>
      <br />

      {tasks.length === 0 ? (
        <div className="bg-[#F5C56A] rounded-3xl p-12 text-center shadow-lg">
          <p className="text-gray-600 text-lg mb-4">No tasks yet!</p>
          <Link
            to="/"
            className="inline-block bg-[#5D6D8E] hover:bg-[#4A5A7C] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Add Your First Task
          </Link>
        </div>
      ) : (
        <div className="bg-[#F5C56A] rounded-3xl p-6 shadow-lg space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <Link to={`/task/${task.id}`} className="flex-1 cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h3>
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Due: {formatDate(task.date)}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit task"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTasks;
