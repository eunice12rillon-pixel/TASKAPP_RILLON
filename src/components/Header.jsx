import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#8f7862] text-[#47413c] py-7 px-6 shadow-md">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          <img src="/HeaderLogo.png" alt="Logo" className="h-10" />
        </Link>
        <Link
          to="/all-tasks"
          className="text-2xl font-medium hover:text-gray-200 transition-colors"
        >
          All Tasks
        </Link>
      </div>
    </header>
  );
}

export default Header;
