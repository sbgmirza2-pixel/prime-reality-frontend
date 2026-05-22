import React, { useState } from 'react';

const testimonialsData = [
  {
    id: 1,
    quote: "“ THEY DID AN AMAZING WORK FOR OUR HOME ”",
    feedback: "WORKING WITH THE AGENCY WAS A SEAMLESS AND EXCELLENT EXPERIENCE AND DEDICATION. TOGETHER, WE’LL CREATE SPACES THAT INSPIRE AND ELEVATE THE WAY YOU LIVE, WORK, AND PLAY. LET’S COLLABORATE TO BUILD BETTER COMMUNITIES, BUSINESSES, AND FUTURES.",
    author: "DORIS D. SMITH",
    role: "RENTAL PROPERTY OWNER",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex] = useState(0);
  const { quote, feedback, author, role, image } = testimonialsData[currentIndex];

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 font-inter relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block: Exact Pill Shape (Square with Full Rounded Edges) */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-4xl font-normal text-[#1F3E56] tracking-wide uppercase">
            SATISFIED CLIENTS SPEAK
          </h2>
          <div className="flex space-x-2">
            {/* Arrows with light blue circle theme exactly as in mockup */}
            <button className="w-10 h-10 rounded-full bg-[#1F3E56] text-[#A1B1C1] flex items-center justify-center font-bold hover:bg-gray-700 transition">
              ‹
            </button>
            <button className="w-10 h-10 rounded-full bg-[#1F3E56] text-[#A1B1C1] flex items-center justify-center font-bold hover:bg-gray-700 transition">
              ›
            </button>
          </div>
        </div>

        {/* Split Grid Content: Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Perfectly Positioned, Square-but-Rounded Images with Wireframes */}
          <div className="relative h-[380px] md:h-[450px] w-full flex items-center">
            {/* Background Image: Rounded corners as referenced */}
            <div className="absolute left-0 top-0 w-[65%] h-[82%] overflow-hidden rounded-3xl shadow-md grayscale">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" 
                alt="Architecture Exterior" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Front Image: Overlapping, Thick White Border, Rounded corners */}
            <div className="absolute right-4 md:right-8 bottom-0 w-[65%] h-[82%] overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600" 
                alt="Interior Luxury Living" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Text Block Content */}
          <div className="space-y-6 lg:pl-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0A1A2F] leading-snug tracking-wide uppercase">
              {quote}
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed tracking-widest font-normal text-justify uppercase">
              {feedback}
            </p>
            
            {/* Divider matching wireframe style lines */}
            <div className="w-24 h-[1px] bg-gray-300"></div>
            
            {/* User Meta Data Block */}
            <div className="flex items-center space-x-4 pt-2">
              <img 
                src={image} 
                alt={author} 
                className="w-12 h-12 rounded-full object-cover border border-[#0A1A2F]/20"
              />
              <div className="flex flex-col">
                <h4 className="font-bold text-[#0A1A2F] text-sm md:text-base tracking-wider uppercase">
                  {author}
                </h4>
                <p className="text-gray-400 text-xs tracking-widest font-medium uppercase mt-0.5">
                  {role}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsCarousel;