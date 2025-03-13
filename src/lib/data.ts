
// Mock data for the eCommerce website

// Product Categories
export const categories = [
  {
    id: 1,
    name: "Ốp lưng",
    slug: "op-lung",
    image: "/images/categories/case.jpg",
    description: "Bảo vệ điện thoại của bạn với các mẫu ốp lưng thời trang",
  },
  {
    id: 2,
    name: "Tai nghe",
    slug: "tai-nghe",
    image: "/images/categories/headphones.jpg",
    description: "Tai nghe không dây và có dây chất lượng cao",
  },
  {
    id: 3,
    name: "Sạc dự phòng",
    slug: "sac-du-phong",
    image: "/images/categories/powerbank.jpg",
    description: "Luôn đảm bảo thiết bị của bạn được sạc đầy",
  },
  {
    id: 4,
    name: "Cáp sạc",
    slug: "cap-sac",
    image: "/images/categories/cables.jpg",
    description: "Cáp sạc nhanh chính hãng chất lượng cao",
  },
  {
    id: 5,
    name: "Miếng dán cường lực",
    slug: "mieng-dan-cuong-luc",
    image: "/images/categories/screen-protector.jpg",
    description: "Bảo vệ màn hình khỏi va đập và trầy xước",
  },
  {
    id: 6,
    name: "Phụ kiện khác",
    slug: "phu-kien-khac",
    image: "/images/categories/accessories.jpg",
    description: "Các phụ kiện khác cho thiết bị di động của bạn",
  },
];

// Brands
export const brands = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Xiaomi" },
  { id: 4, name: "Anker" },
  { id: 5, name: "Baseus" },
  { id: 6, name: "JBL" },
];

// Wholesale Price Tiers
export interface WholesaleTier {
  minQuantity: number;
  maxQuantity: number | null;
  price: number;
}

