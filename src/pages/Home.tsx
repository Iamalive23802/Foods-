import { ArrowRight, Award, Users, Heart, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, DietPlan, HealthArticle } from '../lib/supabase';

type HomeProps = {
  onNavigate: (page: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const [featuredPlans, setFeaturedPlans] = useState<DietPlan[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<HealthArticle[]>([]);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  async function loadFeaturedContent() {
    const { data: plans } = await supabase
      .from('diet_plans')
      .select('*')
      .limit(3);

    const { data: articles } = await supabase
      .from('health_articles')
      .select('*')
      .limit(3);

    if (plans) setFeaturedPlans(plans);
    if (articles) setFeaturedArticles(articles);
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your Life With Healthy Nutrition
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              Scientifically designed diet plans and expert guidance to help you
              achieve your health goals naturally and sustainably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('diets')}
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Explore Diet Plans
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('health')}
                className="bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-800 transition-colors border-2 border-white"
              >
                Read Health Tips
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Expert Nutritionists</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Diet Plans</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Diet Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully crafted nutrition programs designed by experts to help
              you reach your health goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={plan.image_url}
                  alt={plan.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {plan.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-600">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {plan.duration_days} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('diets')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              View All Plans
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Health Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest nutrition science and wellness tips
              from our expert team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('health')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              Read More Articles
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Join thousands of satisfied customers who have transformed their
            lives with our expert nutrition plans
          </p>
          <button
            onClick={() => onNavigate('diets')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            Get Started Today
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
