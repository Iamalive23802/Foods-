/*
  # Create Diet and Health Information Tables

  ## New Tables
  
  ### `diet_plans`
  - `id` (uuid, primary key) - Unique identifier for each diet plan
  - `name` (text) - Name of the diet plan
  - `description` (text) - Detailed description
  - `price` (numeric) - Price of the diet plan
  - `duration_days` (integer) - Duration in days
  - `calories_per_day` (integer) - Average daily calories
  - `image_url` (text) - URL to diet plan image
  - `category` (text) - Category (e.g., weight-loss, muscle-gain, balanced)
  - `features` (jsonb) - Array of key features
  - `created_at` (timestamptz) - Timestamp of creation

  ### `health_articles`
  - `id` (uuid, primary key) - Unique identifier for each article
  - `title` (text) - Article title
  - `content` (text) - Article content
  - `excerpt` (text) - Short excerpt for previews
  - `author` (text) - Author name
  - `image_url` (text) - URL to article image
  - `category` (text) - Category (e.g., nutrition, fitness, wellness)
  - `reading_time_minutes` (integer) - Estimated reading time
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Timestamp of creation

  ### `orders`
  - `id` (uuid, primary key) - Unique identifier for each order
  - `user_id` (uuid, foreign key to auth.users) - Customer who placed the order
  - `diet_plan_id` (uuid, foreign key to diet_plans) - Ordered diet plan
  - `customer_email` (text) - Customer email
  - `customer_name` (text) - Customer name
  - `total_amount` (numeric) - Total order amount
  - `status` (text) - Order status (pending, completed, cancelled)
  - `created_at` (timestamptz) - Timestamp of order creation

  ## Security
  
  All tables have RLS enabled with appropriate policies:
  - `diet_plans` and `health_articles` are publicly readable
  - `orders` can only be read by the user who created them
  - Insert operations are available to authenticated users
*/

CREATE TABLE IF NOT EXISTS diet_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  duration_days integer NOT NULL,
  calories_per_day integer NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS health_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  author text NOT NULL DEFAULT 'Health Team',
  image_url text NOT NULL,
  category text NOT NULL,
  reading_time_minutes integer DEFAULT 5,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  diet_plan_id uuid REFERENCES diet_plans(id) NOT NULL,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Diet plans are publicly readable"
  ON diet_plans FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Health articles are publicly readable"
  ON health_articles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

