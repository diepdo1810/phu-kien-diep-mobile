
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Eye, Tag, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ProductShare from '@/components/product/ProductShare';
import {
  categories,
  getNewsArticleBySlug,
  getRelatedArticles,
  getMostViewedArticles,
  type NewsArticle
} from '@/lib/news-data';

const ArticleSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <div className="flex gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-[400px] w-full" />
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

const RelatedArticlesSection = ({ articles, loading }: { articles: NewsArticle[], loading: boolean }) => (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4">Bài viết liên quan</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {loading ? (
        Array(3).fill(0).map((_, i) => (
          <Card key={i}>
            <div className="aspect-video">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))
      ) : (
        articles.map(article => (
          <Card key={article.id} className="overflow-hidden group">
            <Link to={`/news/${article.slug}`} className="block">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Calendar className="h-3 w-3" /> 
                  <span>{article.publishDate}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))
      )}
    </div>
  </div>
);

const SidebarSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const PopularArticles = ({ loading }: { loading: boolean }) => {
  const popularArticles = getMostViewedArticles(4);
  
  return (
    <div className="space-y-4">
      {loading ? (
        Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-16 h-16 rounded" />
            <div className="flex-1">
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))
      ) : (
        popularArticles.map(article => (
          <Link key={article.id} to={`/news/${article.slug}`} className="flex gap-3 group">
            <div className="w-16 h-16 overflow-hidden rounded">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Eye className="h-3 w-3" /> 
                <span>{article.viewCount} lượt xem</span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

const NewsCategories = () => (
  <div className="flex flex-wrap gap-2">
    {categories.map(category => (
      <Link 
        key={category.id}
        to={`/news?category=${category.id}`} 
        className="px-3 py-1.5 bg-muted rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors"
      >
        {category.name}
      </Link>
    ))}
  </div>
);

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching
    const timer = setTimeout(() => {
      if (slug) {
        const foundArticle = getNewsArticleBySlug(slug);
        if (foundArticle) {
          setArticle(foundArticle);
          setRelatedArticles(getRelatedArticles(foundArticle, 3));
        }
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [slug]);

  // When the article isn't found
  useEffect(() => {
    if (!isLoading && !article) {
      navigate('/news', { replace: true });
    }
  }, [isLoading, article, navigate]);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate('/news')}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Quay lại Tin tức
        </Button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {isLoading || !article ? (
              <ArticleSkeleton />
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> 
                      <span>{article.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" /> 
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> 
                      <span>{article.viewCount} lượt xem</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="rounded-lg overflow-hidden mb-6">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <Link 
                          key={tag} 
                          to={`/news?tag=${tag}`}
                          className="text-sm px-2 py-1 bg-muted rounded hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <ProductShare 
                    url={window.location.href} 
                    title={article.title} 
                  />
                </div>

                {/* Related Articles */}
                <RelatedArticlesSection articles={relatedArticles} loading={isLoading} />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-20 space-y-8">
              <div className="bg-card rounded-lg border p-5">
                <SidebarSection title="Bài viết nổi bật">
                  <PopularArticles loading={isLoading} />
                </SidebarSection>

                <Separator className="my-6" />

                <SidebarSection title="Danh mục">
                  <NewsCategories />
                </SidebarSection>
              </div>

              <div className="bg-primary/5 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Đọc thêm</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Tìm hiểu thêm về sản phẩm mới nhất và nhận tư vấn từ đội ngũ chuyên gia của chúng tôi.
                </p>
                <Button asChild className="w-full">
                  <Link to="/products">Xem sản phẩm</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
