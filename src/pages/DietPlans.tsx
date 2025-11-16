import { useState, useEffect } from 'react';
import { Check, Calendar, TrendingUp } from 'lucide-react';
import { supabase, DietPlan } from '../lib/supabase';

export default function DietPlans() {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);

  const categories = [
    { id: 'all', label: 'All Plans' },
    { id: 'balanced', label: 'Balanced' },
    { id: 'weight-loss', label: 'Weight Loss' },
    { id: 'muscle-gain', label: 'Muscle Gain' },
    { id: 'vegan', label: 'Plant-Based' },
    { id: 'keto', label: 'Keto' },
    { id: 'beginner', label: 'Beginner' },
  ];

  useEffect(() => {
    loadDietPlans();
  }, []);

  async function loadDietPlans() {
    try {
      const { data, error } = await supabase
        .from('diet_plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDietPlans(data || []);
    } catch (error) {
      console.error('Error loading diet plans:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPlans =
    selectedCategory === 'all'
      ? dietPlans
      : dietPlans.filter((plan) => plan.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Diet Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Scientifically designed meal plans tailored to your health goals.
            Start your transformation today.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm'
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
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plan.image_url}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ${plan.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {plan.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{plan.duration_days} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{plan.calories_per_day} cal/day</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No diet plans found in this category.</p>
          </div>
        )}
      </div>

      {selectedPlan && (
        <OrderModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}

function OrderModal({
  plan,
  onClose,
}: {
  plan: DietPlan;
  onClose: () => void;
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('orders').insert({
        diet_plan_id: plan.id,
        customer_name: customerName,
        customer_email: customerEmail,
        total_amount: plan.price,
        status: 'pending',
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Order Placed!
            </h3>
            <p className="text-gray-600">
              Thank you for your order. We'll send you an email with details
              shortly.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Order {plan.name}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Plan Duration:</span>
                  <span className="font-semibold">{plan.duration_days} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Amount:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ${plan.price}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
