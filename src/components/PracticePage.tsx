import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy, Target, BookOpen, Calculator, TrendingUp, BarChart3, Zap, Layers, Brain } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  subcategory: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const PracticePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'foundations', name: 'Foundations', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { id: 'algebra', name: 'Algebra', icon: Calculator, color: 'from-green-500 to-emerald-500' },
    { id: 'geometry', name: 'Geometry & Mensuration', icon: Layers, color: 'from-purple-500 to-pink-500' },
    { id: 'trigonometry', name: 'Trigonometry', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { id: 'calculus', name: 'Calculus', icon: BarChart3, color: 'from-indigo-500 to-blue-500' },
    { id: 'statistics', name: 'Statistics & Probability', icon: BarChart3, color: 'from-teal-500 to-green-500' },
    { id: 'advanced', name: 'Advanced Mathematics', icon: Zap, color: 'from-violet-500 to-purple-500' }
  ];

  const questions: Question[] = [
    // Foundations - Numbers & Numeration
    {
      id: '1',
      category: 'foundations',
      subcategory: 'numbers',
      question: 'Which of the following is an irrational number?',
      options: ['√16', '√25', '√2', '√9'],
      correct: 2,
      explanation: '√2 is irrational because it cannot be expressed as a ratio of two integers. √16 = 4, √25 = 5, √9 = 3 are all rational.',
      difficulty: 'Easy'
    },
    
    // Foundations - Arithmetic
    {
      id: '2',
      category: 'foundations',
      subcategory: 'arithmetic',
      question: 'What is 15% of 240?',
      options: ['36', '30', '42', '45'],
      correct: 0,
      explanation: '15% of 240 = (15/100) × 240 = 0.15 × 240 = 36',
      difficulty: 'Easy'
    },
    
    // Foundations - Fractions & Decimals
    {
      id: '3',
      category: 'foundations',
      subcategory: 'fractions-decimals',
      question: 'Simplify: 3/4 + 2/3',
      options: ['17/12', '5/7', '6/7', '11/12'],
      correct: 0,
      explanation: '3/4 + 2/3 = 9/12 + 8/12 = 17/12 (LCM of 4 and 3 is 12)',
      difficulty: 'Medium'
    },
    
    // Foundations - Ratio & Proportion
    {
      id: '4',
      category: 'foundations',
      subcategory: 'ratio-proportion',
      question: 'If 3:4 = x:20, find x',
      options: ['15', '12', '18', '16'],
      correct: 0,
      explanation: '3/4 = x/20, so x = (3 × 20)/4 = 60/4 = 15',
      difficulty: 'Easy'
    },
    
    // Foundations - Simple & Compound Interest
    {
      id: '5',
      category: 'foundations',
      subcategory: 'interest',
      question: 'Find simple interest on ₹5000 at 8% per annum for 3 years',
      options: ['₹1200', '₹1000', '₹1500', '₹800'],
      correct: 0,
      explanation: 'SI = PRT/100 = (5000 × 8 × 3)/100 = ₹1200',
      difficulty: 'Medium'
    },
    
    // Foundations - Time, Speed & Distance
    {
      id: '6',
      category: 'foundations',
      subcategory: 'time-speed-distance',
      question: 'A car travels 120 km in 2 hours. What is its speed?',
      options: ['60 km/h', '50 km/h', '70 km/h', '80 km/h'],
      correct: 0,
      explanation: 'Speed = Distance/Time = 120/2 = 60 km/h',
      difficulty: 'Easy'
    },

    // Algebra - Linear Equations
    {
      id: '7',
      category: 'algebra',
      subcategory: 'linear-equations',
      question: 'Solve for x: 2x + 5 = 13',
      options: ['x = 4', 'x = 3', 'x = 5', 'x = 6'],
      correct: 0,
      explanation: '2x + 5 = 13 → 2x = 8 → x = 4',
      difficulty: 'Easy'
    },
    
    // Algebra - Quadratic Equations
    {
      id: '8',
      category: 'algebra',
      subcategory: 'quadratic-equations',
      question: 'Find the roots of x² - 5x + 6 = 0',
      options: ['x = 2, 3', 'x = 1, 6', 'x = -2, -3', 'x = 2, -3'],
      correct: 0,
      explanation: 'x² - 5x + 6 = (x-2)(x-3) = 0, so x = 2 or x = 3',
      difficulty: 'Medium'
    },
    
    // Algebra - Polynomials
    {
      id: '9',
      category: 'algebra',
      subcategory: 'polynomials',
      question: 'What is the degree of polynomial 3x⁴ + 2x² - 5x + 1?',
      options: ['4', '3', '2', '1'],
      correct: 0,
      explanation: 'The highest power of x is 4, so the degree is 4',
      difficulty: 'Easy'
    },
    
    // Algebra - Progressions
    {
      id: '10',
      category: 'algebra',
      subcategory: 'progressions',
      question: 'Find the 10th term of AP: 2, 5, 8, 11, ...',
      options: ['29', '32', '35', '26'],
      correct: 0,
      explanation: 'First term a = 2, common difference d = 3. 10th term = a + 9d = 2 + 9(3) = 29',
      difficulty: 'Medium'
    },

    // Geometry - Basic Geometry
    {
      id: '11',
      category: 'geometry',
      subcategory: 'basic-geometry',
      question: 'What is the area of a circle with radius 7 cm?',
      options: ['154 cm²', '44 cm²', '49 cm²', '98 cm²'],
      correct: 0,
      explanation: 'Area = πr² = (22/7) × 7² = 22 × 7 = 154 cm²',
      difficulty: 'Easy'
    },
    
    // Geometry - Coordinate Geometry
    {
      id: '12',
      category: 'geometry',
      subcategory: 'coordinate-geometry',
      question: 'Distance between points (0,0) and (3,4) is:',
      options: ['5', '7', '6', '4'],
      correct: 0,
      explanation: 'Distance = √[(3-0)² + (4-0)²] = √[9+16] = √25 = 5',
      difficulty: 'Medium'
    },
    
    // Geometry - Mensuration
    {
      id: '13',
      category: 'geometry',
      subcategory: 'mensuration',
      question: 'Find the volume of a cube with side 5 cm',
      options: ['125 cm³', '75 cm³', '100 cm³', '150 cm³'],
      correct: 0,
      explanation: 'Volume of cube = side³ = 5³ = 125 cm³',
      difficulty: 'Easy'
    },

    // Trigonometry - Trigonometric Ratios
    {
      id: '14',
      category: 'trigonometry',
      subcategory: 'trig-ratios',
      question: 'What is sin(90°)?',
      options: ['1', '0', '1/2', '√3/2'],
      correct: 0,
      explanation: 'sin(90°) = 1 (standard trigonometric value)',
      difficulty: 'Easy'
    },
    
    {
      id: '15',
      category: 'trigonometry',
      subcategory: 'trig-ratios',
      question: 'If sin θ = 3/5, find cos θ (θ in first quadrant)',
      options: ['4/5', '3/4', '5/4', '5/3'],
      correct: 0,
      explanation: 'Using sin²θ + cos²θ = 1: cos²θ = 1 - (3/5)² = 1 - 9/25 = 16/25, so cos θ = 4/5',
      difficulty: 'Medium'
    },
    
    // Trigonometry - Heights & Distances
    {
      id: '16',
      category: 'trigonometry',
      subcategory: 'heights-distances',
      question: 'A tower casts a shadow of 30m when angle of elevation is 30°. Find height of tower.',
      options: ['10√3 m', '15√3 m', '20√3 m', '30√3 m'],
      correct: 0,
      explanation: 'tan(30°) = height/shadow → 1/√3 = h/30 → h = 30/√3 = 10√3 m',
      difficulty: 'Hard'
    },

    // Calculus - Differentiation
    {
      id: '17',
      category: 'calculus',
      subcategory: 'differentiation',
      question: 'Find d/dx(x³)',
      options: ['3x²', '3x³', 'x²', '3x'],
      correct: 0,
      explanation: 'Using power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x²',
      difficulty: 'Easy'
    },
    
    // Calculus - Integration
    {
      id: '18',
      category: 'calculus',
      subcategory: 'integration',
      question: 'Find ∫2x dx',
      options: ['x² + C', '2x² + C', 'x²/2 + C', '2x + C'],
      correct: 0,
      explanation: '∫2x dx = 2∫x dx = 2(x²/2) + C = x² + C',
      difficulty: 'Medium'
    },
    
    // Calculus - Limits
    {
      id: '19',
      category: 'calculus',
      subcategory: 'limits',
      question: 'Find lim(x→0) (sin x)/x',
      options: ['1', '0', '∞', 'undefined'],
      correct: 0,
      explanation: 'This is a standard limit: lim(x→0) (sin x)/x = 1',
      difficulty: 'Medium'
    },

    // Statistics - Data Handling
    {
      id: '20',
      category: 'statistics',
      subcategory: 'data-handling',
      question: 'Find the mean of: 2, 4, 6, 8, 10',
      options: ['6', '5', '7', '8'],
      correct: 0,
      explanation: 'Mean = (2+4+6+8+10)/5 = 30/5 = 6',
      difficulty: 'Easy'
    },
    
    // Statistics - Probability
    {
      id: '21',
      category: 'statistics',
      subcategory: 'probability-basics',
      question: 'Probability of getting a head when flipping a fair coin:',
      options: ['1/2', '1/3', '1/4', '2/3'],
      correct: 0,
      explanation: 'For a fair coin, P(Head) = favorable outcomes/total outcomes = 1/2',
      difficulty: 'Easy'
    },
    
    // Statistics - Standard Deviation
    {
      id: '22',
      category: 'statistics',
      subcategory: 'deviation-variance',
      question: 'If variance of a dataset is 16, what is the standard deviation?',
      options: ['4', '8', '2', '16'],
      correct: 0,
      explanation: 'Standard deviation = √variance = √16 = 4',
      difficulty: 'Easy'
    },

    // Advanced Mathematics - Matrices
    {
      id: '23',
      category: 'advanced',
      subcategory: 'matrices',
      question: 'What is the determinant of matrix [[2,3],[1,4]]?',
      options: ['5', '8', '7', '6'],
      correct: 0,
      explanation: 'Determinant = (2×4) - (3×1) = 8 - 3 = 5',
      difficulty: 'Medium'
    },
    
    // Advanced Mathematics - Permutations & Combinations
    {
      id: '24',
      category: 'advanced',
      subcategory: 'permutations-combinations',
      question: 'How many ways can 5 people sit in a row?',
      options: ['120', '60', '24', '100'],
      correct: 0,
      explanation: 'Number of arrangements = 5! = 5×4×3×2×1 = 120',
      difficulty: 'Medium'
    },
    
    // Advanced Mathematics - Complex Numbers
    {
      id: '25',
      category: 'advanced',
      subcategory: 'complex-numbers',
      question: 'What is i² (where i is the imaginary unit)?',
      options: ['-1', '1', 'i', '-i'],
      correct: 0,
      explanation: 'By definition, i² = -1, where i is the imaginary unit',
      difficulty: 'Easy'
    },
    
    // Advanced Mathematics - Vectors
    {
      id: '26',
      category: 'advanced',
      subcategory: 'vectors',
      question: 'Find the magnitude of vector (3, 4)',
      options: ['5', '7', '6', '4'],
      correct: 0,
      explanation: 'Magnitude = √(3² + 4²) = √(9 + 16) = √25 = 5',
      difficulty: 'Medium'
    }
  ];

  const filteredQuestions = questions.filter(q => {
    const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const subcategoryMatch = selectedSubcategory === 'all' || q.subcategory === selectedSubcategory;
    return categoryMatch && subcategoryMatch;
  });

  const getSubcategories = () => {
    if (selectedCategory === 'all') return [];
    return [...new Set(questions.filter(q => q.category === selectedCategory).map(q => q.subcategory))];
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === filteredQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
    
    setCompletedQuestions(prev => new Set([...prev, filteredQuestions[currentQuestion].id]));
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuestions(new Set());
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-white bg-slate-500/20 border-slate-500/30';
    }
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">No Questions Available</h2>
          <p className="text-slate-400 text-lg">Select a different category to see practice questions.</p>
        </div>
      </div>
    );
  }

  const current = filteredQuestions[currentQuestion];
  const isCompleted = currentQuestion === filteredQuestions.length - 1 && showResult;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Practice &
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Assessment Hub
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Test your mathematical knowledge with our comprehensive quiz system. 
            Track your progress and identify areas for improvement across all topics.
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-6">Choose Topic Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                resetQuiz();
              }}
              className={`p-4 rounded-2xl font-medium transition-all duration-300 text-center border ${
                selectedCategory === 'all'
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-lg'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/60 border-slate-600/30 hover:border-slate-500/50'
              }`}
            >
              <Target className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">All Topics</span>
            </button>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory('all');
                    resetQuiz();
                  }}
                  className={`p-4 rounded-2xl font-medium transition-all duration-300 text-center border ${
                    selectedCategory === category.id
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-lg'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/60 border-slate-600/30 hover:border-slate-500/50'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategory Selection */}
        {selectedCategory !== 'all' && getSubcategories().length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-4">Choose Subtopic</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedSubcategory('all');
                  resetQuiz();
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-colors border ${
                  selectedSubcategory === 'all'
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/60 border-slate-600/30'
                }`}
              >
                All Subtopics
              </button>
              {getSubcategories().map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => {
                    setSelectedSubcategory(subcategory);
                    resetQuiz();
                  }}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors capitalize border ${
                    selectedSubcategory === subcategory
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/60 border-slate-600/30'
                  }`}
                >
                  {subcategory.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {currentQuestion + 1}/{filteredQuestions.length}
            </div>
            <div className="text-slate-400 font-medium">Question</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{score}</div>
            <div className="text-slate-400 font-medium">Correct</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {Math.round((score / (completedQuestions.size || 1)) * 100)}%
            </div>
            <div className="text-slate-400 font-medium">Accuracy</div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30 text-center">
            <div className={`text-3xl font-bold mb-2 ${getDifficultyColor(current.difficulty).split(' ')[0]}`}>
              {current.difficulty}
            </div>
            <div className="text-slate-400 font-medium">Level</div>
          </div>
        </div>

        {!isCompleted ? (
          /* Question Card */
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-600/30 p-10 mb-10 shadow-2xl">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <span className="bg-indigo-500/20 text-indigo-300 px-6 py-3 rounded-full text-sm font-medium border border-indigo-500/30">
                    {current.category.charAt(0).toUpperCase() + current.category.slice(1)}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getDifficultyColor(current.difficulty)}`}>
                    {current.difficulty}
                  </span>
                </div>
                <div className="text-slate-400 text-sm">
                  {current.subcategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">{current.question}</h2>
            </div>

            <div className="space-y-4 mb-10">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-6 rounded-2xl border transition-all text-left ${
                    showResult
                      ? index === current.correct
                        ? 'bg-green-500/20 border-green-500/50 text-green-300'
                        : index === selectedAnswer && index !== current.correct
                        ? 'bg-red-500/20 border-red-500/50 text-red-300'
                        : 'bg-slate-700/30 border-slate-600/50 text-slate-400'
                      : 'bg-slate-700/30 border-slate-600/50 text-white hover:bg-slate-600/40 hover:border-slate-500/50 hover:scale-[1.02] transform'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center text-lg font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium text-lg">{option}</span>
                    {showResult && index === current.correct && (
                      <CheckCircle className="ml-auto text-green-400" size={24} />
                    )}
                    {showResult && index === selectedAnswer && index !== current.correct && (
                      <XCircle className="ml-auto text-red-400" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-8 mb-10">
                <h3 className="font-bold text-indigo-300 mb-4 text-lg">Explanation:</h3>
                <p className="text-slate-200 leading-relaxed text-lg">{current.explanation}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={resetQuiz}
                className="flex items-center space-x-3 px-8 py-4 bg-slate-600/50 hover:bg-slate-600 text-white rounded-2xl font-medium transition-colors border border-slate-500/50"
              >
                <RefreshCw size={20} />
                <span>Restart Quiz</span>
              </button>

              {showResult && currentQuestion < filteredQuestions.length - 1 && (
                <button
                  onClick={nextQuestion}
                  className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-105 transform shadow-lg"
                >
                  Next Question →
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-600/30 p-16 text-center shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Quiz Complete!</h2>
            <div className="text-8xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              {Math.round((score / filteredQuestions.length) * 100)}%
            </div>
            <p className="text-xl text-slate-300 mb-12">
              You answered {score} out of {filteredQuestions.length} questions correctly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={resetQuiz}
                className="flex items-center justify-center space-x-3 px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-105 transform shadow-lg"
              >
                <RefreshCw size={20} />
                <span>Try Again</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                  resetQuiz();
                }}
                className="px-10 py-4 bg-slate-600/50 hover:bg-slate-600 text-white rounded-2xl font-bold transition-colors border border-slate-500/50"
              >
                Browse All Topics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePage;