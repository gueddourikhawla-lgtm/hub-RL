import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Brain, Target, Zap, Activity, Bot, Share2, Database, Cog, 
  ChevronRight, ArrowRight, RefreshCw, Circle, Square, Triangle, 
  Users, Settings, MessageCircle, CheckCircle, AlertCircle,
  Lightbulb, Code, Trophy, Gamepad2, Car, TrendingUp, 
  Layers, GitBranch, Workflow, Boxes, Eye, Shield, Network,
  Play, Pause, Power, Timer, Sparkles, Cpu, Image as ImageIcon,
  Search, X, ExternalLink, User, GraduationCap,
  Award, HelpCircle, ChevronDown
} from 'lucide-react';

// ==================== ICÔNES SVG ====================
const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ==================== QUIZ DATA ====================
const quizData = {
  1: [
    {
      question: "Quelle est la caractéristique principale du RL par rapport au supervisé ?",
      options: [
        "Il utilise des données étiquetées",
        "Il apprend par interaction avec l'environnement",
        "Il ne nécessite aucune donnée",
        "Il est plus rapide à entraîner"
      ],
      correct: 1,
      explanation: "Le RL apprend par essai-erreur en interagissant avec son environnement, contrairement au supervisé qui utilise des données étiquetées."
    },
    {
      question: "Dans le cas du robot marcheur, que représente la récompense +1 ?",
      options: [
        "Le robot tombe",
        "Le robot reste immobile",
        "Le robot avance",
        "Le robot recule"
      ],
      correct: 2,
      explanation: "Une récompense positive (+1) encourage l'action souhaitée : ici, faire avancer le robot."
    },
    {
      question: "Quelle application utilise le RLHF (Reinforcement Learning from Human Feedback) ?",
      options: [
        "Tesla Autopilot",
        "ChatGPT",
        "AlphaGo",
        "Spotify"
      ],
      correct: 1,
      explanation: "ChatGPT utilise le RLHF pour aligner ses réponses avec les préférences humaines."
    }
  ],
  2: [
    {
      question: "Combien d'éléments fondamentaux composent un système RL ?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      explanation: "Les 5 éléments sont : Agent, Environnement, État, Action, Récompense."
    },
    {
      question: "Dans la formule MDP M = ⟨S, A, P, R, γ⟩, que représente γ (gamma) ?",
      options: [
        "L'état actuel",
        "L'action prise",
        "Le facteur d'actualisation",
        "La récompense"
      ],
      correct: 2,
      explanation: "γ (gamma) est le facteur d'actualisation qui détermine l'importance des récompenses futures (0 ≤ γ ≤ 1)."
    },
    {
      question: "Quelle stratégie utilise ε-greedy pour équilibrer exploration/exploitation ?",
      options: [
        "Toujours choisir la meilleure action",
        "Choisir aléatoirement avec probabilité ε",
        "Ne jamais explorer",
        "Toujours explorer"
      ],
      correct: 1,
      explanation: "Avec probabilité ε, l'agent explore (action aléatoire), sinon il exploite (meilleure action connue)."
    }
  ],
  3: [
    {
      question: "Q-Learning est un algorithme de quel type ?",
      options: [
        "On-Policy",
        "Off-Policy",
        "Model-Based",
        "Supervisé"
      ],
      correct: 1,
      explanation: "Q-Learning est Off-Policy : il apprend la politique optimale indépendamment de la politique suivie."
    },
    {
      question: "Quelle est la différence principale entre SARSA et Q-Learning ?",
      options: [
        "SARSA est plus rapide",
        "SARSA utilise l'action réellement prise, Q-Learning utilise la meilleure action",
        "Q-Learning est on-policy",
        "Il n'y a aucune différence"
      ],
      correct: 1,
      explanation: "SARSA (on-policy) utilise Q(s',a') réelle, tandis que Q-Learning (off-policy) utilise max Q(s',a')."
    },
    {
      question: "Pourquoi PPO est-il devenu le standard chez OpenAI ?",
      options: [
        "Il est le plus rapide",
        "Il utilise le moins de mémoire",
        "Il est stable, simple et versatile",
        "Il ne nécessite pas de réseau de neurones"
      ],
      correct: 2,
      explanation: "PPO combine stabilité (clipping), simplicité (1er ordre) et versatilité (discret/continu)."
    }
  ],
  4: [
    {
      question: "Quelle innovation du DQN permet de briser les corrélations temporelles ?",
      options: [
        "Target Network",
        "Experience Replay",
        "ε-greedy",
        "CNN"
      ],
      correct: 1,
      explanation: "L'Experience Replay stocke les transitions et les tire aléatoirement pour l'entraînement."
    },
    {
      question: "Dans l'architecture Actor-Critic, quel est le rôle du Critique ?",
      options: [
        "Choisir l'action",
        "Exécuter l'action",
        "Évaluer la qualité de l'action",
        "Stocker la mémoire"
      ],
      correct: 2,
      explanation: "Le Critique évalue la qualité de l'action choisie par l'Acteur en estimant la valeur V(s)."
    },
    {
      question: "Pourquoi le RL classique échoue-t-il sur les jeux Atari ?",
      options: [
        "Les jeux sont trop simples",
        "La malédiction de la dimensionnalité",
        "Il n'y a pas de récompenses",
        "Les actions sont discrètes"
      ],
      correct: 1,
      explanation: "L'espace d'états (pixels) est trop grand pour être stocké dans une Q-Table : c'est la malédiction de la dimensionnalité."
    }
  ],
  5: [
    {
      question: "Quel framework est préféré en recherche pour ses graphes dynamiques ?",
      options: [
        "TensorFlow",
        "PyTorch",
        "Keras",
        "Scikit-learn"
      ],
      correct: 1,
      explanation: "PyTorch est préféré en recherche grâce à ses graphes dynamiques et son débogage facile."
    },
    {
      question: "Quelle bibliothèque TensorFlow est dédiée au RL ?",
      options: [
        "TensorBoard",
        "TF Hub",
        "TF-Agents",
        "TF Lite"
      ],
      correct: 2,
      explanation: "TF-Agents est la bibliothèque complète de TensorFlow dédiée au RL (DQN, PPO, REINFORCE...)."
    },
    {
      question: "Que signifie RLOps ?",
      options: [
        "RL Operations pour le déploiement en production",
        "RL Optimized",
        "RL Open Source",
        "RL Online"
      ],
      correct: 0,
      explanation: "RLOps = MLOps appliqué au RL : automatisation du cycle de vie (entraînement, déploiement, monitoring)."
    }
  ]
};

