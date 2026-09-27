import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, Mail, Phone, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/assets/logo-transparent.png"
                alt="PG Ease"
                className="h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Official video documentation and operator learning hub for PG Ease Coliving & Hostel ERP. Master tenant onboarding, digital Aadhaar KYC, direct zero-fee UPI collections, and automated rental agreements.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-900/60 border border-brand-700/50 text-brand-300 text-[11px] font-medium">
                <Sparkles className="w-3 h-3 text-brand-400" />
                Trusted by 500+ PG & Hostel Operators
              </span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">Key Tutorials</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tenant_add" className="hover:text-brand-400 transition-colors">Add & Onboard Tenants</Link>
              </li>
              <li>
                <Link to="/rent_collection" className="hover:text-brand-400 transition-colors">Direct UPI Rent Setup</Link>
              </li>
              <li>
                <Link to="/room_management" className="hover:text-brand-400 transition-colors">Rooms & Bed Allocation</Link>
              </li>
              <li>
                <Link to="/kyc_verification" className="hover:text-brand-400 transition-colors">DigiLocker Aadhaar KYC</Link>
              </li>
              <li>
                <Link to="/staff_management" className="hover:text-brand-400 transition-colors">Staff Roles & Permissions</Link>
              </li>
            </ul>
          </div>

          {/* Modules 2 */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">Operations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/expense_tracker" className="hover:text-brand-400 transition-colors">PG Expense & P&L Tracker</Link>
              </li>
              <li>
                <Link to="/complaints_resolution" className="hover:text-brand-400 transition-colors">Tenant Complaints Desk</Link>
              </li>
              <li>
                <Link to="/public_listing" className="hover:text-brand-400 transition-colors">Publish PG on Search</Link>
              </li>
              <li>
                <a href="https://pgease.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-brand-400 transition-colors">
                  <span>Explore PGEase.in</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support Contacts */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">Dedicated Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a href="tel:+917701953356" className="hover:text-white transition-colors">+91 77019 53356</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a href="mailto:support@pgease.in" className="hover:text-white transition-colors">support@pgease.in</a>
              </li>
              <li className="flex items-start gap-2 text-slate-500 text-[11px] pt-1 leading-snug">
                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Mon – Sat (9:30 AM – 7:00 PM IST)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} PG Ease Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://pgease.in/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="https://pgease.in/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="https://pgease.in/refund" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