INSERT INTO diet_plans (name, description, price, duration_days, calories_per_day, image_url, category, features) VALUES
  ('Mediterranean Balance', 'A heart-healthy diet rich in fruits, vegetables, whole grains, and healthy fats inspired by Mediterranean cuisine.', 299.00, 30, 2000, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'balanced', '["Heart-healthy meals", "Rich in Omega-3", "Fresh vegetables daily", "Whole grain focus"]'),
  ('Weight Loss Pro', 'Science-backed calorie-controlled meal plan designed to help you lose weight sustainably while maintaining energy.', 349.00, 30, 1600, 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg', 'weight-loss', '["Calorie controlled", "High protein", "Low carb options", "Portion guidance"]'),
  ('Muscle Builder', 'High-protein diet plan optimized for muscle growth and recovery, perfect for athletes and fitness enthusiasts.', 399.00, 30, 2800, 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg', 'muscle-gain', '["High protein intake", "Post-workout meals", "Lean muscle focus", "Performance nutrition"]'),
  ('Plant Power', 'Complete plant-based nutrition plan packed with nutrients, fiber, and all essential vitamins and minerals.', 279.00, 30, 2000, 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', 'vegan', '["100% plant-based", "Complete nutrition", "Sustainable choices", "Diverse recipes"]'),
  ('Keto Ultimate', 'Low-carb, high-fat ketogenic diet designed to help your body enter ketosis for enhanced fat burning.', 369.00, 30, 1800, 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg', 'keto', '["Low carb high fat", "Ketosis optimized", "Blood sugar control", "Sustained energy"]'),
  ('Quick Start 7-Day', 'Perfect introduction to healthy eating with a week of balanced, delicious meals to kickstart your journey.', 99.00, 7, 2000, 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg', 'beginner', '["Perfect for beginners", "Easy to follow", "Variety of meals", "Budget friendly"]');

INSERT INTO health_articles (title, content, excerpt, author, image_url, category, reading_time_minutes) VALUES
  ('The Science Behind Mediterranean Diet', 'The Mediterranean diet has been consistently ranked as one of the healthiest diets in the world. Research shows that this eating pattern, rich in fruits, vegetables, whole grains, legumes, and healthy fats like olive oil, can reduce the risk of heart disease, stroke, and type 2 diabetes.\n\nStudies have found that people following a Mediterranean diet have lower levels of inflammation and oxidative stress, which are linked to chronic diseases. The diet is also associated with better cognitive function and may help prevent age-related cognitive decline.\n\nKey components include eating fish at least twice a week, using olive oil as the primary fat source, consuming plenty of fruits and vegetables, and enjoying meals with family and friends. The social aspect of eating is considered just as important as the food itself.', 'Discover why the Mediterranean diet is considered one of the healthiest eating patterns and how it can transform your health.', 'Dr. Sarah Mitchell', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'nutrition', 8),
  ('10 Superfoods You Should Eat Daily', 'Superfoods are nutrient-dense foods that provide exceptional health benefits. Here are ten superfoods you should incorporate into your daily diet:\n\n1. Blueberries - Packed with antioxidants and vitamin C\n2. Spinach - Rich in iron, calcium, and vitamins A and K\n3. Salmon - Excellent source of omega-3 fatty acids\n4. Avocados - Loaded with healthy fats and fiber\n5. Quinoa - Complete protein with all essential amino acids\n6. Greek Yogurt - High in protein and probiotics\n7. Almonds - Great source of vitamin E and healthy fats\n8. Sweet Potatoes - Rich in beta-carotene and fiber\n9. Green Tea - Contains powerful antioxidants\n10. Chia Seeds - High in omega-3s and fiber\n\nIncorporating these foods into your daily routine can boost your immune system, improve heart health, and enhance overall well-being.', 'Learn about the top 10 nutrient-dense superfoods that can boost your health and energy levels.', 'Emily Rodriguez', 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', 'nutrition', 6),
  ('Understanding Macros: Protein, Carbs, and Fats', 'Macronutrients, or macros, are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fats. Understanding how these work together is essential for optimal health and fitness.\n\nProtein is crucial for building and repairing tissues, making enzymes and hormones, and supporting immune function. Aim for 0.8-1.2 grams per kilogram of body weight daily.\n\nCarbohydrates are your body''s primary energy source. Focus on complex carbs like whole grains, vegetables, and legumes rather than simple sugars.\n\nFats are essential for hormone production, nutrient absorption, and brain health. Prioritize unsaturated fats from sources like nuts, seeds, avocados, and fatty fish.\n\nThe ideal macro ratio varies based on individual goals, activity level, and metabolic health. Working with a nutritionist can help you find your optimal balance.', 'A comprehensive guide to understanding macronutrients and how to balance them for your health goals.', 'Dr. Michael Chen', 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg', 'nutrition', 10),
  ('The Benefits of Intermittent Fasting', 'Intermittent fasting (IF) has gained popularity as both a weight loss tool and a way to improve overall health. Rather than focusing on what you eat, IF focuses on when you eat.\n\nCommon IF methods include the 16:8 method (fasting for 16 hours, eating within an 8-hour window) and the 5:2 diet (eating normally five days a week, restricting calories on two days).\n\nResearch suggests IF may help with weight loss, improve insulin sensitivity, reduce inflammation, and support cellular repair processes. Some studies indicate it may enhance brain function and increase longevity.\n\nHowever, IF isn''t for everyone. Pregnant women, people with a history of eating disorders, and those with certain medical conditions should consult a healthcare provider before trying IF.', 'Explore the science-backed benefits of intermittent fasting and whether it''s right for you.', 'Jessica Turner', 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg', 'wellness', 7),
  ('How to Stay Hydrated for Optimal Performance', 'Proper hydration is crucial for maintaining physical performance, cognitive function, and overall health. Water makes up about 60% of your body weight and is involved in nearly every bodily function.\n\nSigns of dehydration include dark urine, fatigue, headaches, and decreased performance. Most people need 8-10 cups of water daily, but this varies based on activity level, climate, and individual factors.\n\nTiming matters too. Drink water before, during, and after exercise. Start your day with a glass of water to rehydrate after sleep. Keep a water bottle with you throughout the day as a reminder.\n\nElectrolytes like sodium, potassium, and magnesium are also important, especially during intense exercise or hot weather. Consider electrolyte drinks for workouts lasting over an hour.\n\nFoods with high water content, like cucumbers, watermelon, and lettuce, also contribute to hydration.', 'Learn the importance of hydration and practical tips to ensure you''re drinking enough water daily.', 'Marcus Johnson', 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg', 'fitness', 5),
  ('Building Healthy Eating Habits That Last', 'Creating sustainable healthy eating habits is more effective than following restrictive diets. Here''s how to build habits that last:\n\n1. Start small - Make one change at a time rather than overhauling your entire diet\n2. Plan ahead - Meal prep on weekends to set yourself up for success\n3. Listen to your body - Eat when you''re hungry, stop when you''re satisfied\n4. Practice mindful eating - Slow down and enjoy your meals without distractions\n5. Allow flexibility - It''s okay to enjoy treats in moderation\n6. Focus on adding, not restricting - Add more vegetables, fruits, and whole foods\n7. Stay consistent - Consistency matters more than perfection\n\nRemember that building new habits takes time. Research suggests it takes an average of 66 days to form a new habit, so be patient with yourself and celebrate small wins along the way.', 'Discover practical strategies for developing sustainable healthy eating habits that fit your lifestyle.', 'Dr. Sarah Mitchell', 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg', 'wellness', 9);