// ==================== COMPOSANT QUIZ ====================
function QuizSection({ chapterId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = quizData[chapterId] || [];
  const question = questions[currentQuestion];

  if (questions.length === 0) return null;

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-500 rounded-lg">
          <HelpCircle className="w-6 h-6 text-white"/>
        </div>
        <div>
          <h3 className="text-lg font-bold text-indigo-700">Quiz du Chapitre</h3>
          <p className="text-xs text-slate-600">Testez vos connaissances !</p>
        </div>
      </div>

      {!quizCompleted ? (
        <div>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Question {currentQuestion + 1} / {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4 border border-indigo-100">
            <p className="text-sm font-semibold text-slate-800">{question.question}</p>
          </div>

          <div className="space-y-2">
            {question.options.map((option, idx) => {
              let buttonClass = "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ";
              
              if (!showResult) {
                buttonClass += "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer";
              } else if (idx === question.correct) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (idx === selectedAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-slate-200 opacity-50";
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(idx)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      showResult && idx === question.correct ? 'border-green-500 bg-green-500 text-white' :
                      showResult && idx === selectedAnswer ? 'border-red-500 bg-red-500 text-white' :
                      'border-slate-300'
                    }`}>
                      {showResult && idx === question.correct && <CheckCircle className="w-4 h-4"/>}
                      {showResult && idx === selectedAnswer && idx !== question.correct && <X className="w-4 h-4"/>}
                      {!showResult && String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm">{option}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"/>
                  <div>
                    <p className="text-xs font-bold text-blue-700 mb-1">Explication :</p>
                    <p className="text-xs text-slate-700">{question.explanation}</p>
                  </div>
                </div>
                <button
                  onClick={nextQuestion}
                  className="mt-3 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  {currentQuestion < questions.length - 1 ? 'Question suivante →' : 'Voir le résultat'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white"/>
          </div>
          <h4 className="text-xl font-bold text-slate-800 mb-2">Quiz Terminé !</h4>
          <p className="text-lg text-slate-600 mb-4">
            Score : <span className="font-bold text-indigo-600">{score}/{questions.length}</span>
          </p>
          <div className="mb-4">
            {score === questions.length && (
              <p className="text-green-600 font-semibold">🎉 Parfait ! Vous maîtrisez ce chapitre !</p>
            )}
            {score >= questions.length / 2 && score < questions.length && (
              <p className="text-blue-600 font-semibold">👍 Bien joué ! Continuez comme ça !</p>
            )}
            {score < questions.length / 2 && (
              <p className="text-amber-600 font-semibold">💪 Courage ! Révisez et réessayez !</p>
            )}
          </div>
          <button
            onClick={resetQuiz}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold text-sm transition-colors"
          >
            Recommencer le Quiz
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ==================== COMPOSANT ABOUT MODAL ====================
function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white"/>
            </button>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-black text-blue-600">KG</span>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Khawla Gueddouri</h2>
                <p className="text-blue-100 text-sm">Passionnée par l'IA, la Robotique et l'IoT</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-blue-600"/>
                <h3 className="text-lg font-bold text-slate-800">À Propos</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Étudiante passionnée par l'intelligence artificielle, je crée des ressources pédagogiques 
                interactives pour partager mes connaissances et aider la communauté à comprendre des concepts 
                complexes de manière accessible. Ce site est né de ma volonté de créer des supports visuels 
                et interactifs pour l'apprentissage du Reinforcement Learning.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-blue-600"/>
                <h3 className="text-lg font-bold text-slate-800">Domaines d'expertise</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Intelligence Artificielle', 'Reinforcement Learning', 'Systèmes Multi-Agents', 'Robotique', 'IoT', 'Deep Learning'].map((skill) => (
                  <div key={skill} className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-blue-600"/>
                <h3 className="text-lg font-bold text-slate-800">Mes Projets</h3>
              </div>
              <div className="space-y-3">
                <a 
                  href="https://hub-sma.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg hover:shadow-md transition-all group"
                >
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <Network className="w-5 h-5 text-white"/>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600">Hub SMA</h4>
                    <p className="text-xs text-slate-600">Dashboard sur les Systèmes Multi-Agents</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600"/>
                </a>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Brain className="w-5 h-5 text-white"/>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">Hub RL</h4>
                    <p className="text-xs text-slate-600">Dashboard sur le Reinforcement Learning (ce site)</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500"/>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-5 h-5 text-blue-600"/>
                <h3 className="text-lg font-bold text-slate-800">Me retrouver</h3>
              </div>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/gueddourikhawla-lgtm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
                >
                  <GithubIcon className="w-5 h-5"/>
                  <span className="text-sm font-semibold">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5"/>
                  <span className="text-sm font-semibold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ==================== COMPOSANT SEARCH BAR ====================
function SearchBar({ chapters, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    const found = [];
    
    chapters.forEach(chapter => {
      if (chapter.title.toLowerCase().includes(term)) {
        found.push({ type: 'chapter', item: chapter, chapter });
      }
      chapter.content.sections.forEach(section => {
        if (section.title.toLowerCase().includes(term) || section.text.toLowerCase().includes(term)) {
          found.push({ type: 'section', item: section, chapter });
        }
      });
    });
    
    return found.slice(0, 8);
  }, [searchTerm, chapters]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher..."
          className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-48 md:w-64 transition-all"
        />
      </div>

      <AnimatePresence>
        {isOpen && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
          >
            {results.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">
                Aucun résultat pour "{searchTerm}"
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {results.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelect(result.chapter.id);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className="w-full text-left p-3 hover:bg-blue-50 border-b border-slate-100 last:border-0 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <result.chapter.icon className="w-4 h-4 text-blue-600"/>
                      <span className="text-xs font-bold text-blue-600">{result.chapter.short}</span>
                      {result.type === 'section' && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Section</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{result.item.title}</p>
                    {result.type === 'section' && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{result.item.text}</p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && searchTerm && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsOpen(false);
            setSearchTerm('');
          }}
        ></div>
      )}
    </div>
  );
}

// ==================== COMPOSANT PILLAR CARD ====================
function PillarCard({ pillar }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', iconBg: 'bg-blue-500', hoverBg: 'hover:bg-blue-100' },
    green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', iconBg: 'bg-green-500', hoverBg: 'hover:bg-green-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', iconBg: 'bg-purple-500', hoverBg: 'hover:bg-purple-100' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', iconBg: 'bg-amber-500', hoverBg: 'hover:bg-amber-100' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-700', iconBg: 'bg-rose-500', hoverBg: 'hover:bg-rose-100' }
  };

  const colors = colorClasses[pillar.color];

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-4 ${colors.bg} ${colors.border} border-2 rounded-xl ${colors.hoverBg} transition-all duration-300 h-full`}>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            <pillar.icon className="w-7 h-7 text-white"/>
          </div>
          <div>
            <h3 className={`text-sm font-bold ${colors.text}`}>{pillar.title}</h3>
            <p className="text-[10px] text-slate-600 mt-1">{pillar.subtitle}</p>
          </div>
        </div>
      </div>

      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-3 z-50"
        >
          <div className="bg-white rounded-xl border-2 border-slate-200 shadow-2xl p-5 space-y-3">
            <div className={`flex items-center gap-2 ${colors.text}`}>
              <pillar.icon className="w-5 h-5"/>
              <h4 className="font-bold text-lg">{pillar.title}</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
            <div className="space-y-1.5">
              {pillar.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`}/>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
            <div className={`p-3 ${colors.bg} ${colors.border} border rounded-lg`}>
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className={`w-4 h-4 ${colors.text}`}/>
                <span className={`text-xs font-bold ${colors.text}`}>Exemple concret :</span>
              </div>
              <p className="text-xs text-slate-700">{pillar.example}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ==================== DONNÉES DES CHAPITRES ====================
const chapters = [
  {
    id: 1,
    short: "I. Intro",
    title: "Introduction à l'Apprentissage par Renforcement",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    border: "border-blue-200",
    content: {
      subtitle: "Comprendre les fondamentaux du RL et ses applications",
      sections: [
        {
          title: "Qu'est-ce que l'Apprentissage par Renforcement ?",
          text: "L'apprentissage par renforcement est une technique où un agent apprend à prendre des décisions en interagissant avec un environnement. Il reçoit une récompense pour les bonnes actions et une punition pour les mauvaises.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-blue-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-blue-600"/>
                <span className="text-sm font-bold text-blue-700 tracking-wider uppercase">Le Cycle du RL</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg text-center">
                  <Bot className="w-12 h-12 text-blue-600 mx-auto mb-2"/>
                  <span className="text-sm font-bold text-blue-700">Agent</span>
                  <p className="text-xs text-slate-600 mt-1">Prend des décisions</p>
                </div>
                <div className="p-4 bg-cyan-50 border-2 border-cyan-300 rounded-lg text-center">
                  <Activity className="w-12 h-12 text-cyan-600 mx-auto mb-2"/>
                  <span className="text-sm font-bold text-cyan-700">Action</span>
                  <p className="text-xs text-slate-600 mt-1">Interagit avec</p>
                </div>
                <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg text-center">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-2"/>
                  <span className="text-sm font-bold text-purple-700">Récompense</span>
                  <p className="text-xs text-slate-600 mt-1">Apprend du résultat</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Différences entre RL, Supervisé et Non-Supervisé",
          text: "Le RL se distingue par son approche interactive : l'agent apprend par essai-erreur sans données étiquetées au préalable.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-blue-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-blue-600"/>
                <span className="text-sm font-bold text-blue-700 tracking-wider uppercase">Comparaison des Paradigmes</span>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600"/>
                    <span className="text-sm font-bold text-blue-700">Apprentissage Supervisé</span>
                  </div>
                  <p className="text-xs text-slate-600">Données étiquetées → Modèle prédit la sortie</p>
                  <p className="text-xs text-slate-500 mt-1 italic">Ex: Classification d'images, Prédiction de prix</p>
                </div>
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-5 h-5 text-green-600"/>
                    <span className="text-sm font-bold text-green-700">Apprentissage Non-Supervisé</span>
                  </div>
                  <p className="text-xs text-slate-600">Données non étiquetées → Modèle découvre des structures</p>
                  <p className="text-xs text-slate-500 mt-1 italic">Ex: Clustering, Réduction de dimension</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Apprentissage par Renforcement</span>
                  </div>
                  <p className="text-xs text-slate-600">Interaction → Récompenses/Pénalités → Politique optimale</p>
                  <p className="text-xs text-slate-500 mt-1 italic">Ex: Jeux, Robotique, Trading</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Applications Réelles du RL",
          text: "Le RL révolutionne de nombreux domaines : jeux (AlphaGo), robotique, voitures autonomes, trading, et même ChatGPT via le RLHF.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-blue-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-blue-600"/>
                <span className="text-sm font-bold text-blue-700 tracking-wider uppercase">Applications Majeures</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                  <Gamepad2 className="w-8 h-8 text-blue-600 mb-2"/>
                  <span className="text-sm font-bold text-blue-700 block">Jeux Vidéo</span>
                  <p className="text-xs text-slate-600 mt-1">AlphaGo, AlphaZero, OpenAI Five (Dota 2)</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <Bot className="w-8 h-8 text-green-600 mb-2"/>
                  <span className="text-sm font-bold text-green-700 block">Robotique</span>
                  <p className="text-xs text-slate-600 mt-1">Marche, manipulation, drones autonomes</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <Car className="w-8 h-8 text-purple-600 mb-2"/>
                  <span className="text-sm font-bold text-purple-700 block">Voitures Autonomes</span>
                  <p className="text-xs text-slate-600 mt-1">Tesla Autopilot, Waymo</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-amber-600 mb-2"/>
                  <span className="text-sm font-bold text-amber-700 block">Trading</span>
                  <p className="text-xs text-slate-600 mt-1">Algorithmes d'achat/vente autonomes</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Cas Pratique : Le Robot Marcheur",
          text: "Comment un robot quadrupède apprend à marcher ? En supervisé, il faudrait des millions de labels. En RL, il apprend par essai-erreur : avancer = +1, tomber = -1.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-blue-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-blue-600"/>
                <span className="text-sm font-bold text-blue-700 tracking-wider uppercase">Apprentissage par Essai-Erreur</span>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600"/>
                    <span className="text-sm font-bold text-red-700">Approche Supervisée (Impossible)</span>
                  </div>
                  <p className="text-xs text-slate-600">Besoin d'un dataset : "Pour cet angle de 12.4°, bouge le moteur de 2°"</p>
                  <p className="text-xs text-red-600 mt-2 font-semibold">❌ Personne ne connaît la "bonne" action pour chaque micro-état</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600"/>
                    <span className="text-sm font-bold text-green-700">Approche RL (Efficace)</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-bold">+</span>
                      </div>
                      <span className="text-slate-600">Le robot avance → Récompense +1</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center">
                        <span className="text-red-700 font-bold">-</span>
                      </div>
                      <span className="text-slate-600">Le robot tombe → Pénalité -1</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-700 mt-3 font-semibold">✓ L'agent apprend de ses propres expériences</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Défis et Limites du RL",
          text: "Le RL nécessite beaucoup de données, un équilibre exploration/exploitation délicat, et peut être instable dans des environnements changeants.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-blue-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-blue-600"/>
                <span className="text-sm font-bold text-blue-700 tracking-wider uppercase">Principaux Défis</span>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-amber-600"/>
                    <span className="text-sm font-bold text-amber-700">Volume de Données</span>
                  </div>
                  <p className="text-xs text-slate-600">Nécessite des milliers/millions d'interactions pour apprendre efficacement</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-5 h-5 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Exploration vs Exploitation</span>
                  </div>
                  <p className="text-xs text-slate-600">Équilibre complexe entre essayer de nouvelles stratégies et utiliser ce qu'on sait</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-5 h-5 text-red-600"/>
                    <span className="text-sm font-bold text-red-700">Environnements Instables</span>
                  </div>
                  <p className="text-xs text-slate-600">Si l'environnement change, l'agent peut désapprendre ce qu'il a appris</p>
                </div>
              </div>
            </div>
          ),
        },
      ],
    }
  },
  {
    id: 2,
    short: "II. Fondamentaux",
    title: "Fondamentaux de l'Apprentissage par Renforcement",
    icon: Brain,
    color: "from-emerald-500 to-teal-500",
    border: "border-emerald-200",
    content: {
      subtitle: "Les 5 éléments clés, MDP et types d'apprentissage",
      sections: [
        {
          title: "Les 5 Éléments du RL",
          text: "Agent, Environnement, État, Action, Récompense : les 5 composants fondamentaux qui définissent tout système RL.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-emerald-200 p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Settings className="w-6 h-6 text-emerald-600"/>
                <span className="text-lg font-bold text-emerald-700 tracking-wider uppercase">Les 5 Piliers du RL</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { id: 'agent', icon: Bot, color: 'blue', title: 'Agent', subtitle: "L'IA qui décide", description: "L'agent est l'entité intelligente qui apprend et prend des décisions.", example: "🤖 Un robot aspirateur qui décide où nettoyer", details: ["Perçoit son environnement via des capteurs", "Prend des décisions autonomes", "Apprend de ses expériences", "Agit via des actionneurs"] },
                  { id: 'environnement', icon: Target, color: 'green', title: 'Environnement', subtitle: 'Le monde', description: "L'environnement est tout ce qui entoure l'agent.", example: "🏠 L'appartement avec meubles et tapis pour le robot", details: ["Définit les règles du jeu", "Contient les obstacles et récompenses", "Réagit aux actions de l'agent", "Peut être déterministe ou aléatoire"] },
                  { id: 'etat', icon: Eye, color: 'purple', title: 'État', subtitle: 'Situation actuelle', description: "L'état représente la configuration actuelle de l'environnement.", example: "📍 Position (x=3, y=5) + batterie à 75%", details: ["Représente la situation présente", "Contient les informations pertinentes", "Change après chaque action", "Peut être partiel ou complet"] },
                  { id: 'action', icon: Zap, color: 'amber', title: 'Action', subtitle: 'Choix possibles', description: "Les actions sont les décisions que l'agent peut prendre.", example: "⬆️ Avancer, ⬇️ Reculer, ⬅️ Gauche, ➡️ Droite", details: ["Choix disponibles pour l'agent", "Modifient l'état de l'environnement", "Peuvent être discrètes ou continues", "Chaque action a des conséquences"] },
                  { id: 'recompense', icon: Trophy, color: 'rose', title: 'Récompense', subtitle: 'Score donné', description: "La récompense est un signal numérique qui indique si l'action était bonne.", example: "✅ Zone nettoyée: +10 | ❌ Collision: -5", details: ["Feedback immédiat après l'action", "Positive pour encourager", "Négative pour décourager", "Guide l'apprentissage de l'agent"] }
                ].map((pillar) => (
                  <PillarCard key={pillar.id} pillar={pillar}/>
                ))}
              </div>
            </div>
          ),
        },
        {
          title: "Processus de Décision de Markov (MDP)",
          text: "Un MDP est un modèle mathématique M = ⟨S, A, P, R, γ⟩ qui structure les problèmes RL.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-emerald-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Workflow className="w-5 h-5 text-emerald-600"/>
                <span className="text-sm font-bold text-emerald-700 tracking-wider uppercase">Structure d'un MDP</span>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-lg">
                <div className="text-center mb-3">
                  <span className="text-lg font-bold text-emerald-700">M = ⟨S, A, P, R, γ⟩</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded border border-emerald-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">États</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Ensemble des situations possibles</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-emerald-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">A</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Actions</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Choix disponibles</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-emerald-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">P</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Probabilités</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Transitions entre états</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-emerald-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">R</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Récompenses</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Gains/pertes</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white rounded border border-emerald-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">γ</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">Facteur d'actualisation (0 ≤ γ ≤ 1)</span>
                  </div>
                  <p className="text-[10px] text-slate-600">γ proche de 0 → court terme | γ proche de 1 → long terme</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Policy, Value et Model",
          text: "Policy (π) : stratégie de décision. Value (V) : utilité d'un état. Model (M) : représentation interne de l'environnement.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-emerald-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-emerald-600"/>
                <span className="text-sm font-bold text-emerald-700 tracking-wider uppercase">Les 3 Concepts Clés</span>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600"/>
                    <span className="text-sm font-bold text-blue-700">Policy (π) - Le Cerveau</span>
                  </div>
                  <p className="text-xs text-slate-600">Stratégie qui dicte quelle action prendre dans chaque état</p>
                  <p className="text-xs text-blue-600 mt-1 italic">Objectif : Trouver π* qui maximise les récompenses</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Value (V) - L'Intuition</span>
                  </div>
                  <p className="text-xs text-slate-600">Mesure l'utilité d'un état (récompense attendue cumulée)</p>
                  <p className="text-xs text-purple-600 mt-1 italic">Plus V est élevée, plus l'état est intéressant</p>
                </div>
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Cog className="w-5 h-5 text-amber-600"/>
                    <span className="text-sm font-bold text-amber-700">Model (M) - La Carte Mentale</span>
                  </div>
                  <p className="text-xs text-slate-600">Représentation interne des règles de l'environnement</p>
                  <p className="text-xs text-amber-600 mt-1 italic">Permet de prédire les conséquences des actions</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Types d'Apprentissage RL",
          text: "Value-Based vs Policy-Based (comment décider) et Model-Free vs Model-Based (comment interagir avec l'environnement).",
          schema: (
            <div className="w-full bg-white rounded-xl border border-emerald-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-emerald-600"/>
                <span className="text-sm font-bold text-emerald-700 tracking-wider uppercase">Classification des Méthodes</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
                    <span className="text-xs font-bold text-blue-700 block mb-2">Comment décider ?</span>
                    <div className="space-y-2">
                      <div className="p-2 bg-white rounded border border-blue-200">
                        <span className="text-xs font-bold text-blue-600 block">Value-Based</span>
                        <p className="text-[10px] text-slate-600">Apprend la valeur des actions</p>
                      </div>
                      <div className="p-2 bg-white rounded border border-blue-200">
                        <span className="text-xs font-bold text-blue-600 block">Policy-Based</span>
                        <p className="text-[10px] text-slate-600">Apprend directement la politique</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                    <span className="text-xs font-bold text-green-700 block mb-2">Comment interagir ?</span>
                    <div className="space-y-2">
                      <div className="p-2 bg-white rounded border border-green-200">
                        <span className="text-xs font-bold text-green-600 block">Model-Free</span>
                        <p className="text-[10px] text-slate-600">Apprend par essai-erreur</p>
                      </div>
                      <div className="p-2 bg-white rounded border border-green-200">
                        <span className="text-xs font-bold text-green-600 block">Model-Based</span>
                        <p className="text-[10px] text-slate-600">Construit un modèle de l'environnement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Exploration vs Exploitation",
          text: "Le dilemme fondamental du RL : explorer de nouvelles actions pour découvrir l'environnement ou exploiter les connaissances acquises pour maximiser les récompenses.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-emerald-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-emerald-600"/>
                <span className="text-sm font-bold text-emerald-700 tracking-wider uppercase">Le Dilemme Exploration/Exploitation</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="w-6 h-6 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Exploration</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-4 h-4 text-green-500"/>
                      <span className="text-slate-600">Découvrir de nouvelles stratégies</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-4 h-4 text-green-500"/>
                      <span className="text-slate-600">Éviter les optima locaux</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 text-amber-500"/>
                      <span className="text-slate-600">Peut ralentir l'apprentissage</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-6 h-6 text-amber-600"/>
                    <span className="text-sm font-bold text-amber-700">Exploitation</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-4 h-4 text-green-500"/>
                      <span className="text-slate-600">Maximiser les gains immédiats</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-4 h-4 text-green-500"/>
                      <span className="text-slate-600">Utiliser les connaissances acquises</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 text-amber-500"/>
                      <span className="text-slate-600">Peut manquer de meilleures solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    }
  },
  {
    id: 3,
    short: "III. Algorithmes",
    title: "Algorithmes de Base du RL",
    icon: Code,
    color: "from-purple-500 to-pink-500",
    border: "border-purple-200",
    content: {
      subtitle: "Q-Learning, SARSA, PPO et Dyna-Q",
      sections: [
        {
          title: "Q-Learning (Off-Policy)",
          text: "Algorithme model-free et off-policy qui apprend la meilleure stratégie en estimant la valeur Q de chaque paire état-action.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-purple-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Database className="w-5 h-5 text-purple-600"/>
                <span className="text-sm font-bold text-purple-700 tracking-wider uppercase">Q-Learning : Architecture</span>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg">
                <div className="text-center mb-3">
                  <span className="text-lg font-bold text-purple-700">Q(s, a) ← Q(s, a) + α[r + γ·max Q(s', a') - Q(s, a)]</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-white rounded border border-purple-200">
                    <span className="text-xs font-bold text-purple-600 block mb-1">Off-Policy</span>
                    <p className="text-[10px] text-slate-600">Utilise la meilleure action possible (max) même si l'agent a pris une action différente</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-purple-200">
                    <span className="text-xs font-bold text-purple-600 block mb-1">Q-Table</span>
                    <p className="text-[10px] text-slate-600">Tableau où chaque cellule = valeur d'une paire état-action</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                  <span className="text-xs font-bold text-green-700 block mb-1">Avantages</span>
                  <div className="flex gap-2 text-[10px]">
                    <span className="text-slate-600">✓ Optimalité théorique</span>
                    <span className="text-slate-600">✓ Audacieux (cherche le raccourci)</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "SARSA (On-Policy)",
          text: "State-Action-Reward-State-Action : algorithme on-policy qui apprend en suivant strictement la politique actuelle.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-purple-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-purple-600"/>
                <span className="text-sm font-bold text-purple-700 tracking-wider uppercase">SARSA vs Q-Learning</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-6 h-6 text-blue-600"/>
                    <span className="text-sm font-bold text-blue-700">Q-Learning</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-blue-600 block">Off-Policy</span>
                      <p className="text-slate-600">Utilise max Q(s', a')</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-blue-600 block">Comportement</span>
                      <p className="text-slate-600">Audacieux, cherche le raccourci</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-6 h-6 text-green-600"/>
                    <span className="text-sm font-bold text-green-700">SARSA</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-green-600 block">On-Policy</span>
                      <p className="text-slate-600">Utilise Q(s', a') réelle</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-green-600 block">Comportement</span>
                      <p className="text-slate-600">Prudent, évite les risques</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "PPO (Proximal Policy Optimization)",
          text: "Algorithme policy-based développé par OpenAI qui optimise directement la politique avec une fonction de perte clippée pour éviter les mises à jour trop brutales.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-purple-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600"/>
                <span className="text-sm font-bold text-purple-700 tracking-wider uppercase">PPO : Actor-Critic</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-6 h-6 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Acteur (Politique)</span>
                  </div>
                  <p className="text-xs text-slate-600">Observe l'état et décide quelle action entreprendre</p>
                  <p className="text-[10px] text-purple-600 mt-2 italic">Hérité du Vanilla Policy Gradient</p>
                </div>
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-6 h-6 text-amber-600"/>
                    <span className="text-sm font-bold text-amber-700">Critique (Valeur)</span>
                  </div>
                  <p className="text-xs text-slate-600">Estime la qualité de la décision de l'Acteur</p>
                  <p className="text-[10px] text-amber-600 mt-2 italic">Hérité de Q-Learning</p>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg mt-3">
                <span className="text-xs font-bold text-green-700 block mb-2">Pourquoi PPO est le standard ?</span>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 bg-white rounded">
                    <span className="font-bold text-green-600 block">Stabilité</span>
                    <p className="text-slate-600">Mises à jour conservatrices</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <span className="font-bold text-green-600 block">Simplicité</span>
                    <p className="text-slate-600">Optimisation du 1er ordre</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <span className="font-bold text-green-600 block">Versatilité</span>
                    <p className="text-slate-600">Discret et continu</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Dyna-Q (Model-Based)",
          text: "Extension du Q-Learning qui combine apprentissage direct et modélisation de l'environnement pour accélérer l'apprentissage via des expériences simulées.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-purple-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Cog className="w-5 h-5 text-purple-600"/>
                <span className="text-sm font-bold text-purple-700 tracking-wider uppercase">Dyna-Q : Double Apprentissage</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-6 h-6 text-blue-600"/>
                    <span className="text-sm font-bold text-blue-700">Direct RL</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">Expérience réelle dans l'environnement</p>
                  <div className="space-y-1 text-[10px]">
                    <div className="p-1.5 bg-white rounded">1. Observer l'état S</div>
                    <div className="p-1.5 bg-white rounded">2. Choisir action A</div>
                    <div className="p-1.5 bg-white rounded">3. Recevoir récompense R</div>
                    <div className="p-1.5 bg-white rounded">4. Mettre à jour Q(S,A)</div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-6 h-6 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Planification</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">Expériences simulées via modèle interne</p>
                  <div className="space-y-1 text-[10px]">
                    <div className="p-1.5 bg-white rounded">1. Stocker (S,A) → (R,S')</div>
                    <div className="p-1.5 bg-white rounded">2. Piocher au hasard</div>
                    <div className="p-1.5 bg-white rounded">3. Simuler la transition</div>
                    <div className="p-1.5 bg-white rounded">4. Mettre à jour Q sans bouger</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg mt-3">
                <span className="text-xs font-bold text-green-700 block mb-1">Avantage principal</span>
                <p className="text-[10px] text-slate-600">Accélère l'apprentissage en réduisant le nombre d'interactions physiques nécessaires</p>
              </div>
            </div>
          ),
        },
      ],
    }
  },
  {
    id: 4,
    short: "IV. Deep RL",
    title: "Apprentissage par Renforcement Profond",
    icon: Cpu,
    color: "from-rose-500 to-red-500",
    border: "border-rose-200",
    content: {
      subtitle: "DRL, DQN, Policy Networks et Actor-Critic",
      sections: [
        {
          title: "Introduction au Deep RL",
          text: "Le DRL combine RL et Deep Learning pour gérer des environnements complexes avec des espaces d'états de très haute dimension (images, capteurs).",
          schema: (
            <div className="w-full bg-white rounded-xl border border-rose-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-rose-600"/>
                <span className="text-sm font-bold text-rose-700 tracking-wider uppercase">La Synergie DRL</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="w-6 h-6 text-blue-600"/>
                    <span className="text-sm font-bold text-blue-700">Deep Learning</span>
                  </div>
                  <p className="text-xs text-slate-600">Représentations riches et approximation de fonctions complexes</p>
                </div>
                <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-6 h-6 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Reinforcement Learning</span>
                  </div>
                  <p className="text-xs text-slate-600">Cadre de prise de décision séquentielle basé sur récompenses</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-rose-600"/>
                  <span className="text-sm font-bold text-rose-700">Résultat</span>
                </div>
                <p className="text-xs text-slate-600">Agents capables d'apprendre des stratégies optimales dans des environnements très complexes et non structurés</p>
              </div>
            </div>
          ),
        },
        {
          title: "Limitations du RL Classique",
          text: "Le RL tabulaire souffre de la malédiction de la dimensionnalité : impossible de stocker toutes les paires état-action pour des espaces continus ou de haute dimension.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-rose-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-rose-600"/>
                <span className="text-sm font-bold text-rose-700 tracking-wider uppercase">RL Classique vs Deep RL</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-6 h-6 text-red-600"/>
                    <span className="text-sm font-bold text-red-700">RL Classique</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-red-600 block">Représentation</span>
                      <p className="text-slate-600">Tables, dictionnaires</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-red-600 block">Espace d'états</span>
                      <p className="text-slate-600">Discret, faible dimension</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-red-600 block">Généralisation</span>
                      <p className="text-slate-600">Nulle (chaque état indépendant)</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-6 h-6 text-green-600"/>
                    <span className="text-sm font-bold text-green-700">Deep RL</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-green-600 block">Représentation</span>
                      <p className="text-slate-600">Réseaux de neurones</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-green-600 block">Espace d'états</span>
                      <p className="text-slate-600">Continu, haute dimension</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-green-600 block">Généralisation</span>
                      <p className="text-slate-600">Excellente (interpolation)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "DQN (Deep Q-Network)",
          text: "Algorithme qui a révolutionné l'IA en maîtrisant les jeux Atari depuis les pixels bruts. Combine Q-Learning + CNN + Experience Replay + Target Network.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-rose-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Gamepad2 className="w-5 h-5 text-rose-600"/>
                <span className="text-sm font-bold text-rose-700 tracking-wider uppercase">Les 4 Innovations du DQN</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-blue-600"/>
                    <span className="text-xs font-bold text-blue-700">Réseau de Neurones</span>
                  </div>
                  <p className="text-[10px] text-slate-600">CNN pour approximer Q(s,a) au lieu d'une table</p>
                </div>
                <div className="p-3 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-purple-600"/>
                    <span className="text-xs font-bold text-purple-700">Experience Replay</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Stockage et tirage aléatoire pour briser les corrélations</p>
                </div>
                <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-amber-600"/>
                    <span className="text-xs font-bold text-amber-700">Target Network</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Réseau clone fixe pour stabiliser la cible</p>
                </div>
                <div className="p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-5 h-5 text-green-600"/>
                    <span className="text-xs font-bold text-green-700">ε-greedy</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Stratégie d'exploration progressive</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Policy Networks",
          text: "Au lieu d'approximer les valeurs Q, ces réseaux apprennent directement la politique π(s) qui donne la probabilité de chaque action.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-rose-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="w-5 h-5 text-rose-600"/>
                <span className="text-sm font-bold text-rose-700 tracking-wider uppercase">Policy Gradient</span>
              </div>
              <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg">
                <div className="text-center mb-3">
                  <span className="text-sm font-bold text-rose-700">Principe Fondamental</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border border-rose-200">
                    <span className="text-xs font-bold text-rose-600 block mb-1">1. Échantillonnage</span>
                    <p className="text-[10px] text-slate-600">Le réseau produit une distribution de probabilités sur les actions</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-rose-200">
                    <span className="text-xs font-bold text-rose-600 block mb-1">2. Sélection</span>
                    <p className="text-[10px] text-slate-600">L'agent échantillonne une action selon ces probabilités</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-rose-200">
                    <span className="text-xs font-bold text-rose-600 block mb-1">3. Mise à jour</span>
                    <p className="text-[10px] text-slate-600">Si récompense positive → augmenter la probabilité de cette action</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                  <span className="text-xs font-bold text-green-700 block mb-1">Avantage</span>
                  <p className="text-[10px] text-slate-600">Gère naturellement les espaces d'actions continus</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Actor-Critic",
          text: "Architecture hybride qui combine Policy Gradient (Acteur) et Value-Based (Critique) pour réduire la variance et stabiliser l'apprentissage.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-rose-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="w-5 h-5 text-rose-600"/>
                <span className="text-sm font-bold text-rose-700 tracking-wider uppercase">Architecture Actor-Critic</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-6 h-6 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Acteur</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">Politique π(a|s)</p>
                  <div className="space-y-1 text-[10px]">
                    <div className="p-1.5 bg-white rounded">• Observe l'état</div>
                    <div className="p-1.5 bg-white rounded">• Décide l'action</div>
                    <div className="p-1.5 bg-white rounded">• Met à jour π</div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-6 h-6 text-amber-600"/>
                    <span className="text-sm font-bold text-amber-700">Critique</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">Valeur V(s)</p>
                  <div className="space-y-1 text-[10px]">
                    <div className="p-1.5 bg-white rounded">• Évalue l'état</div>
                    <div className="p-1.5 bg-white rounded">• Calcule l'avantage</div>
                    <div className="p-1.5 bg-white rounded">• Guide l'Acteur</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg mt-3">
                <span className="text-xs font-bold text-green-700 block mb-1">Synergie</span>
                <p className="text-[10px] text-slate-600">Le Critique réduit la variance de l'apprentissage de l'Acteur en fournissant une évaluation plus stable que la récompense brute</p>
              </div>
            </div>
          ),
        },
      ],
    }
  },
  {
    id: 5,
    short: "V. Frameworks",
    title: "Frameworks et Applications",
    icon: Cog,
    color: "from-amber-500 to-orange-500",
    border: "border-amber-200",
    content: {
      subtitle: "TensorFlow, PyTorch et applications industrielles",
      sections: [
        {
          title: "TensorFlow",
          text: "Framework open-source de Google pour le deep learning. Offre TF-Agents pour le RL, avec support GPU/TPU et déploiement multi-plateforme.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-amber-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Code className="w-5 h-5 text-amber-600"/>
                <span className="text-sm font-bold text-amber-700 tracking-wider uppercase">Écosystème TensorFlow</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-orange-50 border-2 border-orange-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-orange-600"/>
                    <span className="text-xs font-bold text-orange-700">TF-Agents</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Bibliothèque RL complète avec DQN, PPO, REINFORCE</p>
                </div>
                <div className="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-600"/>
                    <span className="text-xs font-bold text-blue-700">TensorBoard</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Visualisation en temps réel des métriques</p>
                </div>
                <div className="p-3 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="w-5 h-5 text-purple-600"/>
                    <span className="text-xs font-bold text-purple-700">TF Hub</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Modèles pré-entraînés réutilisables</p>
                </div>
                <div className="p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600"/>
                    <span className="text-xs font-bold text-green-700">TF Lite/Serving</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Déploiement mobile et API</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "PyTorch",
          text: "Framework de Facebook AI Research, préféré en recherche pour sa simplicité et ses graphes dynamiques. TorchRL offre des outils RL avancés.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-amber-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-600"/>
                <span className="text-sm font-bold text-amber-700 tracking-wider uppercase">PyTorch vs TensorFlow</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-6 h-6 text-red-600"/>
                    <span className="text-sm font-bold text-red-700">PyTorch</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-red-600 block">Graphes</span>
                      <p className="text-slate-600">Dynamiques</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-red-600 block">Débogage</span>
                      <p className="text-slate-600">Très facile</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-red-600 block">Usage</span>
                      <p className="text-slate-600">Recherche</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Cog className="w-6 h-6 text-blue-600"/>
                    <span className="text-sm font-bold text-blue-700">TensorFlow</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-blue-600 block">Graphes</span>
                      <p className="text-slate-600">Statiques (par défaut)</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-blue-600 block">Débogage</span>
                      <p className="text-slate-600">Plus complexe</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="font-bold text-blue-600 block">Usage</span>
                      <p className="text-slate-600">Production</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Applications Industrielles",
          text: "Le RL est utilisé par Spotify (recommandations), Uber (équilibre du marché), Meta (framework Pearl) et bien d'autres pour optimiser leurs systèmes.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-amber-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-600"/>
                <span className="text-sm font-bold text-amber-700 tracking-wider uppercase">Cas d'Usage Réels</span>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="w-5 h-5 text-green-600"/>
                    <span className="text-sm font-bold text-green-700">Spotify</span>
                  </div>
                  <p className="text-xs text-slate-600">Optimisation de l'engagement utilisateur à long terme via AH-DQN</p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="w-5 h-5 text-blue-600"/>
                    <span className="text-sm font-bold text-blue-700">Uber</span>
                  </div>
                  <p className="text-xs text-slate-600">Équilibre du marché via MDP à horizon infini et DQN</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="w-5 h-5 text-purple-600"/>
                    <span className="text-sm font-bold text-purple-700">Meta (Pearl)</span>
                  </div>
                  <p className="text-xs text-slate-600">Framework open-source pour RL en production avec contraintes de sécurité</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "RLOps : RL en Production",
          text: "Le cycle de vie d'un projet RL inclut la création d'environnement, l'entraînement, l'évaluation, le déploiement, le monitoring et le réentraînement continu.",
          schema: (
            <div className="w-full bg-white rounded-xl border border-amber-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Workflow className="w-5 h-5 text-amber-600"/>
                <span className="text-sm font-bold text-amber-700 tracking-wider uppercase">Cycle de Vie RL</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-blue-700 block">Création de l'environnement</span>
                    <p className="text-[10px] text-slate-600">Gymnasium, Unity, CARLA, ROS</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-purple-700 block">Choix de l'algorithme</span>
                    <p className="text-[10px] text-slate-600">DQN, PPO, SAC, etc.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-amber-700 block">Entraînement</span>
                    <p className="text-[10px] text-slate-600">Avec tracking (MLflow, W&B)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-green-700 block">Déploiement</span>
                    <p className="text-[10px] text-slate-600">Docker, Kubernetes, API</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                  <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-rose-700 block">Monitoring & Réentraînement</span>
                    <p className="text-[10px] text-slate-600">Surveillance continue et amélioration</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    }
  },
];

// ==================== COMPOSANT PRINCIPAL ====================
export default function DashboardRL() {
  const [activeTab, setActiveTab] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const currentChapter = chapters.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
    <button onClick={() => setActiveTab(null)} className="flex items-center gap-4 hover:opacity-80 transition-opacity group">
      <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md">
        <Brain className="w-6 h-6 text-white"/>
      </div>
      <div className="text-left">
        <h1 className="text-xl font-black tracking-wider text-slate-800 uppercase">Hub <span className="text-blue-600">RL</span></h1>
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Reinforcement Learning</p>
      </div>
    </button>

    <div className="flex items-center gap-3 flex-wrap justify-center">
      {/* Barre de recherche */}
      <SearchBar chapters={chapters} onSelect={setActiveTab}/>
    </div>

    {/* Navigation des chapitres */}
    <nav className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
      {chapters.map((chapter) => {
        const isActive = chapter.id === activeTab;
        return (
          <button
            key={chapter.id}
            onClick={() => setActiveTab(chapter.id)}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all duration-300 border ${
              isActive 
                ? `bg-gradient-to-r ${chapter.color} text-white shadow-md` 
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {chapter.short}
          </button>
        );
      })}
    </nav>
  </div>
</header>

      <main className="flex-1 flex flex-col w-full relative">
        <div className="max-w-6xl mx-auto w-full p-4 md:p-8 relative z-10 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {!currentChapter ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center py-12"
              >
                <div className="relative w-80 h-80 flex items-center justify-center mb-12">
                  <div className="absolute z-10 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-blue-200">
                    <Brain className="w-16 h-16 text-blue-600 mb-2"/>
                    <span className="text-2xl font-black text-slate-800">RL</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-300 animate-[spin_30s_linear_infinite]">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-white rounded-full border-2 border-blue-400 text-blue-600 shadow-lg"><Target size={24}/></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 p-3 bg-white rounded-full border-2 border-green-400 text-green-600 shadow-lg"><Activity size={24}/></div>
                    <div className="absolute top-1/2 -left-6 -translate-y-1/2 p-3 bg-white rounded-full border-2 border-purple-400 text-purple-600 shadow-lg"><Bot size={24}/></div>
                    <div className="absolute top-1/2 -right-6 -translate-y-1/2 p-3 bg-white rounded-full border-2 border-amber-400 text-amber-600 shadow-lg"><Trophy size={24}/></div>
                  </div>
                </div>
                <div className="text-center max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
                  <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-wide">Apprentissage par Renforcement</h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Découvrez comment les agents intelligents apprennent à prendre des décisions optimales en interagissant avec leur environnement.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-blue-700 font-semibold">Sélectionnez un chapitre pour commencer</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`p-4 bg-gradient-to-br ${currentChapter.color} rounded-xl shadow-lg`}
                  >
                    <currentChapter.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-wide">{currentChapter.title}</h2>
                    <p className="text-slate-600 text-sm mt-1">{currentChapter.content.subtitle}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {currentChapter.content.sections.map((sec, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-4"
                    >
                      <div className={`p-6 bg-white rounded-xl border ${currentChapter.border} shadow-sm`}>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <div className={`w-8 h-8 bg-gradient-to-br ${currentChapter.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">{idx + 1}</span>
                          </div>
                          {sec.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{sec.text}</p>
                      </div>
                      {sec.schema && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 + 0.1 }}
                        >
                          {sec.schema}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Quiz Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: currentChapter.content.sections.length * 0.1 }}
                  >
                    <QuizSection chapterId={currentChapter.id}/>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-slate-200 bg-white py-6 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold">KG</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800">Khawla Gueddouri</p>
              <p className="text-xs text-slate-500">Passionnée par l'IA, la Robotique et l'IoT</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Projet personnel • 2026
            </p>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)}/>
    </div>
  );
}