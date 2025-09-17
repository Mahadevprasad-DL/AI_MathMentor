import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Calculator, TrendingUp, BarChart3, Zap, Target, Layers } from 'lucide-react';

interface Subtopic {
  id: string;
  title: string;
  content: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  subtopics: Subtopic[];
}

const TopicsPage = () => {
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const topics: Topic[] = [
    {
      id: 'foundations',
      title: 'A. Foundations',
      description: 'Essential mathematical building blocks and fundamental concepts',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      subtopics: [
        {
          id: 'numbers',
          title: 'Numbers & Numeration',
          content: 'Understanding different number systems: natural numbers, whole numbers, integers, rational and irrational numbers. Place value, number representation in different bases, and number properties.'
        },
        {
          id: 'arithmetic',
          title: 'Arithmetic (Addition, Subtraction, Multiplication, Division)',
          content: 'Fundamental operations with whole numbers, integers, fractions, and decimals. Order of operations (BODMAS/PEMDAS), properties of operations, and mental math techniques.'
        },
        {
          id: 'factors-multiples',
          title: 'Factors, Multiples, HCF & LCM',
          content: 'Finding factors and multiples of numbers. Highest Common Factor (HCF) and Least Common Multiple (LCM) using prime factorization, division method, and Euclidean algorithm.'
        },
        {
          id: 'fractions-decimals',
          title: 'Fractions & Decimals',
          content: 'Converting between fractions and decimals, operations with fractions, equivalent fractions, mixed numbers, decimal place value, and recurring decimals.'
        },
        {
          id: 'ratio-proportion',
          title: 'Ratio & Proportion',
          content: 'Understanding ratios, proportions, and their applications. Direct and inverse proportions, scaling, unitary method, and solving proportion problems in real-world contexts.'
        },
        {
          id: 'percentages',
          title: 'Percentages',
          content: 'Converting between percentages, fractions, and decimals. Calculating percentage increase/decrease, finding percentages of quantities, and percentage applications in finance.'
        },
        {
          id: 'averages',
          title: 'Averages',
          content: 'Mean, median, and mode calculations. Weighted averages, finding missing values when average is given, and applications in statistics and real-world problems.'
        },
        {
          id: 'interest',
          title: 'Simple & Compound Interest',
          content: 'Calculating simple interest: SI = PRT/100. Compound interest formulas, difference between SI and CI, compound interest for different compounding periods, and practical applications.'
        },
        {
          id: 'profit-loss',
          title: 'Profit, Loss & Discount',
          content: 'Cost price, selling price, profit and loss percentages. Discount calculations, marked price, successive discounts, and business mathematics applications.'
        },
        {
          id: 'time-speed-distance',
          title: 'Time, Speed & Distance',
          content: 'Relationship between time, speed, and distance. Relative speed, average speed, problems involving trains, boats, circular tracks, and motion in different directions.'
        },
        {
          id: 'time-work',
          title: 'Time & Work',
          content: 'Work rate problems, efficiency calculations, time taken by individuals and groups, pipes and cisterns problems, and work completion scenarios with multiple workers.'
        }
      ]
    },
    {
      id: 'algebra',
      title: 'B. Algebra',
      description: 'Symbolic mathematics and equation solving techniques',
      icon: Calculator,
      color: 'from-green-500 to-emerald-500',
      subtopics: [
        {
          id: 'expressions',
          title: 'Algebraic Expressions & Identities',
          content: 'Variables, constants, terms, and coefficients. Standard algebraic identities: (a+b)², (a-b)², (a+b)(a-b), (a+b)³, (a-b)³, and their applications in simplification and factorization.'
        },
        {
          id: 'linear-equations',
          title: 'Linear Equations (1 & 2 variables)',
          content: 'Solving linear equations in one variable. Systems of linear equations in two variables using substitution, elimination, cross-multiplication, and graphical methods.'
        },
        {
          id: 'quadratic-equations',
          title: 'Quadratic Equations',
          content: 'Standard form ax² + bx + c = 0. Solving by factoring, completing the square, and quadratic formula. Nature of roots, discriminant, and real-world applications.'
        },
        {
          id: 'polynomials',
          title: 'Polynomials',
          content: 'Degree of polynomials, operations with polynomials, remainder theorem, factor theorem, polynomial division, and finding zeros of polynomials.'
        },
        {
          id: 'progressions',
          title: 'Progressions (AP, GP, HP)',
          content: 'Arithmetic Progression: nth term and sum formulas. Geometric Progression: common ratio, nth term, sum to n terms, and infinite GP. Harmonic Progression basics and relationships.'
        },
        {
          id: 'inequalities',
          title: 'Inequalities',
          content: 'Linear inequalities in one and two variables. Graphical representation, solution sets, quadratic inequalities, and applications in optimization problems.'
        }
      ]
    },
    {
      id: 'geometry',
      title: 'C. Geometry & Mensuration',
      description: 'Shapes, spatial relationships, and measurement calculations',
      icon: Layers,
      color: 'from-purple-500 to-pink-500',
      subtopics: [
        {
          id: 'basic-geometry',
          title: 'Lines, Angles, Triangles & Circles',
          content: 'Properties of lines and angles, parallel lines and transversals, triangle congruence and similarity, Pythagoras theorem, circle theorems, tangents, chords, and cyclic quadrilaterals.'
        },
        {
          id: 'coordinate-geometry',
          title: 'Coordinate Geometry',
          content: 'Distance formula, section formula, area of triangles and quadrilaterals, equation of lines, slope and intercepts, and basic conic sections (circle, parabola, ellipse, hyperbola).'
        },
        {
          id: 'polygons',
          title: 'Properties of Polygons & Quadrilaterals',
          content: 'Interior and exterior angles of polygons, properties of parallelograms, rectangles, squares, rhombus, trapeziums, and special quadrilaterals with their area formulas.'
        },
        {
          id: '3d-geometry',
          title: '3D Geometry (Lines & Planes in 3D)',
          content: 'Direction cosines and ratios, equation of lines and planes in 3D space, angle between lines and planes, distance formulas in 3D, and vector applications in geometry.'
        },
        {
          id: 'mensuration',
          title: 'Mensuration (Perimeter, Area, Surface Area, Volume)',
          content: 'Perimeter and area of 2D shapes. Surface area and volume of 3D solids: cube, cuboid, cylinder, cone, sphere, hemisphere, frustum, and composite figures.'
        }
      ]
    },
    {
      id: 'trigonometry',
      title: 'D. Trigonometry',
      description: 'Relationships between angles and sides in triangles',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      subtopics: [
        {
          id: 'trig-ratios',
          title: 'Trigonometric Ratios & Identities',
          content: 'Basic ratios: sin, cos, tan, cosec, sec, cot. Fundamental identities, complementary angles, trigonometric values of standard angles (0°, 30°, 45°, 60°, 90°), and compound angle formulas.'
        },
        {
          id: 'heights-distances',
          title: 'Heights & Distances',
          content: 'Applications of trigonometry in finding heights and distances. Angle of elevation and depression problems, solving triangles, and real-world applications in surveying and navigation.'
        },
        {
          id: 'inverse-trig',
          title: 'Inverse Trigonometric Functions',
          content: 'Definition and properties of inverse trigonometric functions (arcsin, arccos, arctan). Domain, range, principal values, and solving trigonometric equations.'
        }
      ]
    },
    {
      id: 'calculus',
      title: 'E. Calculus',
      description: 'Study of continuous change through limits, derivatives, and integrals',
      icon: BarChart3,
      color: 'from-indigo-500 to-blue-500',
      subtopics: [
        {
          id: 'limits',
          title: 'Limits & Continuity',
          content: 'Concept of limits, evaluation techniques, L\'Hôpital\'s rule, continuity of functions, types of discontinuities, and intermediate value theorem.'
        },
        {
          id: 'differentiation',
          title: 'Differentiation',
          content: 'Derivative as rate of change, differentiation rules, chain rule, product rule, quotient rule, implicit differentiation, and derivatives of inverse functions.'
        },
        {
          id: 'applications-derivatives',
          title: 'Applications of Derivatives (Maxima, Minima, Tangents, Normals)',
          content: 'Finding maxima and minima, critical points, rate of change problems, tangents and normals to curves, optimization problems, and curve sketching.'
        },
        {
          id: 'integration',
          title: 'Integration (Indefinite & Definite)',
          content: 'Antiderivatives, basic integration rules, substitution method, integration by parts, partial fractions, definite integrals, and applications in finding areas and volumes.'
        },
        {
          id: 'differential-equations',
          title: 'Differential Equations',
          content: 'First-order differential equations, separable equations, linear differential equations, homogeneous equations, and their applications in physics and engineering.'
        }
      ]
    },
    {
      id: 'statistics',
      title: 'F. Statistics & Probability',
      description: 'Data analysis, interpretation, and probability theory',
      icon: BarChart3,
      color: 'from-teal-500 to-green-500',
      subtopics: [
        {
          id: 'data-handling',
          title: 'Data Handling (Mean, Median, Mode)',
          content: 'Measures of central tendency for grouped and ungrouped data, frequency distributions, histograms, cumulative frequency, and data representation methods.'
        },
        {
          id: 'deviation-variance',
          title: 'Standard Deviation & Variance',
          content: 'Measures of dispersion, calculating variance and standard deviation for grouped and ungrouped data, coefficient of variation, and interpretation of spread.'
        },
        {
          id: 'probability-basics',
          title: 'Probability (Classical & Modern)',
          content: 'Basic probability concepts, sample space, events, conditional probability, Bayes\' theorem, independent events, and probability rules and theorems.'
        },
        {
          id: 'distributions',
          title: 'Probability Distributions (Binomial, Poisson, Normal)',
          content: 'Discrete and continuous probability distributions, binomial distribution, Poisson distribution, normal distribution, their properties, and real-world applications.'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'G. Advanced Mathematics',
      description: 'Higher-level mathematical concepts and specialized topics',
      icon: Zap,
      color: 'from-violet-500 to-purple-500',
      subtopics: [
        {
          id: 'matrices',
          title: 'Matrices & Determinants',
          content: 'Matrix operations, types of matrices (square, diagonal, identity, etc.), determinants, properties of determinants, inverse of matrices, and solving systems using matrices.'
        },
        {
          id: 'vectors',
          title: 'Vectors',
          content: 'Vector representation, addition, scalar multiplication, dot product, cross product, vector equations of lines and planes, and applications in geometry and physics.'
        },
        {
          id: 'complex-numbers',
          title: 'Complex Numbers',
          content: 'Imaginary numbers, complex plane, operations with complex numbers, modulus and argument, polar form, De Moivre\'s theorem, and roots of complex numbers.'
        },
        {
          id: 'permutations-combinations',
          title: 'Permutations & Combinations',
          content: 'Fundamental counting principle, permutations with and without repetition, combinations, circular permutations, and applications in probability and statistics.'
        },
        {
          id: 'set-theory',
          title: 'Set Theory & Relations',
          content: 'Set operations, Venn diagrams, relations and functions, types of functions (one-one, onto, bijective), composition of functions, and inverse functions.'
        },
        {
          id: 'logic',
          title: 'Logic & Boolean Algebra',
          content: 'Logical statements, truth tables, logical connectives (AND, OR, NOT), Boolean algebra operations, laws of Boolean algebra, and applications in computer science.'
        },
        {
          id: 'linear-programming',
          title: 'Linear Programming',
          content: 'Formulating linear programming problems, graphical method for two variables, feasible region, optimal solutions, simplex method basics, and optimization applications.'
        },
        {
          id: 'numerical-methods',
          title: 'Numerical Methods',
          content: 'Numerical solutions of equations (bisection, Newton-Raphson), interpolation methods, numerical integration (trapezoidal, Simpson\'s rule), and error analysis.'
        },
        {
          id: 'graph-theory',
          title: 'Graph Theory (Basics)',
          content: 'Graphs, vertices, edges, types of graphs (directed, undirected, weighted), paths, cycles, trees, graph traversal algorithms, and basic graph properties.'
        },
        {
          id: 'discrete-math',
          title: 'Discrete Mathematics (Functions, Counting, Recurrence Relations)',
          content: 'Discrete functions, counting techniques, pigeonhole principle, recurrence relations, mathematical induction, generating functions, and discrete structures.'
        }
      ]
    }
  ];

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

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
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Mathematics Learning
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Curriculum
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive mathematical curriculum designed to take you from foundational concepts 
            to advanced theories. Each section contains detailed explanations, examples, and practical applications.
          </p>
        </div>

        <div className="space-y-8">
          {topics.map((topic, index) => {
            const IconComponent = topic.icon;
            const isExpanded = expandedTopics.includes(topic.id);
            return (
              <div
                key={topic.id}
                className="bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-600/30 overflow-hidden shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-8 text-left hover:bg-slate-700/30 transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${topic.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                        {topic.title}
                      </h2>
                      <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                        {topic.description}
                      </p>
                      <div className="mt-4 flex items-center space-x-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {topic.subtopics.length} Topics
                        </span>
                        <span className="text-slate-500 text-sm">
                          Click to {isExpanded ? 'collapse' : 'expand'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${isExpanded ? 'bg-indigo-500/20 rotate-90' : 'group-hover:bg-slate-600/50'}`}>
                      <ChevronRight className={`text-slate-400 group-hover:text-indigo-300 transition-colors ${isExpanded ? 'rotate-90' : ''}`} size={28} />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-600/30 bg-slate-900/30">
                    <div className="grid md:grid-cols-2 gap-1">
                      {topic.subtopics.map((subtopic, subIndex) => (
                        <div 
                          key={subtopic.id} 
                          className="p-8 border-b border-slate-600/20 last:border-b-0 md:border-r md:last:border-r-0 md:odd:border-r hover:bg-slate-700/20 transition-colors duration-300 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                              <span className="text-indigo-400 font-bold text-sm">{subIndex + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-4 leading-tight group-hover:text-indigo-300 transition-colors">
                                {subtopic.title}
                              </h3>
                              <p className="text-slate-300 leading-relaxed text-sm">
                                {subtopic.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-20 p-10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl border border-indigo-500/20 text-center backdrop-blur-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-6">Need Personalized Help?</h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
            Can't find what you're looking for? Our intelligent AI tutor can provide personalized explanations, 
            step-by-step solutions, and answer specific questions about any mathematical concept.
          </p>
          <p className=" text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ">
            MathMentor AI Tutor
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;