import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = tasks.find((t) => t.id === parseInt(id));

    if (foundTask) {
      setTask(foundTask);
    } else {
      navigate("/all-tasks");
    }
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/all-tasks"
        className="inline-flex items-center text-[#4A5A7C] hover:text-[#5D6D8E] mb-6 font-medium"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to All Tasks
      </Link>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {task.title}
      </h1>

      <div className="bg-[#F5C56A] rounded-3xl p-8 shadow-lg">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Details</h2>
            <span className="text-sm text-gray-600">
              Due: {formatDate(task.date)}
            </span>
          </div>

          <div className="text-gray-600 whitespace-pre-wrap leading-relaxed">
            {task.details}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
