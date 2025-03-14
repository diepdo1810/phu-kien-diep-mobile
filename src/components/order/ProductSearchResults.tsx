
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/product-utils';
import { Separator } from '@/components/ui/separator';

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  sku?: string;
};

interface ProductSearchResultsProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
}

const ProductSearchResults = ({ products, onAddProduct }: ProductSearchResultsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="border rounded-md overflow-hidden max-h-72 overflow-y-auto shadow-md">
      <div className="bg-muted p-2 sticky top-0 font-medium text-sm">
        Kết quả tìm kiếm ({products.length})
      </div>
      <div className="p-0">
        {products.map((product) => (
          <div key={product.id} className="hover:bg-gray-50">
            <div className="p-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{product.name}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{formatPrice(product.price)}</span>
                  {product.sku && <span>Mã: {product.sku}</span>}
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => onAddProduct(product)}
                className="ml-4"
              >
                Thêm
              </Button>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearchResults;
