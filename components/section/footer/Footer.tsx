import React from 'react';
import { Github, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { StacksLabLogo } from '../navbar/NavBar';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-1">
            <StacksLabLogo />
            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              The complete development platform for Stacks blockchain smart contracts. 
              Build, test, and deploy with confidence.
            </p>
          </div>

          {/* Product Column */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  Smart Contract IDE
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">BETA</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  Testing Suite
                  <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">SOON</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  Deployment Tools
                  <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">SOON</span>
                </a>
              </li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contract Templates</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  Documentation
                  <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">SOON</span>
                </a>
              </li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Clarity Guide</a></li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  Community Forum
                  <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">SOON</span>
                </a>
              </li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Examples</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="#privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a href="#waitlist" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">
              Join Waitlist
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">Built for the Stacks ecosystem</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <a href="https://twitter.com/stackslab" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/StacksLab-org" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#discord" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Discord">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#youtube" className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-500 text-sm ml-8">
              © 2025 StacksLab. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;