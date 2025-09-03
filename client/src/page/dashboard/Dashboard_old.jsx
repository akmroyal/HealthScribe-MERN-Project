import React, { useState } from 'react';
import ModernDashboardLayout from '../../component/shared/ModernDashboardLayout';
import { 
  FiMic, FiMicOff, FiUsers, FiCalendar, FiFileText, 
  FiClock, FiTrendingUp, FiActivity, FiDownload,
  FiPlus, FiEdit3, FiEye, FiMoreHorizontal,
  FiFilter, FiStar
} from 'react-icons/fi';

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);

  // Recording handlers
  const handleStartRecording = () => {
    setIsRecording(true);
    console.log('Recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');
  };

  // Dashboard stats data
  const dashboardStats = [
    {
      title: "Today's Patients",
      value: "15",
      change: "+12%",
      trend: "up",
      icon: FiUsers,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Pending Reports",
      value: "8",
      change: "-5%",
      trend: "down",
      icon: FiFileText,
      color: "bg-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Hours Worked",
      value: "6.5h",
      change: "+2h",
      trend: "up",
      icon: FiClock,
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+8%",
      trend: "up",
      icon: FiTrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "recording",
      patient: "Sarah Johnson",
      action: "SOAP note generated",
      time: "10 minutes ago",
      status: "completed",
      priority: "normal"
    },
    {
      id: 2,
      type: "appointment",
      patient: "Michael Chen",
      action: "Consultation completed",
      time: "25 minutes ago",
      status: "completed",
      priority: "normal"
    },
    {
      id: 3,
      type: "recording",
      patient: "Emma Davis",
      action: "Recording uploaded",
      time: "1 hour ago",
      status: "processing",
      priority: "high"
    },
    {
      id: 4,
      type: "note",
      patient: "James Wilson",
      action: "Medical history updated",
      time: "2 hours ago",
      status: "completed",
      priority: "normal"
    },
    {
      id: 5,
      type: "appointment",
      patient: "Lisa Anderson",
      action: "Follow-up scheduled",
      time: "3 hours ago",
      status: "completed",
      priority: "low"
    }
  ];

  // Quick action buttons
  const quickActions = [
    {
      label: "New Recording",
      icon: isRecording ? FiMicOff : FiMic,
      action: isRecording ? handleStopRecording : handleStartRecording,
      color: isRecording ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600",
      text: isRecording ? "Stop Recording" : "Start Recording"
    },
    {
      label: "Quick Note",
      icon: FiEdit3,
      action: () => console.log('Quick note'),
      color: "bg-blue-500 hover:bg-blue-600",
      text: "Quick Note"
    },
    {
      label: "Schedule",
      icon: FiCalendar,
      action: () => console.log('Schedule'),
      color: "bg-purple-500 hover:bg-purple-600",
      text: "Schedule"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'recording': return FiMic;
      case 'appointment': return FiCalendar;
      case 'note': return FiFileText;
      default: return FiActivity;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'processing': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'pending': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'normal': return 'border-l-blue-500';
      case 'low': return 'border-l-gray-400';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, Dr. Smith
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's what's happening with your practice today
            </p>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Quick Actions */}
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 hover:scale-105 transform`}
              >
                <action.icon size={20} />
                <span>{action.text}</span>
              </button>
            ))}

            {/* Add Patient Button */}
            <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 border border-gray-200 dark:border-gray-700 hover:scale-105 transform">
              <FiPlus size={20} />
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-6 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">vs last week</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activities
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <FiFilter size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <FiMoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className={`p-4 border-l-4 ${getPriorityColor(activity.priority)} hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <ActivityIcon size={16} className="text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {activity.patient}
                          </p>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <FiEye size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors">
                View all activities →
              </button>
            </div>
          </div>

          {/* Analytics & Quick Stats */}
          <div className="space-y-6">
            {/* Weekly Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                This Week
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Patients Seen</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">67</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reports Generated</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">52</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Hours Saved</span>
                  <span className="text-lg font-semibold text-green-600">14.5h</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-600">
                  <FiCalendar className="text-blue-500" size={20} />
                  <span className="text-gray-900 dark:text-white">View Schedule</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-600">
                  <FiUsers className="text-green-500" size={20} />
                  <span className="text-gray-900 dark:text-white">Patient List</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-600">
                  <FiFileText className="text-purple-500" size={20} />
                  <span className="text-gray-900 dark:text-white">All Reports</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-600">
                  <FiDownload className="text-orange-500" size={20} />
                  <span className="text-gray-900 dark:text-white">Export Data</span>
                </button>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/30 rounded-2xl border border-teal-200 dark:border-teal-700 p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <FiStar className="text-teal-600" size={24} />
                <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">
                  Performance
                </h3>
              </div>
              <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">
                You're performing exceptionally well this month!
              </p>
              <div className="bg-teal-600 rounded-xl p-4 text-center shadow-lg">
                <p className="text-white text-2xl font-bold">A+</p>
                <p className="text-teal-100 text-sm">Overall Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  );

  // Recording handlers
  const handleStartRecording = () => {
    setIsRecording(true);
    console.log('Recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');
  };

  // Dashboard stats data
  const dashboardStats = [
    {
      title: "Today's Patients",
      value: "15",
      change: "+12%",
      trend: "up",
      icon: FiUsers,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Pending Reports",
      value: "8",
      change: "-5%",
      trend: "down",
      icon: FiFileText,
      color: "bg-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Hours Worked",
      value: "6.5h",
      change: "+2h",
      trend: "up",
      icon: FiClock,
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+8%",
      trend: "up",
      icon: FiTrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "recording",
      patient: "Sarah Johnson",
      action: "SOAP note generated",
      time: "10 minutes ago",
      status: "completed",
      priority: "normal"
    },
    {
      id: 2,
      type: "appointment",
      patient: "Michael Chen",
      action: "Consultation completed",
      time: "25 minutes ago",
      status: "completed",
      priority: "normal"
    },
    {
      id: 3,
      type: "recording",
      patient: "Emma Davis",
      action: "Recording uploaded",
      time: "1 hour ago",
      status: "processing",
      priority: "high"
    },
    {
      id: 4,
      type: "note",
      patient: "James Wilson",
      action: "Medical history updated",
      time: "2 hours ago",
      status: "completed",
      priority: "normal"
    },
    {
      id: 5,
      type: "appointment",
      patient: "Lisa Anderson",
      action: "Follow-up scheduled",
      time: "3 hours ago",
      status: "completed",
      priority: "low"
    }
  ];

  // Quick action buttons
  const quickActions = [
    {
      label: "New Recording",
      icon: isRecording ? FiMicOff : FiMic,
      action: isRecording ? handleStopRecording : handleStartRecording,
      color: isRecording ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600",
      text: isRecording ? "Stop Recording" : "Start Recording"
    },
    {
      label: "Quick Note",
      icon: FiEdit3,
      action: () => console.log('Quick note'),
      color: "bg-blue-500 hover:bg-blue-600",
      text: "Quick Note"
    },
    {
      label: "Schedule",
      icon: FiCalendar,
      action: () => console.log('Schedule'),
      color: "bg-purple-500 hover:bg-purple-600",
      text: "Schedule"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'recording': return FiMic;
      case 'appointment': return FiCalendar;
      case 'note': return FiFileText;
      default: return FiActivity;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'processing': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'pending': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'normal': return 'border-l-blue-500';
      case 'low': return 'border-l-gray-400';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white"
            >
              Welcome back, Dr. Smith
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 mt-1"
            >
              Here's what's happening with your practice today
            </motion.p>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Quick Actions */}
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className={`${action.color} text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2`}
              >
                <action.icon size={20} />
                <span>{action.text}</span>
              </motion.button>
            ))}

            {/* Add Patient Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 border border-gray-200 dark:border-gray-700"
            >
              <FiPlus size={20} />
              <span>Add Patient</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`${stat.bgColor} p-6 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">vs last week</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activities
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <FiFilter size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <FiMoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {recentActivities.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`p-4 border-l-4 ${getPriorityColor(activity.priority)} hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <ActivityIcon size={16} className="text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {activity.patient}
                          </p>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <FiEye size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
                View all activities →
              </button>
            </div>
          </motion.div>

          {/* Analytics & Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Weekly Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                This Week
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Patients Seen</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">67</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reports Generated</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">52</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Hours Saved</span>
                  <span className="text-lg font-semibold text-green-600">14.5h</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FiCalendar className="text-blue-500" size={20} />
                  <span className="text-gray-900 dark:text-white">View Schedule</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FiUsers className="text-green-500" size={20} />
                  <span className="text-gray-900 dark:text-white">Patient List</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FiFileText className="text-purple-500" size={20} />
                  <span className="text-gray-900 dark:text-white">All Reports</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FiDownload className="text-orange-500" size={20} />
                  <span className="text-gray-900 dark:text-white">Export Data</span>
                </button>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl border border-teal-200 dark:border-teal-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FiStar className="text-teal-600" size={24} />
                <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">
                  Performance
                </h3>
              </div>
              <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">
                You're performing exceptionally well this month!
              </p>
              <div className="bg-teal-600 rounded-lg p-4 text-center">
                <p className="text-white text-2xl font-bold">A+</p>
                <p className="text-teal-100 text-sm">Overall Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ModernDashboardLayout>
  );
};

export default Dashboard;