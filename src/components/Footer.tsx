import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-heading font-bold text-white mb-4">
              VYRONEX<span className="text-primary">MOTOR</span>
            </div>
            <p className="font-paragraph text-sm text-secondary/70 leading-relaxed">
              Premium luxury vehicles and expert customization services for the discerning driver.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categories" className="font-paragraph text-sm text-secondary/70 hover:text-primary transition-colors">
                  Car Sales
                </Link>
              </li>
              <li>
                <Link to="/customization" className="font-paragraph text-sm text-secondary/70 hover:text-primary transition-colors">
                  Customization Studio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-secondary/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm text-secondary/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm text-secondary/70">info@elitedrive.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm text-secondary/70">123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="font-paragraph text-sm text-secondary/50 text-center">
            © {new Date().getFullYear()} VyronexMotor. All rights reserved. Crafted for luxury.
          </p>
        </div>
      </div>
    </footer>
  );
}
