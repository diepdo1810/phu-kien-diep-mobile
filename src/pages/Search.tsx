
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import { Helmet } from 'react-helmet-async';
import { categories } from '@/lib/data';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(products);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchResults(products);
      return;
    }
    
    const results = products.filter(product => {
      // Get the category name for this product
      const category = categories.find(cat => cat.id === product.categoryId);
      const categoryName = category ? category.name.toLowerCase() : '';
      
      return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryName.includes(searchTerm.toLowerCase());
    });
    
    setSearchResults(results);
  };

  return (
    <>
      <Helmet>
        <title>Tìm kiếm sản phẩm | B Store</title>
        <meta name="description" content="Tìm kiếm sản phẩm từ B Store - Phụ kiện điện thoại chính hãng" />
      </Helmet>
      
      <div className="container-custom pt-[80px] pb-20">
        <h1 className="text-2xl font-bold mb-6">Tìm kiếm sản phẩm</h1>
        
        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Nhập tên sản phẩm, danh mục hoặc từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button type="submit" className="px-6 py-6">Tìm kiếm</Button>
        </form>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            {searchTerm 
              ? `Kết quả tìm kiếm cho "${searchTerm}" (${searchResults.length})` 
              : "Tất cả sản phẩm"}
          </h2>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Không tìm thấy sản phẩm nào phù hợp với từ khóa "{searchTerm}"</p>
              <p className="mt-4 text-sm text-gray-400">Vui lòng thử lại với từ khóa khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  wholesalePrice={product.wholesalePrice}
                  discount={product.discount}
                  images={product.images}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  index={product.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