// Products
export const products = [
  {
    id: 1,
    name: "Ốp lưng iPhone 15 Pro Max silicone trong suốt",
    slug: "op-lung-iphone-15-pro-max-silicone-trong-suot",
    categoryId: 1,
    brandId: 1,
    sku: "OL-IP15PM-01",
    price: 250000,
    wholesalePrice: 180000,
    discount: 10,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 180000 },
      { minQuantity: 51, maxQuantity: 100, price: 170000 },
      { minQuantity: 101, maxQuantity: null, price: 160000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1592954536775-3144a9c31848?q=80&w=1000",
      "https://images.unsplash.com/photo-1680320282066-8e4971cd4fb6?q=80&w=1000",
    ],
    rating: 4.7,
    reviewCount: 152,
    stock: 100,
    featured: true,
    viewCount: 1245,
    salesCount: 78,
    dateAdded: "2023-10-15",
    description: "Ốp lưng silicone trong suốt bảo vệ iPhone 15 Pro Max từ va đập và trầy xước. Thiết kế mỏng, vừa vặn, toàn bộ cạnh và nút bấm, không ảnh hưởng đến thao tác sử dụng điện thoại hàng ngày.",
    specifications: [
      { name: "Chất liệu", value: "Silicone" },
      { name: "Màu sắc", value: "Trong suốt" },
      { name: "Tương thích", value: "iPhone 15 Pro Max" },
      { name: "Tính năng đặc biệt", value: "Chống sốc" },
    ],
    warranty: "Bảo hành 1 tháng cho các lỗi sản xuất",
  },
  {
    id: 2,
    name: "Tai nghe Bluetooth Apple AirPods Pro 2",
    slug: "tai-nghe-bluetooth-apple-airpods-pro-2",
    categoryId: 2,
    brandId: 1,
    sku: "AP-PRO2-01",
    price: 5990000,
    wholesalePrice: 5500000,
    discount: 5,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 5500000 },
      { minQuantity: 51, maxQuantity: 100, price: 5300000 },
      { minQuantity: 101, maxQuantity: null, price: 5100000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1000",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=1000",
    ],
    rating: 4.9,
    reviewCount: 325,
    stock: 50,
    featured: true,
    viewCount: 2350,
    salesCount: 156,
    dateAdded: "2023-11-05",
    description: "AirPods Pro 2 với công nghệ Chống ồn Chủ động nâng cao, Xuyên âm thông minh và chip H2 mang đến âm thanh vượt trội, pin dùng tới 6 giờ chỉ với một lần sạc.",
    specifications: [
      { name: "Thời gian sử dụng", value: "Lên đến 6 giờ" },
      { name: "Chống nước", value: "IPX4" },
      { name: "Tính năng đặc biệt", value: "Chống ồn chủ động, Xuyên âm" },
      { name: "Kết nối", value: "Bluetooth 5.3" },
    ],
    warranty: "Bảo hành chính hãng 12 tháng",
  },
  {
    id: 3,
    name: "Sạc dự phòng Anker PowerCore 20000mAh",
    slug: "sac-du-phong-anker-powercore-20000mah",
    categoryId: 3,
    brandId: 4,
    sku: "ANKER-PC20K-01",
    price: 990000,
    wholesalePrice: 850000,
    discount: 15,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 850000 },
      { minQuantity: 51, maxQuantity: 100, price: 830000 },
      { minQuantity: 101, maxQuantity: null, price: 800000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1000",
      "https://images.unsplash.com/photo-1583863788633-e27a12b5ce5f?q=80&w=1000",
    ],
    rating: 4.8,
    reviewCount: 214,
    stock: 75,
    featured: true,
    viewCount: 1820,
    salesCount: 143,
    dateAdded: "2023-09-20",
    description: "Sạc dự phòng Anker PowerCore với dung lượng lớn 20000mAh, công nghệ sạc nhanh 18W, hỗ trợ sạc nhanh cho iPhone và thiết bị Android.",
    specifications: [
      { name: "Dung lượng", value: "20000mAh" },
      { name: "Đầu vào", value: "Micro USB / USB-C (5V/2.4A)" },
      { name: "Đầu ra", value: "USB-A (5V/3A, 9V/2A, 12V/1.5A)" },
      { name: "Công nghệ", value: "PowerIQ, VoltageBoost" },
    ],
    warranty: "Bảo hành chính hãng 18 tháng",
  },
  {
    id: 4,
    name: "Cáp sạc nhanh Baseus USB-C to Lightning 100W",
    slug: "cap-sac-nhanh-baseus-usb-c-to-lightning-100w",
    categoryId: 4,
    brandId: 5,
    sku: "BS-CL100W-01",
    price: 290000,
    wholesalePrice: 220000,
    discount: 0,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 220000 },
      { minQuantity: 51, maxQuantity: 100, price: 200000 },
      { minQuantity: 101, maxQuantity: null, price: 190000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1000",
      "https://images.unsplash.com/photo-1661347334008-da5783be895c?q=80&w=1000",
    ],
    rating: 4.6,
    reviewCount: 98,
    stock: 120,
    featured: false,
    viewCount: 980,
    salesCount: 67,
    dateAdded: "2023-12-01",
    description: "Cáp sạc nhanh Baseus với công nghệ Power Delivery, hỗ trợ sạc siêu nhanh cho iPhone với công suất lên đến 30W và truyền dữ liệu tốc độ cao.",
    specifications: [
      { name: "Chiều dài", value: "1.2m" },
      { name: "Công suất", value: "100W" },
      { name: "Chuẩn sạc", value: "PD 3.0, QC 4.0" },
      { name: "Tốc độ truyền dữ liệu", value: "480Mbps" },
    ],
    warranty: "Bảo hành 6 tháng cho lỗi phần cứng",
  },
  {
    id: 5,
    name: "Miếng dán cường lực Samsung Galaxy S23 Ultra",
    slug: "mieng-dan-cuong-luc-samsung-galaxy-s23-ultra",
    categoryId: 5,
    brandId: 2,
    sku: "CL-SS-S23U-01",
    price: 250000,
    wholesalePrice: 180000,
    discount: 20,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 180000 },
      { minQuantity: 51, maxQuantity: 100, price: 160000 },
      { minQuantity: 101, maxQuantity: null, price: 150000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1616160953762-23afc761534c?q=80&w=1000",
      "https://images.unsplash.com/photo-1613746203812-717e6e5c9c3b?q=80&w=1000",
    ],
    rating: 4.5,
    reviewCount: 76,
    stock: 200,
    featured: false,
    viewCount: 750,
    salesCount: 58,
    dateAdded: "2023-11-15",
    description: "Miếng dán cường lực Samsung Galaxy S23 Ultra với độ cứng 9H, chống trầy xước, chống bám vân tay và chống mỏi mắt với công nghệ lọc ánh sáng xanh.",
    specifications: [
      { name: "Độ cứng", value: "9H" },
      { name: "Độ dày", value: "0.33mm" },
      { name: "Tính năng đặc biệt", value: "Chống bám vân tay, Lọc ánh sáng xanh" },
      { name: "Độ trong suốt", value: "99.9%" },
    ],
    warranty: "Bảo hành 1 tháng đổi mới",
  },
  {
    id: 6,
    name: "Tai nghe Bluetooth JBL Tune 510BT",
    slug: "tai-nghe-bluetooth-jbl-tune-510bt",
    categoryId: 2,
    brandId: 6,
    sku: "JBL-T510BT-01",
    price: 1290000,
    wholesalePrice: 1100000,
    discount: 25,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 1100000 },
      { minQuantity: 51, maxQuantity: 100, price: 1050000 },
      { minQuantity: 101, maxQuantity: null, price: 990000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000",
      "https://images.unsplash.com/photo-1528575950036-63c4853d3f6f?q=80&w=1000",
    ],
    rating: 4.4,
    reviewCount: 132,
    stock: 85,
    featured: true,
    viewCount: 1567,
    salesCount: 112,
    dateAdded: "2023-08-10",
    description: "Tai nghe chụp tai JBL Tune 510BT với âm thanh JBL Pure Bass, kết nối Bluetooth 5.0, thời gian sử dụng lên đến 40 giờ và khả năng sạc nhanh.",
    specifications: [
      { name: "Thời gian sử dụng", value: "40 giờ" },
      { name: "Thời gian sạc", value: "2 giờ" },
      { name: "Kết nối", value: "Bluetooth 5.0" },
      { name: "Trọng lượng", value: "160g" },
    ],
    warranty: "Bảo hành chính hãng 12 tháng",
  },
  {
    id: 7,
    name: "Ốp lưng Samsung Galaxy Z Flip 5",
    slug: "op-lung-samsung-galaxy-z-flip-5",
    categoryId: 1,
    brandId: 2,
    sku: "OL-SSF5-01",
    price: 350000,
    wholesalePrice: 280000,
    discount: 0,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 280000 },
      { minQuantity: 51, maxQuantity: 100, price: 260000 },
      { minQuantity: 101, maxQuantity: null, price: 240000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1600086827875-a63b68548250?q=80&w=1000",
      "https://images.unsplash.com/photo-1613746260436-5a329468be46?q=80&w=1000",
    ],
    rating: 4.3,
    reviewCount: 58,
    stock: 60,
    featured: false,
    viewCount: 890,
    salesCount: 45,
    dateAdded: "2024-01-20",
    description: "Ốp lưng thiết kế dành riêng cho Samsung Galaxy Z Flip 5 với chất liệu cao cấp, bảo vệ máy khỏi trầy xước và va đập nhẹ, không làm ảnh hưởng đến chức năng gập của máy.",
    specifications: [
      { name: "Chất liệu", value: "PC + TPU" },
      { name: "Màu sắc", value: "Đen / Trong suốt" },
      { name: "Tương thích", value: "Samsung Galaxy Z Flip 5" },
      { name: "Tính năng đặc biệt", value: "Chống sốc, thiết kế mỏng" },
    ],
    warranty: "Bảo hành 1 tháng đổi mới",
  },
  {
    id: 8,
    name: "Sạc nhanh Xiaomi 65W GaN",
    slug: "sac-nhanh-xiaomi-65w-gan",
    categoryId: 4,
    brandId: 3,
    sku: "XM-SC65W-01",
    price: 690000,
    wholesalePrice: 550000,
    discount: 10,
    wholesaleTiers: [
      { minQuantity: 10, maxQuantity: 50, price: 550000 },
      { minQuantity: 51, maxQuantity: 100, price: 520000 },
      { minQuantity: 101, maxQuantity: null, price: 500000 }
    ],
    minWholesaleQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1606293459339-21457343204b?q=80&w=1000",
      "https://images.unsplash.com/photo-1659307262208-ebe4726a2db7?q=80&w=1000",
    ],
    rating: 4.7,
    reviewCount: 142,
    stock: 95,
    featured: true,
    viewCount: 2100,
    salesCount: 135,
    dateAdded: "2023-10-05",
    description: "Sạc nhanh Xiaomi 65W GaN với công nghệ Nitride Gallium, nhỏ gọn và hiệu suất cao, hỗ trợ sạc nhanh cho điện thoại, máy tính bảng và laptop.",
    specifications: [
      { name: "Công suất", value: "65W" },
      { name: "Đầu ra", value: "3 cổng (2 USB-C, 1 USB-A)" },
      { name: "Chuẩn sạc", value: "PD 3.0, QC 4+" },
      { name: "Kích thước", value: "50 x 50 x 30mm" },
    ],
    warranty: "Bảo hành chính hãng 18 tháng",
  },
];

