import React from 'react';

const Sidebar = ({ doctor = { name: 'Dr. Aman Tiwari', photo: '/doctor-profile.jpg' }, collapsed = false, onLogout }) => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'New Recording', icon: '📝' },
    { name: 'Patient Records', icon: '📁' },
    { name: 'Templates', icon: '📋' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div
      className={`h-full border-r-2 rounded-e-2xl border-teal-800 backdrop-blur-3xl bg-gradient-to-br from-teal-800 via-teal-600 to-teal-400 shadow-2xl flex flex-col items-center ${collapsed ? 'w-16 p-2' : 'w-64 p-6'} transition-all duration-300`}
    >
      {/* Doctor Profile Section */}
      <div
        className={`flex flex-col items-center mb-8  w-full transition-all duration-300 ${collapsed ? 'mb-2' : 'mb-8'}`}
      >
        <div className={`backdrop-blur-md bg-white/20 border-2 border-teal-300 shadow-lg rounded-full p-1 ${collapsed ? 'w-12 h-12' : 'w-24 h-24'} flex items-center justify-center transition-all duration-300`}>
          <img
            src={doctor?.photo}
            alt={doctor.name}
            className={`rounded-full object-cover ${collapsed ? 'w-10 h-10' : 'w-20 h-20'} transition-all duration-300`}
          />
        </div>
        {!collapsed && (
          <div className="mt-3 text-center">
            <div className="font-bold text-white text-lg leading-tight drop-shadow">{doctor.name}</div>
            <div className="text-xs text-teal-100/80 tracking-wide">Doctor</div>
          </div>
        )}
      </div>
      <nav className="flex-1 w-full flex flex-col space-y-2 mt-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center ${collapsed ? 'justify-center' : ''} space-x-3 p-3 rounded-xl font-medium transition-all duration-200 group
              ${item.name === 'Dashboard'
                ? 'bg-white/20 text-white shadow font-bold'
                : 'text-teal-100 hover:bg-white/10 hover:text-white'}
            `}
            style={{ minHeight: '44px' }}
          >
            <span className="text-2xl transition-transform duration-200 group-hover:scale-125">{item.icon}</span>
            {!collapsed && <span className="text-base tracking-wide">{item.name}</span>}
          </a>
        ))}
        
        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className={`flex items-center ${collapsed ? 'justify-center' : ''} space-x-3 p-3 rounded-xl font-medium transition-all duration-200 group
            mt-auto text-red-200 hover:bg-red-500/20 hover:text-white`}
          style={{ minHeight: '44px' }}
        >
          <span className="text-2xl transition-transform duration-200 group-hover:scale-125">🚪</span>
          {!collapsed && <span className="text-base tracking-wide">Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;