import React, { useState, useEffect } from "react";

const topics = [
  "Arithmetic",
  "Algebra",
  "Geometry",
  "Trigonometry",
  "Calculus",
  "Probability",
  "Number Theory",
  "Fractions",
  "Percentage",
  "Matrices",
  "Derivatives",
  "Integration",
  "Logic",
  "Statistics",
  "Linear Equations",
];

// Decode OpenTDB special character formatting
const decodeText = (text: string) => {
  const element = document.createElement("textarea");
  element.innerHTML = text;
  return element.value;
};

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  const API_URL = "https://opentdb.com/api.php?amount=20&category=19&type=multiple";

  // Fetch quiz when topic selected
  useEffect(() => {
    if (!selectedTopic) return;

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.results.length === 0) {
          alert("⚠️ No questions available.");
          return;
        }

        const formatted = data.results.map((q: Question) => ({
          question: decodeText(q.question),
          correct_answer: decodeText(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(a => decodeText(a)),
        }));

        setQuestions(formatted);
        setCurrentIndex(0);
        setScore(0);
        setQuizEnded(false);

        setOptions(shuffle([
          formatted[0].correct_answer,
          ...formatted[0].incorrect_answers,
        ]));
      });
  }, [selectedTopic]);

  const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer: string) => {
    const correct = questions[currentIndex].correct_answer;
    if (answer === correct) setScore(score + 1);

    const next = currentIndex + 1;

    if (next < questions.length) {
      setCurrentIndex(next);
      setOptions(
        shuffle([
          questions[next].correct_answer,
          ...questions[next].incorrect_answers,
        ])
      );
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setQuizEnded(true);

    // Trigger confetti animation
    createConfetti();
  };

  const resetQuiz = () => {
    setQuizEnded(false);
    setSelectedTopic(null);
    setQuestions([]);
    setScore(0);
    setCurrentIndex(0);
  };

  // Confetti blast effect without npm
  const createConfetti = () => {
    for (let i = 0; i < 100; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.animationDuration = 2 + Math.random() * 3 + "s";
      document.body.appendChild(piece);

      setTimeout(() => piece.remove(), 5000);
    }
  };

  return (
    <div className="flex h-full bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6 border-r border-white/20">
        <h2 className="text-xl font-bold mb-4">📚 Topics</h2>
        {topics.map(topic => (
          <button
            key={topic}
            className={`w-full px-4 py-2 mb-2 rounded-lg text-left transition ${
              selectedTopic === topic
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                : "hover:bg-white/10 text-white/70"
            }`}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative">

        {/* If STOP clicked → show final screen */}
        {quizEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-slate-900/60 backdrop-blur-lg">
            <h1 className="text-6xl font-extrabold text-green-400 animate-bounce">
              🎉 Your Score: {score}/{questions.length}
            </h1>

            <button
              className="mt-10 px-8 py-4 bg-blue-600 text-xl rounded-xl hover:bg-blue-700 transition"
              onClick={resetQuiz}
            >
              Restart Quiz
            </button>
          </div>
        )}

        {/* Topic Not Selected */}
        {!selectedTopic && (
          <h2 className="text-center text-2xl text-white/60 mt-20">
            👉 Select a topic to begin
          </h2>
        )}

        {/* Quiz UI */}
        {selectedTopic && questions.length > 0 && !quizEnded && (
          <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-xl shadow-lg border border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                {selectedTopic} Quiz
              </h2>

              <button
                onClick={endQuiz}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg"
              >
                ⛔ Stop Quiz
              </button>
            </div>

            <p className="text-lg mb-4">Question {currentIndex + 1} / {questions.length}</p>

            <p className="text-xl mb-6">{questions[currentIndex].question}</p>

            <div className="grid gap-3">
              {options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(opt)}
                  className="px-6 py-3 bg-white/5 border border-white/20 rounded-xl hover:bg-white/20 transition"
                >
                  {opt}
                </button>
              ))}
            </div>

            <p className="mt-6 text-lg text-green-400 font-semibold">Score: {score}</p>
          </div>
        )}
      </main>

      {/* Confetti Styles */}
      <style>{`
        .confetti {
          position: fixed;
          top: -10px;
          width: 10px;
          height: 10px;
          background: hsl(${Math.random() * 360}, 100%, 50%);
          animation: fall linear forwards;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizPage;
