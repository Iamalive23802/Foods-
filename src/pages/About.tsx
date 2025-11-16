import { Heart, Target, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About VegOre</h1>
          <p className="text-xl opacity-95 leading-relaxed">
            Empowering people to live healthier lives through science-backed
            nutrition and personalized care
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At VegOre, we believe that everyone deserves access to
                high-quality nutrition guidance and personalized diet plans. Our
                mission is to make healthy eating simple, sustainable, and
                enjoyable for people from all walks of life.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We combine the latest nutritional science with practical meal
                planning to help you achieve your health goals without
                sacrificing flavor or satisfaction.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                alt="Healthy food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose VegOre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personalized Plans
              </h3>
              <p className="text-gray-600">
                Every diet plan is designed to meet your unique health goals and
                dietary preferences
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Our certified nutritionists and dietitians have decades of
                combined experience
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Proven Results
              </h3>
              <p className="text-gray-600">
                95% of our clients achieve their health goals within the first 3
                months
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Support
              </h3>
              <p className="text-gray-600">
                Join a thriving community of health-conscious individuals on
                similar journeys
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Science-Based
              </h3>
              <p className="text-gray-600">
                All our recommendations are backed by the latest peer-reviewed
                nutritional research
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sustainable
              </h3>
              <p className="text-gray-600">
                We focus on long-term lifestyle changes, not quick fixes or fad
                diets
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Inclusive
              </h3>
              <p className="text-gray-600">
                We offer plans for all dietary preferences, restrictions, and
                cultural backgrounds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
