import React from 'react'


const PatSidebar = ({ collapsed = false }) => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Medical History & Records', icon: '🩺' },
    { name: 'Clinical Documentation', icon: '📝' },
    { name: 'Visit Management', icon: '📅' },
    { name: 'Settings', icon: '⚙️' },
  ];
  return (
    <div className={`mt-4 border-r-2 rounded-e-2xl h-full shadow-lg backdrop-blur-3xl bg-gradient-to-br from-teal-800 via-teal-600 to-teal-400 flex flex-col items-center ${collapsed ? 'w-16 p-2 space-y-2' : 'w-64 p-6 space-y-6'} transition-all duration-300`}>
      {/* Profile Picture Section */}
      <div className={`flex items-center ${collapsed ? 'justify-center p-0 mb-2' : 'space-x-4 p-3 mb-4'} w-full`}>
        <div className={`${collapsed ? 'w-10 h-10 text-base' : 'w-12 h-12 text-lg'} bg-gray-200 rounded-full flex items-center justify-center font-bold`}>
          JD
        </div>
        {!collapsed && (
          <div>
            <h4 className="font-bold text-gray-800">John Doe</h4>
            <p className="text-sm text-gray-500">Patient ID: 12345</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 w-full flex flex-col space-y-2 mt-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center ${collapsed ? 'justify-center' : ''} space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              item.name === 'Dashboard'
                ? 'bg-white/20 text-white shadow font-bold'
                : 'text-teal-100 hover:bg-white/10 hover:text-white'
            }`}
            style={{ minHeight: '44px' }}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="text-lg">{item.name}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default PatSidebar
