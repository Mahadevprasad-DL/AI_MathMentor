import React from 'react';
import { MessageCircle, BookOpen, Calculator, ArrowRight, Brain, Target, Users, Award, Zap, Sparkles } from 'lucide-react';

interface HomePageProps {
  navigateToPage?: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToPage }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-green-400 to-lime-500 rounded-full animate-bounce flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                MathMentor
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Your intelligent mathematics companion. Master concepts from basic arithmetic 
              to advanced calculus with personalized AI tutoring and comprehensive learning tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => navigateToPage?.('chatbot')}
              className="group bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-teal-500/25 transform hover:scale-105"
            >
              <MessageCircle size={20} />
              <span>Start Learning</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigateToPage?.('topics')}
              className="group border-2 border-cyan-400/50 text-white hover:bg-cyan-500/20 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm hover:border-cyan-400 hover:scale-105"
            >
              <BookOpen size={20} />
              <span>Explore Topics</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">AI Math Tutor</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get instant, personalized explanations for any math concept with our intelligent AI assistant
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Complete Curriculum</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Comprehensive coverage from basic arithmetic to advanced mathematics topics
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-lime-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Smart Tools</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Advanced calculator, graphing utilities, and formula references at your fingertips
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Practice Hub</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Interactive exercises and quizzes to master concepts and track your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by Students Worldwide</h2>
            <p className="text-slate-400 text-lg leading-relaxed">Join thousands who have improved their math skills with MathMentor</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">Students</div>
              <div className="text-slate-400 text-sm font-medium">Active Learners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">40+</div>
              <div className="text-slate-400 text-sm font-medium">Math Topics</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-lime-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-slate-400 text-sm font-medium">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-slate-400 text-sm font-medium">AI Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
