
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

const WholesaleProfitCalculator = () => {
  const [quantity, setQuantity] = useState(10);
  const [unitCost, setUnitCost] = useState(100000);
  const [retailPrice, setRetailPrice] = useState(150000);
  const [profit, setProfit] = useState(0);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    calculateProfit();
  }, [quantity, unitCost, retailPrice]);

  const calculateProfit = () => {
    const totalCost = quantity * unitCost;
    const totalRevenue = quantity * retailPrice;
    const profitAmount = totalRevenue - totalCost;
    const roiPercent = (profitAmount / totalCost) * 100;
    
    setProfit(profitAmount);
    setRoi(roiPercent);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Tính toán lợi nhuận bán sỉ</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Số lượng sản phẩm</Label>
              <div className="flex gap-4 items-center mt-2">
                <Slider
                  value={[quantity]}
                  min={5}
                  max={500}
                  step={5}
                  onValueChange={([val]) => setQuantity(val)}
                  className="flex-1"
                />
                <Input 
                  id="quantity"
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="unitCost">Giá nhập (VNĐ/sản phẩm)</Label>
              <Input 
                id="unitCost"
                type="number" 
                value={unitCost} 
                onChange={(e) => setUnitCost(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="retailPrice">Giá bán lẻ (VNĐ/sản phẩm)</Label>
              <Input 
                id="retailPrice"
                type="number" 
                value={retailPrice} 
                onChange={(e) => setRetailPrice(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            
            <Button onClick={calculateProfit} className="w-full">Tính toán</Button>
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Tổng chi phí:</p>
                  <p className="text-lg font-bold">{formatCurrency(quantity * unitCost)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Doanh thu dự kiến:</p>
                  <p className="text-lg font-bold">{formatCurrency(quantity * retailPrice)}</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Lợi nhuận:</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(profit)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">ROI:</p>
                  <p className="text-xl font-bold text-primary">{roi.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>* Đây chỉ là công cụ tính toán đơn giản để tham khảo</p>
            <p>* Các chi phí khác như vận chuyển, marketing chưa được tính đến</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleProfitCalculator;
