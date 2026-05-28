"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t border-anthem-lightBlue/30 bg-anthem-bgLight/60 backdrop-blur-sm relative z-20">
      <div className="container px-4 py-10 md:px-6 lg:py-16 mx-auto">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 font-bold mb-4 text-anthem-textDark">
              <div className="relative size-8">
                <Image
                  src="/Anthem Logo.png"
                  alt="Anthem Global Logo"
                  width={32}
                  height={32}
                  className="rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-anthem-blue">Anthem Global</span>
            </div>
            <p className="text-sm text-slate-600 mb-6">Our insights to your inbox</p>
            <div className="flex gap-2 max-w-[280px]">
              <input
                type="email"
                placeholder="Your Email..."
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-anthem-blue"
              />
              <Button size="sm" variant="anthem">Send</Button>
            </div>
            {/* Anthem Footer Branding Image */}
            <div className="mt-5">
              <img
                src="/footer image.png"
                alt="Anthem Global Technology Services Pvt. Ltd. An ISO 9001:2008 Certified Company"
                className="h-auto max-w-[260px] object-contain rounded border border-anthem-lightBlue/10 shadow-sm"
              />
            </div>
          </div>

          {/* Our Company Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-anthem-textDark">Our Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/aboutus" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link href="/mission-vision" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Vision
                </Link>
              </li>
              <li>
                <Link href="/why-anthem" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Why Anthem Global
                </Link>
              </li>
              <li>
                <Link href="/managementprofile" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Management Profile
                </Link>
              </li>
              <li>
                <Link href="/sister-concern-company" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Sister Organizations
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-anthem-textDark">Our Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/jeemocktest" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  TCS iON Digital PrepTest
                </Link>
              </li>
              <li>
                <Link href="/education-erp" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Education ERP
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-anthem-textDark">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/design-development" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Website Design & Development
                </Link>
              </li>
              <li>
                <Link href="/costom-software" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link href="/iphone-app" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Mobility Services
                </Link>
              </li>
              <li>
                <Link href="/ecommerce" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  E-Commerce Solutions
                </Link>
              </li>
              <li>
                <Link href="/digitization" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Digitization & Document Processing
                </Link>
              </li>
              <li>
                <Link href="/biometric-solution" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Biometric Solutions
                </Link>
              </li>
              <li>
                <Link href="/vehicle-tracking-system" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Vehicle Tracking System
                </Link>
              </li>
              <li>
                <Link href="/outsourcing" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  Outsourcing
                </Link>
              </li>
              <li>
                <Link href="/ewaste-management" className="text-slate-600 hover:text-anthem-blue font-medium transition-colors">
                  E-Waste Management
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Offices Address Grid */}
        <div className="border-t border-anthem-lightBlue/30 pt-8 mt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-6 text-anthem-textDark">Contact Us - Our Offices</h4>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Development Center */}
            <div className="flex items-start gap-2.5">
              <MapPin className="size-4 text-anthem-blue mt-1 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-anthem-textDark mb-1">Development Center</p>
                <p className="text-slate-600 leading-relaxed">
                  Anthem Tower,<br />
                  IDCO Plot No. N24,25,26 & 27,<br />
                  New IT Zone, Chandaka Industrial Estate,<br />
                  Bhubaneswar-751024, Odisha
                </p>
                <p className="text-slate-800 mt-1.5 font-medium flex items-center gap-1">
                  <Phone className="size-3 text-anthem-blue" /> +91-674-2972299
                </p>
                <p className="text-slate-800 font-medium flex items-center gap-1 mt-0.5">
                  <Mail className="size-3 text-anthem-blue" /> info@anthemgt.com
                </p>
              </div>
            </div>

            {/* Registered Office */}
            <div className="flex items-start gap-2.5">
              <MapPin className="size-4 text-anthem-blue mt-1 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-anthem-textDark mb-1">Registered Office</p>
                <p className="text-slate-600 leading-relaxed">
                  HIG 84, Sailshree vihar,<br />
                  Chandrasekharpur,<br />
                  Bhubaneswar-751021, India
                </p>
              </div>
            </div>

            {/* Agartala Office */}
            <div className="flex items-start gap-2.5">
              <MapPin className="size-4 text-anthem-blue mt-1 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-anthem-textDark mb-1">Agartala Office</p>
                <p className="text-slate-600 leading-relaxed">
                  Adjacent to TFDPC Ltd.,<br />
                  East side of Raj Bhavan, PO: Kunjavan,<br />
                  Agartala, Tripura
                </p>
              </div>
            </div>

            {/* Bhilai Office */}
            <div className="flex items-start gap-2.5">
              <MapPin className="size-4 text-anthem-blue mt-1 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-anthem-textDark mb-1">Bhilai Office</p>
                <p className="text-slate-600 leading-relaxed">
                  STPI Incubation Centre,<br />
                  Mangal Bhavan, Nehru Nagar (East),<br />
                  Bhilai, Dist: Durg, Chhattisgarh - 490020
                </p>
              </div>
            </div>

            {/* Raipur Office */}
            <div className="flex items-start gap-2.5">
              <MapPin className="size-4 text-anthem-blue mt-1 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-anthem-textDark mb-1">Raipur Office</p>
                <p className="text-slate-600 leading-relaxed">
                  C-12, Jivan Vihar,<br />
                  Telibandha,<br />
                  Raipur, Chhattisgarh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-anthem-lightBlue/30 pt-8 mt-8">
          <p className="text-xs text-slate-500">
            © 2026 Anthem Global Technology Services Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/refund-policy" className="text-xs text-slate-500 hover:text-anthem-blue transition-colors">
              Refund Policy
            </Link>
            <Link href="/privacy-policy" className="text-xs text-slate-500 hover:text-anthem-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-xs text-slate-500 hover:text-anthem-blue transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
