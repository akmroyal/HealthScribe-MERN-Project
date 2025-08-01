import { useState, useRef, useEffect } from 'react';
import Navbar from '../../component/shared/Navbar';
import Sidebar from '../../component/Sidebar';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  // Collapse sidebar when clicking outside
  useEffect(() => {
    if (sidebarCollapsed) return;
    function handleClick(e) {
      
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        
        setSidebarCollapsed(true);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [sidebarCollapsed]);

  // Doctor profile info for sidebar
  const doctor = {
    name: 'Dr. Aman Tiwari',
    photo: '/doctor-profile.jpg', // Place this image in your public folder or use a real URL
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400  text-gray-900">
      <Navbar />
      <div className="flex flex-1 overflow-hidden mt-4 backdrop-blur-xl">
        {/* Collapsible Sidebar */}
        <div
          ref={sidebarRef}
          className={`relative transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} h-full flex flex-col`}
          style={{ cursor: sidebarCollapsed ? 'pointer' : 'default' }}
          onClick={e => {
            if (sidebarCollapsed) {
              setSidebarCollapsed(false);
            } else {
              // Prevent click from bubbling to document when expanded
              e.stopPropagation();
            }
          }}
        >
          <Sidebar collapsed={sidebarCollapsed} doctor={doctor} />
        </div>
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8 ">
          <div className="space-y-8">
            {/* Start Recording Button - Top Right */}
            <div className="flex justify-end mb-2">
              <button className="bg-teal-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-teal-800 transition-colors duration-200 flex items-center space-x-2">
                <span className="text-2xl">➕</span>
                <span className="text-lg">Start new recording</span>
              </button>
            </div>

            {/* Quick Stats Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Today's Recordings Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-500 font-medium">Today's recordings</h3>
                    <p className="text-3xl font-bold text-teal-700 mt-1">15</p>
                  </div>
                  <span className="text-4xl text-teal-400">📝</span>
                </div>
                {/* Total Patients Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-500 font-medium">Total patients</h3>
                    <p className="text-3xl font-bold text-teal-700 mt-1">2,420</p>
                  </div>
                  <span className="text-4xl text-teal-400">👥</span>
                </div>
                {/* Time Saved Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-500 font-medium">Time saved</h3>
                    <p className="text-3xl font-bold text-teal-700 mt-1">8h 30m</p>
                  </div>
                  <span className="text-4xl text-teal-400">⏱️</span>
                </div>
              </div>
            </section>

            {/* Recent Activity Section */}
            <section>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Latest SOAP notes and recordings</h3>
                <ul className="space-y-4">
                  {/* Sample Activity Item */}
                  <li className="flex items-center space-x-4 p-4 border-b last:border-b-0">
                    <span className="text-2xl text-teal-500">📝</span>
                    <div>
                      <p className="font-medium text-gray-800">SOAP Note for Jane Doe</p>
                      <p className="text-sm text-gray-500">Recorded on July 31, 2025 by Dr. Smith</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">10 mins ago</div>
                  </li>
                  {/* Add more list items as needed */}
                  <li className="flex items-center space-x-4 p-4 border-b last:border-b-0">
                    <span className="text-2xl text-teal-500">🎤</span>
                    <div>
                      <p className="font-medium text-gray-800">New recording for John Doe</p>
                      <p className="text-sm text-gray-500">Uploaded on July 31, 2025</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">25 mins ago</div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;