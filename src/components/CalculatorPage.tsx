import React, { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

const CalculatorPage = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const performAdvancedOperation = (op: string) => {
    const inputValue = parseFloat(display);
    let result: number;

    switch (op) {
      case 'sqrt':
        result = Math.sqrt(inputValue);
        break;
      case 'square':
        result = inputValue * inputValue;
        break;
      case 'sin':
        result = Math.sin(inputValue * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case '1/x':
        result = 1 / inputValue;
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const Button = ({ 
    children, 
    onClick, 
    className = '', 
    variant = 'default' 
  }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
    variant?: 'default' | 'operation' | 'equals' | 'function' | 'clear';
  }) => {
    const baseClasses = 'p-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95';
    
    const variants = {
      default: 'bg-white/20 hover:bg-white/30 text-white border border-white/30',
      operation: 'bg-blue-600 hover:bg-blue-700 text-white',
      equals: 'bg-green-600 hover:bg-green-700 text-white',
      function: 'bg-purple-600 hover:bg-purple-700 text-white text-sm',
      clear: 'bg-red-600 hover:bg-red-700 text-white'
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Scientific Calculator</h1>
          <p className="text-white/70 text-lg">
            Advanced calculator with trigonometric, logarithmic, and algebraic functions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            {/* Display */}
            <div className="mb-6">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/50 mb-2">
                <div className="text-right text-3xl font-mono text-white break-all">
                  {display}
                </div>
                {operation && previousValue !== null && (
                  <div className="text-right text-sm text-white/50 mt-1">
                    {previousValue} {operation}
                  </div>
                )}
              </div>
            </div>

            {/* Scientific Functions */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <Button variant="function" onClick={() => performAdvancedOperation('sin')}>sin</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('cos')}>cos</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('tan')}>tan</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('log')}>log</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('ln')}>ln</Button>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-4">
              <Button variant="function" onClick={() => performAdvancedOperation('sqrt')}>√x</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('square')}>x²</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('1/x')}>1/x</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('pi')}>π</Button>
              <Button variant="function" onClick={() => performAdvancedOperation('e')}>e</Button>
            </div>

            {/* Basic Calculator */}
            <div className="grid grid-cols-4 gap-3">
              <Button variant="clear" onClick={clear}>
                <RotateCcw size={20} />
              </Button>
              <Button variant="clear" onClick={deleteLastDigit}>
                <Delete size={20} />
              </Button>
              <Button variant="operation" onClick={() => performOperation('/')} className="col-span-2">÷</Button>

              <Button onClick={() => inputNumber('7')}>7</Button>
              <Button onClick={() => inputNumber('8')}>8</Button>
              <Button onClick={() => inputNumber('9')}>9</Button>
              <Button variant="operation" onClick={() => performOperation('*')}>×</Button>

              <Button onClick={() => inputNumber('4')}>4</Button>
              <Button onClick={() => inputNumber('5')}>5</Button>
              <Button onClick={() => inputNumber('6')}>6</Button>
              <Button variant="operation" onClick={() => performOperation('-')}>−</Button>

              <Button onClick={() => inputNumber('1')}>1</Button>
              <Button onClick={() => inputNumber('2')}>2</Button>
              <Button onClick={() => inputNumber('3')}>3</Button>
              <Button variant="operation" onClick={() => performOperation('+')}>+</Button>

              <Button onClick={() => inputNumber('0')} className="col-span-2">0</Button>
              <Button onClick={inputDecimal}>.</Button>
              <Button variant="equals" onClick={performEquals}>=</Button>
            </div>
          </div>

          {/* Math Help */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Reference</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Trigonometric Functions</h4>
                  <p className="text-white/70 text-sm">
                    sin, cos, tan functions work with angles in degrees
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Logarithms</h4>
                  <p className="text-white/70 text-sm">
                    log = log₁₀ (base 10), ln = natural logarithm (base e)
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Constants</h4>
                  <p className="text-white/70 text-sm">
                    π ≈ 3.14159, e ≈ 2.71828
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Special Operations</h4>
                  <p className="text-white/70 text-sm">
                    √x = square root, x² = square, 1/x = reciprocal
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Example Calculations</h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800/50 rounded p-3 border border-gray-600/50">
                  <code className="text-blue-300">sin(30) = 0.5</code>
                  <p className="text-white/70 mt-1">Sine of 30 degrees</p>
                </div>

                <div className="bg-gray-800/50 rounded p-3 border border-gray-600/50">
                  <code className="text-blue-300">√(16) = 4</code>
                  <p className="text-white/70 mt-1">Square root of 16</p>
                </div>

                <div className="bg-gray-800/50 rounded p-3 border border-gray-600/50">
                  <code className="text-blue-300">log(100) = 2</code>
                  <p className="text-white/70 mt-1">Log base 10 of 100</p>
                </div>

                <div className="bg-gray-800/50 rounded p-3 border border-gray-600/50">
                  <code className="text-blue-300">5² = 25</code>
                  <p className="text-white/70 mt-1">5 squared</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;