
"use client";
import React, { useState } from 'react';

export default function RecipeSearchFilter() {
  const [searchTerm, setSearchTerm] = useState('Chicken');
  const [cookTime, setCookTime] = useState(58);
  const [cuisine, setCuisine] = useState('Chinese');
  const [selectedIngredient, setSelectedIngredient] = useState('Onion');
  const [excludedIngredients, setExcludedIngredients] = useState(['potato', 'mushroom', 'tomato']);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const keyboards = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['↑', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←']
  ];

  const removeExcludedIngredient = (ingredient) => {
    setExcludedIngredients(excludedIngredients.filter(item => item !== ingredient));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white">
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-700">Search filter</h2>
          <div className="w-6"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Search..."
              onFocus={() => setShowKeyboard(true)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Time to cook */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Time to cook</span>
              <span className="text-gray-800 font-medium">{cookTime} min</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="120"
                value={cookTime}
                onChange={(e) => setCookTime(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range range-warning"
              />
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-md"
                style={{ left: `${(cookTime / 120) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              ></div>
            </div>
          </div>

          {/* Select Cuisine */}
          <div>
            <label className="block text-gray-600 mb-3">Select Cuisine</label>
            <div className="relative">
              <select 
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Italian">Italian</option>
                <option value="French">French</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sub Ingredients */}
          <div>
            <label className="block text-gray-600 mb-3">Sub Ingredients</label>
            <div className="relative">
              <input
                type="text"
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Add ingredient..."
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-500 text-xl">+</span>
              </button>
            </div>
            
            {/* Excluded ingredients */}
            <div className="flex flex-wrap gap-2 mt-3">
              {excludedIngredients.map((ingredient, index) => (
                <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                  <span className="text-sm text-gray-700">{ingredient}</span>
                  <button
                    onClick={() => removeExcludedIngredient(ingredient)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors">
            Search
          </button>
        </div>

        {/* Virtual Keyboard */}
        {showKeyboard && (
          <div className="bg-gray-200 p-4">
            <div className="space-y-2">
              {keyboards.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1">
                  {row.map((key, keyIndex) => (
                    <button
                      key={keyIndex}
                      className={`
                        ${key === '↑' || key === '←' ? 'w-12' : 'w-10'} 
                        h-10 bg-white rounded shadow-sm text-sm font-medium
                        hover:bg-gray-50 transition-colors
                        ${key === '↑' ? 'text-xs' : ''}
                      `}
                      onClick={() => {
                        if (key === '←') {
                          setSearchTerm(prev => prev.slice(0, -1));
                        } else if (key !== '↑') {
                          setSearchTerm(prev => prev + key.toLowerCase());
                        }
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
              
              {/* Bottom keyboard row */}
              <div className="flex justify-center gap-1 mt-2">
                <button className="w-16 h-10 bg-white rounded shadow-sm text-sm">
                  123
                </button>
                <button
                  className="flex-1 h-10 bg-white rounded shadow-sm text-sm"
                  onClick={() => setSearchTerm(prev => prev + ' ')}
                >
                  space
                </button>
                <button
                  className="w-16 h-10 bg-gray-400 text-white rounded shadow-sm text-sm"
                  onClick={() => setShowKeyboard(false)}
                >
                  Go
                </button>
              </div>
            </div>
            
            {/* Bottom bar with emoji and mic */}
            <div className="flex justify-between items-center mt-4 px-4">
              <button className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl">😊</span>
              </button>
              <div className="w-32 h-1 bg-black rounded-full"></div>
              <button className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}