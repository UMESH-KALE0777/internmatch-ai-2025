import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-18 h-18 bg-secondary rounded-full"></div>
      </div>
      <div className="text-center z-10 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-tight">
          InternMatch AI
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
          Your Digital Internship Mentor
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered recommendations for your career journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Link to="/input">
            <button className="bg-primary text-white px-10 py-4 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              🚀 Find My Internship
            </button>
          </Link>
          <button className="bg-white text-primary border-2 border-primary px-10 py-4 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300">
            Learn More
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Personalized Matches</h3>
            <p className="text-gray-600">AI-powered recommendations based on your profile.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Career Insights</h3>
            <p className="text-gray-600">Understand skill gaps and career paths.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
            <p className="text-gray-600">Optimized for seamless mobile experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
