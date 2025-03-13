
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  // Handle navigation between product images
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };
  
  // Handle image zoom functionality
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate position as percentage
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Set thumbnail border for active image
  const getThumbnailClass = (index: number) => {
    return index === currentIndex
      ? "border-2 border-primary opacity-100"
      : "border border-gray-200 opacity-70 hover:opacity-100";
  };

  return (
    <div className="product-gallery">
      {/* Main image with zoom */}
      <div 
        className="relative rounded-lg bg-gray-100 overflow-hidden mb-4 aspect-square"
        onMouseMove={handleMouseMove}
        onClick={toggleZoom}
      >
        <div
          className={`w-full h-full transition-transform duration-200 ease-out ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
            backgroundSize: isZoomed ? '200%' : 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Zoom toggle button */}
        <button 
          className="absolute bottom-3 right-3 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 z-10"
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
        </button>
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`aspect-square rounded-md overflow-hidden cursor-pointer transition-all ${getThumbnailClass(index)}`}
              onClick={() => {
                setCurrentIndex(index);
                setIsZoomed(false);
              }}
            >
              <img
                src={image}
                alt={`${name} - Hình ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
