import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#e49245] text-white py-7 px-6 shadow-md">
      <div className=" mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          Task App
        </Link>
        <Link
          to="/all-tasks"
          className="text-sm font-medium hover:text-gray-200 transition-colors"
        >
          All Tasks
        </Link>
      </div>
    </header>
  );
}

export default Header;
