
import { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, Tablet, Package, CircleDollarSign } from "lucide-react";

const WholesalePricingTable = () => {
  const [activeCategory, setActiveCategory] = useState("phone-accessories");
  
  // Example pricing data for different product categories
  const pricingData = {
    "phone-accessories": [
      {
        product: "Ốp lưng silicon cao cấp",
        retailPrice: 150000,
        wholesalePrices: {
          "10-49": 120000,
          "50-99": 100000,
          "100+": 85000
        },
        discount: {
          "10-49": "20%",
          "50-99": "33%",
          "100+": "43%"
        },
        minOrder: 10,
        highlight: true
      },
      {
        product: "Kính cường lực 9D",
        retailPrice: 120000,
        wholesalePrices: {
          "10-49": 90000,
          "50-99": 75000,
          "100+": 60000
        },
        discount: {
          "10-49": "25%",
          "50-99": "38%",
          "100+": "50%"
        },
        minOrder: 10,
        highlight: false
      },
      {
        product: "Sạc nhanh 20W",
        retailPrice: 350000,
        wholesalePrices: {
          "10-49": 280000,
          "50-99": 245000,
          "100+": 210000
        },
        discount: {
          "10-49": "20%",
          "50-99": "30%",
          "100+": "40%"
        },
        minOrder: 5,
        highlight: true
      },
      {
        product: "Cáp sạc Type-C 1m",
        retailPrice: 180000,
        wholesalePrices: {
          "10-49": 144000,
          "50-99": 126000,
          "100+": 108000
        },
        discount: {
          "10-49": "20%",
          "50-99": "30%",
          "100+": "40%"
        },
        minOrder: 10,
        highlight: false
      },
    ],
    "tablet-accessories": [
      {
        product: "Bao da máy tính bảng",
        retailPrice: 450000,
        wholesalePrices: {
          "10-49": 360000,
          "50-99": 315000,
          "100+": 270000
        },
        discount: {
          "10-49": "20%",
          "50-99": "30%",
          "100+": "40%"
        },
        minOrder: 5,
        highlight: true
      },
      {
        product: "Kính cường lực máy tính bảng",
        retailPrice: 250000,
        wholesalePrices: {
          "10-49": 187500,
          "50-99": 162500,
          "100+": 137500
        },
        discount: {
          "10-49": "25%",
          "50-99": "35%",
          "100+": "45%"
        },
        minOrder: 5,
        highlight: false
      },
    ],
    "combo-packages": [
      {
        product: "Combo phụ kiện iPhone (ốp + kính + cáp sạc)",
        retailPrice: 450000,
        wholesalePrices: {
          "10-49": 337500,
          "50-99": 292500,
          "100+": 247500
        },
        discount: {
          "10-49": "25%",
          "50-99": "35%",
          "100+": "45%"
        },
        minOrder: 5,
        highlight: true
      },
      {
        product: "Combo phụ kiện Samsung (ốp + kính + sạc nhanh)",
        retailPrice: 520000,
        wholesalePrices: {
          "10-49": 390000,
          "50-99": 338000,
          "100+": 286000
        },
        discount: {
          "10-49": "25%",
          "50-99": "35%",
          "100+": "45%"
        },
        minOrder: 5,
        highlight: true
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div>
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="mb-6 w-full justify-start grid grid-cols-3 md:w-auto">
          <TabsTrigger value="phone-accessories" className="flex items-center gap-1">
            <Phone className="h-4 w-4" /> 
            <span className="hidden md:inline">Phụ kiện điện thoại</span>
            <span className="md:hidden">Điện thoại</span>
          </TabsTrigger>
          <TabsTrigger value="tablet-accessories" className="flex items-center gap-1">
            <Tablet className="h-4 w-4" /> 
            <span className="hidden md:inline">Phụ kiện máy tính bảng</span>
            <span className="md:hidden">Máy tính bảng</span>
          </TabsTrigger>
          <TabsTrigger value="combo-packages" className="flex items-center gap-1">
            <Package className="h-4 w-4" /> 
            <span className="hidden md:inline">Combo sản phẩm</span>
            <span className="md:hidden">Combo</span>
          </TabsTrigger>
        </TabsList>
        
        {Object.keys(pricingData).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Sản phẩm</TableHead>
                    <TableHead className="text-right">Giá lẻ</TableHead>
                    <TableHead className="text-right">
                      <div className="flex flex-col items-end">
                        <span>10-49 sản phẩm</span>
                        <span className="text-xs text-gray-500">Chiết khấu</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex flex-col items-end">
                        <span>50-99 sản phẩm</span>
                        <span className="text-xs text-gray-500">Chiết khấu</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div className="flex flex-col items-end">
                        <span>100+ sản phẩm</span>
                        <span className="text-xs text-gray-500">Chiết khấu</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center">SL tối thiểu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingData[category as keyof typeof pricingData].map((item, index) => (
                    <TableRow key={index} className={item.highlight ? "bg-blue-50" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {item.product}
                          {item.highlight && (
                            <Badge className="bg-blue-500">Bán chạy</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(item.retailPrice)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span>{formatCurrency(item.wholesalePrices["10-49"])}</span>
                          <span className="text-xs text-green-600">-{item.discount["10-49"]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span>{formatCurrency(item.wholesalePrices["50-99"])}</span>
                          <span className="text-xs text-green-600">-{item.discount["50-99"]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span>{formatCurrency(item.wholesalePrices["100+"])}</span>
                          <span className="text-xs text-green-600">-{item.discount["100+"]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CircleDollarSign className="h-4 w-4 text-primary" />
                          <span>{item.minOrder}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WholesalePricingTable;
