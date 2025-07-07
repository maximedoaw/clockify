"use client"

import React, { useState } from 'react';
import { Play, Square, Tag, DollarSign, Calendar, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TimeTrackerDetailed = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [task, setTask] = useState('');

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Timer Section - Responsive flex wrap for mobile */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Task Input - full width on mobile, shrink on desktop */}
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="What are you working on?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>

          {/* Project Selector - stack on mobile, inline on desktop */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-500">Project</span>
            </button>
          </div>

          {/* Tags & Billable - icons, wrap on small screens */}
          <div className="flex gap-2">
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Tag className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <DollarSign className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Timer Display and Button - always at la fin, wrap on mobile */}
          <div className="flex items-center gap-3 min-w-[150px] justify-end">
            <div className="text-2xl font-mono font-semibold text-gray-900">
              {time}
            </div>
            <Button
              onClick={toggleTimer}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-sm font-semibold"
            >
              {isRunning ? 'STOP' : 'START'}
            </Button>
          </div>
        </div>
      </div>

      {/* This Week Section - responsive padding and font sizes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">This week</h2>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm text-gray-500">Week total:</span>
              <span className="text-base sm:text-lg font-mono font-semibold text-gray-900">00:00:03</span>
            </div>
          </div>
        </div>

        {/* Day Entry */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h3 className="text-sm font-medium text-gray-600">Today</h3>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm text-gray-500">Total:</span>
              <span className="text-sm font-mono font-semibold text-gray-900">00:00:03</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Time Entry - responsive wrap for overflow */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 p-2 md:p-4 hover:bg-gray-50 rounded-lg transition-colors">
            {/* Description */}
            <div className="flex-1 min-w-[120px]">
              <input
                type="text"
                placeholder="Add description"
                className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Project */}
            <div className="flex items-center gap-2 min-w-[80px]">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-500">Project</span>
            </div>

            {/* Tags & Billable */}
            <button className="p-2 hover:bg-gray-100 rounded">
              <Tag className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <DollarSign className="w-4 h-4 text-gray-400" />
            </button>

            {/* Time Range */}
            <div className="flex items-center gap-2 text-sm text-gray-600 min-w-[90px]">
              <span>16:46</span>
              <span>-</span>
              <span>16:47</span>
            </div>

            {/* Calendar */}
            <button className="p-2 hover:bg-gray-100 rounded">
              <Calendar className="w-4 h-4 text-gray-400" />
            </button>

            {/* Duration */}
            <div className="text-sm font-mono font-semibold text-gray-900 min-w-[70px] text-right">
              00:00:03
            </div>

            {/* Play button */}
            <button className="p-2 hover:bg-gray-100 rounded">
              <Play className="w-4 h-4 text-gray-400" />
            </button>

            {/* More options */}
            <button className="p-2 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackerDetailed;
