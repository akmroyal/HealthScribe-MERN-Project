import React, { useState } from 'react';
import {
  FiFileText, FiSearch, FiFilter, FiDownload, FiEye,
  FiCalendar, FiUser, FiClock, FiTrendingUp, FiPrinter,
  FiShare2, FiPlus, FiEdit3, FiTrash2, FiMic
} from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';

const SOAPNotesHistory = () => {
  const [filterProvider, setFilterProvider] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const soapNotes = [
    {
      id: 1,
      date: "2024-12-15",
      time: "10:30 AM",
      provider: "Dr. Sarah Smith",
      specialty: "Endocrinology",
      visitType: "Follow-up",
      subjective: "Patient reports good adherence to medication regimen. Blood sugar levels have been stable between 120-140 mg/dL. No episodes of hypoglycemia. Mild fatigue in the evenings.",
      objective: "Vital Signs: BP 128/82, HR 74, Temp 98.4°F, Weight 165 lbs. A&O x3, HEENT normal, Heart RRR, Lungs clear, Abdomen soft, Extremities no edema.",
      assessment: "Type 2 Diabetes Mellitus - well controlled. Hypertension - stable. Patient shows good medication compliance and lifestyle modifications.",
      plan: "Continue current Metformin 500mg BID. Increase Lisinopril to 15mg daily. HbA1c in 3 months. Dietitian follow-up. Next visit in 3 months.",
      icd10: ["E11.9", "I10"],
      tags: ["diabetes", "hypertension", "follow-up"]
    },
    {
      id: 2,
      date: "2024-12-01",
      time: "2:15 PM",
      provider: "Dr. Michael Johnson",
      specialty: "Cardiology",
      visitType: "Consultation",
      subjective: "Patient presents with occasional chest discomfort, usually after physical exertion. No shortness of breath at rest. Denies palpitations or syncope.",
      objective: "Vital Signs: BP 135/88, HR 78, RR 16, O2 Sat 98%. Cardiovascular exam: Regular rate and rhythm, no murmurs. EKG shows normal sinus rhythm.",
      assessment: "Chest pain, likely musculoskeletal. Hypertension, uncontrolled. No evidence of cardiac ischemia at this time.",
      plan: "Stress test ordered. Increase antihypertensive medication. Follow-up in 2 weeks. Patient education on cardiac risk factors.",
      icd10: ["R06.02", "I10"],
      tags: ["chest-pain", "cardiology", "stress-test"]
    },
    {
      id: 3,
      date: "2024-11-20",
      time: "9:00 AM",
      provider: "Dr. Sarah Smith",
      specialty: "Endocrinology",
      visitType: "Routine",
      subjective: "Patient doing well overall. HbA1c results received - 7.2%. Patient reports occasional episodes of dawn phenomenon.",
      objective: "Vital Signs stable. Physical exam unremarkable. Lab results: HbA1c 7.2%, Creatinine 0.9, Cholesterol 180.",
      assessment: "Type 2 DM with suboptimal control (HbA1c 7.2%). Target <7%. Good renal function maintained.",
      plan: "Discussed diet modifications. Consider adding evening insulin if next HbA1c not improved. Ophthalmology referral for annual eye exam.",
      icd10: ["E11.9"],
      tags: ["diabetes", "hba1c", "routine"]
    }
  ];

  const providers = [...new Set(soapNotes.map(note => note.provider))];

  const filteredNotes = soapNotes.filter(note => {
    const matchesProvider = filterProvider === 'all' || note.provider === filterProvider;
    const matchesSearch = note.subjective.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.assessment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesProvider && matchesSearch;
  });

  const NotePreviewModal = ({ note, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">SOAP Note - {note.date}</h3>
            <p className="text-sm text-gray-600">{note.provider} - {note.specialty}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiPrinter size={16} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiDownload size={16} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Date:</span>
                  <p className="font-medium">{note.date} {note.time}</p>
                </div>
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <p className="font-medium">{note.provider}</p>
                </div>
                <div>
                  <span className="text-gray-600">Visit Type:</span>
                  <p className="font-medium">{note.visitType}</p>
                </div>
                <div>
                  <span className="text-gray-600">ICD-10:</span>
                  <p className="font-medium">{note.icd10.join(", ")}</p>
                </div>
              </div>
            </div>

            {/* SOAP Sections */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">S</span>
                  Subjective
                </h4>
                <p className="text-gray-700 leading-relaxed">{note.subjective}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">O</span>
                  Objective
                </h4>
                <p className="text-gray-700 leading-relaxed">{note.objective}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">A</span>
                  Assessment
                </h4>
                <p className="text-gray-700 leading-relaxed">{note.assessment}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">P</span>
                  Plan
                </h4>
                <p className="text-gray-700 leading-relaxed">{note.plan}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FiFileText className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">SOAP Notes History</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <FiMic size={16} />
              Voice Note
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FiPlus size={16} />
              New Note
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterProvider}
            onChange={(e) => setFilterProvider(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Providers</option>
            {providers.map(provider => (
              <option key={provider} value={provider}>{provider}</option>
            ))}
          </select>

          <select
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Dates</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Notes List */}
      <div className="divide-y divide-gray-100">
        {filteredNotes.map((note) => (
          <div key={note.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              {/* Note Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <FaStethoscope className="text-blue-500" size={16} />
                    <h3 className="font-semibold text-gray-900">{note.provider}</h3>
                  </div>
                  <span className="text-sm text-gray-600">{note.specialty}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {note.visitType}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    <span>{note.date} at {note.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiFileText size={14} />
                    <span>ICD-10: {note.icd10.join(", ")}</span>
                  </div>
                </div>
                
                {/* Assessment Preview */}
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Assessment</h4>
                  <p className="text-sm text-gray-700 line-clamp-2">{note.assessment}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedNote(note)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Full Note"
                >
                  <FiEye size={16} />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                  <FiEdit3 size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Download">
                  <FiDownload size={16} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Share">
                  <FiShare2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="p-4 border-t border-gray-100 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Load More Notes
        </button>
      </div>

      {/* Note Preview Modal */}
      {selectedNote && (
        <NotePreviewModal 
          note={selectedNote} 
          onClose={() => setSelectedNote(null)} 
        />
      )}
    </div>
  );
};

export default SOAPNotesHistory;
