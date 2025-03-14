
// Types
export type NewsCategory = 'trending' | 'new-products' | 'tips-tricks' | 'reviews';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string; 
  content: string;
  imageUrl: string;
  category: NewsCategory;
  author: string;
  publishDate: string;
  viewCount: number;
  tags: string[];
  relatedProducts?: string[];
}

// News Categories
export const categories = [
  { id: 'trending', name: 'Xu hướng mới' },
  { id: 'new-products', name: 'Sản phẩm ra mắt' },
  { id: 'tips-tricks', name: 'Mẹo và thủ thuật' },
  { id: 'reviews', name: 'Đánh giá' },
];

// Sample news data
export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'top-10-op-lung-iphone-15-ban-chay-2024',
    title: 'Top 10 ốp lưng iPhone 15 bán chạy nhất năm 2024',
    summary: 'Tổng hợp những mẫu ốp lưng được ưa chuộng nhất cho iPhone 15 hiện nay với nhiều phong cách khác nhau.',
    content: `<p>iPhone 15 là một trong những smartphone được yêu thích nhất hiện nay và việc bảo vệ chiếc điện thoại đắt tiền này là ưu tiên hàng đầu của nhiều người dùng.</p>
              <p>Ốp lưng không chỉ giúp bảo vệ thiết bị khỏi trầy xước và va đập mà còn là phụ kiện thời trang giúp thể hiện cá tính của người dùng.</p>
              <h2>1. Ốp lưng silicon trong suốt</h2>
              <p>Loại ốp lưng này cho phép khoe trọn vẻ đẹp nguyên bản của iPhone 15 trong khi vẫn cung cấp lớp bảo vệ cơ bản. Chất liệu silicon mềm dẻo, dễ lắp đặt và tháo gỡ.</p>
              <h2>2. Ốp lưng chống sốc UAG Monarch</h2>
              <p>Dành cho những người cần độ bảo vệ cao cấp, UAG Monarch cung cấp khả năng chống sốc vượt trội với 5 lớp bảo vệ và đạt chuẩn quân đội Mỹ.</p>
              <h2>3. Ốp lưng MagSafe chính hãng</h2>
              <p>Thiết kế bởi Apple, ốp lưng MagSafe tích hợp nam châm cho phép sạc không dây thuận tiện và tương thích hoàn hảo với hệ sinh thái phụ kiện MagSafe.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1603098952641-c7498e5e653a?q=80&w=800&auto=format&fit=crop',
    category: 'trending',
    author: 'Nguyễn Văn A',
    publishDate: '2024-04-15',
    viewCount: 1250,
    tags: ['iPhone 15', 'ốp lưng', 'phụ kiện'],
    relatedProducts: ['iphone-15-case-1', 'iphone-15-case-2']
  },
  {
    id: '2',
    slug: 'so-sanh-cac-loai-kinh-cuong-luc',
    title: 'So sánh các loại kính cường lực phổ biến hiện nay',
    summary: 'Phân tích ưu nhược điểm của các loại kính cường lực từ Gorilla Glass đến Ceramic Shield.',
    content: `<p>Kính cường lực là phụ kiện bảo vệ màn hình không thể thiếu cho smartphone. Tuy nhiên, với nhiều công nghệ và thương hiệu trên thị trường, việc lựa chọn loại kính phù hợp trở nên khó khăn.</p>
              <h2>Gorilla Glass Victus 2</h2>
              <p>Gorilla Glass Victus 2 là thế hệ mới nhất của Corning, cung cấp khả năng chống trầy xước và chống vỡ tốt hơn 25% so với thế hệ trước. Phù hợp với điện thoại Android cao cấp.</p>
              <h2>Ceramic Shield</h2>
              <p>Được Apple phát triển riêng cho iPhone, Ceramic Shield tích hợp tinh thể gốm nano vào kính, giúp cứng hơn bất kỳ loại kính smartphone nào khác trên thị trường.</p>
              <h2>Tempered Glass Generic</h2>
              <p>Đây là lựa chọn phổ biến với mức giá phải chăng. Độ cứng thường đạt 9H, đủ để chống trầy xước từ các vật dụng thông thường như chìa khóa hay tiền xu.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?q=80&w=800&auto=format&fit=crop',
    category: 'reviews',
    author: 'Trần Bình B',
    publishDate: '2024-04-12',
    viewCount: 980,
    tags: ['kính cường lực', 'Gorilla Glass', 'Ceramic Shield'],
  },
  {
    id: '3',
    slug: 'cach-chon-pin-du-phong',
    title: 'Cách chọn pin dự phòng phù hợp với nhu cầu sử dụng',
    summary: 'Hướng dẫn chi tiết giúp bạn lựa chọn pin dự phòng phù hợp với thiết bị và thói quen sử dụng.',
    content: `<p>Pin dự phòng là một phụ kiện thiết yếu cho người dùng di động hiện đại. Bài viết này sẽ giúp bạn hiểu các thông số quan trọng khi chọn mua pin dự phòng.</p>
              <h2>Dung lượng</h2>
              <p>Dung lượng pin được tính bằng mAh (miliamp giờ). Điện thoại hiện đại thường có pin từ 3000-5000mAh, vì vậy nên chọn pin dự phòng có dung lượng ít nhất gấp đôi. Pin dự phòng 10000mAh có thể sạc đầy hầu hết smartphone 2 lần.</p>
              <h2>Công suất sạc</h2>
              <p>Công suất sạc được tính bằng Watt (W), quyết định tốc độ sạc. Pin dự phòng hỗ trợ sạc nhanh 18W, 25W hoặc thậm chí 65W giúp rút ngắn thời gian sạc đáng kể.</p>
              <h2>Cổng kết nối</h2>
              <p>Hiện nay, các pin dự phòng thường trang bị cổng USB-A truyền thống và USB-C hiện đại. Một số model cao cấp còn có cổng micro-USB đầu vào, hoặc thậm chí là cổng Lightning cho người dùng iPhone.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop',
    category: 'tips-tricks',
    author: 'Lê Thị C',
    publishDate: '2024-04-10',
    viewCount: 756,
    tags: ['pin dự phòng', 'sạc nhanh', 'USB-C'],
  },
  {
    id: '4',
    slug: 'ra-mat-tai-nghe-sony-wh-1000xm6',
    title: 'Sony ra mắt tai nghe WH-1000XM6 với công nghệ chống ồn đột phá',
    summary: 'Thế hệ mới của dòng tai nghe chống ồn nổi tiếng với nhiều cải tiến về âm thanh và thời lượng pin.',
    content: `<p>Sony vừa chính thức giới thiệu WH-1000XM6, thế hệ kế tiếp của dòng tai nghe chống ồn đình đám WH-1000X. Đây là bước nâng cấp đáng kể so với phiên bản XM5 trước đó.</p>
              <h2>Công nghệ chống ồn thế hệ mới</h2>
              <p>XM6 được trang bị bộ xử lý chống ồn V2 mới, kết hợp với 8 microphone (tăng từ 6 trên XM5) cho khả năng khử tiếng ồn vượt trội trong mọi môi trường, đặc biệt là tiếng ồn tần số cao.</p>
              <h2>Âm thanh Hi-Res</h2>
              <p>Tai nghe hỗ trợ chuẩn âm thanh LDAC cho khả năng truyền tải nhạc không dây chất lượng cao với tốc độ lên đến 990kbps. Driver 40mm được thiết kế lại cho âm trường rộng hơn và chi tiết hơn.</p>
              <h2>Thời lượng pin cải thiện</h2>
              <p>Sony tuyên bố XM6 có thể hoạt động liên tục 40 giờ với chức năng chống ồn bật, tăng 10 giờ so với thế hệ trước. Sạc nhanh 5 phút cho 5 giờ sử dụng.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    category: 'new-products',
    author: 'Phạm Đức D',
    publishDate: '2024-04-08',
    viewCount: 1350,
    tags: ['Sony', 'tai nghe', 'chống ồn', 'WH-1000XM6'],
  },
  {
    id: '5',
    slug: 'huong-dan-su-dung-airpods-pro-2',
    title: 'Hướng dẫn sử dụng tất cả tính năng ẩn của AirPods Pro 2',
    summary: 'Khám phá những tính năng ẩn và mẹo sử dụng AirPods Pro 2 hiệu quả hơn mà Apple không nói với bạn.',
    content: `<p>AirPods Pro 2 không chỉ là tai nghe không dây thông thường mà còn chứa đựng nhiều tính năng ẩn mà người dùng thường bỏ qua.</p>
              <h2>Tìm AirPods bằng Siri</h2>
              <p>Không cần mở ứng dụng Find My, bạn có thể nói "Hey Siri, find my AirPods" và Siri sẽ kích hoạt âm thanh trên AirPods nếu chúng đang trong phạm vi kết nối Bluetooth.</p>
              <h2>Điều chỉnh âm lượng bằng cảm ứng</h2>
              <p>Vuốt lên/xuống trên thân AirPods Pro 2 để điều chỉnh âm lượng, tính năng mới mà thế hệ đầu tiên không có. Nhiều người không biết đến tính năng này.</p>
              <h2>Phát hiện hội thoại tự động</h2>
              <p>Khi bạn bắt đầu nói chuyện, AirPods Pro 2 sẽ tự động giảm âm lượng nhạc và kích hoạt chế độ Transparency để bạn có thể nghe rõ cuộc trò chuyện mà không cần tháo tai nghe.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop',
    category: 'tips-tricks',
    author: 'Nguyễn Văn A',
    publishDate: '2024-04-05',
    viewCount: 2100,
    tags: ['AirPods Pro', 'Apple', 'tai nghe không dây'],
  },
  {
    id: '6',
    slug: 'danh-gia-xiaomi-14-ultra',
    title: 'Đánh giá Xiaomi 14 Ultra: Camera "thứ thiệt" trên smartphone',
    summary: 'Chi tiết về hệ thống camera hợp tác với Leica và hiệu năng ấn tượng của Xiaomi 14 Ultra.',
    content: `<p>Xiaomi 14 Ultra là flagship mới nhất của hãng smartphone Trung Quốc, với điểm nhấn là hệ thống camera hợp tác với thương hiệu nhiếp ảnh Leica.</p>
              <h2>Hệ thống 4 camera 50MP</h2>
              <p>Điểm nổi bật nhất của Xiaomi 14 Ultra là hệ thống 4 camera sau đều có độ phân giải 50MP, bao gồm camera chính với khẩu độ biến thiên từ f/1.6 đến f/4.0, camera góc siêu rộng, camera tele 3.2x và camera periscope 5x.</p>
              <h2>Hiệu năng hàng đầu</h2>
              <p>Snapdragon 8 Gen 3 kết hợp với 16GB RAM LPDDR5X và bộ nhớ UFS 4.0 giúp 14 Ultra đạt hiệu năng cao trong mọi tác vụ, từ chơi game đến xử lý ảnh RAW phức tạp.</p>
              <h2>Pin và sạc siêu nhanh</h2>
              <p>Pin 5000mAh hỗ trợ sạc có dây 90W và sạc không dây 50W, cho phép sạc đầy pin từ 0% lên 100% chỉ trong 35 phút với sạc có dây.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    category: 'reviews',
    author: 'Trần Bình B',
    publishDate: '2024-04-02',
    viewCount: 1800,
    tags: ['Xiaomi', 'smartphone', 'camera', 'Leica'],
  },
  {
    id: '7',
    slug: 'cac-xu-huong-bao-ve-dien-thoai-2024',
    title: 'Các xu hướng bảo vệ điện thoại năm 2024',
    summary: 'Từ ốp lưng sinh học đến kính cường lực nano, khám phá những cách bảo vệ smartphone thời thượng nhất.',
    content: `<p>Bảo vệ smartphone ngày càng trở nên quan trọng khi giá thiết bị không ngừng tăng cao. Năm 2024 chứng kiến nhiều xu hướng mới trong lĩnh vực này.</p>
              <h2>Vật liệu sinh học phân hủy</h2>
              <p>Ốp lưng làm từ vật liệu sinh học như PLA (axit polylactic) hoặc sợi tre đang trở thành xu hướng khi người dùng ngày càng quan tâm đến môi trường. Các sản phẩm này vừa bảo vệ điện thoại hiệu quả vừa giảm thiểu tác động môi trường.</p>
              <h2>Công nghệ kháng khuẩn</h2>
              <p>Sau đại dịch COVID-19, các ốp lưng và kính cường lực có khả năng kháng khuẩn ngày càng được ưa chuộng. Công nghệ ion bạc được tích hợp vào phụ kiện, giúp tiêu diệt đến 99.9% vi khuẩn.</p>
              <h2>Tích hợp MagSafe và sạc không dây</h2>
              <p>Không chỉ iPhone, nhiều mẫu điện thoại Android cũng đang áp dụng chuẩn sạc từ tính tương tự MagSafe, dẫn đến sự phổ biến của ốp lưng tương thích với công nghệ này.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop',
    category: 'trending',
    author: 'Lê Thị C',
    publishDate: '2024-03-30',
    viewCount: 1520,
    tags: ['bảo vệ điện thoại', 'ốp lưng', 'kính cường lực', 'xu hướng'],
  },
  {
    id: '8',
    slug: 'samsung-ra-mat-galaxy-ring',
    title: 'Samsung ra mắt Galaxy Ring: Wearable mới với khả năng theo dõi sức khỏe',
    summary: 'Chiếc nhẫn thông minh đầu tiên của Samsung với khả năng theo dõi sức khỏe toàn diện.',
    content: `<p>Samsung vừa chính thức giới thiệu Galaxy Ring, mở rộng danh mục sản phẩm wearable của hãng và tạo ra một lựa chọn mới bên cạnh smartwatch.</p>
              <h2>Thiết kế tối giản</h2>
              <p>Galaxy Ring có thiết kế đơn giản, tinh tế với trọng lượng chỉ khoảng 3g và độ dày 2.5mm. Sản phẩm có 9 kích cỡ khác nhau và 3 màu: đen, bạc và vàng.</p>
              <h2>Theo dõi sức khỏe toàn diện</h2>
              <p>Mặc dù kích thước nhỏ gọn, Galaxy Ring được trang bị nhiều cảm biến để theo dõi nhịp tim, oxy trong máu, chất lượng giấc ngủ và thậm chí là nhiệt độ cơ thể.</p>
              <h2>Thời lượng pin ấn tượng</h2>
              <p>Samsung tuyên bố Galaxy Ring có thể hoạt động liên tục 7 ngày với một lần sạc, và hộp đựng cũng đóng vai trò là bộ sạc di động có thể sạc đầy nhẫn 3 lần.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=800&auto=format&fit=crop',
    category: 'new-products',
    author: 'Phạm Đức D',
    publishDate: '2024-03-28',
    viewCount: 2300,
    tags: ['Samsung', 'Galaxy Ring', 'wearable', 'sức khỏe'],
  },
  {
    id: '9',
    slug: 'cach-don-dep-va-toi-uu-hoa-iphone',
    title: 'Cách dọn dẹp và tối ưu hóa iPhone để có hiệu suất tốt nhất',
    summary: 'Những mẹo giúp iPhone cũ cũng chạy nhanh và mượt như mới sau khi đã tối ưu hóa.',
    content: `<p>Sau một thời gian sử dụng, iPhone có thể trở nên chậm chạp do nhiều lý do khác nhau. Bài viết này sẽ hướng dẫn bạn cách khôi phục hiệu suất cho thiết bị.</p>
              <h2>Xóa ứng dụng không sử dụng</h2>
              <p>Kiểm tra và xóa các ứng dụng không dùng đến. Vào Cài đặt > Tổng quan > Lưu trữ iPhone để xem các ứng dụng chiếm nhiều dung lượng nhất và những ứng dụng ít khi sử dụng.</p>
              <h2>Xóa cache Safari</h2>
              <p>Vào Cài đặt > Safari > Xóa lịch sử và dữ liệu trang web. Thao tác này sẽ xóa cache, giúp Safari hoạt động nhanh hơn, mặc dù bạn sẽ phải đăng nhập lại vào các trang web.</p>
              <h2>Tắt cập nhật ứng dụng nền</h2>
              <p>Vào Cài đặt > Tổng quan > Làm mới ứng dụng nền, và tắt tính năng này cho các ứng dụng không cần cập nhật thường xuyên để tiết kiệm pin và tài nguyên hệ thống.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=800&auto=format&fit=crop',
    category: 'tips-tricks',
    author: 'Nguyễn Văn A',
    publishDate: '2024-03-25',
    viewCount: 1890,
    tags: ['iPhone', 'tối ưu hóa', 'hiệu suất', 'iOS'],
  },
  {
    id: '10',
    slug: 'so-sanh-airpods-pro-2-va-sony-wf-1000xm5',
    title: 'So sánh chi tiết: AirPods Pro 2 và Sony WF-1000XM5',
    summary: 'Phân tích toàn diện hai mẫu tai nghe true wireless hàng đầu hiện nay về âm thanh, chống ồn và tính năng.',
    content: `<p>AirPods Pro 2 của Apple và WF-1000XM5 của Sony là hai mẫu tai nghe true wireless cao cấp nhất trên thị trường. Cùng so sánh chi tiết để xem đâu là lựa chọn phù hợp với bạn.</p>
              <h2>Chất lượng âm thanh</h2>
              <p>Sony WF-1000XM5 có âm trầm mạnh mẽ hơn và chi tiết tốt hơn ở dải mid và treble. AirPods Pro 2 lại có âm thanh cân bằng hơn và độ chi tiết tốt, đặc biệt khi sử dụng với thiết bị Apple nhờ chip H2.</p>
              <h2>Chống ồn và Transparency Mode</h2>
              <p>Cả hai đều có khả năng chống ồn xuất sắc, nhưng Sony nhỉnh hơn một chút trong việc khử tiếng ồn tần số thấp như động cơ máy bay. Tuy nhiên, chế độ Transparency của AirPods Pro 2 tự nhiên hơn nhiều.</p>
              <h2>Thời lượng pin</h2>
              <p>Sony WF-1000XM5 cho thời gian sử dụng khoảng 8 giờ với ANC bật, trong khi AirPods Pro 2 chỉ đạt khoảng 6 giờ. Tính cả hộp sạc, Sony cung cấp tổng 24 giờ so với 30 giờ của AirPods Pro 2.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    category: 'reviews',
    author: 'Trần Bình B',
    publishDate: '2024-03-22',
    viewCount: 1650,
    tags: ['AirPods Pro', 'Sony', 'WF-1000XM5', 'tai nghe không dây', 'so sánh'],
  },
  {
    id: '11',
    slug: 'tren-tay-adapter-sac-gan-200w',
    title: 'Trên tay adapter sạc gần 200W: Sạc laptop, điện thoại cùng lúc',
    summary: 'Đánh giá chi tiết bộ adapter sạc đa năng hỗ trợ công suất lên đến 200W với nhiều cổng USB-C và USB-A.',
    content: `<p>Với sự phát triển của công nghệ sạc nhanh, các adapter sạc đa năng công suất cao đang ngày càng phổ biến. Hôm nay chúng ta sẽ đánh giá một adapter sạc đa năng có tổng công suất lên đến 200W.</p>
              <h2>Thiết kế và cổng kết nối</h2>
              <p>Adapter sạc này có kích thước lớn hơn các bộ sạc thông thường nhưng vẫn nhỏ gọn đáng ngạc nhiên so với công suất cung cấp. Sản phẩm có 4 cổng USB-C hỗ trợ Power Delivery và 2 cổng USB-A với QuickCharge 4.0.</p>
              <h2>Công suất và hiệu suất</h2>
              <p>Một cổng USB-C đơn có thể cung cấp đến 140W, đủ sức cho MacBook Pro 16 inch. Khi sử dụng nhiều cổng cùng lúc, công suất sẽ được phân phối theo thứ tự ưu tiên và nhu cầu của thiết bị.</p>
              <h2>Công nghệ bảo vệ</h2>
              <p>Adapter tích hợp nhiều lớp bảo vệ chống quá nhiệt, quá dòng, quá áp và đoản mạch. Chip GaN (Gallium Nitride) giúp tăng hiệu suất và giảm nhiệt độ hoạt động.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1583863788534-eebbcef76a3c?q=80&w=800&auto=format&fit=crop',
    category: 'new-products',
    author: 'Lê Thị C',
    publishDate: '2024-03-20',
    viewCount: 1420,
    tags: ['sạc nhanh', 'adapter', 'GaN', 'USB-C', 'Power Delivery'],
  },
  {
    id: '12',
    slug: 'xu-huong-phu-kien-thong-minh-2024',
    title: 'Xu hướng phụ kiện thông minh 2024: Khi AI kết hợp với wearable',
    summary: 'Khám phá làn sóng phụ kiện thông minh tích hợp AI đang định hình tương lai của công nghệ đeo.',
    content: `<p>Năm 2024 chứng kiến sự bùng nổ của các phụ kiện thông minh tích hợp AI, mở ra kỷ nguyên mới cho thiết bị đeo và phụ kiện di động.</p>
              <h2>AI tại biên (Edge AI)</h2>
              <p>Xu hướng nổi bật nhất là việc đưa các mô hình AI nhỏ gọn vào trực tiếp thiết bị đeo, cho phép xử lý dữ liệu cục bộ mà không cần kết nối cloud. Tai nghe có thể phân tích ngữ cảnh âm thanh và tự điều chỉnh chế độ chống ồn.</p>
              <h2>Trợ lý ảo cá nhân hóa</h2>
              <p>Các phụ kiện như tai nghe và đồng hồ thông minh giờ đây tích hợp trợ lý ảo thông minh hơn, có thể học thói quen người dùng và đưa ra gợi ý phù hợp về sức khỏe, lịch trình hay thậm chí cảm xúc.</p>
              <h2>Cảm biến sức khỏe tiên tiến</h2>
              <p>Wearable mới không chỉ đo nhịp tim cơ bản mà còn có thể phát hiện rối loạn nhịp tim, mức độ stress, chỉ số đường huyết và thậm chí các dấu hiệu sớm của một số bệnh lý nhờ thuật toán AI phân tích dữ liệu.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1551736704-7b5f48daef03?q=80&w=800&auto=format&fit=crop',
    category: 'trending',
    author: 'Phạm Đức D',
    publishDate: '2024-03-18',
    viewCount: 1750,
    tags: ['AI', 'wearable', 'phụ kiện thông minh', 'xu hướng'],
  }
];

