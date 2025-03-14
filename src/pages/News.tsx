
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Calendar, Eye, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import {
  newsArticles,
  categories,
  getMostViewedArticles,
  searchArticles,
  filterArticlesByCategory,
  sortArticlesByDate,
  sortArticlesByPopularity,
  type NewsArticle,
  type NewsCategory
} from '@/lib/news-data';

const NewsBanner = () => (
  <div className="relative h-60 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
    <div className="relative h-full flex flex-col justify-center px-6 md:px-12 py-12 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Xu hướng & Tin tức ngành phụ kiện</h1>
      <p className="text-base md:text-xl max-w-2xl">
        Cập nhật những thông tin mới nhất về công nghệ, sản phẩm và xu hướng trong lĩnh vực phụ kiện điện thoại
      </p>
    </div>
  </div>
);

const ArticleCard = ({ article }: { article: NewsArticle }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {categories.find(c => c.id === article.category)?.name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {article.publishDate}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {article.viewCount}
          </span>
        </div>
        <CardTitle className="text-xl hover:text-primary transition-colors">
          <Link to={`/news/${article.slug}`}>{article.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{article.summary}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link 
          to={`/news/${article.slug}`} 
          className="text-sm font-medium text-primary hover:underline flex items-center"
        >
          Đọc tiếp <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

const ArticleCardSkeleton = () => (
  <Card className="h-full flex flex-col">
    <div className="aspect-video">
      <Skeleton className="w-full h-full" />
    </div>
    <CardHeader className="pb-2">
      <Skeleton className="h-5 w-20 mb-2" />
      <Skeleton className="h-6 w-full" />
    </CardHeader>
    <CardContent className="pb-4">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
    <CardFooter className="pt-0">
      <Skeleton className="h-4 w-24" />
    </CardFooter>
  </Card>
);

const NewsSidebar = ({
  onSubscribe,
  loading = false
}: {
  onSubscribe: (email: string) => void;
  loading?: boolean;
}) => {
  const [email, setEmail] = useState('');
  const popularArticles = getMostViewedArticles(5);

  return (
    <div className="space-y-8">
      {/* Popular Articles */}
      <div className="bg-card rounded-lg border p-5">
        <h3 className="text-lg font-semibold mb-4">Bài viết nổi bật</h3>
        <div className="space-y-4">
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-20 h-16 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))
          ) : (
            popularArticles.map(article => (
              <Link key={article.id} to={`/news/${article.slug}`} className="flex gap-3 group">
                <div className="w-20 h-16 rounded overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Eye className="h-3 w-3 mr-1" />
                    {article.viewCount} lượt xem
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-primary/5 rounded-lg p-5">
        <h3 className="text-lg font-semibold mb-2">Đăng ký nhận tin</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Nhận thông báo về tin tức mới nhất và khuyến mãi đặc biệt.
        </p>
        <div className="space-y-2">
          <Input
            type="email" 
            placeholder="Email của bạn" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
          <Button 
            onClick={() => onSubscribe(email)} 
            className="w-full"
          >
            Đăng ký
          </Button>
        </div>
      </div>

      {/* Product Banner */}
      <div className="rounded-lg overflow-hidden">
        <Link to="/products" className="block group">
          <div className="relative aspect-square bg-gradient-to-br from-blue-500 to-purple-600 p-5 flex flex-col justify-end">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="relative text-white">
              <h3 className="text-xl font-bold mb-2">Khám phá iPhone 15</h3>
              <p className="text-sm mb-4">Phụ kiện bảo vệ cao cấp với giá ưu đãi</p>
              <Button variant="secondary">Xem ngay</Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const NewsFilterMobile = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden border rounded-lg mb-4">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <span className="font-medium">Bộ lọc & Tìm kiếm</span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? "Ẩn" : "Hiện"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Separator />
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Tìm kiếm</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm bài viết..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Danh mục</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Sắp xếp</label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Mới nhất" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="popular">Phổ biến nhất</SelectItem>
                <SelectItem value="least_popular">Ít phổ biến nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Simulated loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort articles
  const getFilteredArticles = () => {
    let filteredArticles = [...newsArticles];
    
    // Apply search query filter
    if (searchQuery) {
      filteredArticles = searchArticles(searchQuery);
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filteredArticles = filteredArticles.filter(
        article => article.category === selectedCategory as NewsCategory
      );
    }
    
    // Apply sorting
    switch (sortOrder) {
      case 'newest':
        filteredArticles = sortArticlesByDate(filteredArticles, false);
        break;
      case 'oldest':
        filteredArticles = sortArticlesByDate(filteredArticles, true);
        break;
      case 'popular':
        filteredArticles = sortArticlesByPopularity(filteredArticles, false);
        break;
      case 'least_popular':
        filteredArticles = sortArticlesByPopularity(filteredArticles, true);
        break;
      default:
        filteredArticles = sortArticlesByDate(filteredArticles, false);
    }
    
    return filteredArticles;
  };

  const filteredArticles = getFilteredArticles();
  
  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Newsletter subscription
  const handleSubscribe = (email: string) => {
    alert(`Cảm ơn! Email ${email} đã được đăng ký nhận bản tin.`);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col">
        <NewsBanner />
        
        <div className="flex-1 container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filters */}
              <NewsFilterMobile 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              
              {/* Desktop Filters */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Tìm kiếm bài viết..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tất cả danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Mới nhất" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="oldest">Cũ nhất</SelectItem>
                      <SelectItem value="popular">Phổ biến nhất</SelectItem>
                      <SelectItem value="least_popular">Ít phổ biến nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Articles Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <>
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">Không tìm thấy bài viết</h3>
                      <p className="text-muted-foreground mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                      <Button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSortOrder('newest');
                        }}
                      >
                        Xóa bộ lọc
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentArticles.map((article) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <Pagination className="mt-8">
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                            
                            {Array.from({ length: totalPages }).map((_, i) => (
                              <PaginationItem key={i}>
                                <PaginationLink 
                                  isActive={currentPage === i + 1}
                                  onClick={() => setCurrentPage(i + 1)}
                                >
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-80 shrink-0">
              <NewsSidebar onSubscribe={handleSubscribe} loading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default News;
