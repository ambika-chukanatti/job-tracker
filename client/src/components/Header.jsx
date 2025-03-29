import { Link,useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/");
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center px-12">
      <h1 className="text-2xl font-bold text-blue-500">
        <Link to="/dashboard">JobTracker</Link>
      </h1>
      <nav className="flex space-x-10">
        <Link to="/companies" className="text-gray-700 hover:text-blue-600 transition">
          Companies
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">
          Profile
        </Link>
        <button onClick={handleLogout} className="text-gray-700 cursor-pointer hover:text-blue-600 transition">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
