import { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import { processImage } from './utils/api';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Image Background Removal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
              {originalImage ? (
                <ImageDisplay src={originalImage} alt="Original" icon={<ImageIcon className="w-8 h-8 text-gray-500" />} />
              ) : (
                <ImageUploader onImageUpload={handleImageUpload} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                  <p className="mt-4 text-gray-600">Processing image...</p>
                </div>
              ) : processedImage ? (
                <ImageDisplay src={processedImage} alt="Processed" icon={<Upload className="w-8 h-8 text-gray-500" />} />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <Upload className="w-16 h-16 mb-4" />
                  <p>Processed image will appear here</p>
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