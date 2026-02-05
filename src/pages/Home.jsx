import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    details: "",
  });
  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(false); // New state for animation

  useEffect(() => {
    // Set loaded to true after the component is mounted
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100); // Delay for fade-in effect
    return () => clearTimeout(timer); // Cleanup
  }, []);

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
      newErrors.title = "Task is required";
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
    if (!validateForm()) {
      return;
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      id: Date.now(),
      title: formData.title.trim(),
      date: formData.date,
      details: formData.details.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setFormData({
      title: "",
      date: "",
      details: "",
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        className={`w-full max-w-2xl transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="bg-[#9f9480] border rounded-3xl p-8 shadow-lg">
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-6 py-4 rounded-2xl border-2 ${
                errors.title
                  ? "border-red-500 bg-white"
                  : "border-white bg-white "
              } focus:outline-none focus:ring-2 focus:ring-[#4A5A7C] text-gray-700 placeholder-pink-400`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm px-2">{errors.title}</p>
            )}

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full px-6 py-4 rounded-2xl border-2 ${
                errors.date
                  ? "border-red-500 bg-white"
                  : "border-white bg-white "
              } focus:outline-none focus:ring-2 focus:ring-[#4A5A7C] text-gray-700`}
            />
            {errors.date && (
              <p className="text-red-600 text-sm px-2">{errors.date}</p>
            )}

            <textarea
              name="details"
              placeholder="Details"
              value={formData.details}
              onChange={handleInputChange}
              rows="4"
              className={`w-full px-6 py-4 rounded-2xl border-2 ${
                errors.details
                  ? "border-red-500 bg-white"
                  : "border-white bg-white "
              } focus:outline-none focus:ring-2 focus:ring-[#4A5A7C] text-gray-700 placeholder-gray-400 resize-none`}
            />
            {errors.details && (
              <p className="text-red-600 text-sm px-2">{errors.details}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="border w-full mt-8 bg-[#436c55] hover:bg-[#4A5A7C] text-white font-semibold py-4 rounded-2xl shadow-lg transition-colors duration-200 border-black "
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Home;
