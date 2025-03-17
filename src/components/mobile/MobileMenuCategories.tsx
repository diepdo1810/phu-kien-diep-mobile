
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';
import { ChevronRight } from 'lucide-react';

interface MobileMenuCategoriesProps {
  closeDrawer: () => void;
}

const MobileMenuCategories = ({ closeDrawer }: MobileMenuCategoriesProps) => {
  return (
    <div className="p-4 overflow-auto">
      <div className="grid gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products/${category.slug}`}
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={closeDrawer}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-6 h-6 object-contain" 
                />
              </div>
              <span>{category.name}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
        ))}
      </div>
      
      <div className="mt-6">
        <Link
          to="/products"
          className="block w-full py-3 text-center bg-primary text-white rounded-lg font-medium"
          onClick={closeDrawer}
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default MobileMenuCategories;
