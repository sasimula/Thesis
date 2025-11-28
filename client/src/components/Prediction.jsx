// // // import React, { useState, useEffect } from 'react'
// // // import { Upload, FileText, Send, Database, AlertCircle, CheckCircle, XCircle, Download, Trash2 } from 'lucide-react'
// // // import { API_ENDPOINTS } from '../config/api'

// // // const Prediction = () => {
// // //   const [inputMode, setInputMode] = useState('manual')
// // //   const [formData, setFormData] = useState({})
// // //   const [csvFile, setCsvFile] = useState(null)
// // //   const [predictions, setPredictions] = useState([])
// // //   const [isLoading, setIsLoading] = useState(false)

// // //   // Key features for manual input (selecting important ones for UI)
// // //   const featureGroups = {
// // //     'Flow Features': [
// // //       { name: 'flow_duration', label: 'Flow Duration', placeholder: 'e.g., 0.5' },
// // //       { name: 'flow_bytes_s', label: 'Flow Bytes/s', placeholder: 'e.g., 1024' },
// // //       { name: 'flow_packets_s', label: 'Flow Packets/s', placeholder: 'e.g., 100' },
// // //     ],
// // //     'Packet Features': [
// // //       { name: 'total_fwd_packets', label: 'Total Fwd Packets', placeholder: 'e.g., 10' },
// // //       { name: 'total_bwd_packets', label: 'Total Bwd Packets', placeholder: 'e.g., 8' },
// // //       { name: 'packet_length_mean', label: 'Packet Length Mean', placeholder: 'e.g., 512' },
// // //     ],
// // //     'Flag Features': [
// // //       { name: 'syn_flag_count', label: 'SYN Flag Count', placeholder: 'e.g., 1' },
// // //       { name: 'ack_flag_count', label: 'ACK Flag Count', placeholder: 'e.g., 1' },
// // //       { name: 'psh_flag_count', label: 'PSH Flag Count', placeholder: 'e.g., 0' },
// // //     ],
// // //   }

// // //   const attackTypes = {
// // //     0: { name: 'BENIGN', color: 'green' },
// // //     1: { name: 'Bot', color: 'orange' },
// // //     2: { name: 'DDoS', color: 'red' },
// // //     3: { name: 'DoS GoldenEye', color: 'red' },
// // //     4: { name: 'DoS Hulk', color: 'red' },
// // //     5: { name: 'DoS Slowhttptest', color: 'red' },
// // //     6: { name: 'DoS Slowloris', color: 'red' },
// // //     7: { name: 'FTP-Patator', color: 'orange' },
// // //     8: { name: 'Heartbleed', color: 'purple' },
// // //     9: { name: 'Infiltration', color: 'purple' },
// // //     10: { name: 'PortScan', color: 'yellow' },
// // //     11: { name: 'SSH-Patator', color: 'orange' },
// // //     12: { name: 'Web Attack - Brute Force', color: 'red' },
// // //     13: { name: 'Web Attack - SQL Injection', color: 'red' },
// // //     14: { name: 'Web Attack - XSS', color: 'red' },
// // //   }

// // //   const handleInputChange = (name, value) => {
// // //     setFormData(prev => ({ ...prev, [name]: value }))
// // //   }

// // //   const handleFileUpload = (event) => {
// // //     const file = event.target.files[0]
// // //     if (file && file.type === 'text/csv') {
// // //       setCsvFile(file)
// // //     }
// // //   }

// // //   const handleManualPredict = async () => {
// // //     setIsLoading(true)
// // //     try {
// // //       // Prepare the data for API call
// // //       const apiData = {}
      
// // //       // Map form data to API expected format
// // //       Object.entries(featureGroups).forEach(([groupName, features]) => {
// // //         features.forEach(feature => {
// // //           const value = formData[feature.name]
// // //           if (value !== undefined && value !== '') {
// // //             // Map to actual API field names
// // //             const apiFieldName = feature.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
// // //             apiData[apiFieldName] = parseFloat(value) || 0
// // //           }
// // //         })
// // //       })
      
// // //       // Fill missing fields with default values
// // //       const defaultFields = {
// // //         'Destination Port': 0,
// // //         'Flow Duration': apiData['Flow Duration'] || 0,
// // //         'Total Fwd Packets': apiData['Total Fwd Packets'] || 0,
// // //         'Total Backward Packets': apiData['Total Bwd Packets'] || 0,
// // //         'Flow Bytes/s': apiData['Flow Bytes S'] || 0,
// // //         'Flow Packets/s': apiData['Flow Packets S'] || 0,
// // //         'Packet Length Mean': apiData['Packet Length Mean'] || 0,
// // //         'SYN Flag Count': apiData['Syn Flag Count'] || 0,
// // //         'ACK Flag Count': apiData['Ack Flag Count'] || 0,
// // //         'PSH Flag Count': apiData['Psh Flag Count'] || 0
// // //       }
      
// // //       // Merge with defaults
// // //       const finalData = { ...defaultFields, ...apiData }
      
// // //       const response = await fetch(API_ENDPOINTS.PREDICT, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(finalData)
// // //       })
      
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`)
// // //       }
      
// // //       const result = await response.json()
      
// // //       setPredictions([{
// // //         id: Date.now(),
// // //         type: 'Manual Entry',
// // //         result: result.attack_type,
// // //         confidence: result.confidence,
// // //         label: result.label,
// // //         timestamp: new Date().toLocaleTimeString()
// // //       }])
      
// // //     } catch (error) {
// // //       console.error('Prediction error:', error)
// // //       alert('Error making prediction. Please check if the server is running.')
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const handleCsvPredict = async () => {
// // //     if (!csvFile) return
// // //     setIsLoading(true)
    
// // //     try {
// // //       const formData = new FormData()
// // //       formData.append('file', csvFile)
      
// // //       const response = await fetch(API_ENDPOINTS.PREDICT_CSV, {
// // //         method: 'POST',
// // //         body: formData
// // //       })
      
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`)
// // //       }
      
// // //       const result = await response.json()
      
// // //       const predictions = result.results.map(item => ({
// // //         id: Date.now() + item.row,
// // //         row: item.row,
// // //         result: item.attack_type,
// // //         confidence: item.confidence,
// // //         label: item.label,
// // //       }))
      
// // //       setPredictions(predictions)
      
// // //     } catch (error) {
// // //       console.error('CSV prediction error:', error)
// // //       alert('Error processing CSV file. Please check if the server is running and the CSV format is correct.')
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const getAttackColor = (label) => {
// // //     const colors = {
// // //       green: 'text-green-400 bg-green-400/10 border-green-400/20',
// // //       yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
// // //       orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
// // //       red: 'text-red-400 bg-red-400/10 border-red-400/20',
// // //       purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
// // //     }
// // //     return colors[attackTypes[label]?.color] || colors.green
// // //   }

// // //   return (
// // //     <div className="space-y-8">
// // //       {/* Header */}
// // //       <div className="text-center">
// // //         <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
// // //           Network Traffic Prediction
// // //         </h2>
// // //         <p className="text-gray-400">Analyze network traffic patterns using AI-powered detection</p>
// // //       </div>

// // //       {/* Input Mode Toggle */}
// // //       <div className="flex justify-center">
// // //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
// // //           <div className="flex space-x-1">
// // //             <button
// // //               onClick={() => setInputMode('manual')}
// // //               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
// // //                 inputMode === 'manual'
// // //                   ? 'bg-white text-black shadow-lg'
// // //                   : 'text-gray-400 hover:text-white hover:bg-white/5'
// // //               }`}
// // //             >
// // //               <FileText className="w-4 h-4" />
// // //               <span>Manual Entry</span>
// // //             </button>
// // //             <button
// // //               onClick={() => setInputMode('csv')}
// // //               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
// // //                 inputMode === 'csv'
// // //                   ? 'bg-white text-black shadow-lg'
// // //                   : 'text-gray-400 hover:text-white hover:bg-white/5'
// // //               }`}
// // //             >
// // //               <Upload className="w-4 h-4" />
// // //               <span>CSV Upload</span>
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Input Section */}
// // //       {inputMode === 'manual' ? (
// // //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
// // //           <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
// // //             <Database className="w-5 h-5 mr-2 text-white" />
// // //             Enter Network Features
// // //           </h3>
          
