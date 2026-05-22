import React, { useState } from 'react';

// Mock data aapki reference image aur luxury theme ke hisab se
const testimonialsData = [
  {
    id: 1,
    quote: "THEY DID AN AMAZING WORK FOR OUR HOME",
    feedback: "Working with Prime Reality agency was a seamless and exceptionally professional experience. From start to finish they understood our need for a space that could serve as both a comfortable home and a productive work environment.",
    author: "DORIS D. SMITH",
    role: "RENTAL PROPERTY OWNER",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
  },
  {
    id: 2,
    quote: "EXCEEDED ALL OUR LUXURY EXPECTATIONS",
    feedback: "The attention to detail and direct connect feature without brokers saved us immense time. Finding a luxury villa in the heart of the city has never been this elegant and smooth.",
    author: "ALEXANDER VANGUARD",
    role: "LUXURY BUYER",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const { quote, feedback, author, role, image } = testimonialsData[currentIndex];

  return (
    <section className="bg-lightGray py-16 px-4 md:px-12 lg:px-24 font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="flex justify-between items-center mb-12 border-b border-gray-300 pb-4">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-luxuryNavy tracking-wide">
            SATISFIED CLIENTS SPEAK
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex space-x-3">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-luxuryNavy flex items-center justify-center text-luxuryNavy hover:bg-luxuryNavy hover:text-white transition duration-300"
            >
              &#8592;
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-luxuryNavy flex items-center justify-center text-white hover:bg-luxuryGold transition duration-300"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Overlapping Luxury Image Cards */}
          <div className="relative h-[350px] md:h-[450px] w-full flex items-center justify-center">
            {/* Back Card */}
            <div className="absolute left-4 top-4 w-[70%] h-[80%] rounded-xl overflow-hidden shadow-lg transform -rotate-3 transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" 
                alt="Luxury House Exterior" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Front Card */}
            <div className="absolute right-4 bottom-4 w-[75%] h-[80%] rounded-xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600" 
                alt="Luxury Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <span className="text-4xl text-luxuryGold font-serif">“</span>
            
            <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-extrabold text-luxuryNavy leading-tight tracking-tight">
              {quote}
            </h3>
            
            <p className="text-darkGray text-sm md:text-base leading-relaxed tracking-wide font-light max-w-xl">
              {feedback}
            </p>
            
            <div className="w-16 h-[2px] bg-luxuryGold my-2"></div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <img 
                src={image} 
                alt={author} 
                className="w-14 h-14 rounded-full object-cover border-2 border-luxuryGold"
              />
              <div>
                <h4 className="font-bold text-luxuryNavy text-sm md:text-base tracking-wider">
                  {author}
                </h4>
                <p className="text-luxuryGold text-xs font-semibold tracking-widest mt-0.5">
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