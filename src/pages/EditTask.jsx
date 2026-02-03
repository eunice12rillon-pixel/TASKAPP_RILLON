import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    details: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = tasks.find((t) => t.id === parseInt(id));

    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        date: taskToEdit.date,
        details: taskToEdit.details,
      });
    } else {
      navigate("/all-tasks");
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required ";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const tasks = JSON.parse(localStorage.getItem(`tasks`)) || [];
      const updatedTasks = tasks.map((task) =>
        task.id === parseInt(id)
          ? {
              ...task,
              title: formData.title.trim(),
              date: formData.date,
              details: formData.details.trim(),
              updatedAt: new Date().toISOString(),
            }
          : task,
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      navigate("/all-tasks");
    }
  };

  const handleCancel = () => {
    navigate("/all-tasks");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl py-1 font-bold text-center mb-8 text-[#343d2f]">
          Edit Task
        </h1>

        <div className="bg-[#eda84d] rounded-3xl p-8 shadow-lg">
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title of Task"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-6 py-4 rounded-2xl border ${
                errors.title
                  ? "border-red-500"
                  : "border-[#2b446f] border-dashed bg-white"
              } focus:outline-none focus:ring-2 focus:ring-amber-500  text-gray-950 placeholder-gray-600`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm px-2">{errors.title}</p>
            )}
            {errors.date && (
              <p className="text-red-600 text-sm px-2">{errors.date}</p>
            )}

            <textarea
              name="details"
              placeholder="Details"
              value={formData.details}
              onChange={handleInputChange}
              rows="4"
              className={`w-full px-6 py-4 rounded-2xl border ${
                errors.details
                  ? "border-red-500"
                  : "border-[#2b446f] border-dashed bg-white"
              } focus:outline-none focus:ring-2 focus:ring-amber-600 text-gray-700 placeholder-gray-600 resize-none`}
            />
            {errors.details && (
              <p className="text-red-600 text-sm px-2">{errors.details}</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="flex-1 bg-[#b44959] hover:bg-[#8a3f4b] text-white font-semibold py-4 rounded-2xl shadow-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#76a65a] hover:bg-[#518c11] text-white font-semibold py-4 rounded-2xl shadow-lg transition-colors duration-200"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
