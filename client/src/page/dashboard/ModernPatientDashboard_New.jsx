import React, { useState } from 'react';
import { 
  FiCalendar, FiFileText, FiPackage, FiAlertCircle, 
  FiPhone, FiMail, FiActivity, FiClock, FiDownload, 
  FiEye, FiMic, FiPlus, FiMessageSquare, 
  FiChevronRight, FiChevronDown, FiHome, FiX, FiUser,
  FiSettings, FiEdit3, FiDollarSign
} from 'react-icons/fi';
import { 
  FaStethoscope, FaHeartbeat, FaAllergies,
  FaWeight, FaThermometerHalf, FaVial
} from 'react-icons/fa';
import AppointmentHistory from '../../component/patient/AppointmentHistory';
import SOAPNotesHistory from '../../component/patient/SOAPNotesHistory';
import LabResultsTrends from '../../component/patient/LabResultsTrends';

const ModernPatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo patient data
  const patientData = {
    personal: {
      name: "Sarah Johnson",
      age: 45,
      gender: "Female",
      patientId: "PT001234",
      mrn: "MRN789456",
      lastVisit: "2024-12-15",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com"
    },
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72",
      temperature: "98.6°F",
      weight: "165 lbs",
      lastUpdated: "Today 10:30 AM"
    },
    conditions: [
      { name: "Type 2 Diabetes", status: "Active" },
      { name: "Hypertension", status: "Controlled" },
      { name: "Osteoarthritis", status: "Managed" }
    ],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", refills: 3 },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", refills: 2 }
    ],
    allergies: [
      { name: "Penicillin", severity: "Severe" },
      { name: "Latex", severity: "Moderate" }
    ],
    alerts: [
      { type: "warning", message: "Annual mammogram overdue", priority: "High" },
      { type: "info", message: "Flu vaccination due", priority: "Low" }
    ],
    recentLabs: [
      { name: "HbA1c", value: "7.2%", status: "elevated", date: "Dec 10" },
      { name: "Cholesterol", value: "180 mg/dL", status: "normal", date: "Dec 10" }
    ]
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Patient Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <FiUser className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{patientData.personal.name}</h1>
              <p className="text-sm text-gray-500">
                {patientData.personal.age}y • {patientData.personal.gender} • MRN: {patientData.personal.mrn}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors">
              <FiMic className="w-4 h-4" />
              <span className="text-sm">Record</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors">
              <FiFileText className="w-4 h-4" />
              <span className="text-sm">New Note</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <FiCalendar className="w-4 h-4" />
              <span className="text-sm">Schedule</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', name: 'Overview', icon: FiHome },
            { id: 'appointments', name: 'Appointments', icon: FiCalendar },
            { id: 'soap-notes', name: 'SOAP Notes', icon: FiFileText },
            { id: 'lab-results', name: 'Lab Results', icon: FaVial },
            { id: 'medications', name: 'Medications', icon: FiPackage },
            { id: 'billing', name: 'Billing', icon: FiDollarSign }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'overview' && (
          <div className="h-full p-6">
            <div className="grid grid-cols-12 gap-6 h-full">
              {/* Left Column - Main Content */}
              <div className="col-span-8 space-y-6 overflow-y-auto">
                {/* Alerts */}
                {patientData.alerts.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FiAlertCircle className="w-5 h-5 text-amber-500" />
                      <h2 className="font-semibold text-gray-900">Active Alerts</h2>
                    </div>
                    <div className="space-y-2">
                      {patientData.alerts.map((alert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <span className="text-sm text-amber-800">{alert.message}</span>
                          <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">{alert.priority}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vital Signs */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900">Vital Signs</h2>
                    <span className="text-sm text-gray-500">{patientData.vitals.lastUpdated}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-teal-50 rounded-lg">
                      <FaHeartbeat className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">BP</p>
                      <p className="font-semibold">{patientData.vitals.bloodPressure}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <FiActivity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">HR</p>
                      <p className="font-semibold">{patientData.vitals.heartRate} bpm</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <FaThermometerHalf className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Temp</p>
                      <p className="font-semibold">{patientData.vitals.temperature}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <FaWeight className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-semibold">{patientData.vitals.weight}</p>
                    </div>
                  </div>
                </div>

                {/* Active Conditions */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900">Active Conditions</h2>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{condition.name}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          condition.status === 'Active' ? 'bg-red-100 text-red-800' :
                          condition.status === 'Controlled' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {condition.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Lab Results */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900">Recent Lab Results</h2>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiEye className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.recentLabs.map((lab, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{lab.name}</span>
                          <p className="text-sm text-gray-500">{lab.date}</p>
                        </div>
                        <div className="text-right">
                          <span className={`font-semibold ${
                            lab.status === 'elevated' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {lab.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-span-4 space-y-6 overflow-y-auto">
                {/* Contact Info */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FiPhone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{patientData.personal.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiMail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{patientData.personal.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiClock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Last visit: {patientData.personal.lastVisit}</span>
                    </div>
                  </div>
                </div>

                {/* Current Medications */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Current Medications</h3>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.medications.map((med, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="font-medium text-gray-900 text-sm">{med.name}</div>
                        <div className="text-xs text-gray-500">{med.dosage} - {med.frequency}</div>
                        <div className="text-xs text-gray-400 mt-1">Refills: {med.refills}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Allergies</h3>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.allergies.map((allergy, index) => (
                      <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="font-medium text-red-800 text-sm">{allergy.name}</div>
                        <div className="text-xs text-red-600">{allergy.severity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tab Contents */}
        {activeTab === 'appointments' && (
          <div className="h-full p-6">
            <AppointmentHistory />
          </div>
        )}
        {activeTab === 'soap-notes' && (
          <div className="h-full p-6">
            <SOAPNotesHistory />
          </div>
        )}
        {activeTab === 'lab-results' && (
          <div className="h-full p-6">
            <LabResultsTrends />
          </div>
        )}
        {activeTab === 'medications' && (
          <div className="h-full p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Medication Management</h2>
              <p className="text-gray-600">Comprehensive medication management interface coming soon...</p>
            </div>
          </div>
        )}
        {activeTab === 'billing' && (
          <div className="h-full p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing & Insurance</h2>
              <p className="text-gray-600">Billing and insurance management interface coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernPatientDashboard;
