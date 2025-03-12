
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from '@/lib/data';

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(banners.map(() => false));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (imagesLoaded.every(Boolean)) {
      setIsLoading(false);
    }
  }, [imagesLoaded]);

  const handleImageLoad = (index: number) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
  };

  const goToPrevious = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentBanner(index);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-secondary">
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Banner Slides */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 flex flex-col md:flex-row items-center transition-opacity duration-1000 ${
              currentBanner === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundColor: banner.backgroundColor }}
          >
            {/* Text Content */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <span className="inline-block mb-2 text-sm md:text-base text-primary font-medium px-3 py-1 bg-primary/10 rounded-full">
                Khuyến mãi đặc biệt
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{banner.title}</h1>
              <p className="text-muted-foreground mb-8 max-w-md">{banner.subtitle}</p>
              <Link
                to={banner.buttonLink}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors w-fit"
              >
                {banner.buttonText}
              </Link>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                onLoad={() => handleImageLoad(index)}
                loading="eager"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentBanner === index ? 'bg-primary w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
