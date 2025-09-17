import React, { useState, useRef, useEffect } from 'react';
import { Calculator, TrendingUp, RotateCcw, Copy, Info } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export default function GraphingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [equation, setEquation] = useState('x^2');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [showGrid, setShowGrid] = useState(true);
  const [error, setError] = useState('');

  const exampleFunctions = [
    { name: 'Quadratic', equation: 'x^2', description: 'Basic parabola' },
    { name: 'Cubic', equation: 'x^3 - 3*x', description: 'Cubic function' },
    { name: 'Sine Wave', equation: 'sin(x)', description: 'Trigonometric function' },
    { name: 'Cosine Wave', equation: 'cos(x)', description: 'Trigonometric function' },
    { name: 'Exponential', equation: 'exp(x/2)', description: 'Exponential growth' },
    { name: 'Logarithm', equation: 'log(x)', description: 'Natural logarithm' },
    { name: 'Absolute', equation: 'abs(x)', description: 'Absolute value' },
    { name: 'Square Root', equation: 'sqrt(x)', description: 'Square root function' }
  ];

  const evaluateFunction = (x: number, expr: string): number => {
    try {
      // Replace mathematical functions and operators
      let processedExpr = expr
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log')
        .replace(/exp/g, 'Math.exp')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/x/g, x.toString());

      // Evaluate the expression
      const result = Function('"use strict"; return (' + processedExpr + ')')();
      return isNaN(result) ? NaN : result;
    } catch {
      return NaN;
    }
  };

  const generatePoints = (): Point[] => {
    const points: Point[] = [];
    const step = (xMax - xMin) / 800;
    
    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluateFunction(x, equation);
      if (!isNaN(y) && isFinite(y)) {
        points.push({ x, y });
      }
    }
    return points;
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    const width = canvas.width;
    const height = canvas.height;
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    const xScale = width / xRange;
    const yScale = height / yRange;

    // Convert math coordinates to canvas coordinates
    const toCanvasX = (x: number) => (x - xMin) * xScale;
    const toCanvasY = (y: number) => height - (y - yMin) * yScale;

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = Math.ceil(xMin); x <= xMax; x++) {
        const canvasX = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = Math.ceil(yMin); y <= yMax; y++) {
        const canvasY = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(width, canvasY);
        ctx.stroke();
      }
    }

    // Draw axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const y0 = toCanvasY(0);
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(width, y0);
      ctx.stroke();
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const x0 = toCanvasX(0);
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, height);
      ctx.stroke();
    }

    // Draw function
    try {
      const points = generatePoints();
      if (points.length > 0) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();

        let isFirstPoint = true;
        for (const point of points) {
          const canvasX = toCanvasX(point.x);
          const canvasY = toCanvasY(point.y);

          if (canvasY >= 0 && canvasY <= height) {
            if (isFirstPoint) {
              ctx.moveTo(canvasX, canvasY);
              isFirstPoint = false;
            } else {
              ctx.lineTo(canvasX, canvasY);
            }
          } else {
            isFirstPoint = true;
          }
        }
        ctx.stroke();
        setError('');
      }
    } catch (err) {
      setError('Invalid equation. Please check your syntax.');
    }

    // Draw axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x !== 0) {
        const canvasX = toCanvasX(x);
        const canvasY = yMin <= 0 && yMax >= 0 ? toCanvasY(0) + 15 : height - 5;
        ctx.fillText(x.toString(), canvasX, canvasY);
      }
    }

    // Y-axis labels
    ctx.textAlign = 'left';
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y !== 0) {
        const canvasX = xMin <= 0 && xMax >= 0 ? toCanvasX(0) + 5 : 5;
        const canvasY = toCanvasY(y) + 4;
        ctx.fillText(y.toString(), canvasX, canvasY);
      }
    }
  };

  useEffect(() => {
    drawGraph();
  }, [equation, xMin, xMax, yMin, yMax, showGrid]);

  const resetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
    setEquation('x^2');
    setError('');
  };

  const copyEquation = () => {
    navigator.clipboard.writeText(equation);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-teal-600 p-3 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
            Function Graphing Tool
          </h1>
          <p className="text-gray-300 text-lg">
            Visualize mathematical functions with interactive plotting
          </p>
        </div>

        {/* Example Functions */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Example Functions</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
              {exampleFunctions.map((func, index) => (
                <button
                  key={index}
                  onClick={() => setEquation(func.equation)}
                  className="flex-shrink-0 w-60 text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                >
                  <div className="text-white font-medium">{func.name}</div>
                  <div className="text-cyan-300 text-sm font-mono">{func.equation}</div>
                  <div className="text-gray-400 text-xs">{func.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Function Input */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Function Input
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter Function: f(x) =
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., x^2, sin(x), log(x)"
                    />
                    <button
                      onClick={copyEquation}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Range Controls */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Range Settings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">X Min</label>
                  <input
                    type="number"
                    value={xMin}
                    onChange={(e) => setXMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">X Max</label>
                  <input
                    type="number"
                    value={xMax}
                    onChange={(e) => setXMax(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Y Min</label>
                  <input
                    type="number"
                    value={yMin}
                    onChange={(e) => setYMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Y Max</label>
                  <input
                    type="number"
                    value={yMax}
                    onChange={(e) => setYMax(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="mr-2 rounded"
                  />
                  Show Grid
                </label>
                <button
                  onClick={resetView}
                  className="flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* Syntax Help */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Syntax Guide
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Power:</span>
                  <code className="text-cyan-300">x^2, x^3</code>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Trigonometry:</span>
                  <code className="text-cyan-300">sin(x), cos(x), tan(x)</code>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Logarithm:</span>
                  <code className="text-cyan-300">log(x)</code>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Exponential:</span>
                  <code className="text-cyan-300">exp(x)</code>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Square Root:</span>
                  <code className="text-cyan-300">sqrt(x)</code>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Absolute:</span>
                  <code className="text-cyan-300">abs(x)</code>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Constants:</span>
                  <code className="text-cyan-300">pi, e</code>
                </div>
              </div>
            </div>
          </div>

          {/* Graph Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Graph Visualization</h3>
                <div className="text-sm text-gray-300">
                  f(x) = <span className="text-cyan-300 font-mono">{equation}</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-auto border border-white/20 rounded-lg"
                />
              </div>

              <div className="mt-4 text-center text-gray-300 text-sm">
                <p>Interactive graphing tool - Modify the function and range to explore different mathematical relationships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}