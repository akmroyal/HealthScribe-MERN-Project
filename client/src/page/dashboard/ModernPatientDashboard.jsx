import React, { useState, useContext, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
import { AuthContext } from '../../contexts/AuthContext';

const ModernPatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const btnRef = useRef(null);
  const menuRef = useRef(null);
  // menuStyle: { top:number, left:number, width:number, mobile:boolean }
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 192, mobile: false });

  const calculatePosition = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dropdownWidth = 192; // matches w-48
    const gap = 8;
    const viewportW = window.innerWidth;

    // mobile: full width bottom sheet
    if (viewportW < 640) {
      setMenuStyle({ mobile: true });
      return;
    }

    // Position dropdown so its right edge aligns with button's right edge when possible
    const top = rect.bottom + gap + window.scrollY;
    let left = rect.right - dropdownWidth;
    // if left would go offscreen, push it to button.left
    if (left < 8) left = rect.left;
    setMenuStyle({ top, left, width: dropdownWidth, mobile: false });
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen((s) => {
      const next = !s;
      if (next) setTimeout(calculatePosition, 0);
      return next;
    });
  };

  const handleLogout = async () => {
    setIsSettingsOpen(false);
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed from UI:', err);
    }
  };

  useEffect(() => {
    if (!isSettingsOpen) return;
    const onDocClick = (e) => {
      if (menuRef.current && btnRef.current && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setIsSettingsOpen(false);
      }
    };
    const onEsc = (e) => { if (e.key === 'Escape') setIsSettingsOpen(false); };
    window.addEventListener('click', onDocClick);
    window.addEventListener('keydown', onEsc);
    window.addEventListener('resize', calculatePosition);
    return () => {
      window.removeEventListener('click', onDocClick);
      window.removeEventListener('keydown', onEsc);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isSettingsOpen]);

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Patient Info */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{patientData.personal.name}</h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {patientData.personal.age}y • {patientData.personal.gender} • MRN: {patientData.personal.mrn}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto">
            <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors whitespace-nowrap">
              <FiMic className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Record</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors whitespace-nowrap">
              <FiFileText className="w-4 h-4" />
              <span className="text-xs sm:text-sm hidden sm:inline">New Note</span>
              <span className="text-xs sm:text-sm sm:hidden">Note</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
              <FiCalendar className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Schedule</span>
            </button>
            <div className="relative">
              <button ref={btnRef} onClick={handleSettingsToggle} className="p-2 text-gray-400 hover:text-gray-600">
                <FiSettings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {isSettingsOpen && ReactDOM.createPortal(
                <div
                  ref={menuRef}
                  style={menuStyle.mobile ? undefined : { position: 'absolute', top: menuStyle.top, left: menuStyle.left, width: menuStyle.width }}
                  className={`${menuStyle.mobile ? 'fixed inset-x-0 bottom-0 rounded-t-lg h-52' : 'absolute sm:shadow-lg'} origin-top-right mt-2 sm:mt-0 w-11/12 sm:w-48 bg-white ring-1 ring-black ring-opacity-5 z-50`}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => { setIsSettingsOpen(false); alert('Profile (demo)'); }}>
                      Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => { setIsSettingsOpen(false); alert('Settings (demo)'); }}>
                      Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between" role="menuitem" onClick={() => { setIsSettingsOpen(false); alert('Help (demo)'); }}>
                      Help
                    </button>
                    <div className="border-t border-gray-100" />
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50" role="menuitem" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <nav className="flex space-x-2 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
          {[
            { id: 'overview', name: 'Overview', icon: FiHome },
            { id: 'appointments', name: 'Appointments', icon: FiCalendar, shortName: 'Appts' },
            { id: 'soap-notes', name: 'SOAP Notes', icon: FiFileText, shortName: 'Notes' },
            { id: 'lab-results', name: 'Lab Results', icon: FaVial, shortName: 'Labs' },
            { id: 'medications', name: 'Medications', icon: FiPackage, shortName: 'Meds' },
            { id: 'billing', name: 'Billing', icon: FiDollarSign }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 transition-colors`}
            >
              <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.shortName || tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'overview' && (
          <div className="h-full p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 h-full">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-6 overflow-y-auto">
                {/* Alerts */}
                {patientData.alerts.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                      <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Active Alerts</h2>
                    </div>
                    <div className="space-y-2">
                      {patientData.alerts.map((alert, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1 sm:space-y-0">
                          <span className="text-xs sm:text-sm text-amber-800">{alert.message}</span>
                          <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded self-start sm:self-auto">{alert.priority}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vital Signs */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                    <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Vital Signs</h2>
                    <span className="text-xs sm:text-sm text-gray-500">{patientData.vitals.lastUpdated}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center p-2 sm:p-3 bg-teal-50 rounded-lg">
                      <FaHeartbeat className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600">BP</p>
                      <p className="font-semibold text-xs sm:text-sm">{patientData.vitals.bloodPressure}</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <FiActivity className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600">HR</p>
                      <p className="font-semibold text-xs sm:text-sm">{patientData.vitals.heartRate} bpm</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                      <FaThermometerHalf className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600">Temp</p>
                      <p className="font-semibold text-xs sm:text-sm">{patientData.vitals.temperature}</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                      <FaWeight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600">Weight</p>
                      <p className="font-semibold text-xs sm:text-sm">{patientData.vitals.weight}</p>
                    </div>
                  </div>
                </div>

                {/* Active Conditions */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Active Conditions</h2>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.conditions.map((condition, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                        <span className="font-medium text-gray-900 text-sm">{condition.name}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium self-start sm:self-auto ${
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
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Recent Lab Results</h2>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.recentLabs.map((lab, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                        <div>
                          <span className="font-medium text-gray-900 text-sm">{lab.name}</span>
                          <p className="text-xs sm:text-sm text-gray-500">{lab.date}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className={`font-semibold text-sm ${
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
              <div className="lg:col-span-4 space-y-4 sm:space-y-6 overflow-y-auto">
                {/* Contact Info */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600 break-all">{patientData.personal.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiMail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600 break-all">{patientData.personal.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiClock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">Last visit: {patientData.personal.lastVisit}</span>
                    </div>
                  </div>
                </div>

                {/* Current Medications */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Current Medications</h3>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.medications.map((med, index) => (
                      <div key={index} className="p-2 sm:p-3 border border-gray-200 rounded-lg">
                        <div className="font-medium text-gray-900 text-xs sm:text-sm">{med.name}</div>
                        <div className="text-xs text-gray-500">{med.dosage} - {med.frequency}</div>
                        <div className="text-xs text-gray-400 mt-1">Refills: {med.refills}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Allergies</h3>
                    <button className="text-teal-600 hover:text-teal-700">
                      <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {patientData.allergies.map((allergy, index) => (
                      <div key={index} className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="font-medium text-red-800 text-xs sm:text-sm">{allergy.name}</div>
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
          <div className="h-full p-4 sm:p-6 overflow-y-auto">
            <AppointmentHistory />
          </div>
        )}
        {activeTab === 'soap-notes' && (
          <div className="h-full p-4 sm:p-6 overflow-y-auto">
            <SOAPNotesHistory />
          </div>
        )}
        {activeTab === 'lab-results' && (
          <div className="h-full p-4 sm:p-6 overflow-y-auto">
            <LabResultsTrends />
          </div>
        )}
        {activeTab === 'medications' && (
          <div className="h-full p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 h-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Medication Management</h2>
              <p className="text-sm sm:text-base text-gray-600">Comprehensive medication management interface coming soon...</p>
            </div>
          </div>
        )}
        {activeTab === 'billing' && (
          <div className="h-full p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 h-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Billing & Insurance</h2>
              <p className="text-sm sm:text-base text-gray-600">Billing and insurance management interface coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernPatientDashboard;
