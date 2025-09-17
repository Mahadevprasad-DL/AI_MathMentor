import React, { useState } from 'react';
import { Search, Copy, Check, Calculator, BookOpen } from 'lucide-react';

interface Formula {
  id: string;
  name: string;
  formula: string;
  category: string;
  description: string;
}

const formulas: Formula[] = [
  // Algebra
  { id: '1', name: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / 2a', category: 'Algebra', description: 'Solves quadratic equations ax² + bx + c = 0' },
  { id: '2', name: 'Difference of Squares', formula: 'a² - b² = (a + b)(a - b)', category: 'Algebra', description: 'Factorization of difference of squares' },
  { id: '3', name: 'Perfect Square', formula: '(a ± b)² = a² ± 2ab + b²', category: 'Algebra', description: 'Expansion of perfect square binomials' },
  { id: '4', name: 'Sum of Arithmetic Series', formula: 'S = n/2 × (2a + (n-1)d)', category: 'Algebra', description: 'Sum of arithmetic progression' },
  { id: '5', name: 'Sum of Geometric Series', formula: 'S = a(1 - rⁿ) / (1 - r)', category: 'Algebra', description: 'Sum of geometric progression' },

  // Geometry
  { id: '6', name: 'Area of Circle', formula: 'A = πr²', category: 'Geometry', description: 'Area of a circle with radius r' },
  { id: '7', name: 'Circumference of Circle', formula: 'C = 2πr', category: 'Geometry', description: 'Perimeter of a circle' },
  { id: '8', name: 'Area of Triangle', formula: 'A = ½ × base × height', category: 'Geometry', description: 'Area using base and height' },
  { id: '9', name: 'Pythagorean Theorem', formula: 'a² + b² = c²', category: 'Geometry', description: 'Relationship in right triangles' },
  { id: '10', name: 'Volume of Sphere', formula: 'V = (4/3)πr³', category: 'Geometry', description: 'Volume of a sphere with radius r' },
  { id: '11', name: 'Surface Area of Sphere', formula: 'SA = 4πr²', category: 'Geometry', description: 'Surface area of a sphere' },
  { id: '12', name: 'Volume of Cylinder', formula: 'V = πr²h', category: 'Geometry', description: 'Volume of a cylinder' },

  // Trigonometry
  { id: '13', name: 'Sine Rule', formula: 'a/sin(A) = b/sin(B) = c/sin(C)', category: 'Trigonometry', description: 'Relationship between sides and angles in triangles' },
  { id: '14', name: 'Cosine Rule', formula: 'c² = a² + b² - 2ab cos(C)', category: 'Trigonometry', description: 'Generalization of Pythagorean theorem' },
  { id: '15', name: 'Pythagorean Identity', formula: 'sin²θ + cos²θ = 1', category: 'Trigonometry', description: 'Fundamental trigonometric identity' },
  { id: '16', name: 'Tangent Identity', formula: 'tan θ = sin θ / cos θ', category: 'Trigonometry', description: 'Definition of tangent function' },
  { id: '17', name: 'Double Angle (Sine)', formula: 'sin(2θ) = 2sin θ cos θ', category: 'Trigonometry', description: 'Double angle formula for sine' },
  { id: '18', name: 'Double Angle (Cosine)', formula: 'cos(2θ) = cos²θ - sin²θ', category: 'Trigonometry', description: 'Double angle formula for cosine' },

  // Calculus
  { id: '19', name: 'Power Rule', formula: 'd/dx(xⁿ) = nxⁿ⁻¹', category: 'Calculus', description: 'Derivative of power functions' },
  { id: '20', name: 'Product Rule', formula: 'd/dx(uv) = u\'v + uv\'', category: 'Calculus', description: 'Derivative of product of functions' },
  { id: '21', name: 'Chain Rule', formula: 'd/dx(f(g(x))) = f\'(g(x)) × g\'(x)', category: 'Calculus', description: 'Derivative of composite functions' },
  { id: '22', name: 'Integration by Parts', formula: '∫u dv = uv - ∫v du', category: 'Calculus', description: 'Integration technique for products' },
  { id: '23', name: 'Fundamental Theorem', formula: '∫ₐᵇ f\'(x)dx = f(b) - f(a)', category: 'Calculus', description: 'Connects derivatives and integrals' },

  // Statistics
  { id: '24', name: 'Mean', formula: 'μ = Σx / n', category: 'Statistics', description: 'Average of a dataset' },
  { id: '25', name: 'Standard Deviation', formula: 'σ = √(Σ(x - μ)² / n)', category: 'Statistics', description: 'Measure of data spread' },
  { id: '26', name: 'Variance', formula: 'σ² = Σ(x - μ)² / n', category: 'Statistics', description: 'Square of standard deviation' },
  { id: '27', name: 'Probability', formula: 'P(A) = Number of favorable outcomes / Total outcomes', category: 'Statistics', description: 'Basic probability formula' },
  { id: '28', name: 'Combination', formula: 'C(n,r) = n! / (r!(n-r)!)', category: 'Statistics', description: 'Number of ways to choose r items from n' },
  { id: '29', name: 'Permutation', formula: 'P(n,r) = n! / (n-r)!', category: 'Statistics', description: 'Number of ways to arrange r items from n' },

  // Advanced Mathematics
  { id: '30', name: 'Euler\'s Formula', formula: 'e^(iθ) = cos θ + i sin θ', category: 'Advanced', description: 'Connects exponential and trigonometric functions' },
  { id: '31', name: 'Determinant (2x2)', formula: '|A| = ad - bc', category: 'Advanced', description: 'Determinant of 2x2 matrix' },
  { id: '32', name: 'Distance Formula', formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)', category: 'Advanced', description: 'Distance between two points' },
  { id: '33', name: 'Compound Interest', formula: 'A = P(1 + r/n)^(nt)', category: 'Advanced', description: 'Compound interest calculation' },
  { id: '34', name: 'Binomial Theorem', formula: '(a + b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ', category: 'Advanced', description: 'Expansion of binomial expressions' }
];

const categories = ['All', 'Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics', 'Advanced'];

export default function FormulaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = formulas.filter(formula => {
    const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formula.formula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || formula.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (formula: string, id: string) => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy formula:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-cyan-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Formula Reference
            </h1>
          </div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Quick access to essential mathematical formulas across all topics
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search formulas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-teal-600 text-white shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-slate-400">
          <p>
            Showing {filteredFormulas.length} formula{filteredFormulas.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Formulas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormulas.map((formula) => (
            <div
              key={formula.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {formula.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-cyan-800/50 text-cyan-200 text-xs font-medium rounded-full">
                      {formula.category}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(formula.formula, formula.id)}
                    className="p-2 text-white/60 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-all"
                    title="Copy formula"
                  >
                    {copiedId === formula.id ? (
                      <Check className="w-4 h-4 text-lime-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="bg-white/5 rounded-lg p-4 mb-3">
                  <code className="text-lg font-mono text-cyan-300 break-all">
                    {formula.formula}
                  </code>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {formula.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFormulas.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No formulas found</h3>
            <p className="text-slate-400">
              Try adjusting your search terms or selecting a different category.
            </p>
          </div>
        )}

        {/* Quick Reference */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-cyan-500" />
            Quick Reference Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-cyan-500/10 rounded-lg p-4">
              <h3 className="font-semibold text-cyan-200 mb-2">Algebra Basics</h3>
              <ul className="text-sm text-cyan-300 space-y-1">
                <li>• Quadratic equations</li>
                <li>• Factorization</li>
                <li>• Progressions</li>
              </ul>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4">
              <h3 className="font-semibold text-green-200 mb-2">Geometry</h3>
              <ul className="text-sm text-green-300 space-y-1">
                <li>• Area & perimeter</li>
                <li>• Volume formulas</li>
                <li>• Coordinate geometry</li>
              </ul>
            </div>
            <div className="bg-teal-500/10 rounded-lg p-4">
              <h3 className="font-semibold text-teal-200 mb-2">Calculus</h3>
              <ul className="text-sm text-teal-300 space-y-1">
                <li>• Differentiation rules</li>
                <li>• Integration techniques</li>
                <li>• Limits & continuity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}