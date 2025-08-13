import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Footer } from '../components/Footer';



export const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'
      } border-b border-green-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-700 cursor-pointer">
                WryTr
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-green-700 transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-green-700 transition-colors">
                How it Works
              </button>
              <button 
                onClick={()=>{navigate('/signup')}}
                className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-all transform hover:scale-105"
              >
                Start Writing
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white min-h-screen flex items-center relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-100/60 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-green-50/80 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Share Your
                <span className="block text-green-700">
                  Stories
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Connect with readers worldwide. Write, publish, and discover amazing stories on WryTr - where every voice matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={()=>{navigate('/signup')}}
                  className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Writing Today
                </button>
              </div>
            </div>
            
            {/* Right Side - Image Space */}
            <div className="relative">
              {/* Placeholder for your image - replace src with your actual image */}
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center shadow-2xl">
                <img 
                  src="\src\assets\TypeWriter.png" 
                  alt="Hero Image" 
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>  
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-green-700">WryTr</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to share your thoughts and connect with readers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-50">
              <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Writing</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive editor with powerful formatting tools. Focus on your content while we handle the rest.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-50">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with readers from around the world. Your stories deserve a global audience.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-50">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Blazing fast performance ensures your readers have the best experience possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Start Writing in <span className="text-green-700">3 Steps</span>
            </h2>
            <p className="text-xl text-gray-600">
              It's never been easier to share your thoughts with the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Account</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up in seconds and join our community of writers and readers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Write Your Story</h3>
              <p className="text-gray-600 leading-relaxed">
                Use our powerful editor to craft compelling stories that captivate readers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Share & Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Publish your work and connect with readers who love your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Join thousands of writers who trust WryTr to share their voices with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={()=>{navigate('/signup')}}
              className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>


    </div>
  );
};
