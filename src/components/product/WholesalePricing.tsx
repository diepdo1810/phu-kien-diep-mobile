
import { WholesaleTier } from '@/lib/data';
import { formatWholesaleTier } from '@/lib/product-utils';

interface WholesalePricingProps {
  wholesaleTiers: WholesaleTier[];
  minWholesaleQuantity: number;
}

const WholesalePricing = ({ wholesaleTiers, minWholesaleQuantity }: WholesalePricingProps) => {
  return (
    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
      <h3 className="text-sm font-semibold mb-2">Giá sỉ (tối thiểu {minWholesaleQuantity} chiếc)</h3>
      <div className="grid gap-2">
        {wholesaleTiers.map((tier, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span>{tier.minQuantity}{tier.maxQuantity ? `-${tier.maxQuantity}` : '+'} chiếc:</span>
            <span className="font-medium text-primary">{formatWholesaleTier(tier).split(': ')[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WholesalePricing;
