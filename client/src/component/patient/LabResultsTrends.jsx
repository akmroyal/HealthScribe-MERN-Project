import React, { useState } from 'react';
import {
  FiTrendingUp, FiTrendingDown, FiActivity, FiBarChart2,
  FiCalendar, FiFilter, FiDownload, FiRefreshCw, FiAlertCircle
} from 'react-icons/fi';
import { 
  FaHeartbeat, FaThermometerHalf, FaWeight, FaVial,
  FaMicroscope, FaXRay, FaStethoscope
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const LabResultsTrends = () => {
  const [selectedMetric, setSelectedMetric] = useState('hba1c');

  // Sample lab data with trends
  const labData = {
    hba1c: [
      { date: '2024-06', value: 7.8, target: 7.0, status: 'high' },
      { date: '2024-09', value: 7.4, target: 7.0, status: 'high' },
      { date: '2024-12', value: 7.2, target: 7.0, status: 'high' },
    ],
    glucose: [
      { date: '2024-06', value: 145, target: 100, status: 'high' },
      { date: '2024-09', value: 138, target: 100, status: 'high' },
      { date: '2024-12', value: 132, target: 100, status: 'high' },
    ],
    cholesterol: [
      { date: '2024-06', value: 220, target: 200, status: 'high' },
      { date: '2024-09', value: 195, target: 200, status: 'normal' },
      { date: '2024-12', value: 180, target: 200, status: 'normal' },
    ],
    creatinine: [
      { date: '2024-06', value: 1.0, target: 1.2, status: 'normal' },
      { date: '2024-09', value: 0.95, target: 1.2, status: 'normal' },
      { date: '2024-12', value: 0.9, target: 1.2, status: 'normal' },
    ],
    bloodPressure: [
      { date: '2024-06', systolic: 145, diastolic: 92, status: 'high' },
      { date: '2024-09', systolic: 138, diastolic: 86, status: 'elevated' },
      { date: '2024-12', systolic: 128, diastolic: 82, status: 'normal' },
    ]
  };

  const recentResults = [
    {
      test: "Complete Blood Count",
      date: "2024-12-15",
      status: "Normal",
      critical: false,
      results: [
        { name: "WBC", value: "7.2", unit: "K/uL", range: "4.0-11.0", status: "normal" },
        { name: "RBC", value: "4.5", unit: "M/uL", range: "4.2-5.4", status: "normal" },
        { name: "Hemoglobin", value: "13.8", unit: "g/dL", range: "12.0-15.5", status: "normal" },
        { name: "Hematocrit", value: "41.2", unit: "%", range: "36.0-46.0", status: "normal" }
      ]
    },
    {
      test: "Comprehensive Metabolic Panel",
      date: "2024-12-15",
      status: "Abnormal",
      critical: false,
      results: [
        { name: "Glucose", value: "132", unit: "mg/dL", range: "70-100", status: "high" },
        { name: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.6-1.2", status: "normal" },
        { name: "BUN", value: "18", unit: "mg/dL", range: "7-20", status: "normal" },
        { name: "Sodium", value: "142", unit: "mEq/L", range: "136-145", status: "normal" }
      ]
    },
    {
      test: "Lipid Panel",
      date: "2024-12-10",
      status: "Normal",
      critical: false,
      results: [
        { name: "Total Cholesterol", value: "180", unit: "mg/dL", range: "<200", status: "normal" },
        { name: "LDL", value: "95", unit: "mg/dL", range: "<100", status: "normal" },
        { name: "HDL", value: "52", unit: "mg/dL", range: ">40", status: "normal" },
        { name: "Triglycerides", value: "165", unit: "mg/dL", range: "<150", status: "high" }
      ]
    },
    {
      test: "Thyroid Function",
      date: "2024-12-05",
      status: "Normal",
      critical: false,
      results: [
        { name: "TSH", value: "2.1", unit: "mIU/L", range: "0.4-4.0", status: "normal" },
        { name: "Free T4", value: "1.3", unit: "ng/dL", range: "0.8-1.8", status: "normal" }
      ]
    }
  ];

  const imagingResults = [
    {
      type: "Chest X-Ray",
      date: "2024-12-12",
      indication: "Annual screening",
      findings: "No acute cardiopulmonary abnormalities. Heart size normal. Lungs clear.",
      impression: "Normal chest X-ray",
      status: "Final"
    },
    {
      type: "Abdominal Ultrasound",
      date: "2024-11-28",
      indication: "Abdominal pain",
      findings: "Liver appears normal in size and echogenicity. Gallbladder without stones. No free fluid.",
      impression: "Normal abdominal ultrasound",
      status: "Final"
    },
    {
      type: "Bone Density Scan",
      date: "2024-10-15",
      indication: "Osteoporosis screening",
      findings: "T-score: Lumbar spine -1.8, Hip -1.5",
      impression: "Osteopenia",
      status: "Final"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getResultStatusIcon = (status) => {
    switch(status) {
      case 'high': return <FiTrendingUp className="text-orange-500" size={16} />;
      case 'low': return <FiTrendingDown className="text-blue-500" size={16} />;
      case 'critical': return <FiAlertCircle className="text-red-500" size={16} />;
      default: return <FiActivity className="text-green-500" size={16} />;
    }
  };

  const TrendChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#3B82F6" 
          strokeWidth={3}
          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke="#EF4444" 
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="space-y-6">
      {/* Lab Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-blue-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Lab Results & Trends</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FiRefreshCw size={16} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FiDownload size={16} />
              </button>
            </div>
          </div>

          {/* Metric Selection */}
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.keys(labData).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === metric
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="p-6">
          <TrendChart data={labData[selectedMetric]} />
        </div>
      </div>

      {/* Recent Lab Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaVial className="text-green-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Recent Lab Results</h2>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {recentResults.map((result, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{result.test}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600">{result.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.status === 'Normal' ? 'bg-green-100 text-green-800' :
                      result.status === 'Abnormal' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Full Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {result.results.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${getStatusColor(item.status)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      {getResultStatusIcon(item.status)}
                    </div>
                    <div className="text-lg font-semibold">{item.value} {item.unit}</div>
                    <div className="text-xs text-gray-600">Range: {item.range}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Imaging Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FaXRay className="text-purple-500" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">Imaging & Diagnostics</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {imagingResults.map((imaging, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold text-gray-900">{imaging.type}</h3>
                    <span className="text-sm text-gray-600">{imaging.date}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {imaging.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Indication:</span>
                      <span className="text-gray-600 ml-1">{imaging.indication}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Findings:</span>
                      <span className="text-gray-600 ml-1">{imaging.findings}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Impression:</span>
                      <span className="text-gray-600 ml-1">{imaging.impression}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <FiDownload size={16} />
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Images
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabResultsTrends;
