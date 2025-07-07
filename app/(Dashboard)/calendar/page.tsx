"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarPage = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [view, setView] = useState('Week');

  const weekDays = [
    { day: 'Mon, Jun 30', time: '00:00:00' },
    { day: 'Tue, Jul 1', time: '00:00:00' },
    { day: 'Wed, Jul 2', time: '00:00:00' },
    { day: 'Thu, Jul 3', time: '00:00:00' },
    { day: 'Fri, Jul 4', time: '00:00:00' },
    { day: 'Sat, Jul 5', time: '00:00:00' },
    { day: 'Sun, Jul 6', time: '00:00:00', isToday: true },
  ];

  const timeSlots = [
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Calendar Header - responsive flex wrap for mobile, select full width on mobile */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 flex-wrap">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full md:w-auto">
            {/* View Selector - stack on mobile, inline on desktop */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-2 md:mb-0">
              <button className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-white rounded-md shadow-sm">
                CALENDAR
              </button>
              <button 
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                  view === 'Week' 
                    ? 'bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week
              </button>
              <button 
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                  view === 'Day' 
                    ? 'bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Day
              </button>
            </div>

            {/* Add Button */}
            <Button variant="outline" size="sm" className="shrink-0">
              <Plus className="w-4 h-4 mr-2" />
            </Button>
          </div>

          {/* Zone droite du header, chaque select prend toute la largeur sur mobile */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full md:w-auto">
            {/* Settings */}
            <Button variant="outline" size="sm" className="shrink-0">
              <Settings className="w-4 h-4" />
            </Button>

            {/* Teammates Dropdown */}
            <div className="flex-1 min-w-0">
              <select className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm">
                <option>Teammates</option>
              </select>
            </div>

            {/* Week Selector */}
            <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
              <select className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm">
                <option>This week</option>
              </select>
              <Button variant="outline" size="sm" className="shrink-0">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="shrink-0">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid - horizontal scroll on mobile, grid on desktop */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        {/* Week Header */}
        <div className="min-w-[600px] grid grid-cols-8 border-b border-gray-200 text-xs sm:text-sm">
          <div className="p-2 sm:p-4 bg-gray-50"></div>
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={`p-2 sm:p-4 text-center border-l border-gray-200 ${
                day.isToday ? 'bg-blue-50' : 'bg-gray-50'
              }`}
            >
              <div className={`font-medium ${
                day.isToday ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {day.day}
              </div>
              <div className={`${
                day.isToday ? 'text-blue-500' : 'text-gray-500'
              }`}>
                {day.time}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid - scrollable on mobile */}
        <div className="max-h-96 overflow-y-auto min-w-[600px]">
          {timeSlots.map((time, timeIndex) => (
            <div key={timeIndex} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50 text-xs sm:text-sm">
              <div className="p-2 sm:p-3 text-gray-500 bg-gray-50 border-r border-gray-200">
                {time}
              </div>
              {weekDays.map((day, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className={`p-2 sm:p-3 border-l border-gray-200 min-h-[40px] sm:min-h-[60px] ${
                    day.isToday && dayIndex === 6 && timeIndex >= 4 
                      ? 'bg-blue-500' 
                      : ''
                  }`}
                >
                  {day.isToday && dayIndex === 6 && timeIndex >= 4 && (
                    <div className="h-full bg-blue-500 rounded"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
