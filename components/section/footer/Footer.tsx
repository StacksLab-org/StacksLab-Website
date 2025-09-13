import React from 'react';
import { Github, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { StacksLabLogo } from '../navbar/NavBar';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">

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
         
            <span className="text-gray-400">•</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Powered by</span>
              <a
                href="https://stacks.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:opacity-80 transition-opacity duration-200"
              >
                <Image
                className='rounded-md'
                 src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAY1BMVEX8ZDL////8hF39x7X/+fj9mHf8eEz8Zzb8bD38ZTP8aTn9vaj/8u79qo//6uP9nX78fVP/2Mz8gFf8iWP8cUP8jmr/4tn9spr/9PH/3dP/08X8k3H/59/8ooT9zLz9rJL9w6/kXZ75AAAEVklEQVR4nO2c65aqMAyFRUFuyiBeET36/k95xuXgJCNCC7YE3N9Pl3Xt0E0bS8JkAgAAsgj7FvA2xhMJAAAAAIB0kHkBAAAAAAAARIA/J+LAlAAAAAAAAAuExfLOOdUf7K+/7nib9yvTZO+UuPqRXB+DkxaX4a1s3IcWJw80B29/xzpXA+J0oIE4sebYBRn7z4w+ZcIZEeNu2w9dm1KoSkQv6y7SGPlFBjpLYwKVOVM9e/Vxm4SMS3xzAlXx25mrgydNEZzaXFo2kRejApVpY/bgQMbkOreWSa5ElJpLwn90yNS0QFXYfXtS2RbZJGqsEKahW7TKtpjSNXslxVg32BLU6BS+Ys1tCFSFZRuN966nOYE2WdOca1b/3ZSuWEcBWyEjple5PidfkW8eRBnrxpyuXKu6lYsZS8hWSNkqJvRzsStWCTXX66zcP1JjZTYFquJTc71M6JfUWIVVgcoU1FwvtmtmrFzqAzNmrsqcK6LGWog01o0oJzIrE/o9+YLzZV2gMgXVWZHQs6OKo1Rj3aBX/NlcPtsK+z7JqiXYEalPCT1bsc69CFRmWrMtZjTHmknLsf7CVi6W0IdsK9Q9lbQOO4rYUbnsuEHAOVYTLEknCT1L9K+SV6wStlc89ryQLgOL/p8iKMA2k8cJPTPWsVeBqlyo5HJ1YquZk8i41aOtV8OeSf6++l5RFJcD/zA/1/2Epa2SJbBmsHMgcWkW0hXXSiBxs5DOWNn2EQgCQSAfEsiyWUdXDjbimGzyZiXdcC0l+eF8ahYZmRgAAAAAhkUWz8yytJOjZIfmtK8jdkpO981COmPlaHg0f6wQCAJBIB8SiNesoysnG3FM/P3BreFZVtWHdb/gJrZaF4J5DV7CFcfTNE2LI48jTut+QsgjePa0sKyciWj1hrMbwkNdHsislJzRT/NeBSrCap0Wv3nsUCqcHjDBpHImYg/axVXJPsGKTVnlTMbKS6XfJaxC88/jdHaM7/UkUJW6kqxgQObixvprn1RkG08VvN3quXJmMJVObMWqqJf1qbkSueZiJVmVBwistkZcx0UJM9aLkixW/yHVXKyT7UUCy9vdZJqLZVMvm3oy8eYKFG9kttMINFeo2lUptJfygXor4lx0gbxO57Foc7EC7IZGHV7rL6uJxGMl8U12YR2uuaSVK9B8XwLLuSS1Lej+jWV/hwU1kuj33rLeXqXGcRu0UcVil9LQzg6DFXe4kK5cQtrfWPvhVXXUXKtx3Ab670m40/Z9KsZo3clGkzOnf3Ppvu7hF1lHESzHOuk16pzpzdV3Y/uUaNHOyam5VkbkqbMh/tC+Y2nHa+/vsMjy5M6pMVd8Zp0vfoj7vke+t7boTqsk1g9+eLcqAAAAAAAAAABaSHvs9emMZT4Qh3BGG9hAqLj+g5ySatGDDGUc4NIDA4Qj8dVIwhhNIGPx1VjmQzkO6fFK1/dpYD5EgekQxWimYySBjCSMzuA6gHb8B38sM5NakHIYAAAAAElFTkSuQmCC'}
                  height={30}
                  width={30} alt='stacks' /><span className="text-gray-400 text-sm font-medium">Stacks</span>
              </a>
            </div>
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