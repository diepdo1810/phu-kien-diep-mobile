
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Key, KeyRound, Settings, MessageSquare } from 'lucide-react';
import { Label } from '@/components/ui/label';

const apiConfigSchema = z.object({
  apiKey: z.string().min(5, {
    message: "API key phải có ít nhất 5 ký tự",
  }),
  model: z.string().min(1, {
    message: "Vui lòng chọn model",
  }),
  maxTokens: z.coerce.number().min(100).max(4000),
  temperature: z.coerce.number().min(0).max(1),
});

const systemPromptSchema = z.object({
  prompt: z.string().min(10, {
    message: "System prompt phải có ít nhất 10 ký tự",
  }),
});

const ChatbotAdmin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const apiConfigForm = useForm<z.infer<typeof apiConfigSchema>>({
    resolver: zodResolver(apiConfigSchema),
    defaultValues: {
      apiKey: "",
      model: "gpt-4o-mini",
      maxTokens: 1000,
      temperature: 0.7,
    },
  });

  const systemPromptForm = useForm<z.infer<typeof systemPromptSchema>>({
    resolver: zodResolver(systemPromptSchema),
    defaultValues: {
      prompt: `Bạn là trợ lý bán hàng AI, nhiệm vụ của bạn là hỗ trợ khách hàng tìm sản phẩm phù hợp, trả lời câu hỏi và giải quyết thắc mắc. Hãy luôn trả lời một cách thân thiện, chuyên nghiệp và có kiến thức chuyên sâu về các sản phẩm.`,
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials against a backend
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      toast({
        title: "Đăng nhập thành công",
        description: "Bạn đã đăng nhập vào trang quản trị chatbot",
      });
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: "Tên đăng nhập hoặc mật khẩu không đúng",
        variant: "destructive",
      });
    }
  };

  const onApiConfigSubmit = (values: z.infer<typeof apiConfigSchema>) => {
    console.log(values);
    toast({
      title: "Cấu hình API đã được lưu",
      description: "Các thay đổi sẽ được áp dụng cho các cuộc trò chuyện mới",
    });
  };

  const onSystemPromptSubmit = (values: z.infer<typeof systemPromptSchema>) => {
    console.log(values);
    toast({
      title: "System prompt đã được cập nhật",
      description: "Các thay đổi sẽ được áp dụng cho các cuộc trò chuyện mới",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">
              Đăng nhập để quản lý chatbot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" type="submit">
                  Đăng nhập
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Quản lý Chatbot AI</h1>
      
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">
            <Settings className="mr-2 h-4 w-4" />
            Cấu hình API
          </TabsTrigger>
          <TabsTrigger value="prompt">
            <MessageSquare className="mr-2 h-4 w-4" />
            System Prompt
          </TabsTrigger>
          <TabsTrigger value="history">
            <KeyRound className="mr-2 h-4 w-4" />
            Lịch sử trò chuyện
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình API</CardTitle>
              <CardDescription>
                Cấu hình API key và các thông số cho chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...apiConfigForm}>
                <form onSubmit={apiConfigForm.handleSubmit(onApiConfigSubmit)} className="space-y-8">
                  <FormField
                    control={apiConfigForm.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input placeholder="sk-..." {...field} type="password" />
                            <Key className="ml-2 h-4 w-4 opacity-50 self-center" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          API key từ OpenAI hoặc Google AI
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={apiConfigForm.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="gpt-4o-mini">GPT-4o Mini</option>
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="gemini-pro">Gemini Pro</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={apiConfigForm.control}
                      name="maxTokens"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Tokens</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              value={field.value}
                              onChange={(e) => field.onChange(parseInt(e.target.value || "0", 10))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={apiConfigForm.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Temperature</FormLabel>
                          <FormControl>
                            <Input 
                              type="range" 
                              min="0" 
                              max="1" 
                              step="0.1" 
                              {...field}
                              value={field.value}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground text-center">
                            {field.value} (Thấp: chính xác hơn, Cao: sáng tạo hơn)
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit">Lưu cấu hình</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>
                Thiết lập prompt cho chatbot AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...systemPromptForm}>
                <form onSubmit={systemPromptForm.handleSubmit(onSystemPromptSubmit)} className="space-y-8">
                  <FormField
                    control={systemPromptForm.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Prompt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Nhập system prompt..." 
                            className="min-h-[200px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Đây là prompt giúp định hướng phong cách và kiến thức của chatbot
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Cập nhật Prompt</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử trò chuyện</CardTitle>
              <CardDescription>
                Xem lại các cuộc trò chuyện gần đây
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Chức năng đang được phát triển
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotAdmin;