// Customer Reviews
export const reviews = [
  {
    id: 1,
    customerName: "Đỗ Hải Phong",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    date: "15/03/2023",
    text: "Rất hài lòng với chất lượng sản phẩm và dịch vụ. Ốp lưng rất vừa vặn và bảo vệ điện thoại của tôi rất tốt.",
    productId: 1,
  },
  {
    id: 2,
    customerName: "Đỗ Hải Vy",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 4,
    date: "22/04/2023",
    text: "Tai nghe AirPods Pro 2 có chất lượng âm thanh tuyệt vời và tính năng chống ồn hoạt động rất hiệu quả. Rất đáng đồng tiền.",
    productId: 2,
  },
  {
    id: 3,
    customerName: "Lê Thị Kiều Trinh",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    date: "05/05/2023",
    text: "Sạc dự phòng Anker thực sự đáng tin cậy và sạc rất nhanh. Tôi có thể sạc đầy iPhone của mình hơn 4 lần chỉ với một lần sạc đầy pin dự phòng.",
    productId: 3,
  },
  {
    id: 4,
    customerName: "Phạm Thị D",
    avatar: "/images/avatars/avatar-4.jpg",
    rating: 5,
    date: "18/06/2023",
    text: "Sạc nhanh Xiaomi GaN rất nhỏ gọn nhưng công suất lại rất cao. Có thể sạc cả điện thoại và laptop cùng lúc mà không gặp vấn đề gì.",
    productId: 8,
  },
];

