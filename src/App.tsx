import React, { useState } from 'react';
import { Home, BookOpen, Brain, FileText, Calculator, BarChart3, Info, MessageCircle, Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import ChatbotPage from './components/ChatbotPage';
import TopicsPage from './components/TopicsPage';
import PracticePage from './components/PracticePage';
import FormulaPage from './components/FormulaPage';
import CalculatorPage from './components/CalculatorPage';
import GraphingPage from './components/GraphingPage';
import AboutPage from './components/AboutPage';
import QuizPage from './components/QuizPage';  

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const navigation = [
    { id: 'home', name: 'Home' },
    { id: 'chatbot', name: 'AI Tutor' },
    { id: 'topics', name: 'Topics' },
    { id: 'practice', name: 'Practice' },
    { id: 'formulas', name: 'Formulas' },
    { id: 'calculator', name: 'Calculator' },
    { id: 'graphing', name: 'Graphing' },
    { id: 'quiz', name: 'Quiz' }, // <-- NEW
    { id: 'about', name: 'About' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage navigateToPage={navigateToPage} />;
      case 'chatbot': return <ChatbotPage />;
      case 'topics': return <TopicsPage />;
      case 'practice': return <PracticePage />;
      case 'formulas': return <FormulaPage />;
      case 'calculator': return <CalculatorPage />;
      case 'graphing': return <GraphingPage />;
      case 'quiz': return <QuizPage />;  // <-- NEW ROUTE
      case 'about': return <AboutPage />;
      default: return <HomePage navigateToPage={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand */}
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              MathMentor
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToPage(item.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-teal-600 text-white shadow-lg transform scale-105'
                        : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/80 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white/5 backdrop-blur-md border-t border-white/10">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-teal-600 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