// Utility functions for news articles
export const getNewsArticleBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find(article => article.slug === slug);
};

export const getRelatedArticles = (article: NewsArticle, limit: number = 3): NewsArticle[] => {
  return newsArticles
    .filter(item => 
      item.id !== article.id && 
      (item.category === article.category || 
       item.tags.some(tag => article.tags.includes(tag)))
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

export const getMostViewedArticles = (limit: number = 5): NewsArticle[] => {
  return [...newsArticles]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
};

export const getLatestArticles = (limit: number = 5): NewsArticle[] => {
  return [...newsArticles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};

export const searchArticles = (query: string): NewsArticle[] => {
  const lowercaseQuery = query.toLowerCase();
  return newsArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.summary.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterArticlesByCategory = (category: NewsCategory): NewsArticle[] => {
  return newsArticles.filter(article => article.category === category);
};

export const sortArticlesByDate = (articles: NewsArticle[], ascending: boolean = false): NewsArticle[] => {
  return [...articles].sort((a, b) => {
    const dateA = new Date(a.publishDate).getTime();
    const dateB = new Date(b.publishDate).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const sortArticlesByPopularity = (articles: NewsArticle[], ascending: boolean = false): NewsArticle[] => {
  return [...articles].sort((a, b) => {
    return ascending ? a.viewCount - b.viewCount : b.viewCount - a.viewCount;
  });
};
