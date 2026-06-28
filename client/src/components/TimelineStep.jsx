import React from 'react';

const TimelineStep = ({ 
  step, 
  isCompleted, 
  isCurrent, 
  isLastStep, 
  icon, 
  description 
}) => {
  
  const circleBgColor = isCompleted 
    ? 'bg-green-600 text-white' 
    : isCurrent 
      ? 'bg-blue-600 text-white animate-pulse' 
      : 'bg-gray-200 text-gray-500';

  const labelTextColor = isCurrent || isCompleted 
    ? 'text-gray-900 font-semibold' 
    : 'text-gray-400';

  return (
    <li className="relative flex-1 text-center sm:text-left">
      {/* 1. Track Line (Absolute Positioned behind the circle) */}
      {!isLastStep && (
        <div 
          className={`hidden sm:block absolute top-5 left-5 right-0 h-0.5 -translate-y-1/2 -z-10
            ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} 
        />
      )}

      {/* 2. Step Indicator Circle */}
      <div className="flex items-center justify-center sm:justify-start">
        <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${circleBgColor}`}>
          <i className={`ri-${icon.iconName} text-lg`}></i>
        </div>
      </div>

      {/* 3. Text Details Area */}
      <div className="mt-3 pr-2">
        <h3 className={`text-sm md:text-base ${labelTextColor}`}>{step.label}</h3>
        {(isCurrent || isCompleted) && (
          <time className="block text-[11px] font-normal text-gray-400 mt-0.5">
            Updated Just Now
          </time>
        )}
        <p className="text-xs font-normal text-gray-500 max-w-[160px] mx-auto sm:mx-0 mt-1 break-words">
          {description}
        </p>
      </div>
    </li>
  );
};

export default TimelineStep;