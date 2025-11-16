import { useState, useEffect } from 'react';
import { Clock, User, ArrowRight, X } from 'lucide-react';
import { supabase, HealthArticle } from '../lib/supabase';

export default function HealthInfo() {
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(
    null
  );

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'wellness', label: 'Wellness' },
  ];

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const { data, error } = await supabase
        .from('health_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Health & Wellness Hub
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Expert advice, latest research, and practical tips for your health
            journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.reading_time_minutes} min read</span>
                    </div>
                  </div>

                  <button className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found in this category.</p>
          </div>
        )}
      </div>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

function ArticleModal({
  article,
  onClose,
}: {
  article: HealthArticle;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {article.reading_time_minutes} min read
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h2>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author}</span>
            </div>
            <span>•</span>
            <span>
              {new Date(article.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="prose max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
