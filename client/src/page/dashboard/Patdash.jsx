import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../component/shared/DashboardLayout';
import { useAuth } from '../../contexts/useAuth';

const Patdash = () => {
  const { currentUser } = useAuth();
  const stats = {
    appointments: 2,
    prescriptions: 3,
    reports: 5,
    unreadMessages: 1
  };
  
  // Format last login time
  const formatLastLogin = (timestamp) => {
    if (!timestamp) return 'First login';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <DashboardLayout userType="patient">
      {/* Welcome Message with Last Login */}
      <motion.div
        className="mb-6 bg-white/10 p-4 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-white">Welcome back, {currentUser?.name || 'Patient'}!</h2>
        <p className="text-sm text-white/70">
          Last login: {formatLastLogin(currentUser?.lastLogin)}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Upcoming Appointments"
          value={stats.appointments}
          icon="calendar"
          color="bg-blue-500"
        />
        <StatCard
          title="Active Prescriptions"
          value={stats.prescriptions}
          icon="clipboard"
          color="bg-green-500"
        />
        <StatCard
          title="Medical Reports"
          value={stats.reports}
          icon="document"
          color="bg-yellow-500"
        />
        <StatCard
          title="Unread Messages"
          value={stats.unreadMessages}
          icon="mail"
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
          {stats.appointments > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium">D</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">Dr. Jane Smith</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">Aug 5, 2023</td>
                    <td className="px-4 py-3 text-sm text-gray-500">10:30 AM</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Check-up
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                      <button className="text-red-600 hover:text-red-800">Cancel</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-medium">M</span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">Dr. Michael Johnson</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">Aug 15, 2023</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2:00 PM</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Consultation
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                      <button className="text-red-600 hover:text-red-800">Cancel</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No upcoming appointments</p>
              <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Book an Appointment
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Prescriptions</h2>
          <div className="space-y-4">
            <PrescriptionItem
              medicine="Amoxicillin"
              dosage="500mg"
              frequency="3 times daily"
              doctor="Dr. Jane Smith"
              date="July 28, 2023"
            />
            <PrescriptionItem
              medicine="Ibuprofen"
              dosage="400mg"
              frequency="As needed for pain"
              doctor="Dr. Michael Johnson"
              date="July 15, 2023"
            />
            <PrescriptionItem
              medicine="Loratadine"
              dosage="10mg"
              frequency="Once daily"
              doctor="Dr. Jane Smith"
              date="June 10, 2023"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Health Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Blood Pressure"
            value="120/80"
            date="Last updated: July 30, 2023"
            status="normal"
          />
          <MetricCard
            title="Heart Rate"
            value="72 bpm"
            date="Last updated: July 30, 2023"
            status="normal"
          />
          <MetricCard
            title="Blood Glucose"
            value="100 mg/dL"
            date="Last updated: July 25, 2023"
            status="normal"
          />
          <MetricCard
            title="BMI"
            value="22.5"
            date="Last updated: June 15, 2023"
            status="normal"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper Components
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <Icon name={icon} className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );
};

const PrescriptionItem = ({ medicine, dosage, frequency, doctor, date }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{medicine}</h3>
          <p className="text-sm text-gray-600">{dosage} - {frequency}</p>
          <p className="text-xs text-gray-500 mt-1">Prescribed by {doctor}</p>
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, date, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${getStatusColor(status)}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
  );
};

// Simple icon component
const Icon = ({ name, className = "h-5 w-5" }) => {
  const icons = {
    calendar: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    ),
    document: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    clipboard: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
    mail: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default Patdash;
