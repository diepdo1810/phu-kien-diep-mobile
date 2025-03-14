
import { formatPrice } from "@/lib/product-utils";
import { Button } from "@/components/ui/button";

interface ProductSearchResultsProps {
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
  }>;
  onAddProduct: (product: any) => void;
}

const ProductSearchResults = ({ products, onAddProduct }: ProductSearchResultsProps) => {
  return (
    <div className="border rounded-md overflow-hidden mt-2">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-4 px-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-10 w-10 rounded-md object-cover mr-3"
                  />
                  <span>{product.name}</span>
                </div>
              </td>
              <td className="py-4 px-4 whitespace-nowrap">{formatPrice(product.price)}</td>
              <td className="py-4 px-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 
                    ? 'Còn hàng' 
                    : product.stock > 0 
                      ? 'Sắp hết' 
                      : 'Hết hàng'}
                </span>
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right">
                <Button 
                  type="button" 
                  onClick={() => onAddProduct(product)}
                  disabled={product.stock <= 0}
                  size="sm"
                >
                  Thêm
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSearchResults;
