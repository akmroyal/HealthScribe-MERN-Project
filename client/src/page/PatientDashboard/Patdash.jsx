import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../component/shared/Navbar'
import Sidebar from '../../component/PatSidebar'
const Patdash = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const sidebarRef = useRef(null);
  
    // Collapse sidebar when clicking outside
    useEffect(() => {
      if (!sidebarCollapsed) {
        // Only add listener when expanded
        function handleClick(e) {
          if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setSidebarCollapsed(true);
          }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
      }
    }, [sidebarCollapsed]);
  return (
    <div className={"flex flex-col h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400  text-gray-900"}>
      {/* Animated Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Navbar />
      </motion.div>

      <div className="flex flex-1 overflow-hidden ">
        {/* Animated Sidebar */}
        <motion.div
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
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </motion.div>

        {/* Animated Main Content */}
        <main className="flex-1 overflow-auto p-8 ">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Patient Demographics Section */}
            <motion.section
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.02, boxShadow: '0px 8px 24px rgba(0,0,0,0.10)' }}
            >
              <h2 className="text-2xl font-bold mb-4 text-teal-700">Patient Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold w-24">Name:</span>
                  <span>John Doe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold w-24">Age:</span>
                  <span>45 years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold w-24">Gender:</span>
                  <span>Male</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold w-24">Contact:</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </motion.section>

            {/* Current Medications Section */}
            <motion.section
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.02, boxShadow: '0px 8px 24px rgba(0,0,0,0.10)' }}
            >
              <h2 className="text-2xl font-bold mb-4 text-teal-700">Current Medications</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medication
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dosage
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lisinopril</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 mg daily</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 1, 2024</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Metformin</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500 mg twice daily</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 15, 2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* SOAP Notes History Section */}
            <motion.section
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.02, boxShadow: '0px 8px 24px rgba(0,0,0,0.10)' }}
            >
              <h2 className="text-2xl font-bold mb-4 text-teal-700">SOAP Notes History</h2>
              <ul className="divide-y divide-gray-200">
                <motion.li
                  className="py-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.01, backgroundColor: '#f0fdfa' }}
                >
                  <h3 className="text-lg font-semibold text-gray-800">Visit on July 25, 2025</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Subjective:</strong> Patient reports persistent fatigue and a new headache.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Objective:</strong> BP 128/82, HR 75. No new physical findings.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Assessment:</strong> Stable hypertension, new onset headache.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Plan:</strong> Recommended over-the-counter pain relievers for headache. Follow-up in 2 weeks.
                  </p>
                </motion.li>
                <motion.li
                  className="py-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  whileHover={{ scale: 1.01, backgroundColor: '#f0fdfa' }}
                >
                  <h3 className="text-lg font-semibold text-gray-800">Visit on June 1, 2025</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Subjective:</strong> Patient feeling well, no new symptoms reported.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Objective:</strong> BP 130/80, HR 72. General exam unremarkable.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Assessment:</strong> Stable condition. Medication regimen effective.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Plan:</strong> Continue current medications. Annual check-up scheduled.
                  </p>
                </motion.li>
              </ul>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Patdash
