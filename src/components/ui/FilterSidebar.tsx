
import { useState, useEffect } from 'react';
import { X, Filter, ChevronDown, Star } from 'lucide-react';
import { brands } from '@/lib/data';

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  priceRange: [number, number];
  brands: number[];
  rating: number | null;
}

const FilterSidebar = ({ isOpen, onClose, onFilterChange, className }: FilterProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000000],
    brands: [],
    rating: null,
  });

  // For price range display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Update mobile sidebar visibility when isOpen changes
  useEffect(() => {
    setMobileOpen(isOpen);
  }, [isOpen]);

  // Handle price range change
  const handlePriceChange = (index: number, value: number) => {
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > newPriceRange[1]) {
      newPriceRange[1] = value;
    } else if (index === 1 && value < newPriceRange[0]) {
      newPriceRange[0] = value;
    }
    
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  // Handle brand filter change
  const handleBrandChange = (brandId: number, checked: boolean) => {
    let newBrands: number[];
    
    if (checked) {
      newBrands = [...filters.brands, brandId];
    } else {
      newBrands = filters.brands.filter(id => id !== brandId);
    }
    
    setFilters({ ...filters, brands: newBrands });
  };

  // Handle rating filter change
  const handleRatingChange = (rating: number) => {
    setFilters({ ...filters, rating: filters.rating === rating ? null : rating });
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange(filters);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  // Reset filters
  const resetFilters = () => {
    const resetState: FilterState = {
      priceRange: [0, 10000000],
      brands: [],
      rating: null,
    };
    setFilters(resetState);
    onFilterChange(resetState);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block transition-all duration-300 ${className}`}>
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-medium flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc sản phẩm
            </h3>
            <button 
              onClick={resetFilters}
              className="text-xs text-primary hover:underline"
            >
              Đặt lại
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Khoảng giá</h4>
            <div className="space-y-3">
              <div>
                <label htmlFor="min-price" className="text-sm text-muted-foreground">
                  Giá tối thiểu: {formatCurrency(filters.priceRange[0])}
                </label>
                <input
                  type="range"
                  id="min-price"
                  min={0}
                  max={10000000}
                  step={100000}
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="max-price" className="text-sm text-muted-foreground">
                  Giá tối đa: {formatCurrency(filters.priceRange[1])}
                </label>
                <input
                  type="range"
                  id="max-price"
                  min={0}
                  max={10000000}
                  step={100000}
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Thương hiệu</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand.id}`}
                    checked={filters.brands.includes(brand.id)}
                    onChange={(e) => handleBrandChange(brand.id, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Đánh giá</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`flex items-center w-full py-1 px-2 rounded-md transition-colors ${
                    filters.rating === star ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                  }`}
                >
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < star
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-sm">
                    {star === 5 ? 'trở lên' : 'trở lên'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Áp dụng
          </button>
        </div>
      </div>

      {/* Mobile Filter Button and Backdrop */}
      <div className="md:hidden">
        {mobileOpen && (
          <div className="fixed inset-0 bg-black/50 z-30" onClick={onClose} />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white z-40 rounded-t-xl transition-transform duration-300 transform ${
            mobileOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ maxHeight: '85vh', overflowY: 'auto' }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
            <h3 className="font-medium">Bộ lọc</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="p-4">
            {/* Mobile Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Khoảng giá</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="min-price-mobile" className="text-sm text-muted-foreground">
                    Giá tối thiểu: {formatCurrency(filters.priceRange[0])}
                  </label>
                  <input
                    type="range"
                    id="min-price-mobile"
                    min={0}
                    max={10000000}
                    step={100000}
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label htmlFor="max-price-mobile" className="text-sm text-muted-foreground">
                    Giá tối đa: {formatCurrency(filters.priceRange[1])}
                  </label>
                  <input
                    type="range"
                    id="max-price-mobile"
                    min={0}
                    max={10000000}
                    step={100000}
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Brands */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Thương hiệu</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-mobile-${brand.id}`}
                      checked={filters.brands.includes(brand.id)}
                      onChange={(e) => handleBrandChange(brand.id, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor={`brand-mobile-${brand.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Ratings */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Đánh giá</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`flex items-center w-full py-1 px-2 rounded-md transition-colors ${
                      filters.rating === star ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                    }`}
                  >
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < star
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm">
                      {star === 5 ? 'trở lên' : 'trở lên'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={resetFilters}
                className="flex-1 bg-secondary text-foreground py-2 rounded-md hover:bg-secondary/80 transition-colors"
              >
                Đặt lại
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
