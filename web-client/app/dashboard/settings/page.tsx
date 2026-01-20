"use client";
import { Settings, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        
        {/* Profile Section */}
        <div className="p-6 flex items-start gap-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Settings className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">General</h3>
            <p className="text-slate-500 text-sm mb-4">Update your profile and company details.</p>
            <button className="text-sm font-bold text-emerald-600 hover:underline">Edit Profile</button>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-6 flex items-start gap-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Shield className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Security</h3>
            <p className="text-slate-500 text-sm mb-4">Change password and manage sessions.</p>
            <button className="text-sm font-bold text-emerald-600 hover:underline">Change Password</button>
          </div>
        </div>

        {/* Billing Section */}
        <div className="p-6 flex items-start gap-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Billing</h3>
            <p className="text-slate-500 text-sm mb-4">Manage subscriptions and payment methods.</p>
            <button className="text-sm font-bold text-emerald-600 hover:underline">View Invoices</button>
          </div>
        </div>

      </div>
    </div>
  );
}
