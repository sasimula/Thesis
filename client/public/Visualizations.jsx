import React, { useState, useEffect } from 'react'
import { 
  X, Image as ImageIcon
} from 'lucide-react'

const ANALYSIS_IMAGES = [
  {
    name: 'Correlation Heatmap of Key Features',
    filename: '1.png',
    description: 'Correlation matrix showing relationships between key network features'
  },
  {
    name: 'Model Comparisons of Algorithms',
    filename: 'Model Comparisons of Algorithms.png', 
    description: 'Performance comparison between different machine learning algorithms'
  },
  {
    name: 'Original Distribution of Attack Types',
    filename: 'Original Distribution of Attack types.png',
    description: 'Distribution of different attack types in the original dataset'
  },
  {
    name: 'Countplot of Label Distribution',
    filename: 'Countplot of Label Distribution.png',
    description: 'Count distribution of attack labels in the dataset'
  },
  {
    name: 'Flow Duration by Label',
    filename: 'Flow Duration by Label.png',
    description: 'Analysis of network flow duration categorized by attack labels'
  },
  {
    name: 'Distribution of Flow Duration',
    filename: 'Distribution of Flow Duration.png',
    description: 'Statistical distribution of network flow durations'
  },
  {
    name: 'Packet Length Analysis',
    filename: 'Fwd packet Length Mean vs Bwd packet length Mean.png',
    description: 'Scatter plot comparing forward and backward packet lengths'
  },
  {
    name: 'Proportion of Labels',
    filename: 'Proportion of Labels.png',
    description: 'Proportional representation of different attack types'
  }
]

const Visualizations = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const openImageModal = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Analysis Images
        </h2>
        <p className="text-gray-400">Explore comprehensive data analysis visualizations and insights</p>
      </div>

      {/* Image Gallery */}
      <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ANALYSIS_IMAGES.map((image, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-2xl"
              onClick={() => openImageModal(image)}
            >
              <div className="aspect-[4/3] bg-white rounded-t-lg overflow-hidden">
                <img
                  src={`/${image.filename}`}
                  alt={image.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center bg-gray-100">
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Image not found</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-white font-medium mb-2 text-sm leading-tight group-hover:text-blue-400 transition-colors">
                  {image.name}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {ANALYSIS_IMAGES.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No analysis images found</p>
            <p className="text-gray-500 text-sm mt-2">Upload your analysis images to display them here</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-7xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Modal Content */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="bg-white p-2 rounded-t-xl">
                <img
                  src={`/${selectedImage.filename}`}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{selectedImage.name}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Visualizations