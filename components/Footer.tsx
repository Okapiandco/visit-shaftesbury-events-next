import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-racing-green text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="text-xs tracking-[0.3em] text-white/80 font-semibold uppercase block">
                Visit
              </span>
              <span className="text-3xl font-display font-bold tracking-tight">SHAFTESBURY</span>
            </div>
            <p className="text-white/70 max-w-md leading-relaxed">
              Your guide to events, shops, services and community life in Shaftesbury, Dorset.
              Bringing our historic hilltop town together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  What's On
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-white/70 hover:text-white transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="/venues" className="text-white/70 hover:text-white transition-colors">
                  Venues
                </Link>
              </li>
              <li>
                <Link href="/travel" className="text-white/70 hover:text-white transition-colors">
                  Travel & Transport
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-white/70 hover:text-white transition-colors">
                  Add Your Event
                </Link>
              </li>
              <li>
                <Link href="/submit-business" className="text-white/70 hover:text-white transition-colors">
                  List Your Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Town Council</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="h-4 w-4" />
                <span>clerk@shaftesbury-tc.gov.uk</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="h-4 w-4" />
                <span>01747 852420</span>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Town Hall, High Street<br />Shaftesbury SP7 8JE</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Shaftesbury Town Council. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
