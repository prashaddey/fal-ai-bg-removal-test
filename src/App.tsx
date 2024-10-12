import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import ThemeToggle from './components/ThemeToggle';
import { processImage } from './utils/api';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setOriginalImage(URL.createObjectURL(file));
    try {
      const processedImageUrl = await processImage(file);
      setProcessedImage(processedImageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl p-8 transition-all duration-300`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Image Background Removal</h2>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`flex flex-col items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-600 hover:border-blue-400' : 'border-gray-200 hover:border-blue-400'} rounded-lg p-6 transition-all duration-300`}>
              {originalImage ? (
                <ImageDisplay src={originalImage} alt="Original" icon={<ImageIcon className="w-10 h-10 text-blue-500" />} />
              ) : (
                <ImageUploader onImageUpload={handleImageUpload} darkMode={darkMode} />
              )}
            </div>
            <div className={`flex flex-col items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-600 hover:border-green-400' : 'border-gray-200 hover:border-green-400'} rounded-lg p-6 transition-all duration-300`}>
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                  <p className={`mt-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Processing image...</p>
                </div>
              ) : processedImage ? (
                <ImageDisplay src={processedImage} alt="Processed" icon={<Upload className="w-10 h-10 text-green-500" />} />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Upload className="w-20 h-20 mb-6" />
                  <p className="text-lg font-medium">Processed image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
