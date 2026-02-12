
import React from 'react';
import { Megaphone, Calendar, User, ChevronRight, Share2, Heart } from 'lucide-react';
import { Announcement } from '../types';

const MOCK_NEWS: Announcement[] = [
  {
    id: '1',
    title: 'New Health Insurance Policy 2024',
    content: 'We are excited to announce enhanced health benefits for all permanent employees starting next month. The new policy includes dental coverage and mental wellness support.',
    category: 'Policy',
    date: 'Oct 24, 2023',
    author: 'HR Dept',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
    readTime: '4 min read'
  },
  {
    id: '2',
    title: 'Town Hall Meeting: Q4 Strategy',
    content: 'Join us this Friday at the main auditorium or via Zoom for our quarterly town hall. We will discuss our growth targets and new product launches.',
    category: 'Event',
    date: 'Oct 22, 2023',
    author: 'Management',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60',
    readTime: '2 min read'
  }
];

export const Announcements: React.FC = () => {
  return (
    <div className="p-5 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Announcements</h2>
        <div className="p-2 bg-blue-50 rounded-xl">
          <Megaphone className="w-5 h-5 text-blue-600" />
        </div>
      </header>

      <div className="space-y-6 pb-20">
        {MOCK_NEWS.map((news) => (
          <div key={news.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col active:scale-[0.99] transition-all">
            {news.imageUrl && (
              <div className="h-48 relative overflow-hidden">
                <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{news.category}</span>
                </div>
              </div>
            )}
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{news.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{news.author}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">{news.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">{news.content}</p>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-slate-300 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-1 text-slate-300 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <button className="text-blue-600 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                  Read More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
