import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-emerald-500" fill="currentColor" />
              <span className="text-2xl font-bold text-white">VegOre</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Transform your health with our scientifically designed diet plans
              and expert nutrition guidance. Your journey to a healthier
              lifestyle starts here.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500" />
                <span>support@vegore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>123 Health St, Wellness City, CA 90210</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Diet Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Health Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 VegOre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
