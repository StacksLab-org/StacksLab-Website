'use client'

import React from 'react'
import { Settings, User, Bell, Shield, Palette } from 'lucide-react'

const SettingsPage = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium">COMING SOON</span>
            </div>
            <p className="text-gray-600 mt-1">Manage your account preferences and IDE configuration</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings Coming Soon</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We&apos; re building comprehensive settings to help you customize your StacksLab experience. 
              Configure your IDE preferences, account settings, and more.
            </p>
            
            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <User className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Account Settings</h3>
                <p className="text-sm text-gray-600">Manage your profile, password, and account preferences</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <Palette className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">IDE Preferences</h3>
                <p className="text-sm text-gray-600">Customize editor theme, font size, and code formatting</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <Bell className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
                <p className="text-sm text-gray-600">Configure deployment alerts and system notifications</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-sm text-gray-600">Two-factor authentication and API key management</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default SettingsPage