// // //           <div className="space-y-6">
// // //             {Object.entries(featureGroups).map(([groupName, features]) => (
// // //               <div key={groupName}>
// // //                 <h4 className="text-sm font-medium text-gray-300 mb-3">{groupName}</h4>
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                   {features.map((feature) => (
// // //                     <div key={feature.name}>
// // //                       <label className="block text-sm font-medium text-gray-300 mb-2">
// // //                         {feature.label}
// // //                       </label>
// // //                       <input
// // //                         type="number"
// // //                         step="any"
// // //                         placeholder={feature.placeholder}
// // //                         onChange={(e) => handleInputChange(feature.name, e.target.value)}
// // //                         className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
// // //                       />
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <button
// // //             onClick={handleManualPredict}
// // //             disabled={isLoading}
// // //             className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
// // //           >
// // //             {isLoading ? (
// // //               <>
// // //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// // //                 <span>Analyzing...</span>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <Send className="w-5 h-5" />
// // //                 <span>Predict Attack Type</span>
// // //               </>
// // //             )}
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
// // //           <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
// // //             <Upload className="w-5 h-5 mr-2 text-white" />
// // //             Upload CSV File
// // //           </h3>

// // //           <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-white/40 transition-all duration-300">
// // //             <input
// // //               type="file"
// // //               accept=".csv"
// // //               onChange={handleFileUpload}
// // //               className="hidden"
// // //               id="csv-upload"
// // //             />
// // //             <label htmlFor="csv-upload" className="cursor-pointer">
// // //               <Upload className="w-16 h-16 mx-auto text-white mb-4" />
// // //               <p className="text-white font-medium mb-2">
// // //                 {csvFile ? csvFile.name : 'Click to upload or drag and drop'}
// // //               </p>
// // //               <p className="text-gray-400 text-sm">CSV files only (max 10MB)</p>
// // //             </label>
// // //           </div>

// // //           {csvFile && (
// // //             <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
// // //               <div className="flex items-center justify-between">
// // //                 <div className="flex items-center space-x-3">
// // //                   <FileText className="w-5 h-5 text-white" />
// // //                   <div>
// // //                     <p className="text-white font-medium">{csvFile.name}</p>
// // //                     <p className="text-gray-400 text-sm">
// // //                       {(csvFile.size / 1024).toFixed(2)} KB
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <button
// // //                   onClick={() => setCsvFile(null)}
// // //                   className="text-red-400 hover:text-red-300 transition-colors"
// // //                 >
// // //                   <Trash2 className="w-5 h-5" />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           )}

// // //           <button
// // //             onClick={handleCsvPredict}
// // //             disabled={!csvFile || isLoading}
// // //             className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
// // //           >
// // //             {isLoading ? (
// // //               <>
// // //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// // //                 <span>Processing CSV...</span>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <Database className="w-5 h-5" />
// // //                 <span>Analyze CSV Data</span>
// // //               </>
// // //             )}
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* Results Section */}
// // //       {predictions.length > 0 && (
// // //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
// // //           <div className="flex items-center justify-between mb-6">
// // //             <h3 className="text-xl font-semibold text-white flex items-center">
// // //               <AlertCircle className="w-5 h-5 mr-2 text-white" />
// // //               Prediction Results
// // //             </h3>
// // //             <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
// // //               <Download className="w-4 h-4" />
// // //               <span className="text-sm">Export</span>
// // //             </button>
// // //           </div>

// // //           {inputMode === 'manual' ? (
// // //             predictions.map((pred) => (
// // //               <div key={pred.id} className="bg-white/5 rounded-lg p-6">
// // //                 <div className="flex items-center justify-between mb-4">
// // //                   <div className="flex items-center space-x-3">
// // //                     {pred.label === 0 ? (
// // //                       <CheckCircle className="w-8 h-8 text-green-400" />
// // //                     ) : (
// // //                       <XCircle className="w-8 h-8 text-red-400" />
// // //                     )}
// // //                     <div>
// // //                       <p className="text-white font-semibold text-lg">{pred.result}</p>
// // //                       <p className="text-gray-400 text-sm">Confidence: {pred.confidence}%</p>
// // //                     </div>
// // //                   </div>
// // //                   <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getAttackColor(pred.label)}`}>
// // //                     {pred.label === 0 ? 'Safe' : 'Threat'}
// // //                   </span>
// // //                 </div>
// // //                 <div className="text-gray-400 text-sm">
// // //                   Analyzed at {pred.timestamp}
// // //                 </div>
// // //               </div>
// // //             ))
// // //           ) : (
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full">
// // //                 <thead>
// // //                   <tr className="border-b border-white/20">
// // //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Row</th>
// // //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Classification</th>
// // //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
// // //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {predictions.map((pred) => (
// // //                     <tr key={pred.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
// // //                       <td className="py-4 px-4 text-white">{pred.row}</td>
// // //                       <td className="py-4 px-4">
// // //                         <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getAttackColor(pred.label)}`}>
// // //                           {pred.result}
// // //                         </span>
// // //                       </td>
// // //                       <td className="py-4 px-4 text-gray-300">{pred.confidence}%</td>
// // //                       <td className="py-4 px-4">
// // //                         {pred.label === 0 ? (
// // //                           <CheckCircle className="w-5 h-5 text-green-400" />
// // //                         ) : (
// // //                           <XCircle className="w-5 h-5 text-red-400" />
// // //                         )}
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // export default Prediction

// // import React, { useState, useEffect } from 'react'
// // import { Upload, FileText, Send, Database, AlertCircle, CheckCircle, XCircle, Download, Trash2 } from 'lucide-react'
// // import { API_ENDPOINTS } from '../config/api'

// // const Prediction = () => {
// //   const [inputMode, setInputMode] = useState('manual')
// //   const [formData, setFormData] = useState({})
// //   const [csvFile, setCsvFile] = useState(null)
// //   const [predictions, setPredictions] = useState([])
// //   const [isLoading, setIsLoading] = useState(false)

// //   // Key features for manual input (selecting important ones for UI)
// //   const featureGroups = {
// //     'Flow Features': [
// //       { name: 'flow_duration', label: 'Flow Duration', placeholder: 'e.g., 0.5' },
// //       { name: 'flow_bytes_s', label: 'Flow Bytes/s', placeholder: 'e.g., 1024' },
// //       { name: 'flow_packets_s', label: 'Flow Packets/s', placeholder: 'e.g., 100' },
// //     ],
// //     'Packet Features': [
// //       { name: 'total_fwd_packets', label: 'Total Fwd Packets', placeholder: 'e.g., 10' },
// //       { name: 'total_bwd_packets', label: 'Total Bwd Packets', placeholder: 'e.g., 8' },
// //       { name: 'packet_length_mean', label: 'Packet Length Mean', placeholder: 'e.g., 512' },
// //     ],
// //     'Flag Features': [
// //       { name: 'syn_flag_count', label: 'SYN Flag Count', placeholder: 'e.g., 1' },
// //       { name: 'ack_flag_count', label: 'ACK Flag Count', placeholder: 'e.g., 1' },
// //       { name: 'psh_flag_count', label: 'PSH Flag Count', placeholder: 'e.g., 0' },
// //     ],
// //   }

// //   const attackTypes = {
// //     0: { name: 'BENIGN', color: 'green' },
// //     1: { name: 'Bot', color: 'orange' },
// //     2: { name: 'DDoS', color: 'red' },
// //     3: { name: 'DoS GoldenEye', color: 'red' },
// //     4: { name: 'DoS Hulk', color: 'red' },
// //     5: { name: 'DoS Slowhttptest', color: 'red' },
// //     6: { name: 'DoS Slowloris', color: 'red' },
// //     7: { name: 'FTP-Patator', color: 'orange' },
// //     8: { name: 'Heartbleed', color: 'purple' },
// //     9: { name: 'Infiltration', color: 'purple' },
// //     10: { name: 'PortScan', color: 'yellow' },
// //     11: { name: 'SSH-Patator', color: 'orange' },
// //     12: { name: 'Web Attack - Brute Force', color: 'red' },
// //     13: { name: 'Web Attack - SQL Injection', color: 'red' },
// //     14: { name: 'Web Attack - XSS', color: 'red' },
// //   }

// //   const handleInputChange = (name, value) => {
// //     setFormData(prev => ({ ...prev, [name]: value }))
// //   }

// //   const handleFileUpload = (event) => {
// //     const file = event.target.files[0]
// //     if (file && file.type === 'text/csv') {
// //       setCsvFile(file)
// //     }
// //   }

// //   const handleManualPredict = async () => {
// //     setIsLoading(true)
// //     try {
// //       // Prepare the data for API call - needs all 79 features
// //       const apiData = {
// //         'Unnamed: 0': 0,
// //         'Destination Port': 0,
// //         'Flow Duration': parseFloat(formData.flow_duration) || 0,
// //         'Total Fwd Packets': parseFloat(formData.total_fwd_packets) || 0,
// //         'Total Backward Packets': parseFloat(formData.total_bwd_packets) || 0,
// //         'Total Length of Fwd Packets': 0,
// //         'Total Length of Bwd Packets': 0,
// //         'Fwd Packet Length Max': 0,
// //         'Fwd Packet Length Min': 0,
// //         'Fwd Packet Length Mean': 0,
// //         'Fwd Packet Length Std': 0,
// //         'Bwd Packet Length Max': 0,
// //         'Bwd Packet Length Min': 0,
// //         'Bwd Packet Length Mean': 0,
// //         'Bwd Packet Length Std': 0,
// //         'Flow Bytes/s': parseFloat(formData.flow_bytes_s) || 0,
// //         'Flow Packets/s': parseFloat(formData.flow_packets_s) || 0,
// //         'Flow IAT Mean': 0,
// //         'Flow IAT Std': 0,
// //         'Flow IAT Max': 0,
// //         'Flow IAT Min': 0,
// //         'Fwd IAT Total': 0,
// //         'Fwd IAT Mean': 0,
// //         'Fwd IAT Std': 0,
// //         'Fwd IAT Max': 0,
// //         'Fwd IAT Min': 0,
// //         'Bwd IAT Total': 0,
// //         'Bwd IAT Mean': 0,
// //         'Bwd IAT Std': 0,
// //         'Bwd IAT Max': 0,
// //         'Bwd IAT Min': 0,
// //         'Fwd PSH Flags': 0,
// //         'Bwd PSH Flags': 0,
// //         'Fwd URG Flags': 0,
// //         'Bwd URG Flags': 0,
// //         'Fwd Header Length': 0,
// //         'Bwd Header Length': 0,
// //         'Fwd Packets/s': 0,
// //         'Bwd Packets/s': 0,
// //         'Min Packet Length': 0,
// //         'Max Packet Length': 0,
// //         'Packet Length Mean': parseFloat(formData.packet_length_mean) || 0,
// //         'Packet Length Std': 0,
// //         'Packet Length Variance': 0,
// //         'FIN Flag Count': 0,
// //         'SYN Flag Count': parseFloat(formData.syn_flag_count) || 0,
// //         'RST Flag Count': 0,
// //         'PSH Flag Count': parseFloat(formData.psh_flag_count) || 0,
// //         'ACK Flag Count': parseFloat(formData.ack_flag_count) || 0,
// //         'URG Flag Count': 0,
// //         'CWE Flag Count': 0,
// //         'ECE Flag Count': 0,
// //         'Down/Up Ratio': 0,
// //         'Average Packet Size': 0,
// //         'Avg Fwd Segment Size': 0,
// //         'Avg Bwd Segment Size': 0,
// //         'Fwd Header Length.1': 0,
// //         'Fwd Avg Bytes/Bulk': 0,
// //         'Fwd Avg Packets/Bulk': 0,
// //         'Fwd Avg Bulk Rate': 0,
// //         'Bwd Avg Bytes/Bulk': 0,
// //         'Bwd Avg Packets/Bulk': 0,
// //         'Bwd Avg Bulk Rate': 0,
// //         'Subflow Fwd Packets': 0,
// //         'Subflow Fwd Bytes': 0,
// //         'Subflow Bwd Packets': 0,
// //         'Subflow Bwd Bytes': 0,
// //         'Init_Win_bytes_forward': 0,
// //         'Init_Win_bytes_backward': 0,
// //         'act_data_pkt_fwd': 0,
// //         'min_seg_size_forward': 0,
// //         'Active Mean': 0,
// //         'Active Std': 0,
// //         'Active Max': 0,
// //         'Active Min': 0,
// //         'Idle Mean': 0,
// //         'Idle Std': 0,
// //         'Idle Max': 0,
// //         'Idle Min': 0
// //       }
      
// //       const response = await fetch(API_ENDPOINTS.PREDICT, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(apiData)
// //       })
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
      
// //       const result = await response.json()
      
// //       setPredictions([{
// //         id: Date.now(),
// //         type: 'Manual Entry',
// //         result: result.attack_type,
// //         confidence: result.confidence,
// //         label: result.label,
// //         timestamp: new Date().toLocaleTimeString()
// //       }])
      
// //     } catch (error) {
// //       console.error('Prediction error:', error)
// //       alert('Error making prediction. Please check if the server is running.')
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const handleCsvPredict = async () => {
// //     if (!csvFile) return
// //     setIsLoading(true)
    
// //     try {
// //       const formData = new FormData()
// //       formData.append('file', csvFile)
      
// //       const response = await fetch(API_ENDPOINTS.PREDICT_CSV, {
// //         method: 'POST',
// //         body: formData
// //       })
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
      
// //       const result = await response.json()
      
// //       // Updated to handle the actual response structure
// //       const predictions = result.results.map(item => ({
// //         id: Date.now() + item.row,
// //         row: item.row,
// //         result: item.predicted_type || item.attack_type || attackTypes[item.predicted_label]?.name || 'Unknown',
// //         confidence: item.confidence,
// //         label: item.predicted_label !== undefined ? item.predicted_label : item.label,
// //         actual_label: item.actual_label,
// //         actual_type: item.actual_type,
// //         correct: item.correct
// //       }))
      
// //       setPredictions(predictions)
      
// //       // Show accuracy if available
// //       if (result.accuracy !== undefined) {
// //         console.log(`Accuracy: ${result.accuracy}%`)
// //         console.log(`Correct: ${result.correct_predictions}/${result.total_predictions}`)
// //       }
      
// //     } catch (error) {
// //       console.error('CSV prediction error:', error)
// //       alert('Error processing CSV file. Please check if the server is running and the CSV format is correct.')
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const getAttackColor = (label) => {
// //     const colors = {
// //       green: 'text-green-400 bg-green-400/10 border-green-400/20',
// //       yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
// //       orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
// //       red: 'text-red-400 bg-red-400/10 border-red-400/20',
// //       purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
// //     }
// //     const attackType = attackTypes[label]
// //     return colors[attackType?.color] || colors.red
// //   }

// //   return (
// //     <div className="space-y-8">
// //       {/* Header */}
// //       <div className="text-center">
// //         <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
// //           Network Traffic Prediction
// //         </h2>
// //         <p className="text-gray-400">Analyze network traffic patterns using AI-powered detection</p>
// //       </div>

// //       {/* Input Mode Toggle */}
// //       <div className="flex justify-center">
// //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
// //           <div className="flex space-x-1">
// //             <button
// //               onClick={() => setInputMode('manual')}
// //               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
// //                 inputMode === 'manual'
// //                   ? 'bg-white text-black shadow-lg'
// //                   : 'text-gray-400 hover:text-white hover:bg-white/5'
// //               }`}
// //             >
// //               <FileText className="w-4 h-4" />
// //               <span>Manual Entry</span>
// //             </button>
// //             <button
// //               onClick={() => setInputMode('csv')}
// //               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
// //                 inputMode === 'csv'
// //                   ? 'bg-white text-black shadow-lg'
// //                   : 'text-gray-400 hover:text-white hover:bg-white/5'
// //               }`}
// //             >
// //               <Upload className="w-4 h-4" />
// //               <span>CSV Upload</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Input Section - Same as before */}
// //       {inputMode === 'manual' ? (
// //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
// //           <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
// //             <Database className="w-5 h-5 mr-2 text-white" />
// //             Enter Network Features
// //           </h3>
          
// //           <div className="space-y-6">
// //             {Object.entries(featureGroups).map(([groupName, features]) => (
// //               <div key={groupName}>
// //                 <h4 className="text-sm font-medium text-gray-300 mb-3">{groupName}</h4>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   {features.map((feature) => (
// //                     <div key={feature.name}>
// //                       <label className="block text-sm font-medium text-gray-300 mb-2">
// //                         {feature.label}
// //                       </label>
// //                       <input
// //                         type="number"
// //                         step="any"
// //                         placeholder={feature.placeholder}
// //                         onChange={(e) => handleInputChange(feature.name, e.target.value)}
// //                         className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <button
// //             onClick={handleManualPredict}
// //             disabled={isLoading}
// //             className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
// //           >
// //             {isLoading ? (
// //               <>
// //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
// //                 <span>Analyzing...</span>
// //               </>
// //             ) : (
// //               <>
// //                 <Send className="w-5 h-5" />
// //                 <span>Predict Attack Type</span>
// //               </>
// //             )}
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
// //           <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
// //             <Upload className="w-5 h-5 mr-2 text-white" />
// //             Upload CSV File
// //           </h3>

// //           <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-white/40 transition-all duration-300">
// //             <input
// //               type="file"
// //               accept=".csv"
// //               onChange={handleFileUpload}
// //               className="hidden"
// //               id="csv-upload"
// //             />
// //             <label htmlFor="csv-upload" className="cursor-pointer">
// //               <Upload className="w-16 h-16 mx-auto text-white mb-4" />
// //               <p className="text-white font-medium mb-2">
// //                 {csvFile ? csvFile.name : 'Click to upload or drag and drop'}
// //               </p>
// //               <p className="text-gray-400 text-sm">CSV files only (max 10MB)</p>
// //             </label>
// //           </div>

// //           {csvFile && (
// //             <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-3">
// //                   <FileText className="w-5 h-5 text-white" />
// //                   <div>
// //                     <p className="text-white font-medium">{csvFile.name}</p>
// //                     <p className="text-gray-400 text-sm">
// //                       {(csvFile.size / 1024).toFixed(2)} KB
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <button
// //                   onClick={() => setCsvFile(null)}
// //                   className="text-red-400 hover:text-red-300 transition-colors"
// //                 >
// //                   <Trash2 className="w-5 h-5" />
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <button
// //             onClick={handleCsvPredict}
// //             disabled={!csvFile || isLoading}
// //             className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
// //           >
// //             {isLoading ? (
// //               <>
// //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
// //                 <span>Processing CSV...</span>
// //               </>
// //             ) : (
// //               <>
// //                 <Database className="w-5 h-5" />
// //                 <span>Analyze CSV Data</span>
// //               </>
// //             )}
// //           </button>
// //         </div>
// //       )}

// //       {/* Updated Results Section */}
// //       {predictions.length > 0 && (
// //         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
// //           <div className="flex items-center justify-between mb-6">
// //             <h3 className="text-xl font-semibold text-white flex items-center">
// //               <AlertCircle className="w-5 h-5 mr-2 text-white" />
// //               Prediction Results
// //             </h3>
// //             <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
// //               <Download className="w-4 h-4" />
// //               <span className="text-sm">Export</span>
// //             </button>
// //           </div>

// //           {inputMode === 'manual' ? (
// //             predictions.map((pred) => (
// //               <div key={pred.id} className="bg-white/5 rounded-lg p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <div className="flex items-center space-x-3">
// //                     {pred.label === 0 ? (
// //                       <CheckCircle className="w-8 h-8 text-green-400" />
// //                     ) : (
// //                       <XCircle className="w-8 h-8 text-red-400" />
// //                     )}
// //                     <div>
// //                       <p className="text-white font-semibold text-lg">{pred.result}</p>
// //                       <p className="text-gray-400 text-sm">Confidence: {pred.confidence}%</p>
// //                     </div>
// //                   </div>
// //                   <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getAttackColor(pred.label)}`}>
// //                     {pred.label === 0 ? 'Safe' : 'Threat'}
// //                   </span>
// //                 </div>
// //                 <div className="text-gray-400 text-sm">
// //                   Analyzed at {pred.timestamp}
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead>
// //                   <tr className="border-b border-white/20">
// //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Row</th>
// //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Predicted</th>
// //                     {predictions[0]?.actual_type && (
// //                       <th className="text-left py-3 px-4 text-gray-300 font-medium">Actual</th>
// //                     )}
// //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
// //                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {predictions.map((pred) => (
// //                     <tr key={pred.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
// //                       <td className="py-4 px-4 text-white">{pred.row}</td>
// //                       <td className="py-4 px-4">
// //                         <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getAttackColor(pred.label)}`}>
// //                           {pred.result}
// //                         </span>
// //                       </td>
// //                       {pred.actual_type && (
// //                         <td className="py-4 px-4">
// //                           <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getAttackColor(pred.actual_label)}`}>
// //                             {pred.actual_type}
// //                           </span>
// //                         </td>
// //                       )}
// //                       <td className="py-4 px-4 text-gray-300">{pred.confidence}%</td>
// //                       <td className="py-4 px-4">
// //                         {pred.correct !== undefined ? (
// //                           pred.correct ? (
// //                             <CheckCircle className="w-5 h-5 text-green-400" title="Correct prediction" />
// //                           ) : (
// //                             <XCircle className="w-5 h-5 text-red-400" title="Incorrect prediction" />
// //                           )
// //                         ) : (
// //                           pred.label === 0 ? (
// //                             <CheckCircle className="w-5 h-5 text-green-400" title="Safe" />
// //                           ) : (
// //                             <XCircle className="w-5 h-5 text-red-400" title="Threat detected" />
// //                           )
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Prediction

// import React, { useState } from 'react'
// import { Upload, FileText, Send, Database, AlertCircle, CheckCircle, XCircle, Download, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
// import { API_ENDPOINTS } from '../config/api'

// const Prediction = () => {
//   const [inputMode, setInputMode] = useState('manual')
//   const [formData, setFormData] = useState({})
//   const [csvFile, setCsvFile] = useState(null)
//   const [predictions, setPredictions] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [expandedGroups, setExpandedGroups] = useState({})

//   // ALL 79 features organized into groups
//   const featureGroups = {
//     'Basic Features': [
//       { name: 'unnamed_0', label: 'Unnamed: 0', apiName: 'Unnamed: 0', placeholder: '0' },
//       { name: 'destination_port', label: 'Destination Port', apiName: 'Destination Port', placeholder: '80' },
//       { name: 'flow_duration', label: 'Flow Duration', apiName: 'Flow Duration', placeholder: '0.5' },
//     ],
//     'Packet Counts': [
//       { name: 'total_fwd_packets', label: 'Total Fwd Packets', apiName: 'Total Fwd Packets', placeholder: '10' },
//       { name: 'total_backward_packets', label: 'Total Backward Packets', apiName: 'Total Backward Packets', placeholder: '8' },
//       { name: 'total_length_fwd_packets', label: 'Total Length of Fwd Packets', apiName: 'Total Length of Fwd Packets', placeholder: '1000' },
//       { name: 'total_length_bwd_packets', label: 'Total Length of Bwd Packets', apiName: 'Total Length of Bwd Packets', placeholder: '800' },
//     ],
//     'Forward Packet Statistics': [
//       { name: 'fwd_packet_length_max', label: 'Fwd Packet Length Max', apiName: 'Fwd Packet Length Max', placeholder: '512' },
//       { name: 'fwd_packet_length_min', label: 'Fwd Packet Length Min', apiName: 'Fwd Packet Length Min', placeholder: '0' },
//       { name: 'fwd_packet_length_mean', label: 'Fwd Packet Length Mean', apiName: 'Fwd Packet Length Mean', placeholder: '256' },
//       { name: 'fwd_packet_length_std', label: 'Fwd Packet Length Std', apiName: 'Fwd Packet Length Std', placeholder: '100' },
//     ],
//     'Backward Packet Statistics': [
//       { name: 'bwd_packet_length_max', label: 'Bwd Packet Length Max', apiName: 'Bwd Packet Length Max', placeholder: '512' },
//       { name: 'bwd_packet_length_min', label: 'Bwd Packet Length Min', apiName: 'Bwd Packet Length Min', placeholder: '0' },
//       { name: 'bwd_packet_length_mean', label: 'Bwd Packet Length Mean', apiName: 'Bwd Packet Length Mean', placeholder: '256' },
//       { name: 'bwd_packet_length_std', label: 'Bwd Packet Length Std', apiName: 'Bwd Packet Length Std', placeholder: '100' },
//     ],
//     'Flow Metrics': [
//       { name: 'flow_bytes_s', label: 'Flow Bytes/s', apiName: 'Flow Bytes/s', placeholder: '1024' },
//       { name: 'flow_packets_s', label: 'Flow Packets/s', apiName: 'Flow Packets/s', placeholder: '100' },
//       { name: 'flow_iat_mean', label: 'Flow IAT Mean', apiName: 'Flow IAT Mean', placeholder: '0.1' },
//       { name: 'flow_iat_std', label: 'Flow IAT Std', apiName: 'Flow IAT Std', placeholder: '0.05' },
//       { name: 'flow_iat_max', label: 'Flow IAT Max', apiName: 'Flow IAT Max', placeholder: '1.0' },
//       { name: 'flow_iat_min', label: 'Flow IAT Min', apiName: 'Flow IAT Min', placeholder: '0.001' },
//     ],
//     'Forward IAT': [
//       { name: 'fwd_iat_total', label: 'Fwd IAT Total', apiName: 'Fwd IAT Total', placeholder: '0.5' },
//       { name: 'fwd_iat_mean', label: 'Fwd IAT Mean', apiName: 'Fwd IAT Mean', placeholder: '0.1' },
//       { name: 'fwd_iat_std', label: 'Fwd IAT Std', apiName: 'Fwd IAT Std', placeholder: '0.05' },
//       { name: 'fwd_iat_max', label: 'Fwd IAT Max', apiName: 'Fwd IAT Max', placeholder: '0.5' },
//       { name: 'fwd_iat_min', label: 'Fwd IAT Min', apiName: 'Fwd IAT Min', placeholder: '0.001' },
//     ],
//     'Backward IAT': [
//       { name: 'bwd_iat_total', label: 'Bwd IAT Total', apiName: 'Bwd IAT Total', placeholder: '0.5' },
//       { name: 'bwd_iat_mean', label: 'Bwd IAT Mean', apiName: 'Bwd IAT Mean', placeholder: '0.1' },
//       { name: 'bwd_iat_std', label: 'Bwd IAT Std', apiName: 'Bwd IAT Std', placeholder: '0.05' },
//       { name: 'bwd_iat_max', label: 'Bwd IAT Max', apiName: 'Bwd IAT Max', placeholder: '0.5' },
//       { name: 'bwd_iat_min', label: 'Bwd IAT Min', apiName: 'Bwd IAT Min', placeholder: '0.001' },
//     ],
//     'PSH and URG Flags': [
//       { name: 'fwd_psh_flags', label: 'Fwd PSH Flags', apiName: 'Fwd PSH Flags', placeholder: '0' },
//       { name: 'bwd_psh_flags', label: 'Bwd PSH Flags', apiName: 'Bwd PSH Flags', placeholder: '0' },
//       { name: 'fwd_urg_flags', label: 'Fwd URG Flags', apiName: 'Fwd URG Flags', placeholder: '0' },
//       { name: 'bwd_urg_flags', label: 'Bwd URG Flags', apiName: 'Bwd URG Flags', placeholder: '0' },
//     ],
//     'Header Lengths': [
//       { name: 'fwd_header_length', label: 'Fwd Header Length', apiName: 'Fwd Header Length', placeholder: '20' },
//       { name: 'bwd_header_length', label: 'Bwd Header Length', apiName: 'Bwd Header Length', placeholder: '20' },
//       { name: 'fwd_header_length_1', label: 'Fwd Header Length.1', apiName: 'Fwd Header Length.1', placeholder: '20' },
//     ],
//     'Packets per Second': [
//       { name: 'fwd_packets_s', label: 'Fwd Packets/s', apiName: 'Fwd Packets/s', placeholder: '50' },
//       { name: 'bwd_packets_s', label: 'Bwd Packets/s', apiName: 'Bwd Packets/s', placeholder: '50' },
//     ],
//     'Packet Length Statistics': [
//       { name: 'min_packet_length', label: 'Min Packet Length', apiName: 'Min Packet Length', placeholder: '0' },
//       { name: 'max_packet_length', label: 'Max Packet Length', apiName: 'Max Packet Length', placeholder: '1500' },
//       { name: 'packet_length_mean', label: 'Packet Length Mean', apiName: 'Packet Length Mean', placeholder: '512' },
//       { name: 'packet_length_std', label: 'Packet Length Std', apiName: 'Packet Length Std', placeholder: '100' },
//       { name: 'packet_length_variance', label: 'Packet Length Variance', apiName: 'Packet Length Variance', placeholder: '10000' },
//     ],
//     'TCP Flags': [
//       { name: 'fin_flag_count', label: 'FIN Flag Count', apiName: 'FIN Flag Count', placeholder: '0' },
//       { name: 'syn_flag_count', label: 'SYN Flag Count', apiName: 'SYN Flag Count', placeholder: '1' },
//       { name: 'rst_flag_count', label: 'RST Flag Count', apiName: 'RST Flag Count', placeholder: '0' },
//       { name: 'psh_flag_count', label: 'PSH Flag Count', apiName: 'PSH Flag Count', placeholder: '0' },
//       { name: 'ack_flag_count', label: 'ACK Flag Count', apiName: 'ACK Flag Count', placeholder: '1' },
//       { name: 'urg_flag_count', label: 'URG Flag Count', apiName: 'URG Flag Count', placeholder: '0' },
//       { name: 'cwe_flag_count', label: 'CWE Flag Count', apiName: 'CWE Flag Count', placeholder: '0' },
//       { name: 'ece_flag_count', label: 'ECE Flag Count', apiName: 'ECE Flag Count', placeholder: '0' },
//     ],
//     'Size and Segment Features': [
//       { name: 'down_up_ratio', label: 'Down/Up Ratio', apiName: 'Down/Up Ratio', placeholder: '1.0' },
//       { name: 'average_packet_size', label: 'Average Packet Size', apiName: 'Average Packet Size', placeholder: '512' },
//       { name: 'avg_fwd_segment_size', label: 'Avg Fwd Segment Size', apiName: 'Avg Fwd Segment Size', placeholder: '256' },
//       { name: 'avg_bwd_segment_size', label: 'Avg Bwd Segment Size', apiName: 'Avg Bwd Segment Size', placeholder: '256' },
//     ],
//     'Bulk Features': [
//       { name: 'fwd_avg_bytes_bulk', label: 'Fwd Avg Bytes/Bulk', apiName: 'Fwd Avg Bytes/Bulk', placeholder: '0' },
//       { name: 'fwd_avg_packets_bulk', label: 'Fwd Avg Packets/Bulk', apiName: 'Fwd Avg Packets/Bulk', placeholder: '0' },
//       { name: 'fwd_avg_bulk_rate', label: 'Fwd Avg Bulk Rate', apiName: 'Fwd Avg Bulk Rate', placeholder: '0' },
//       { name: 'bwd_avg_bytes_bulk', label: 'Bwd Avg Bytes/Bulk', apiName: 'Bwd Avg Bytes/Bulk', placeholder: '0' },
//       { name: 'bwd_avg_packets_bulk', label: 'Bwd Avg Packets/Bulk', apiName: 'Bwd Avg Packets/Bulk', placeholder: '0' },
//       { name: 'bwd_avg_bulk_rate', label: 'Bwd Avg Bulk Rate', apiName: 'Bwd Avg Bulk Rate', placeholder: '0' },
//     ],
//     'Subflow Features': [
//       { name: 'subflow_fwd_packets', label: 'Subflow Fwd Packets', apiName: 'Subflow Fwd Packets', placeholder: '10' },
//       { name: 'subflow_fwd_bytes', label: 'Subflow Fwd Bytes', apiName: 'Subflow Fwd Bytes', placeholder: '1000' },
//       { name: 'subflow_bwd_packets', label: 'Subflow Bwd Packets', apiName: 'Subflow Bwd Packets', placeholder: '8' },
//       { name: 'subflow_bwd_bytes', label: 'Subflow Bwd Bytes', apiName: 'Subflow Bwd Bytes', placeholder: '800' },
//     ],
//     'Window and Segment': [
//       { name: 'init_win_bytes_forward', label: 'Init_Win_bytes_forward', apiName: 'Init_Win_bytes_forward', placeholder: '8192' },
//       { name: 'init_win_bytes_backward', label: 'Init_Win_bytes_backward', apiName: 'Init_Win_bytes_backward', placeholder: '8192' },
//       { name: 'act_data_pkt_fwd', label: 'act_data_pkt_fwd', apiName: 'act_data_pkt_fwd', placeholder: '1' },
//       { name: 'min_seg_size_forward', label: 'min_seg_size_forward', apiName: 'min_seg_size_forward', placeholder: '20' },
//     ],
//     'Active and Idle': [
//       { name: 'active_mean', label: 'Active Mean', apiName: 'Active Mean', placeholder: '0' },
//       { name: 'active_std', label: 'Active Std', apiName: 'Active Std', placeholder: '0' },
//       { name: 'active_max', label: 'Active Max', apiName: 'Active Max', placeholder: '0' },
//       { name: 'active_min', label: 'Active Min', apiName: 'Active Min', placeholder: '0' },
//       { name: 'idle_mean', label: 'Idle Mean', apiName: 'Idle Mean', placeholder: '0' },
//       { name: 'idle_std', label: 'Idle Std', apiName: 'Idle Std', placeholder: '0' },
//       { name: 'idle_max', label: 'Idle Max', apiName: 'Idle Max', placeholder: '0' },
//       { name: 'idle_min', label: 'Idle Min', apiName: 'Idle Min', placeholder: '0' },
//     ],
//   }

//   const attackTypes = {
//     0: { name: 'BENIGN', color: 'green' },
//     1: { name: 'Bot', color: 'orange' },
//     2: { name: 'DDoS', color: 'red' },
//     3: { name: 'DoS GoldenEye', color: 'red' },
//     4: { name: 'DoS Hulk', color: 'red' },
//     5: { name: 'DoS Slowhttptest', color: 'red' },
//     6: { name: 'DoS Slowloris', color: 'red' },
//     7: { name: 'FTP-Patator', color: 'orange' },
//     8: { name: 'Heartbleed', color: 'purple' },
//     9: { name: 'Infiltration', color: 'purple' },
//     10: { name: 'PortScan', color: 'yellow' },
//     11: { name: 'SSH-Patator', color: 'orange' },
//     12: { name: 'Web Attack - Brute Force', color: 'red' },
//     13: { name: 'Web Attack - SQL Injection', color: 'red' },
//     14: { name: 'Web Attack - XSS', color: 'red' },
//   }

//   const toggleGroup = (groupName) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [groupName]: !prev[groupName]
//     }))
//   }

//   const handleInputChange = (name, value) => {
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0]
//     if (file && file.type === 'text/csv') {
//       setCsvFile(file)
//     }
//   }

//   const handleManualPredict = async () => {
//     setIsLoading(true)
//     try {
//       // Build the API data with all 79 features
//       const apiData = {}
      
//       // Initialize all features with default value 0
//       Object.values(featureGroups).forEach(features => {
//         features.forEach(feature => {
//           apiData[feature.apiName] = parseFloat(formData[feature.name]) || 0
//         })
//       })
      
//       const response = await fetch(API_ENDPOINTS.PREDICT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(apiData)
//       })
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const result = await response.json()
      
//       setPredictions([{
//         id: Date.now(),
//         type: 'Manual Entry',
//         result: result.attack_type,
//         confidence: result.confidence,
//         label: result.label,
//         timestamp: new Date().toLocaleTimeString()
//       }])
      
//     } catch (error) {
//       console.error('Prediction error:', error)
//       alert('Error making prediction. Please check if the server is running.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCsvPredict = async () => {
//     if (!csvFile) return
//     setIsLoading(true)
    
//     try {
//       const formData = new FormData()
//       formData.append('file', csvFile)
      
//       const response = await fetch(API_ENDPOINTS.PREDICT_CSV, {
//         method: 'POST',
//         body: formData
//       })
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const result = await response.json()
      
//       const predictions = result.results.map(item => ({
//         id: Date.now() + item.row,
//         row: item.row,
//         result: item.predicted_type || item.attack_type || attackTypes[item.predicted_label]?.name || 'Unknown',
//         confidence: item.confidence,
//         label: item.predicted_label !== undefined ? item.predicted_label : item.label,
//         actual_label: item.actual_label,
//         actual_type: item.actual_type,
//         correct: item.correct
//       }))
      
//       setPredictions(predictions)
      
//       if (result.accuracy !== undefined) {
//         console.log(`Accuracy: ${result.accuracy}%`)
//         console.log(`Correct: ${result.correct_predictions}/${result.total_predictions}`)
//       }
      
//     } catch (error) {
//       console.error('CSV prediction error:', error)
//       alert('Error processing CSV file.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getAttackColor = (label) => {
//     const colors = {
//       green: 'text-green-400 bg-green-400/10 border-green-400/20',
//       yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
//       orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
//       red: 'text-red-400 bg-red-400/10 border-red-400/20',
//       purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
//     }
//     const attackType = attackTypes[label]
//     return colors[attackType?.color] || colors.red
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="text-center">
//         <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
//           Network Traffic Prediction
//         </h2>
//         <p className="text-gray-400">Analyze network traffic patterns using AI-powered detection</p>
//       </div>

//       {/* Input Mode Toggle */}
//       <div className="flex justify-center">
//         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
//           <div className="flex space-x-1">
//             <button
//               onClick={() => setInputMode('manual')}
//               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
//                 inputMode === 'manual'
//                   ? 'bg-white text-black shadow-lg'
//                   : 'text-gray-400 hover:text-white hover:bg-white/5'
//               }`}
//             >
//               <FileText className="w-4 h-4" />
//               <span>Manual Entry</span>
//             </button>
//             <button
//               onClick={() => setInputMode('csv')}
//               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
//                 inputMode === 'csv'
//                   ? 'bg-white text-black shadow-lg'
//                   : 'text-gray-400 hover:text-white hover:bg-white/5'
//               }`}
//             >
//               <Upload className="w-4 h-4" />
//               <span>CSV Upload</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Input Section */}
//       {inputMode === 'manual' ? (
//         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
//           <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
//             <Database className="w-5 h-5 mr-2 text-white" />
//             Enter All 79 Network Features
//           </h3>
          
//           <div className="space-y-4 max-h-[600px] overflow-y-auto">
//             {Object.entries(featureGroups).map(([groupName, features]) => (
//               <div key={groupName} className="bg-white/5 rounded-lg border border-white/10">
//                 <button
//                   onClick={() => toggleGroup(groupName)}
//                   className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
//                 >
//                   <h4 className="text-sm font-medium text-gray-300">{groupName} ({features.length} features)</h4>
//                   {expandedGroups[groupName] ? 
//                     <ChevronUp className="w-4 h-4 text-gray-400" /> : 
//                     <ChevronDown className="w-4 h-4 text-gray-400" />
//                   }
//                 </button>
                
//                 {expandedGroups[groupName] && (
//                   <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {features.map((feature) => (
//                       <div key={feature.name}>
//                         <label className="block text-xs font-medium text-gray-300 mb-1">
//                           {feature.label}
//                         </label>
//                         <input
//                           type="number"
//                           step="any"
//                           placeholder={feature.placeholder}
//                           value={formData[feature.name] || ''}
//                           onChange={(e) => handleInputChange(feature.name, e.target.value)}
//                           className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleManualPredict}
//             disabled={isLoading}
//             className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//           >
//             {isLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
//                 <span>Analyzing...</span>
//               </>
//             ) : (
//               <>
//                 <Send className="w-5 h-5" />
//                 <span>Predict Attack Type</span>
//               </>
//             )}
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
//           <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
//             <Upload className="w-5 h-5 mr-2 text-white" />
//             Upload CSV File
//           </h3>

//           <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-white/40 transition-all duration-300">
//             <input
//               type="file"
//               accept=".csv"
//               onChange={handleFileUpload}
//               className="hidden"
//               id="csv-upload"
//             />
//             <label htmlFor="csv-upload" className="cursor-pointer">
//               <Upload className="w-16 h-16 mx-auto text-white mb-4" />
//               <p className="text-white font-medium mb-2">
//                 {csvFile ? csvFile.name : 'Click to upload or drag and drop'}
//               </p>
//               <p className="text-gray-400 text-sm">CSV files only (max 10MB)</p>
//             </label>
//           </div>

//           {csvFile && (
//             <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <FileText className="w-5 h-5 text-white" />
//                   <div>
//                     <p className="text-white font-medium">{csvFile.name}</p>
//                     <p className="text-gray-400 text-sm">
//                       {(csvFile.size / 1024).toFixed(2)} KB
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setCsvFile(null)}
//                   className="text-red-400 hover:text-red-300 transition-colors"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}

//           <button
//             onClick={handleCsvPredict}
//             disabled={!csvFile || isLoading}
//             className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//           >
//             {isLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
//                 <span>Processing CSV...</span>
//               </>
//             ) : (
//               <>
//                 <Database className="w-5 h-5" />
//                 <span>Analyze CSV Data</span>
//               </>
//             )}
//           </button>
//         </div>
//       )}

//       {/* Results Section - same as before */}
//       {predictions.length > 0 && (
//         <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-white flex items-center">
//               <AlertCircle className="w-5 h-5 mr-2 text-white" />
//               Prediction Results
//             </h3>
//             <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
//               <Download className="w-4 h-4" />
//               <span className="text-sm">Export</span>
//             </button>
//           </div>

//           {inputMode === 'manual' ? (
//             predictions.map((pred) => (
//               <div key={pred.id} className="bg-white/5 rounded-lg p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     {pred.label === 0 ? (
//                       <CheckCircle className="w-8 h-8 text-green-400" />
//                     ) : (
//                       <XCircle className="w-8 h-8 text-red-400" />
//                     )}
//                     <div>
//                       <p className="text-white font-semibold text-lg">{pred.result}</p>
//                       <p className="text-gray-400 text-sm">Confidence: {pred.confidence}%</p>
//                     </div>
//                   </div>
//                   <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getAttackColor(pred.label)}`}>
//                     {pred.label === 0 ? 'Safe' : 'Threat'}
//                   </span>
//                 </div>
//                 <div className="text-gray-400 text-sm">
//                   Analyzed at {pred.timestamp}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-white/20">
//                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Row</th>
//                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Predicted</th>
//                     {predictions[0]?.actual_type && (
//                       <th className="text-left py-3 px-4 text-gray-300 font-medium">Actual</th>
//                     )}
//                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
//                     <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {predictions.map((pred) => (
//                     <tr key={pred.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
//                       <td className="py-4 px-4 text-white">{pred.row}</td>
//                       <td className="py-4 px-4">
//                         <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getAttackColor(pred.label)}`}>
//                           {pred.result}
//                         </span>
//                       </td>
//                       {pred.actual_type && (
//                         <td className="py-4 px-4">
//                           <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getAttackColor(pred.actual_label)}`}>
//                             {pred.actual_type}
//                           </span>
//                         </td>
//                       )}
//                       <td className="py-4 px-4 text-gray-300">{pred.confidence}%</td>
//                       <td className="py-4 px-4">
//                         {pred.correct !== undefined ? (
//                           pred.correct ? (
//                             <CheckCircle className="w-5 h-5 text-green-400" title="Correct prediction" />
//                           ) : (
//                             <XCircle className="w-5 h-5 text-red-400" title="Incorrect prediction" />
//                           )
//                         ) : (
//                           pred.label === 0 ? (
//                             <CheckCircle className="w-5 h-5 text-green-400" title="Safe" />
//                           ) : (
//                             <XCircle className="w-5 h-5 text-red-400" title="Threat detected" />
//                           )
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Prediction

import React, { useState } from 'react'
import { Upload, FileText, Send, Database, AlertCircle, CheckCircle, XCircle, Download, Trash2, ChevronDown, ChevronUp, Shield, Bug, Activity, Search, Zap } from 'lucide-react'
import { API_ENDPOINTS } from '../config/api'

const Prediction = () => {
  const [inputMode, setInputMode] = useState('manual')
  const [formData, setFormData] = useState({})
  const [csvFile, setCsvFile] = useState(null)
  const [manualPredictions, setManualPredictions] = useState([])
  const [csvPredictions, setCsvPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState({})

  // Sample data from test_data.csv for different attack types
  const sampleData = {
    'BENIGN': {
      icon: Shield,
      color: 'green',
      data: {
        'unnamed_0': 0.033410778,
        'destination_port': 0.031113146,
        'flow_duration': 1.62E-06,
        'total_fwd_packets': 4.81E-06,
        'total_backward_packets': 0,
        'total_length_fwd_packets': 9.30E-07,
        'total_length_bwd_packets': 0,
        'fwd_packet_length_max': 0.000241741,
        'fwd_packet_length_min': 0.002905569,
        'fwd_packet_length_mean': 0.001009955,
        'fwd_packet_length_std': 0,
        'bwd_packet_length_max': 0,
        'bwd_packet_length_min': 0,
        'bwd_packet_length_mean': 0,
        'bwd_packet_length_std': 0,
        'flow_bytes_s': 0.005790771,
        'flow_packets_s': 0.402072539,
        'flow_iat_mean': 1.62E-06,
        'flow_iat_std': 0,
        'flow_iat_max': 1.62E-06,
        'flow_iat_min': 1.72E-06,
        'fwd_iat_total': 1.61E-06,
        'fwd_iat_mean': 1.61E-06,
        'fwd_iat_std': 0,
        'fwd_iat_max': 1.61E-06,
        'fwd_iat_min': 1.67E-06,
        'bwd_iat_total': 0,
        'bwd_iat_mean': 0,
        'bwd_iat_std': 0,
        'bwd_iat_max': 0,
        'bwd_iat_min': 0,
        'fwd_psh_flags': 0,
        'bwd_psh_flags': 0,
        'fwd_urg_flags': 0,
        'bwd_urg_flags': 0,
        'fwd_header_length': 0.999864373,
        'bwd_header_length': 0.994726825,
        'fwd_packets_s': 0.003454231,
        'bwd_packets_s': 0,
        'min_packet_length': 0.004415011,
        'max_packet_length': 0.000241741,
        'packet_length_mean': 0.002311644,
        'packet_length_std': 0,
        'packet_length_variance': 0,
        'fin_flag_count': 0,
        'syn_flag_count': 0,
        'rst_flag_count': 0,
        'psh_flag_count': 0,
        'ack_flag_count': 1,
        'urg_flag_count': 0,
        'cwe_flag_count': 0,
        'ece_flag_count': 0,
        'down_up_ratio': 0,
        'average_packet_size': 0.003082192,
        'avg_fwd_segment_size': 0.001009955,
        'avg_bwd_segment_size': 0,
        'fwd_header_length_1': 0.999864373,
        'fwd_avg_bytes_bulk': 0,
        'fwd_avg_packets_bulk': 0,
        'fwd_avg_bulk_rate': 0,
        'bwd_avg_bytes_bulk': 0,
        'bwd_avg_packets_bulk': 0,
        'bwd_avg_bulk_rate': 0,
        'subflow_fwd_packets': 4.81E-06,
        'subflow_fwd_bytes': 9.32E-07,
        'subflow_bwd_packets': 0,
        'subflow_bwd_bytes': 0,
        'init_win_bytes_forward': 0.084075928,
        'init_win_bytes_backward': 0,
        'act_data_pkt_fwd': 5.03E-06,
        'min_seg_size_forward': 0.999999864,
        'active_mean': 0,
        'active_std': 0,
        'active_max': 0,
        'active_min': 0,
        'idle_mean': 0,
        'idle_std': 0,
        'idle_max': 0,
        'idle_min': 0
      }
    },
    'DoS Hulk': {
      icon: Bug,
      color: 'red',
      data: {
        'unnamed_0': 0.806808435,
        'destination_port': 0.001220722,
        'flow_duration': 0.000462667,
        'total_fwd_packets': 9.62E-06,
        'total_backward_packets': 2.11E-05,
        'total_length_fwd_packets': 2.71E-05,
        'total_length_bwd_packets': 1.90E-05,
        'fwd_packet_length_max': 0.014061241,
        'fwd_packet_length_min': 0,
        'fwd_packet_length_mean': 0.019581911,
        'fwd_packet_length_std': 0.028583038,
        'bwd_packet_length_max': 0.167299724,
        'bwd_packet_length_min': 0,
        'bwd_packet_length_mean': 0.333160934,
        'bwd_packet_length_std': 0.18266945,
        'flow_bytes_s': 0.005864202,
        'flow_packets_s': 0.400032421,
        'flow_iat_mean': 5.78E-05,
        'flow_iat_std': 0.000182158,
        'flow_iat_max': 0.000368492,
        'flow_iat_min': 3.83E-07,
        'fwd_iat_total': 9.16E-05,
        'fwd_iat_mean': 4.58E-05,
        'fwd_iat_std': 7.63E-05,
        'fwd_iat_max': 8.34E-05,
        'fwd_iat_min': 8.25E-06,
        'bwd_iat_total': 0.000462308,
        'bwd_iat_mean': 9.25E-05,
        'bwd_iat_std': 0.000230483,
        'bwd_iat_max': 0.000368483,
        'bwd_iat_min': 3.08E-07,
        'fwd_psh_flags': 0,
        'bwd_psh_flags': 0,
        'fwd_urg_flags': 0,
        'bwd_urg_flags': 0,
        'fwd_header_length': 0.999864375,
        'bwd_header_length': 0.994727011,
        'fwd_packets_s': 1.80E-05,
        'bwd_packets_s': 5.40E-05,
        'min_packet_length': 0,
        'max_packet_length': 0.117123288,
        'packet_length_mean': 0.460171233,
        'packet_length_std': 0.310833047,
        'packet_length_variance': 0.096562423,
        'fin_flag_count': 0,
        'syn_flag_count': 0,
        'rst_flag_count': 0,
        'psh_flag_count': 1,
        'ack_flag_count': 0,
        'urg_flag_count': 0,
        'cwe_flag_count': 0,
        'ece_flag_count': 0,
        'down_up_ratio': 0.027027027,
        'average_packet_size': 0.454490107,
        'avg_fwd_segment_size': 0.019581911,
        'avg_bwd_segment_size': 0.333160934,
        'fwd_header_length_1': 0.999864375,
        'fwd_avg_bytes_bulk': 0,
        'fwd_avg_packets_bulk': 0,
        'fwd_avg_bulk_rate': 0,
        'bwd_avg_bytes_bulk': 0,
        'bwd_avg_packets_bulk': 0,
        'bwd_avg_bulk_rate': 0,
        'subflow_fwd_packets': 9.62E-06,
        'subflow_fwd_bytes': 2.71E-05,
        'subflow_bwd_packets': 2.11E-05,
        'subflow_bwd_bytes': 1.90E-05,
        'init_win_bytes_forward': 0.445571899,
        'init_win_bytes_backward': 0.003601074,
        'act_data_pkt_fwd': 5.03E-06,
        'min_seg_size_forward': 0.999999886,
        'active_mean': 0,
        'active_std': 0,
        'active_max': 0,
        'active_min': 0,
        'idle_mean': 0,
        'idle_std': 0,
        'idle_max': 0,
        'idle_min': 0
      }
    },
    'PortScan': {
      icon: Search,
      color: 'yellow',
      data: {
        'unnamed_0': 0.188032878,
        'destination_port': 0.010681315,
        'flow_duration': 4.25E-07,
        'total_fwd_packets': 0,
        'total_backward_packets': 3.51E-06,
        'total_length_fwd_packets': 0,
        'total_length_bwd_packets': 9.82E-09,
        'fwd_packet_length_max': 0,
        'fwd_packet_length_min': 0,
        'fwd_packet_length_mean': 0,
        'fwd_packet_length_std': 0,
        'bwd_packet_length_max': 0.000345304,
        'bwd_packet_length_min': 0.003025719,
        'bwd_packet_length_mean': 0.001034394,
        'bwd_packet_length_std': 0,
        'flow_bytes_s': 0.005818531,
        'flow_packets_s': 0.408,
        'flow_iat_mean': 4.25E-07,
        'flow_iat_std': 0,
        'flow_iat_max': 4.25E-07,
        'flow_iat_min': 5.25E-07,
        'fwd_iat_total': 0,
        'fwd_iat_mean': 0,
        'fwd_iat_std': 0,
        'fwd_iat_max': 0,
        'fwd_iat_min': 6.67E-08,
        'bwd_iat_total': 0,
        'bwd_iat_mean': 0,
        'bwd_iat_std': 0,
        'bwd_iat_max': 0,
        'bwd_iat_min': 0,
        'fwd_psh_flags': 0,
        'bwd_psh_flags': 0,
        'fwd_urg_flags': 0,
        'bwd_urg_flags': 0,
        'fwd_header_length': 0.999864373,
        'bwd_header_length': 0.994726844,
        'fwd_packets_s': 0.006666667,
        'bwd_packets_s': 0.01,
        'min_packet_length': 0,
        'max_packet_length': 0.000241741,
        'packet_length_mean': 0.000770548,
        'packet_length_std': 0.000732133,
        'packet_length_variance': 5.36E-07,
        'fin_flag_count': 0,
        'syn_flag_count': 0,
        'rst_flag_count': 0,
        'psh_flag_count': 1,
        'ack_flag_count': 0,
        'urg_flag_count': 0,
        'cwe_flag_count': 0,
        'ece_flag_count': 0,
        'down_up_ratio': 0.013513514,
        'average_packet_size': 0.001027397,
        'avg_fwd_segment_size': 0,
        'avg_bwd_segment_size': 0.001034394,
        'fwd_header_length_1': 0.999864373,
        'fwd_avg_bytes_bulk': 0,
        'fwd_avg_packets_bulk': 0,
        'fwd_avg_bulk_rate': 0,
        'bwd_avg_bytes_bulk': 0,
        'bwd_avg_packets_bulk': 0,
        'bwd_avg_bulk_rate': 0,
        'subflow_fwd_packets': 0,
        'subflow_fwd_bytes': 0,
        'subflow_bwd_packets': 3.51E-06,
        'subflow_bwd_bytes': 9.81E-09,
        'init_win_bytes_forward': 0.445571899,
        'init_win_bytes_backward': 1.53E-05,
        'act_data_pkt_fwd': 0,
        'min_seg_size_forward': 0.999999901,
        'active_mean': 0,
        'active_std': 0,
        'active_max': 0,
        'active_min': 0,
        'idle_mean': 0,
        'idle_std': 0,
        'idle_max': 0,
        'idle_min': 0
      }
    },
    'Bot': {
      icon: Activity,
      color: 'orange',
      data: {
        'unnamed_0': 0.242247916,
        'destination_port': 0.123292897,
        'flow_duration': 0.008505811,
        'total_fwd_packets': 9.62E-06,
        'total_backward_packets': 1.05E-05,
        'total_length_fwd_packets': 0,
        'total_length_bwd_packets': 2.95E-08,
        'fwd_packet_length_max': 0,
        'fwd_packet_length_min': 0,
        'fwd_packet_length_mean': 0,
        'fwd_packet_length_std': 0,
        'bwd_packet_length_max': 0.000345304,
        'bwd_packet_length_min': 0.003025719,
        'bwd_packet_length_mean': 0.001034394,
        'bwd_packet_length_std': 0,
        'flow_bytes_s': 0.00576093,
        'flow_packets_s': 0.400001176,
        'flow_iat_mean': 0.001701168,
        'flow_iat_std': 0.003288975,
        'flow_iat_max': 0.004279575,
        'flow_iat_min': 3.52E-06,
        'fwd_iat_total': 0.008501733,
        'fwd_iat_mean': 0.004250867,
        'fwd_iat_std': 6.51E-05,
        'fwd_iat_max': 0.004282983,
        'fwd_iat_min': 0.004218816,
        'bwd_iat_total': 0.008502383,
        'bwd_iat_mean': 0.004251192,
        'bwd_iat_std': 6.66E-05,
        'bwd_iat_max': 0.004283725,
        'bwd_iat_min': 0.004218658,
        'fwd_psh_flags': 0,
        'bwd_psh_flags': 0,
        'fwd_urg_flags': 0,
        'bwd_urg_flags': 0,
        'fwd_header_length': 0.999864375,
        'bwd_header_length': 0.994726881,
        'fwd_packets_s': 9.80E-07,
        'bwd_packets_s': 1.47E-06,
        'min_packet_length': 0,
        'max_packet_length': 0.000241741,
        'packet_length_mean': 0.000990705,
        'packet_length_std': 0.000677823,
        'packet_length_variance': 4.59E-07,
        'fin_flag_count': 0,
        'syn_flag_count': 0,
        'rst_flag_count': 0,
        'psh_flag_count': 1,
        'ack_flag_count': 0,
        'urg_flag_count': 0,
        'cwe_flag_count': 0,
        'ece_flag_count': 0,
        'down_up_ratio': 0.013513514,
        'average_packet_size': 0.001027397,
        'avg_fwd_segment_size': 0,
        'avg_bwd_segment_size': 0.001034394,
        'fwd_header_length_1': 0.999864375,
        'fwd_avg_bytes_bulk': 0,
        'fwd_avg_packets_bulk': 0,
        'fwd_avg_bulk_rate': 0,
        'bwd_avg_bytes_bulk': 0,
        'bwd_avg_packets_bulk': 0,
        'bwd_avg_bulk_rate': 0,
        'subflow_fwd_packets': 9.62E-06,
        'subflow_fwd_bytes': 0,
        'subflow_bwd_packets': 1.05E-05,
        'subflow_bwd_bytes': 2.94E-08,
        'init_win_bytes_forward': 0.125015259,
        'init_win_bytes_backward': 1.53E-05,
        'act_data_pkt_fwd': 0,
        'min_seg_size_forward': 0.999999879,
        'active_mean': 0,
        'active_std': 0,
        'active_max': 0,
        'active_min': 0,
        'idle_mean': 0,
        'idle_std': 0,
        'idle_max': 0,
        'idle_min': 0
      }
    },
    'DDoS': {
      icon: Zap,
      color: 'red',
      data: {
        'unnamed_0': 0.131531594,
        'destination_port': 0.001220722,
        'flow_duration': 0.665338719,
        'total_fwd_packets': 3.37E-05,
        'total_backward_packets': 1.76E-05,
        'total_length_fwd_packets': 4.34E-06,
        'total_length_bwd_packets': 1.90E-05,
        'fwd_packet_length_max': 0.000805802,
        'fwd_packet_length_min': 0,
        'fwd_packet_length_mean': 0.001178281,
        'fwd_packet_length_std': 0.000802451,
        'bwd_packet_length_max': 0.336095764,
        'bwd_packet_length_min': 0,
        'bwd_packet_length_mean': 0.400206879,
        'bwd_packet_length_std': 0.387248976,
        'flow_bytes_s': 0.005760992,
        'flow_packets_s': 0.400000033,
        'flow_iat_mean': 0.055444883,
        'flow_iat_std': 0.262971698,
        'flow_iat_max': 0.64666667,
        'flow_iat_min': 1.17E-07,
        'fwd_iat_total': 0.658333333,
        'fwd_iat_mean': 0.094166667,
        'fwd_iat_std': 0.348864994,
        'fwd_iat_max': 0.646666667,
        'fwd_iat_min': 7.50E-08,
        'bwd_iat_total': 0.006859,
        'bwd_iat_mean': 0.00171475,
        'bwd_iat_std': 0.004955732,
        'bwd_iat_max': 0.006850125,
        'bwd_iat_min': 3.33E-08,
        'fwd_psh_flags': 0,
        'bwd_psh_flags': 0,
        'fwd_urg_flags': 0,
        'bwd_urg_flags': 0,
        'fwd_header_length': 0.999864377,
        'bwd_header_length': 0.994726929,
        'fwd_packets_s': 3.34E-08,
        'bwd_packets_s': 3.13E-08,
        'min_packet_length': 0,
        'max_packet_length': 0.235294118,
        'packet_length_mean': 0.321125856,
        'packet_length_std': 0.444490254,
        'packet_length_variance': 0.197459607,
        'fin_flag_count': 0,
        'syn_flag_count': 0,
        'rst_flag_count': 0,
        'psh_flag_count': 0,
        'ack_flag_count': 1,
        'urg_flag_count': 0,
        'cwe_flag_count': 0,
        'ece_flag_count': 0,
        'down_up_ratio': 0,
        'average_packet_size': 0.307402529,
        'avg_fwd_segment_size': 0.001178281,
        'avg_bwd_segment_size': 0.400206879,
        'fwd_header_length_1': 0.999864377,
        'fwd_avg_bytes_bulk': 0,
        'fwd_avg_packets_bulk': 0,
        'fwd_avg_bulk_rate': 0,
        'bwd_avg_bytes_bulk': 0,
        'bwd_avg_packets_bulk': 0,
        'bwd_avg_bulk_rate': 0,
        'subflow_fwd_packets': 3.37E-05,
        'subflow_fwd_bytes': 4.35E-06,
        'subflow_bwd_packets': 1.76E-05,
        'subflow_bwd_bytes': 1.90E-05,
        'init_win_bytes_forward': 0.003921509,
        'init_win_bytes_backward': 0.003509521,
        'act_data_pkt_fwd': 3.02E-05,
        'min_seg_size_forward': 0.999999864,
        'active_mean': 0.014125838,
        'active_std': 0,
        'active_max': 0.014125838,
        'active_min': 0.014125838,
        'idle_mean': 0.646666667,
        'idle_std': 0,
        'idle_max': 0.646666667,
        'idle_min': 0.646666667
      }
    }
  }

  // ALL 79 features organized into groups
  const featureGroups = {
    'Basic Features': [
      { name: 'unnamed_0', label: 'Unnamed: 0', apiName: 'Unnamed: 0', placeholder: '0' },
      { name: 'destination_port', label: 'Destination Port', apiName: 'Destination Port', placeholder: '80' },
      { name: 'flow_duration', label: 'Flow Duration', apiName: 'Flow Duration', placeholder: '0.5' },
    ],
    'Packet Counts': [
      { name: 'total_fwd_packets', label: 'Total Fwd Packets', apiName: 'Total Fwd Packets', placeholder: '10' },
      { name: 'total_backward_packets', label: 'Total Backward Packets', apiName: 'Total Backward Packets', placeholder: '8' },
      { name: 'total_length_fwd_packets', label: 'Total Length of Fwd Packets', apiName: 'Total Length of Fwd Packets', placeholder: '1000' },
      { name: 'total_length_bwd_packets', label: 'Total Length of Bwd Packets', apiName: 'Total Length of Bwd Packets', placeholder: '800' },
    ],
    'Forward Packet Statistics': [
      { name: 'fwd_packet_length_max', label: 'Fwd Packet Length Max', apiName: 'Fwd Packet Length Max', placeholder: '512' },
      { name: 'fwd_packet_length_min', label: 'Fwd Packet Length Min', apiName: 'Fwd Packet Length Min', placeholder: '0' },
      { name: 'fwd_packet_length_mean', label: 'Fwd Packet Length Mean', apiName: 'Fwd Packet Length Mean', placeholder: '256' },
      { name: 'fwd_packet_length_std', label: 'Fwd Packet Length Std', apiName: 'Fwd Packet Length Std', placeholder: '100' },
    ],
    'Backward Packet Statistics': [
      { name: 'bwd_packet_length_max', label: 'Bwd Packet Length Max', apiName: 'Bwd Packet Length Max', placeholder: '512' },
      { name: 'bwd_packet_length_min', label: 'Bwd Packet Length Min', apiName: 'Bwd Packet Length Min', placeholder: '0' },
      { name: 'bwd_packet_length_mean', label: 'Bwd Packet Length Mean', apiName: 'Bwd Packet Length Mean', placeholder: '256' },
      { name: 'bwd_packet_length_std', label: 'Bwd Packet Length Std', apiName: 'Bwd Packet Length Std', placeholder: '100' },
    ],
    'Flow Metrics': [
      { name: 'flow_bytes_s', label: 'Flow Bytes/s', apiName: 'Flow Bytes/s', placeholder: '1024' },
      { name: 'flow_packets_s', label: 'Flow Packets/s', apiName: 'Flow Packets/s', placeholder: '100' },
      { name: 'flow_iat_mean', label: 'Flow IAT Mean', apiName: 'Flow IAT Mean', placeholder: '0.1' },
      { name: 'flow_iat_std', label: 'Flow IAT Std', apiName: 'Flow IAT Std', placeholder: '0.05' },
      { name: 'flow_iat_max', label: 'Flow IAT Max', apiName: 'Flow IAT Max', placeholder: '1.0' },
      { name: 'flow_iat_min', label: 'Flow IAT Min', apiName: 'Flow IAT Min', placeholder: '0.001' },
    ],
    'Forward IAT': [
      { name: 'fwd_iat_total', label: 'Fwd IAT Total', apiName: 'Fwd IAT Total', placeholder: '0.5' },
      { name: 'fwd_iat_mean', label: 'Fwd IAT Mean', apiName: 'Fwd IAT Mean', placeholder: '0.1' },
      { name: 'fwd_iat_std', label: 'Fwd IAT Std', apiName: 'Fwd IAT Std', placeholder: '0.05' },
      { name: 'fwd_iat_max', label: 'Fwd IAT Max', apiName: 'Fwd IAT Max', placeholder: '0.5' },
      { name: 'fwd_iat_min', label: 'Fwd IAT Min', apiName: 'Fwd IAT Min', placeholder: '0.001' },
    ],
    'Backward IAT': [
      { name: 'bwd_iat_total', label: 'Bwd IAT Total', apiName: 'Bwd IAT Total', placeholder: '0.5' },
      { name: 'bwd_iat_mean', label: 'Bwd IAT Mean', apiName: 'Bwd IAT Mean', placeholder: '0.1' },
      { name: 'bwd_iat_std', label: 'Bwd IAT Std', apiName: 'Bwd IAT Std', placeholder: '0.05' },
      { name: 'bwd_iat_max', label: 'Bwd IAT Max', apiName: 'Bwd IAT Max', placeholder: '0.5' },
      { name: 'bwd_iat_min', label: 'Bwd IAT Min', apiName: 'Bwd IAT Min', placeholder: '0.001' },
    ],
    'PSH and URG Flags': [
      { name: 'fwd_psh_flags', label: 'Fwd PSH Flags', apiName: 'Fwd PSH Flags', placeholder: '0' },
      { name: 'bwd_psh_flags', label: 'Bwd PSH Flags', apiName: 'Bwd PSH Flags', placeholder: '0' },
      { name: 'fwd_urg_flags', label: 'Fwd URG Flags', apiName: 'Fwd URG Flags', placeholder: '0' },
      { name: 'bwd_urg_flags', label: 'Bwd URG Flags', apiName: 'Bwd URG Flags', placeholder: '0' },
    ],
    'Header Lengths': [
      { name: 'fwd_header_length', label: 'Fwd Header Length', apiName: 'Fwd Header Length', placeholder: '20' },
      { name: 'bwd_header_length', label: 'Bwd Header Length', apiName: 'Bwd Header Length', placeholder: '20' },
      { name: 'fwd_header_length_1', label: 'Fwd Header Length.1', apiName: 'Fwd Header Length.1', placeholder: '20' },
    ],
    'Packets per Second': [
      { name: 'fwd_packets_s', label: 'Fwd Packets/s', apiName: 'Fwd Packets/s', placeholder: '50' },
      { name: 'bwd_packets_s', label: 'Bwd Packets/s', apiName: 'Bwd Packets/s', placeholder: '50' },
    ],
    'Packet Length Statistics': [
      { name: 'min_packet_length', label: 'Min Packet Length', apiName: 'Min Packet Length', placeholder: '0' },
      { name: 'max_packet_length', label: 'Max Packet Length', apiName: 'Max Packet Length', placeholder: '1500' },
      { name: 'packet_length_mean', label: 'Packet Length Mean', apiName: 'Packet Length Mean', placeholder: '512' },
      { name: 'packet_length_std', label: 'Packet Length Std', apiName: 'Packet Length Std', placeholder: '100' },
      { name: 'packet_length_variance', label: 'Packet Length Variance', apiName: 'Packet Length Variance', placeholder: '10000' },
    ],
    'TCP Flags': [
      { name: 'fin_flag_count', label: 'FIN Flag Count', apiName: 'FIN Flag Count', placeholder: '0' },
      { name: 'syn_flag_count', label: 'SYN Flag Count', apiName: 'SYN Flag Count', placeholder: '1' },
      { name: 'rst_flag_count', label: 'RST Flag Count', apiName: 'RST Flag Count', placeholder: '0' },
      { name: 'psh_flag_count', label: 'PSH Flag Count', apiName: 'PSH Flag Count', placeholder: '0' },
      { name: 'ack_flag_count', label: 'ACK Flag Count', apiName: 'ACK Flag Count', placeholder: '1' },
      { name: 'urg_flag_count', label: 'URG Flag Count', apiName: 'URG Flag Count', placeholder: '0' },
      { name: 'cwe_flag_count', label: 'CWE Flag Count', apiName: 'CWE Flag Count', placeholder: '0' },
      { name: 'ece_flag_count', label: 'ECE Flag Count', apiName: 'ECE Flag Count', placeholder: '0' },
    ],
    'Size and Segment Features': [
      { name: 'down_up_ratio', label: 'Down/Up Ratio', apiName: 'Down/Up Ratio', placeholder: '1.0' },
      { name: 'average_packet_size', label: 'Average Packet Size', apiName: 'Average Packet Size', placeholder: '512' },
      { name: 'avg_fwd_segment_size', label: 'Avg Fwd Segment Size', apiName: 'Avg Fwd Segment Size', placeholder: '256' },
      { name: 'avg_bwd_segment_size', label: 'Avg Bwd Segment Size', apiName: 'Avg Bwd Segment Size', placeholder: '256' },
    ],
    'Bulk Features': [
      { name: 'fwd_avg_bytes_bulk', label: 'Fwd Avg Bytes/Bulk', apiName: 'Fwd Avg Bytes/Bulk', placeholder: '0' },
      { name: 'fwd_avg_packets_bulk', label: 'Fwd Avg Packets/Bulk', apiName: 'Fwd Avg Packets/Bulk', placeholder: '0' },
      { name: 'fwd_avg_bulk_rate', label: 'Fwd Avg Bulk Rate', apiName: 'Fwd Avg Bulk Rate', placeholder: '0' },
      { name: 'bwd_avg_bytes_bulk', label: 'Bwd Avg Bytes/Bulk', apiName: 'Bwd Avg Bytes/Bulk', placeholder: '0' },
      { name: 'bwd_avg_packets_bulk', label: 'Bwd Avg Packets/Bulk', apiName: 'Bwd Avg Packets/Bulk', placeholder: '0' },
      { name: 'bwd_avg_bulk_rate', label: 'Bwd Avg Bulk Rate', apiName: 'Bwd Avg Bulk Rate', placeholder: '0' },
    ],
    'Subflow Features': [
      { name: 'subflow_fwd_packets', label: 'Subflow Fwd Packets', apiName: 'Subflow Fwd Packets', placeholder: '10' },
      { name: 'subflow_fwd_bytes', label: 'Subflow Fwd Bytes', apiName: 'Subflow Fwd Bytes', placeholder: '1000' },
      { name: 'subflow_bwd_packets', label: 'Subflow Bwd Packets', apiName: 'Subflow Bwd Packets', placeholder: '8' },
      { name: 'subflow_bwd_bytes', label: 'Subflow Bwd Bytes', apiName: 'Subflow Bwd Bytes', placeholder: '800' },
    ],
    'Window and Segment': [
      { name: 'init_win_bytes_forward', label: 'Init_Win_bytes_forward', apiName: 'Init_Win_bytes_forward', placeholder: '8192' },
      { name: 'init_win_bytes_backward', label: 'Init_Win_bytes_backward', apiName: 'Init_Win_bytes_backward', placeholder: '8192' },
      { name: 'act_data_pkt_fwd', label: 'act_data_pkt_fwd', apiName: 'act_data_pkt_fwd', placeholder: '1' },
      { name: 'min_seg_size_forward', label: 'min_seg_size_forward', apiName: 'min_seg_size_forward', placeholder: '20' },
    ],
    'Active and Idle': [
      { name: 'active_mean', label: 'Active Mean', apiName: 'Active Mean', placeholder: '0' },
      { name: 'active_std', label: 'Active Std', apiName: 'Active Std', placeholder: '0' },
      { name: 'active_max', label: 'Active Max', apiName: 'Active Max', placeholder: '0' },
      { name: 'active_min', label: 'Active Min', apiName: 'Active Min', placeholder: '0' },
      { name: 'idle_mean', label: 'Idle Mean', apiName: 'Idle Mean', placeholder: '0' },
      { name: 'idle_std', label: 'Idle Std', apiName: 'Idle Std', placeholder: '0' },
      { name: 'idle_max', label: 'Idle Max', apiName: 'Idle Max', placeholder: '0' },
      { name: 'idle_min', label: 'Idle Min', apiName: 'Idle Min', placeholder: '0' },
    ],
  }

  const attackTypes = {
    0: { name: 'BENIGN', color: 'green' },
    1: { name: 'Bot', color: 'orange' },
    2: { name: 'DDoS', color: 'red' },
    3: { name: 'DoS GoldenEye', color: 'red' },
    4: { name: 'DoS Hulk', color: 'red' },
    5: { name: 'DoS Slowhttptest', color: 'red' },
    6: { name: 'DoS Slowloris', color: 'red' },
    7: { name: 'FTP-Patator', color: 'orange' },
    8: { name: 'Heartbleed', color: 'purple' },
    9: { name: 'Infiltration', color: 'purple' },
    10: { name: 'PortScan', color: 'yellow' },
    11: { name: 'SSH-Patator', color: 'orange' },
    12: { name: 'Web Attack - Brute Force', color: 'red' },
    13: { name: 'Web Attack - SQL Injection', color: 'red' },
    14: { name: 'Web Attack - XSS', color: 'red' },
  }

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }))
  }

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setCsvFile(file)
    }
  }

  const applySampleData = (sampleName) => {
    const sample = sampleData[sampleName]
    if (sample && sample.data) {
      setFormData(sample.data)
      // Expand all groups to show the filled data
      const allExpanded = {}
      Object.keys(featureGroups).forEach(key => {
        allExpanded[key] = true
      })
      setExpandedGroups(allExpanded)
    }
  }

  const handleManualPredict = async () => {
    setIsLoading(true)
    try {
      const apiData = {}
      
      Object.values(featureGroups).forEach(features => {
        features.forEach(feature => {
          apiData[feature.apiName] = parseFloat(formData[feature.name]) || 0
        })
      })
      
      const response = await fetch(API_ENDPOINTS.PREDICT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      setManualPredictions([{
        id: Date.now(),
        type: 'Manual Entry',
        result: result.attack_type,
        confidence: result.confidence,
        label: result.label,
        timestamp: new Date().toLocaleTimeString()
      }])
      
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Error making prediction. Please check if the server is running.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCsvPredict = async () => {
    if (!csvFile) return
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', csvFile)
      
      const response = await fetch(API_ENDPOINTS.PREDICT_CSV, {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      const predictions = result.results.map(item => ({
        id: Date.now() + item.row,
        row: item.row,
        result: item.predicted_type || item.attack_type || attackTypes[item.predicted_label]?.name || 'Unknown',
        confidence: item.confidence,
        label: item.predicted_label !== undefined ? item.predicted_label : item.label,
        actual_label: item.actual_label,
        actual_type: item.actual_type,
        correct: item.correct
      }))
      
      setCsvPredictions(predictions)
      
      if (result.accuracy !== undefined) {
        console.log(`Accuracy: ${result.accuracy}%`)
        console.log(`Correct: ${result.correct_predictions}/${result.total_predictions}`)
      }
      
    } catch (error) {
      console.error('CSV prediction error:', error)
      alert('Error processing CSV file.')
    } finally {
      setIsLoading(false)
    }
  }

  const getAttackColor = (label) => {
    const colors = {
      green: 'text-green-400 bg-green-400/10 border-green-400/20',
      yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      red: 'text-red-400 bg-red-400/10 border-red-400/20',
      purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    }
    const attackType = attackTypes[label]
    return colors[attackType?.color] || colors.red
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Network Traffic Prediction
        </h2>
        <p className="text-gray-400">Analyze network traffic patterns using AI-powered detection</p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
          <div className="flex space-x-1">
            <button
              onClick={() => setInputMode('manual')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                inputMode === 'manual'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Manual Entry</span>
            </button>
            <button
              onClick={() => setInputMode('csv')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                inputMode === 'csv'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>CSV Upload</span>
            </button>
          </div>
        </div>
      </div>

      {/* Input Section */}
      {inputMode === 'manual' ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Database className="w-5 h-5 mr-2 text-white" />
            Enter All 79 Network Features
          </h3>

          {/* Sample Data Buttons */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-gray-300 mb-3">Load Sample Data:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(sampleData).map(([name, config]) => {
                const Icon = config.icon
                const color = config.color
                const colorClasses = {
                  green: 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-400/20',
                  red: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-400/20',
                  yellow: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-400/20',
                  orange: 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-400/20',
                  purple: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-400/20'
                }
                return (
                  <button
                    key={name}
                    onClick={() => applySampleData(name)}
                    className={`px-4 py-2 rounded-lg border ${colorClasses[color]} transition-all duration-300 flex items-center space-x-2`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{name}</span>
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {Object.entries(featureGroups).map(([groupName, features]) => (
              <div key={groupName} className="bg-white/5 rounded-lg border border-white/10">
                <button
                  onClick={() => toggleGroup(groupName)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <h4 className="text-sm font-medium text-gray-300">{groupName} ({features.length} features)</h4>
                  {expandedGroups[groupName] ? 
                    <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  }
                </button>
                
                {expandedGroups[groupName] && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature) => (
                      <div key={feature.name}>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          {feature.label}
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder={feature.placeholder}
                          value={formData[feature.name] || ''}
                          onChange={(e) => handleInputChange(feature.name, e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleManualPredict}
            disabled={isLoading}
            className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Predict Attack Type</span>
              </>
            )}
          </button>

          {/* Manual Prediction Results */}
          {manualPredictions.length > 0 && (
            <div className="mt-6">
              {manualPredictions.map((pred) => (
                <div key={pred.id} className="bg-white/5 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {pred.label === 0 ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-400" />
                      )}
                      <div>
                        <p className="text-white font-semibold text-lg">{pred.result}</p>
                        <p className="text-gray-400 text-sm">Confidence: {pred.confidence}%</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getAttackColor(pred.label)}`}>
                      {pred.label === 0 ? 'Safe' : 'Threat'}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Analyzed at {pred.timestamp}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-white" />
            Upload CSV File
          </h3>

          <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-white/40 transition-all duration-300">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 mx-auto text-white mb-4" />
              <p className="text-white font-medium mb-2">
                {csvFile ? csvFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-gray-400 text-sm">CSV files only (max 10MB)</p>
            </label>
          </div>

          {csvFile && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-white font-medium">{csvFile.name}</p>
                    <p className="text-gray-400 text-sm">
                      {(csvFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCsvFile(null)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleCsvPredict}
            disabled={!csvFile || isLoading}
            className="mt-6 w-full bg-white text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-white/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span>Processing CSV...</span>
              </>
            ) : (
              <>
                <Database className="w-5 h-5" />
                <span>Analyze CSV Data</span>
              </>
            )}
          </button>

          {/* CSV Results */}
          {csvPredictions.length > 0 && (
            <div className="mt-6 bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                CSV Prediction Results
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Row</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Predicted</th>
                      {csvPredictions[0]?.actual_type && (
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Actual</th>
                      )}
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Confidence</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvPredictions.map((pred) => (
                      <tr key={pred.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 text-white">{pred.row}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getAttackColor(pred.label)}`}>
                            {pred.result}
                          </span>
                        </td>
                        {pred.actual_type && (
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getAttackColor(pred.actual_label)}`}>
                              {pred.actual_type}
                            </span>
                          </td>
                        )}
                        <td className="py-4 px-4 text-gray-300">{pred.confidence}%</td>
                        <td className="py-4 px-4">
                          {pred.correct !== undefined ? (
                            pred.correct ? (
                              <CheckCircle className="w-5 h-5 text-green-400" title="Correct prediction" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" title="Incorrect prediction" />
                            )
                          ) : (
                            pred.label === 0 ? (
                              <CheckCircle className="w-5 h-5 text-green-400" title="Safe" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" title="Threat detected" />
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Prediction