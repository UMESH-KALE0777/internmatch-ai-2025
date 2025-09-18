import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              InternMatch
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/input" className="text-gray-700 hover:text-primary">
              Input
            </Link>
            <Link to="/recommendations" className="text-gray-700 hover:text-primary">
              Recommendations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
