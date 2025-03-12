
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, GridIcon, List, ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import FilterSidebar from '@/components/ui/FilterSidebar';
import { products, categories, brands } from '@/lib/data';

interface FilterState {
  priceRange: [number, number];
  brands: number[];
  rating: number | null;
}

const Products = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    priceRange: [0, 10000000],
    brands: [],
    rating: null,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('featured');

  // Get the category if categorySlug is provided
  const category = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : null;

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true);

    // Filter by category if categorySlug is provided
    let result = categorySlug
      ? products.filter((p) => {
          const matchingCategory = categories.find((c) => c.slug === categorySlug);
          return matchingCategory ? p.categoryId === matchingCategory.id : true;
        })
      : [...products];

    // Apply price filter
    result = result.filter(
      (p) => p.price >= activeFilters.priceRange[0] && p.price <= activeFilters.priceRange[1]
    );

    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      result = result.filter((p) => activeFilters.brands.includes(p.brandId));
    }

    // Apply rating filter
    if (activeFilters.rating !== null) {
      result = result.filter((p) => p.rating >= activeFilters.rating!);
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => {
          const aPrice = a.price - (a.price * a.discount) / 100;
          const bPrice = b.price - (b.price * b.discount) / 100;
          return aPrice - bPrice;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const aPrice = a.price - (a.price * a.discount) / 100;
          const bPrice = b.price - (b.price * b.discount) / 100;
          return bPrice - aPrice;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
        // For demo, just reverse the order
        result = [...result].reverse();
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [categorySlug, activeFilters, sortOption]);

  // Reset filters when category changes
  useEffect(() => {
    setActiveFilters({
      priceRange: [0, 10000000],
      brands: [],
      rating: null,
    });
  }, [categorySlug]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  // Count active filters (excluding default price range)
  const activeFilterCount = 
    (activeFilters.brands.length > 0 ? 1 : 0) + 
    (activeFilters.rating !== null ? 1 : 0) +
    (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 10000000 ? 1 : 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Category Header */}
        <div className="bg-secondary">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              {category ? category.name : 'Tất cả sản phẩm'}
            </h1>
            {category && (
              <p className="text-muted-foreground mt-2">{category.description}</p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Products Content */}
            <div className="flex-1">
              {/* Actions Bar */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="flex items-center">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={toggleFilter}
                    className="lg:hidden flex items-center bg-white border rounded-lg py-2 px-4 text-sm font-medium hover:bg-secondary transition-colors mr-2"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Bộ lọc</span>
                    {activeFilterCount > 0 && (
                      <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* View Mode */}
                  <div className="hidden sm:flex items-center border rounded-lg">
                    <button
                      onClick={() => handleViewModeChange('grid')}
                      className={`flex items-center p-2 ${
                        viewMode === 'grid'
                          ? 'bg-secondary'
                          : 'hover:bg-secondary transition-colors'
                      }`}
                      aria-label="Grid view"
                    >
                      <GridIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleViewModeChange('list')}
                      className={`flex items-center p-2 ${
                        viewMode === 'list'
                          ? 'bg-secondary'
                          : 'hover:bg-secondary transition-colors'
                      }`}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sort Select */}
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm mr-2 text-muted-foreground hidden sm:block">
                    Sắp xếp theo:
                  </label>
                  <div className="relative">
                    <select
                      id="sort"
                      value={sortOption}
                      onChange={handleSortChange}
                      className="appearance-none bg-white border rounded-lg py-2 px-4 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="featured">Nổi bật</option>
                      <option value="latest">Mới nhất</option>
                      <option value="price-asc">Giá thấp đến cao</option>
                      <option value="price-desc">Giá cao đến thấp</option>
                      <option value="rating">Đánh giá cao nhất</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Hiển thị <span className="font-medium">{filteredProducts.length}</span> sản phẩm
                </p>
              </div>

              {/* Products */}
              {isLoading ? (
                <div className={`grid ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' 
                    : 'grid-cols-1'
                  } gap-6`}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-muted rounded-xl animate-pulse h-80"></div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={`grid ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' 
                    : 'grid-cols-1'
                  } gap-6`}
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      {...product} 
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-muted-foreground">
                    Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn. Vui lòng thử lại với các tiêu chí khác.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onFilterChange={handleFilterChange}
          className="lg:hidden"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Products;
