
import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

interface ProjectSetupProps {
  title?: string;
  description?: string;
}

const ProjectSetup: React.FC<ProjectSetupProps> = ({ 
  title = "Set up projects",
  description = "Create projects and tasks your team is going to work on."
}) => {
  return (
    <div className="max-w-2xl mr-auto mb-7 p-6 bg-green-50">
      {/* Step indicator */}
      <div className="text-sm text-gray-500 mb-2">STEP 2</div>
      
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      
      {/* Description */}
      <p className="text-gray-600 mb-6">{description}</p>
      
      {/* Search bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Find task@project"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          ×
        </button>
      </div>
      
      {/* Projects list */}
      <div className="space-y-6">
        {/* Favorites section */}
        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">FAVORITES</h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-900 font-medium">Adobe</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">20 Tasks</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Star className="w-4 h-4 text-orange-400 fill-current" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-900 font-medium">Atlassian</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">40 Tasks</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Star className="w-4 h-4 text-orange-400 fill-current" />
              </div>
            </div>
          </div>
        </div>
        
        {/* SOL-TECH section */}
        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">SOL-TECH</h3>
          <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-900 font-medium">T302</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">10 Tasks</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Star className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>
        
        {/* CLIENT X section */}
        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">CLIENT X</h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-900 font-medium">Super app</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">5 Tasks</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Star className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-900 font-medium">Bank of Trust</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">2 Tasks</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Star className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSetup;
