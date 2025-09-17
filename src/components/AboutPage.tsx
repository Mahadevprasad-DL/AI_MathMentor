import React from 'react';
import { Bot, BookOpen, Calculator, Users, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">About MathMentor AI</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Your intelligent mathematics companion, designed to make learning and problem-solving 
            easier, more intuitive, and accessible to everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <Bot className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">
              MathBot AI was created to bridge the gap between complex mathematical concepts and 
              student understanding. We believe that mathematics should be accessible to everyone, 
              regardless of their background or experience level. Our AI-powered chatbot provides 
              instant, accurate, and educational responses to help you master mathematical concepts 
              from basic arithmetic to advanced calculus.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Comprehensive Topics</h3>
            </div>
            <p className="text-white/70">
              From algebra and geometry to calculus and statistics, we cover all major 
              mathematical domains with detailed explanations and examples.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            <div className="flex items-center mb-4">
              <Calculator className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Interactive Tools</h3>
            </div>
            <p className="text-white/70">
              Scientific calculator, graphing utilities, and formula references provide 
              hands-on learning experiences and practical problem-solving tools.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Personalized Learning</h3>
            </div>
            <p className="text-white/70">
              Our AI adapts to your learning style and provides step-by-step solutions 
              tailored to your current understanding level.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Practice & Assessment</h3>
            </div>
            <p className="text-white/70">
              Interactive quizzes and practice problems help reinforce learning 
              and track your progress across different mathematical topics.
            </p>
          </div>
        </div>

        

        {/* Statistics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100++</div>
              <div className="text-white/70">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">35+</div>
              <div className="text-white/70">Math Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">99.5%</div>
              <div className="text-white/70">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-white/70">Availability</div>
            </div>
          </div>
        </div>

        {/* Contact & Future */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-white/20 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Learning Community</h2>
          <p className="text-white/80 text-lg mb-6">
            Whether you're a student struggling with homework, a professional brushing up on skills, 
            or simply curious about mathematics, MathMentor AI is here to help you succeed.
          </p>
          
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            MathMentor AI Tutor • Making Mathematics Accessible to Everyone • 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;