// Banner data
export const banners = [
  {
    id: 1,
    title: "Phụ kiện iPhone 15 Series",
    subtitle: "Giảm đến 30% cho các sản phẩm mới",
    image: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?q=80&w=1000",
    buttonText: "Mua ngay",
    buttonLink: "/products/op-lung",
    backgroundColor: "#f0f9ff",
  },
  {
    id: 2,
    title: "Tai nghe không dây cao cấp",
    subtitle: "Trải nghiệm âm thanh đỉnh cao",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    buttonText: "Khám phá",
    buttonLink: "/products/tai-nghe",
    backgroundColor: "#eff6ff",
  },
  {
    id: 3,
    title: "Phụ kiện sạc chính hãng",
    subtitle: "An toàn và bền bỉ",
    image: "https://images.unsplash.com/photo-1603539444875-76e7684265f6?q=80&w=1000",
    buttonText: "Xem thêm",
    buttonLink: "/products/sac-du-phong",
    backgroundColor: "#f0fdf4",
  },
];

// Store information
export const storeInfo = {
  name: "TechAccessories",
  logo: "/images/logo.svg",
  address: "123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh",
  email: "contact@techaccessories.com",
  phone: "1900.1234",
  workingHours: "08:00 - 21:00, Thứ 2 - Chủ Nhật",
  social: {
    facebook: "https://facebook.com/techaccessories",
    instagram: "https://instagram.com/techaccessories",
    youtube: "https://youtube.com/techaccessories",
    tiktok: "https://tiktok.com/@techaccessories",
  },
};

// Zalo Information
export const zaloInfo = {
  phoneNumber: "0901234567",
  displayName: "TechAccessories Shop",
  shareMessage: "Xem sản phẩm này tại TechAccessories: "
};
