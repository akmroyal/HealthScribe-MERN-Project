import React, { useState } from 'react';
import {
  FiCalendar, FiClock, FiUser, FiMapPin, FiPhone,
  FiFileText, FiTrendingUp, FiFilter, FiSearch,
  FiChevronRight, FiPlus, FiEdit3, FiTrash2
} from 'react-icons/fi';

const AppointmentHistory = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = [
    {
      id: 1,
      date: "2024-12-15",
      time: "10:30 AM",
      provider: "Dr. Sarah Smith",
      specialty: "Endocrinology",
      type: "Follow-up",
      status: "Completed",
      duration: "30 min",
      location: "Clinic Room 205",
      notes: "Diabetes management checkup",
      billingCode: "99214"
    },
    {
      id: 2,
      date: "2024-12-01",
      time: "2:15 PM",
      provider: "Dr. Michael Johnson",
      specialty: "Cardiology",
      type: "Consultation",
      status: "Completed",
      duration: "45 min",
      location: "Clinic Room 301",
      notes: "Blood pressure monitoring",
      billingCode: "99243"
    },
    {
      id: 3,
      date: "2024-11-20",
      time: "9:00 AM",
      provider: "Dr. Sarah Smith",
      specialty: "Endocrinology",
      type: "Routine",
      status: "Completed",
      duration: "20 min",
      location: "Clinic Room 205",
      notes: "HbA1c results review",
      billingCode: "99213"
    },
    {
      id: 4,
      date: "2024-12-22",
      time: "11:00 AM",
      provider: "Dr. Sarah Smith",
      specialty: "Endocrinology",
      type: "Follow-up",
      status: "Scheduled",
      duration: "30 min",
      location: "Clinic Room 205",
      notes: "Quarterly diabetes review",
      billingCode: "99214"
    },
    {
      id: 5,
      date: "2024-11-05",
      time: "3:30 PM",
      provider: "Dr. Lisa Brown",
      specialty: "Orthopedics",
      type: "Consultation",
      status: "No-show",
      duration: "45 min",
      location: "Clinic Room 150",
      notes: "Knee pain evaluation",
      billingCode: "99243"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'No-show': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = filterStatus === 'all' || apt.status.toLowerCase() === filterStatus;
    const matchesSearch = apt.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Appointment History</h2>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FiPlus size={16} />
            Schedule New
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No-show</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="divide-y divide-gray-100">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Appointment Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="font-semibold text-gray-900">{appointment.provider}</h3>
                  <span className="text-sm text-gray-600">{appointment.specialty}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock size={14} />
                    <span>{appointment.time} ({appointment.duration})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiMapPin size={14} />
                    <span>{appointment.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiFileText size={14} />
                    <span>{appointment.type} - {appointment.billingCode}</span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <p className="text-sm text-gray-700 mt-2 italic">"{appointment.notes}"</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {appointment.status === 'Completed' && (
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <FiFileText size={16} />
                  </button>
                )}
                {appointment.status === 'Scheduled' && (
                  <>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <FiEdit3 size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </>
                )}
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button */}
      <div className="p-4 border-t border-gray-100 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View All Appointments
        </button>
      </div>
    </div>
  );
};

export default AppointmentHistory;
