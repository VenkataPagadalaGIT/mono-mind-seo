export interface RoadmapResource {
  title: string;
  url: string;
}

export interface RoadmapTopic {
  id: string;
  topic: string;
  description: string;
  phase: string;
  phaseColor: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
  week: number;
  isMilestone?: boolean;
  bestVideos: RoadmapResource[];
  bestCourses: RoadmapResource[];
  books: RoadmapResource[];
  githubRepos: RoadmapResource[];
  tools: string;
  proTips: string;
  notionUrl?: string;
}

export const PHASES = [
  { id: "foundations", label: "Phase 1: Foundations", color: "#22c55e", emoji: "🟢" },
  { id: "python-math", label: "Phase 2: Python & Math", color: "#3b82f6", emoji: "🔵" },
  { id: "machine-learning", label: "Phase 3: Machine Learning", color: "#eab308", emoji: "🟡" },
  { id: "deep-learning", label: "Phase 4: Deep Learning", color: "#f97316", emoji: "🟠" },
  { id: "nlp-llms", label: "Phase 5: NLP & LLMs", color: "#ef4444", emoji: "🔴" },
  { id: "specialize", label: "Phase 6: Specialize & Build", color: "#a855f7", emoji: "🟣" },
];

function parseLinks(raw: string): RoadmapResource[] {
  const items: RoadmapResource[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    items.push({ title: match[1], url: match[2] });
  }
  return items;
}

export const roadmapTopics: RoadmapTopic[] = ([
  {
    id: "what-is-ai", topic: "What is AI? — The Big Picture",
    description: "Understand what Artificial Intelligence actually is, its history, different types (narrow vs general AI), and where it's headed. Get the mental map before diving into code.",
    phase: "🟢 Phase 1: Foundations", phaseColor: "#22c55e", difficulty: "beginner", order: 1, week: 1,
    bestVideos: [
      { title: "AI For Everyone — Andrew Ng", url: "https://www.youtube.com/watch?v=yN7ypxC7838" },
      { title: "But what is AI? — 3Blue1Brown", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
      { title: "History of AI in 15 Minutes — ColdFusion", url: "https://www.youtube.com/watch?v=056v4OxKwlI" },
    ],
    bestCourses: [
      { title: "Elements of AI — University of Helsinki", url: "https://www.elementsofai.com/" },
      { title: "AI For Everyone — Coursera (Andrew Ng)", url: "https://www.coursera.org/learn/ai-for-everyone" },
      { title: "Google AI Education", url: "https://ai.google/education/" },
    ],
    books: [
      { title: "AI Superpowers by Kai-Fu Lee", url: "https://www.amazon.com/AI-Superpowers-China-Silicon-Valley/dp/132854639X" },
      { title: "Life 3.0 by Max Tegmark", url: "https://www.amazon.com/Life-3-0-Being-Artificial-Intelligence/dp/1101970316" },
    ],
    githubRepos: [
      { title: "awesome-artificial-intelligence — 25K+ stars", url: "https://github.com/owainlewis/awesome-artificial-intelligence" },
      { title: "AI-Expert-Roadmap — Visual roadmap", url: "https://github.com/AMAI-GmbH/AI-Expert-Roadmap" },
      { title: "microsoft/AI-For-Beginners — 35K+ stars", url: "https://github.com/microsoft/AI-For-Beginners" },
    ],
    tools: "ChatGPT, Claude, Google Gemini",
    proTips: "Don't jump into code yet. Spend Week 1 just understanding the landscape. Watch videos, read articles, and form your own mental model of what AI is and isn't.",
  },
  {
    id: "python", topic: "Python Programming for AI",
    description: "Python is THE language for AI/ML. Learn core Python: variables, loops, functions, classes, list comprehensions, file I/O.",
    phase: "🔵 Phase 2: Python & Math", phaseColor: "#3b82f6", difficulty: "beginner", order: 2, week: 2,
    bestVideos: [
      { title: "Python for Beginners — freeCodeCamp (6hrs)", url: "https://www.youtube.com/watch?v=eWRfhZUzrAc" },
      { title: "CS50P: Python — Harvard", url: "https://www.youtube.com/watch?v=nLRL_NcnK-4" },
      { title: "Python Tutorial — Corey Schafer Playlist", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" },
    ],
    bestCourses: [
      { title: "Python.org Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
      { title: "Automate the Boring Stuff — Free Book", url: "https://automatetheboringstuff.com/" },
      { title: "Google's Python Class", url: "https://developers.google.com/edu/python" },
    ],
    books: [
      { title: "Python Crash Course by Eric Matthes", url: "https://ehmatthes.github.io/pcc/" },
      { title: "Think Python by Allen Downey — free online", url: "https://greenteapress.com/thinkpython2/" },
    ],
    githubRepos: [
      { title: "TheAlgorithms/Python — 195K+ stars", url: "https://github.com/TheAlgorithms/Python" },
      { title: "30-Days-Of-Python", url: "https://github.com/Asabeneh/30-Days-Of-Python" },
    ],
    tools: "VS Code, Google Colab (free GPU!), Jupyter Notebooks, Replit",
    proTips: "Focus on: lists, dictionaries, functions, loops, and classes. Practice on LeetCode Easy or HackerRank. Google Colab is your best friend — free, browser-based, no setup needed.",
  },
  {
    id: "math", topic: "Math for AI — Linear Algebra & Calculus",
    description: "Just enough math to understand what's happening inside ML models. Key concepts: vectors, matrices, matrix multiplication (linear algebra), derivatives and gradients (calculus).",
    phase: "🔵 Phase 2: Python & Math", phaseColor: "#3b82f6", difficulty: "beginner", order: 3, week: 3,
    bestVideos: [
      { title: "Essence of Linear Algebra — 3Blue1Brown", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
      { title: "Essence of Calculus — 3Blue1Brown", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
      { title: "Mathematics for ML — Imperial College", url: "https://www.youtube.com/playlist?list=PLiiljHvN6z1_o1ztXTKWPRSJVnr3GVoY6" },
    ],
    bestCourses: [
      { title: "Khan Academy — Linear Algebra & Calculus", url: "https://www.khanacademy.org/math/linear-algebra" },
      { title: "Mathematics for ML — Coursera (Imperial College)", url: "https://www.coursera.org/specializations/mathematics-machine-learning" },
      { title: "MIT OpenCourseWare — 18.06 Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
    ],
    books: [
      { title: "Mathematics for ML — free PDF at mml-book.github.io", url: "http://mml-book.github.io" },
      { title: "No Bullshit Guide to Linear Algebra", url: "https://www.amazon.com/No-bullshit-guide-linear-algebra/dp/0992001021" },
    ],
    githubRepos: [
      { title: "Mathematics-for-ML — Companion notebooks", url: "https://github.com/mml-book/mml-book.github.io" },
      { title: "math-as-code — Math symbols explained in code", url: "https://github.com/Jam3/math-as-code" },
    ],
    tools: "NumPy, Desmos, GeoGebra, Wolfram Alpha",
    proTips: "Don't get stuck here for months. Spend 1-2 weeks getting the intuition from 3Blue1Brown videos, then move on. Intuition > memorization.",
  },
  {
    id: "statistics", topic: "Statistics & Probability for ML",
    description: "Core statistics: distributions, mean/median/mode, standard deviation, correlation, hypothesis testing, Bayes' theorem, probability basics.",
    phase: "🔵 Phase 2: Python & Math", phaseColor: "#3b82f6", difficulty: "beginner", order: 3.5, week: 4,
    bestVideos: [
      { title: "Statistics Fundamentals — StatQuest (Full Playlist)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" },
      { title: "Bayesian Statistics — 3Blue1Brown", url: "https://www.youtube.com/watch?v=HZGCoVF3YvM" },
    ],
    bestCourses: [
      { title: "Khan Academy — Statistics & Probability", url: "https://www.khanacademy.org/math/statistics-probability" },
      { title: "StatQuest — Clear, fun explanations", url: "https://statquest.org/" },
      { title: "Seeing Theory — Visual intro to probability", url: "https://seeing-theory.brown.edu/" },
    ],
    books: [
      { title: "Think Stats by Allen Downey — free, Python-based", url: "https://greenteapress.com/thinkstats2/" },
      { title: "Naked Statistics by Charles Wheelan", url: "https://www.amazon.com/Naked-Statistics-Stripping-Dread-Data/dp/039334777X" },
    ],
    githubRepos: [
      { title: "Think-Stats-2 — Book notebooks", url: "https://github.com/AllenDowney/ThinkStats2" },
      { title: "statistics-for-machine-learning", url: "https://github.com/tirthajyoti/Stats-Maths-with-Python" },
    ],
    tools: "SciPy (scipy.stats), statsmodels, Seeing Theory",
    proTips: "StatQuest on YouTube is the single best resource for statistics. Josh Starmer explains everything with humor and clarity.",
  },
  {
    id: "numpy-pandas", topic: "NumPy, Pandas & Data Visualization",
    description: "The essential Python data stack. NumPy for numerical computing, Pandas for data manipulation, Matplotlib/Seaborn for visualization.",
    phase: "🔵 Phase 2: Python & Math", phaseColor: "#3b82f6", difficulty: "beginner", order: 4, week: 4,
    bestVideos: [
      { title: "NumPy Full Tutorial — freeCodeCamp", url: "https://www.youtube.com/watch?v=QUT1VHiLmmI" },
      { title: "Pandas Tutorial — Corey Schafer", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS" },
      { title: "Data Analysis with Python — freeCodeCamp", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8" },
    ],
    bestCourses: [
      { title: "Kaggle Learn — Pandas & Data Viz", url: "https://www.kaggle.com/learn/pandas" },
      { title: "Python Data Science Handbook — Free Online", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" },
    ],
    books: [
      { title: "Python Data Science Handbook by Jake VanderPlas — free", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" },
      { title: "Storytelling with Data by Cole Nussbaumer", url: "https://www.amazon.com/Storytelling-Data-Visualization-Business-Professionals/dp/1119002257" },
    ],
    githubRepos: [
      { title: "PythonDataScienceHandbook — 43K+ stars", url: "https://github.com/jakevdp/PythonDataScienceHandbook" },
      { title: "numpy-100 — 100 NumPy exercises", url: "https://github.com/rougier/numpy-100" },
    ],
    tools: "Google Colab, Jupyter Notebooks, Kaggle Notebooks, VS Code",
    proTips: "Download a real dataset from Kaggle and play with it. Load it in Pandas, explore with .head(), .describe(), .value_counts(). This hands-on experience is worth more than 10 tutorials.",
  },
  {
    id: "intro-ml", topic: "Intro to Machine Learning",
    description: "The core ML concepts: supervised vs unsupervised learning, regression, classification, train/test splits, overfitting, bias-variance tradeoff.",
    phase: "🟡 Phase 3: Machine Learning", phaseColor: "#eab308", difficulty: "intermediate", order: 5, week: 5,
    bestVideos: [
      { title: "ML Specialization — Andrew Ng (Coursera)", url: "https://www.youtube.com/watch?v=jGwO_UgTS7I" },
      { title: "StatQuest: Machine Learning (Full Playlist)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF" },
      { title: "MIT 6.036 — Intro to Machine Learning", url: "https://www.youtube.com/playlist?list=PLxC_ffO4q_rW0bqQB80_vcQB09HOA3ClV" },
    ],
    bestCourses: [
      { title: "Andrew Ng's ML Specialization — Coursera", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
      { title: "fast.ai — Practical ML for Coders (Free)", url: "https://course.fast.ai/" },
      { title: "Google ML Crash Course (Free)", url: "https://developers.google.com/machine-learning/crash-course" },
    ],
    books: [
      { title: "Hands-On ML with Scikit-Learn, Keras & TF by Géron", url: "https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1098125975" },
      { title: "Introduction to Statistical Learning (ISLR) — free PDF", url: "http://statlearning.com" },
    ],
    githubRepos: [
      { title: "scikit-learn — The ML library (60K+ stars)", url: "https://github.com/scikit-learn/scikit-learn" },
      { title: "homemade-machine-learning — ML from scratch", url: "https://github.com/trekhleb/homemade-machine-learning" },
    ],
    tools: "scikit-learn, Google Colab, Kaggle, Weights & Biases",
    proTips: "Start with scikit-learn, NOT TensorFlow/PyTorch. Build simple models first: Linear Regression → Logistic Regression → Decision Trees → Random Forest. Do Kaggle's Titanic competition.",
  },
  {
    id: "model-evaluation", topic: "Model Evaluation & Experiment Tracking",
    description: "Learn evaluation metrics (accuracy, precision, recall, F1, AUC-ROC), confusion matrices, learning curves, cross-validation, and experiment tracking.",
    phase: "🟡 Phase 3: Machine Learning", phaseColor: "#eab308", difficulty: "intermediate", order: 5.5, week: 6,
    bestVideos: [
      { title: "ROC & AUC Explained — StatQuest", url: "https://www.youtube.com/watch?v=4jRBRDbJemM" },
      { title: "Confusion Matrix — StatQuest", url: "https://www.youtube.com/watch?v=Kdsp6soqA7o" },
      { title: "Cross-Validation — StatQuest", url: "https://www.youtube.com/watch?v=fSytzGwwBVw" },
    ],
    bestCourses: [
      { title: "scikit-learn — Model Evaluation Guide", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
      { title: "Weights & Biases — Free Courses", url: "https://wandb.ai/site/courses" },
    ],
    books: [
      { title: "Hands-On ML Ch. 3 by Géron — classification metrics", url: "https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1098125975" },
    ],
    githubRepos: [
      { title: "wandb/wandb — Experiment tracking (9K+ stars)", url: "https://github.com/wandb/wandb" },
      { title: "mlflow/mlflow — ML lifecycle platform", url: "https://github.com/mlflow/mlflow" },
    ],
    tools: "scikit-learn metrics, Weights & Biases, MLflow, TensorBoard, Optuna",
    proTips: "NEVER just use accuracy — it's misleading for imbalanced datasets. Learn when to use precision vs recall. Start tracking experiments from day 1 with Weights & Biases.",
  },
  {
    id: "sklearn-projects", topic: "Scikit-Learn & Hands-On ML Projects",
    description: "Get hands dirty with real ML projects. Learn the scikit-learn workflow: load → preprocess → feature engineer → model select → train → evaluate → tune.",
    phase: "🟡 Phase 3: Machine Learning", phaseColor: "#eab308", difficulty: "intermediate", order: 6, week: 6,
    bestVideos: [
      { title: "Scikit-Learn Full Course — freeCodeCamp", url: "https://www.youtube.com/watch?v=0B5eIE_1vpU" },
      { title: "Kaggle Competition Walkthrough — Rob Mulla", url: "https://www.youtube.com/watch?v=OaqJo6_RtaM" },
    ],
    bestCourses: [
      { title: "Kaggle Competitions", url: "https://www.kaggle.com/competitions" },
      { title: "Made With ML — End-to-end ML projects", url: "https://madewithml.com/" },
    ],
    books: [
      { title: "Hands-On ML Ch. 2-8 by Géron", url: "https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1098125975" },
      { title: "Approaching Any ML Problem by Abhishek Thakur", url: "https://www.amazon.com/Approaching-Almost-Machine-Learning-Problem/dp/8269211508" },
    ],
    githubRepos: [
      { title: "ageron/handson-ml3 — Notebooks (28K+ stars)", url: "https://github.com/ageron/handson-ml3" },
    ],
    tools: "scikit-learn, XGBoost, LightGBM, Kaggle Notebooks, Optuna",
    proTips: "Do at least 3 Kaggle competitions: Titanic (classification), House Prices (regression), and one tabular playground. Read winning solutions.",
  },
  {
    id: "milestone-ml", topic: "🧪 PRACTICE MILESTONE: Build Your First ML Project",
    description: "STOP and BUILD. Don't move to Deep Learning until you've completed at least 2 hands-on projects. Build a complete ML pipeline from scratch.",
    phase: "🟡 Phase 3: Machine Learning", phaseColor: "#eab308", difficulty: "intermediate", order: 6.5, week: 7, isMilestone: true,
    bestVideos: [
      { title: "End-to-End ML Project — Ken Jee", url: "https://www.youtube.com/watch?v=QWgg4w1SpJ8" },
      { title: "Titanic Competition Walkthrough — Rob Mulla", url: "https://www.youtube.com/watch?v=I3FBJdiExcg" },
    ],
    bestCourses: [
      { title: "Kaggle — Titanic Competition (Start here!)", url: "https://www.kaggle.com/c/titanic" },
      { title: "Streamlit — Build ML Web Apps", url: "https://streamlit.io/" },
    ],
    books: [
      { title: "Hands-On ML Ch. 2 by Géron — full project walkthrough", url: "https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1098125975" },
    ],
    githubRepos: [
      { title: "ageron/handson-ml3 — Follow-along notebooks", url: "https://github.com/ageron/handson-ml3" },
      { title: "streamlit — Build demos fast", url: "https://github.com/streamlit/streamlit" },
    ],
    tools: "Kaggle Notebooks, Google Colab, Streamlit, Gradio, scikit-learn",
    proTips: "MUST-DO: ① Titanic Survival Prediction ② House Price Prediction ③ Customer Churn Analysis ④ Build a web app with Streamlit showing your model.",
  },
  {
    id: "neural-networks", topic: "Neural Networks & Deep Learning Fundamentals",
    description: "The jump from classical ML to deep learning. Understand neurons, layers, activation functions, forward/backward propagation, loss functions, and gradient descent.",
    phase: "🟠 Phase 4: Deep Learning", phaseColor: "#f97316", difficulty: "intermediate", order: 7, week: 7,
    bestVideos: [
      { title: "Neural Networks — 3Blue1Brown (4-part, MUST WATCH)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
      { title: "Deep Learning Specialization — Andrew Ng", url: "https://www.youtube.com/watch?v=CS4cs9xVecg" },
      { title: "MIT 6.S191 — Intro to Deep Learning", url: "https://www.youtube.com/playlist?list=PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI" },
    ],
    bestCourses: [
      { title: "fast.ai — Practical Deep Learning (Free, TOP PICK)", url: "https://course.fast.ai/" },
      { title: "Andrew Ng's Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" },
      { title: "Neural Networks & Deep Learning — Free Book", url: "http://neuralnetworksanddeeplearning.com/" },
    ],
    books: [
      { title: "Dive into Deep Learning (d2l.ai) — free, interactive", url: "https://d2l.ai" },
      { title: "Deep Learning by Goodfellow, Bengio & Courville", url: "http://deeplearningbook.org" },
    ],
    githubRepos: [
      { title: "d2l-ai/d2l-en — Dive into Deep Learning (55K+ stars)", url: "https://github.com/d2l-ai/d2l-en" },
      { title: "labml-nn — Annotated PyTorch implementations", url: "https://github.com/labmlai/annotated_deep_learning_paper_implementations" },
    ],
    tools: "PyTorch, TensorFlow/Keras, Google Colab (free GPU), Weights & Biases",
    proTips: "Start with 3Blue1Brown's 4-part neural network series for visual intuition. Then move to fast.ai which teaches top-down. Choose PyTorch over TensorFlow.",
  },
  {
    id: "pytorch", topic: "PyTorch — The Deep Learning Framework",
    description: "PyTorch is the #1 deep learning framework in research and production. Learn tensors, autograd, nn.Module, training loops, data loaders, and GPU acceleration.",
    phase: "🟠 Phase 4: Deep Learning", phaseColor: "#f97316", difficulty: "intermediate", order: 8, week: 8,
    bestVideos: [
      { title: "PyTorch Full Course — freeCodeCamp (25hrs)", url: "https://www.youtube.com/watch?v=V_xro1bcAuA" },
      { title: "Andrej Karpathy — Neural Networks: Zero to Hero (LEGENDARY)", url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ" },
      { title: "PyTorch for Deep Learning — Daniel Bourke", url: "https://www.youtube.com/watch?v=Z_ikDlimN6A" },
    ],
    bestCourses: [
      { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/" },
      { title: "Learn PyTorch — learnpytorch.io", url: "https://www.learnpytorch.io/" },
      { title: "Lightning AI — Simplify PyTorch training", url: "https://lightning.ai/" },
    ],
    books: [
      { title: "Deep Learning with PyTorch — official PyTorch book", url: "https://www.amazon.com/Deep-Learning-PyTorch-Eli-Stevens/dp/1617295264" },
      { title: "Dive into Deep Learning (d2l.ai)", url: "https://d2l.ai" },
    ],
    githubRepos: [
      { title: "pytorch/pytorch — The framework (85K+ stars)", url: "https://github.com/pytorch/pytorch" },
      { title: "mrdbourke/pytorch-deep-learning — Course notebooks", url: "https://github.com/mrdbourke/pytorch-deep-learning" },
      { title: "labmlai/annotated_deep_learning_paper_implementations", url: "https://github.com/labmlai/annotated_deep_learning_paper_implementations" },
    ],
    tools: "PyTorch, PyTorch Lightning, Google Colab (free GPU/TPU), Weights & Biases, Hugging Face",
    proTips: "Andrej Karpathy's 'Neural Networks: Zero to Hero' playlist is the single best resource for learning deep learning from scratch. He builds everything from raw Python.",
  },
  {
    id: "cnns", topic: "CNNs & Computer Vision",
    description: "Convolutional Neural Networks — how AI 'sees'. Learn convolution operations, pooling, classic architectures (LeNet, AlexNet, VGG, ResNet), transfer learning.",
    phase: "🟠 Phase 4: Deep Learning", phaseColor: "#f97316", difficulty: "intermediate", order: 9, week: 9,
    bestVideos: [
      { title: "Stanford CS231n — CNNs for Visual Recognition", url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv" },
      { title: "Transfer Learning Explained — Krish Naik", url: "https://www.youtube.com/watch?v=yofjFQddwHE" },
    ],
    bestCourses: [
      { title: "Stanford CS231n — Course Notes", url: "https://cs231n.github.io/" },
      { title: "Kaggle Learn — Computer Vision", url: "https://www.kaggle.com/learn/computer-vision" },
      { title: "CNN Explainer — Interactive Visualization", url: "https://poloclub.github.io/cnn-explainer/" },
    ],
    books: [
      { title: "Deep Learning for Vision Systems by Elgendy", url: "https://www.amazon.com/Deep-Learning-Vision-Systems-Mohamed/dp/1617296198" },
    ],
    githubRepos: [
      { title: "pytorch/vision (torchvision)", url: "https://github.com/pytorch/vision" },
      { title: "ultralytics — YOLO object detection (50K+ stars)", url: "https://github.com/ultralytics/ultralytics" },
    ],
    tools: "torchvision, OpenCV, Albumentations, Roboflow, Hugging Face",
    proTips: "Don't build from scratch — use transfer learning. Take a pretrained ResNet, freeze early layers, fine-tune on your data. You'll get 95%+ accuracy with little data.",
  },
  {
    id: "rnns", topic: "RNNs, LSTMs & Sequence Models",
    description: "Recurrent Neural Networks process sequential data. Learn vanilla RNNs, vanishing gradient problem, LSTMs, GRUs, and seq2seq models.",
    phase: "🟠 Phase 4: Deep Learning", phaseColor: "#f97316", difficulty: "intermediate", order: 10, week: 10,
    bestVideos: [
      { title: "RNN & LSTM Explained — StatQuest", url: "https://www.youtube.com/watch?v=AsNTP8Kwu80" },
      { title: "Stanford CS224n — RNNs Lecture", url: "https://www.youtube.com/watch?v=6niqTuYFZLQ" },
    ],
    bestCourses: [
      { title: "Andrew Ng's Sequence Models — Coursera", url: "https://www.coursera.org/learn/nlp-sequence-models" },
      { title: "Understanding LSTM Networks — Colah's Blog (CLASSIC)", url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/" },
    ],
    books: [
      { title: "Dive into Deep Learning Ch. 9-10 — RNNs", url: "https://d2l.ai/chapter_recurrent-neural-networks/" },
    ],
    githubRepos: [
      { title: "karpathy/char-rnn — Character-level RNN", url: "https://github.com/karpathy/char-rnn" },
    ],
    tools: "PyTorch (nn.LSTM, nn.GRU), TensorFlow/Keras, Google Colab",
    proTips: "RNNs/LSTMs are being replaced by Transformers, but understanding them is crucial for historical context and time-series problems. Read Chris Olah's LSTM blog post — best explanation ever.",
  },
  {
    id: "transformers", topic: "Transformers & Attention Mechanism",
    description: "THE architecture that changed everything. Understand self-attention, multi-head attention, positional encoding, encoder-decoder structure.",
    phase: "🟠 Phase 4: Deep Learning", phaseColor: "#f97316", difficulty: "advanced", order: 11, week: 11,
    bestVideos: [
      { title: "Attention is All You Need — Yannic Kilcher", url: "https://www.youtube.com/watch?v=iDulhoQ2pro" },
      { title: "Andrej Karpathy — Let's build GPT from scratch", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
      { title: "Stanford CS25 — Transformers United", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rNiJRchCzutFw5ItR_Z27CM" },
    ],
    bestCourses: [
      { title: "The Illustrated Transformer — Jay Alammar (MUST READ)", url: "https://jalammar.github.io/illustrated-transformer/" },
      { title: "Harvard NLP — The Annotated Transformer", url: "https://nlp.seas.harvard.edu/annotated-transformer/" },
      { title: "Hugging Face NLP Course (Free)", url: "https://huggingface.co/learn/nlp-course" },
    ],
    books: [
      { title: "Attention Is All You Need (2017) — THE paper", url: "https://arxiv.org/abs/1706.03762" },
      { title: "Formal Algorithms for Transformers — DeepMind", url: "https://arxiv.org/abs/2207.09238" },
    ],
    githubRepos: [
      { title: "karpathy/nanoGPT — Build GPT from scratch (38K+ stars)", url: "https://github.com/karpathy/nanoGPT" },
      { title: "huggingface/transformers — THE library (140K+ stars)", url: "https://github.com/huggingface/transformers" },
      { title: "karpathy/minGPT — Minimal GPT", url: "https://github.com/karpathy/minGPT" },
    ],
    tools: "Hugging Face Transformers, PyTorch, Google Colab, Weights & Biases",
    proTips: "Karpathy's 'Let's build GPT from scratch' (2hrs) is THE best way to learn transformers. Pair with Jay Alammar's Illustrated Transformer blog post for visual intuition.",
  },
  {
    id: "milestone-dl", topic: "🏗️ PRACTICE MILESTONE: Deep Learning Projects",
    description: "BUILD before moving to NLP. Complete at least 2 deep learning projects: one in CV and one sequence task. Deploy at least one as a live web app.",
    phase: "🟠 Phase 4: Deep Learning", phaseColor: "#f97316", difficulty: "advanced", order: 11.5, week: 12, isMilestone: true,
    bestVideos: [
      { title: "Build 5 Deep Learning Projects — Nicholas Renotte", url: "https://www.youtube.com/watch?v=jc4_O1Mf-CQ" },
      { title: "Build a Neural Network from Scratch — Samson Zhang", url: "https://www.youtube.com/watch?v=w8yWXqWQYmU" },
    ],
    bestCourses: [
      { title: "Hugging Face Spaces — Deploy for Free", url: "https://huggingface.co/spaces" },
      { title: "Papers With Code — Reproduce a Paper", url: "https://paperswithcode.com/" },
      { title: "Gradio — Build ML Demos in Minutes", url: "https://www.gradio.app/" },
    ],
    books: [],
    githubRepos: [
      { title: "gradio-app/gradio — Quick demo builder", url: "https://github.com/gradio-app/gradio" },
      { title: "lucidrains/vit-pytorch — Vision Transformer implementations", url: "https://github.com/lucidrains/vit-pytorch" },
    ],
    tools: "PyTorch, Hugging Face Spaces, Gradio, FastAPI, Docker, Google Colab",
    proTips: "MUST-DO: ① Image classifier with transfer learning ② Text sentiment analyzer ③ Neural network from SCRATCH ④ Deploy one project to Hugging Face Spaces.",
  },
  {
    id: "nlp", topic: "NLP & Text Processing Fundamentals",
    description: "How AI understands text. Learn tokenization, word embeddings (Word2Vec, GloVe), text preprocessing, sentiment analysis, named entity recognition.",
    phase: "🔴 Phase 5: NLP & LLMs", phaseColor: "#ef4444", difficulty: "intermediate", order: 12, week: 12,
    bestVideos: [
      { title: "Stanford CS224n — NLP with Deep Learning", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4" },
      { title: "Word2Vec Explained — StatQuest", url: "https://www.youtube.com/watch?v=viZrOnJclY0" },
    ],
    bestCourses: [
      { title: "Stanford CS224n — Full Course", url: "https://web.stanford.edu/class/cs224n/" },
      { title: "Hugging Face NLP Course (Free)", url: "https://huggingface.co/learn/nlp-course" },
      { title: "spaCy 101 — Official Tutorial", url: "https://spacy.io/usage/spacy-101" },
    ],
    books: [
      { title: "Speech and Language Processing by Jurafsky & Martin — free draft", url: "https://web.stanford.edu/~jurafsky/slp3/" },
      { title: "NLP with Transformers by Tunstall et al.", url: "https://www.amazon.com/Natural-Language-Processing-Transformers-Applications/dp/1098136799" },
    ],
    githubRepos: [
      { title: "huggingface/transformers — 140K+ stars", url: "https://github.com/huggingface/transformers" },
      { title: "explosion/spaCy — Industrial NLP (30K+ stars)", url: "https://github.com/explosion/spaCy" },
    ],
    tools: "Hugging Face, spaCy, NLTK, Google Colab, Kaggle",
    proTips: "Start with Hugging Face's free NLP course — it's practical and modern. spaCy is the go-to for production NLP. Stanford CS224n lectures are unmatched in depth.",
  },
  {
    id: "prompt-engineering", topic: "Prompt Engineering & Using LLMs Effectively",
    description: "The #1 most practical AI skill in 2025-2026. Learn zero-shot, few-shot, chain-of-thought, ReAct prompting, system prompts, and structured outputs.",
    phase: "🔴 Phase 5: NLP & LLMs", phaseColor: "#ef4444", difficulty: "intermediate", order: 12.5, week: 13,
    bestVideos: [
      { title: "Prompt Engineering Full Course — freeCodeCamp", url: "https://www.youtube.com/watch?v=_ZvnD96hOZo" },
      { title: "ChatGPT Prompt Engineering — DeepLearning.AI", url: "https://www.youtube.com/watch?v=H4YK_7MAckk" },
    ],
    bestCourses: [
      { title: "Anthropic — Prompt Engineering Guide (MUST READ)", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
      { title: "OpenAI — Prompt Engineering Guide", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
      { title: "Learn Prompting — Free Course", url: "https://learnprompting.org/" },
    ],
    books: [
      { title: "Chain-of-Thought Prompting Elicits Reasoning — Google (2022)", url: "https://arxiv.org/abs/2201.11903" },
    ],
    githubRepos: [
      { title: "dair-ai/Prompt-Engineering-Guide — 52K+ stars", url: "https://github.com/dair-ai/Prompt-Engineering-Guide" },
      { title: "anthropics/prompt-eng-interactive-tutorial", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial" },
    ],
    tools: "Claude, ChatGPT, Gemini, Anthropic Workbench, OpenAI Playground",
    proTips: "Start with Anthropic's prompt engineering guide. Key techniques: (1) Be specific (2) Use XML tags (3) Chain-of-thought (4) Few-shot examples (5) System prompts. Practice daily.",
  },
  {
    id: "llms", topic: "Large Language Models — GPT, BERT & Beyond",
    description: "The era of LLMs. Understand how GPT, BERT, Claude, Llama work. Learn pre-training, fine-tuning, prompt engineering, RLHF, and scaling laws.",
    phase: "🔴 Phase 5: NLP & LLMs", phaseColor: "#ef4444", difficulty: "advanced", order: 13, week: 13,
    bestVideos: [
      { title: "Andrej Karpathy — Intro to Large Language Models", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
      { title: "Andrej Karpathy — Let's build GPT from scratch", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
      { title: "BERT Explained — CodeEmporium", url: "https://www.youtube.com/watch?v=xI0HHN5XKDo" },
    ],
    bestCourses: [
      { title: "Andrej Karpathy's LLM Course (Free)", url: "https://karpathy.ai/" },
      { title: "LLM University — Cohere (Free)", url: "https://docs.cohere.com/docs/llmu" },
      { title: "The Illustrated GPT-2 — Jay Alammar", url: "https://jalammar.github.io/illustrated-gpt2/" },
    ],
    books: [
      { title: "GPT-3: Language Models are Few-Shot Learners (2020)", url: "https://arxiv.org/abs/2005.14165" },
      { title: "NLP with Transformers — O'Reilly", url: "https://www.amazon.com/Natural-Language-Processing-Transformers-Applications/dp/1098136799" },
    ],
    githubRepos: [
      { title: "meta-llama/llama — Meta's open LLM", url: "https://github.com/meta-llama/llama" },
      { title: "karpathy/nanoGPT — Train your own GPT", url: "https://github.com/karpathy/nanoGPT" },
      { title: "ollama/ollama — Run LLMs locally (100K+ stars)", url: "https://github.com/ollama/ollama" },
    ],
    tools: "Hugging Face, Ollama, OpenAI API, Anthropic API, LangChain, vLLM",
    proTips: "Karpathy's LLM intro talk is the best 1-hour overview. Then try running a model locally with Ollama (one command). Understanding how to USE LLMs is as important as how they work.",
  },
  {
    id: "fine-tuning-rag", topic: "Fine-Tuning & RAG — Customizing LLMs",
    description: "Make LLMs work for YOUR use case. Learn fine-tuning (LoRA, QLoRA), RAG, vector databases, embeddings, and building LLM-powered applications.",
    phase: "🔴 Phase 5: NLP & LLMs", phaseColor: "#ef4444", difficulty: "advanced", order: 14, week: 14,
    bestVideos: [
      { title: "RAG Explained in 5 Minutes — IBM", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M" },
      { title: "Fine-Tuning LLMs with LoRA — Sebastian Raschka", url: "https://www.youtube.com/watch?v=PXWYUTMt-AU" },
      { title: "Vector Databases Explained — Fireship", url: "https://www.youtube.com/watch?v=klTvEwg3oJ4" },
    ],
    bestCourses: [
      { title: "LangChain Documentation", url: "https://python.langchain.com/docs/get_started/introduction" },
      { title: "Pinecone Learning Center — RAG", url: "https://www.pinecone.io/learn/" },
      { title: "Full Stack LLM Bootcamp (Free)", url: "https://fullstackdeeplearning.com/llm-bootcamp/" },
    ],
    books: [
      { title: "LoRA: Low-Rank Adaptation paper (2021)", url: "https://arxiv.org/abs/2106.09685" },
      { title: "Retrieval-Augmented Generation paper — Meta (2020)", url: "https://arxiv.org/abs/2005.11401" },
    ],
    githubRepos: [
      { title: "langchain-ai/langchain — LLM framework (100K+ stars)", url: "https://github.com/langchain-ai/langchain" },
      { title: "chroma-core/chroma — Vector database", url: "https://github.com/chroma-core/chroma" },
      { title: "run-llama/llama_index — RAG framework", url: "https://github.com/run-llama/llama_index" },
    ],
    tools: "LangChain, LlamaIndex, ChromaDB, Pinecone, Hugging Face PEFT, Ollama",
    proTips: "RAG is the most practical skill for 2025-2026. Start by building a simple RAG app: embed documents in ChromaDB, retrieve chunks, pass to LLM. LangChain or LlamaIndex make this easy.",
  },
  {
    id: "milestone-llm", topic: "🚀 PRACTICE MILESTONE: Build & Deploy an LLM App",
    description: "The capstone practice before specializing. Build a complete LLM-powered application: a RAG chatbot, an AI agent, or a document Q&A system.",
    phase: "🔴 Phase 5: NLP & LLMs", phaseColor: "#ef4444", difficulty: "advanced", order: 14.5, week: 15, isMilestone: true,
    bestVideos: [
      { title: "Build a RAG App from Scratch — LangChain", url: "https://www.youtube.com/watch?v=tcqEUSNCn8I" },
      { title: "Full Stack AI App with Next.js — Vercel", url: "https://www.youtube.com/watch?v=mkJbEP5GeRA" },
    ],
    bestCourses: [
      { title: "Full Stack LLM Bootcamp (Free)", url: "https://fullstackdeeplearning.com/llm-bootcamp/" },
      { title: "Vercel AI SDK", url: "https://sdk.vercel.ai/" },
    ],
    books: [],
    githubRepos: [
      { title: "langchain-ai/langchain", url: "https://github.com/langchain-ai/langchain" },
      { title: "streamlit/streamlit — Web app framework", url: "https://github.com/streamlit/streamlit" },
      { title: "chroma-core/chroma — Vector store", url: "https://github.com/chroma-core/chroma" },
    ],
    tools: "LangChain, LlamaIndex, ChromaDB, Streamlit, Gradio, Hugging Face Spaces, Vercel",
    proTips: "MUST-DO: ① Document Q&A Bot (RAG) ② AI Writing Assistant ③ Multi-tool AI Agent ④ Deploy to Hugging Face Spaces or Vercel for a live demo URL.",
  },
  {
    id: "generative-ai", topic: "Generative AI — Images, Audio & Video",
    description: "Beyond text: learn how AI generates images (Stable Diffusion, DALL-E), audio (speech synthesis), and video. Understand diffusion models, GANs, VAEs.",
    phase: "🟣 Phase 6: Specialize & Build", phaseColor: "#a855f7", difficulty: "advanced", order: 15, week: 15,
    bestVideos: [
      { title: "How AI Image Generation Works — Computerphile", url: "https://www.youtube.com/watch?v=1CIpzeNxIhU" },
      { title: "Stable Diffusion Explained — Yannic Kilcher", url: "https://www.youtube.com/watch?v=HoKDTa5jHvg" },
    ],
    bestCourses: [
      { title: "Hugging Face — Diffusion Models Course (Free)", url: "https://huggingface.co/learn/diffusion-course" },
      { title: "DeepLearning.AI — How Diffusion Models Work", url: "https://www.deeplearning.ai/short-courses/how-diffusion-models-work/" },
    ],
    books: [
      { title: "DDPM — foundational diffusion paper", url: "https://arxiv.org/abs/2006.11239" },
      { title: "GANs by Ian Goodfellow (2014)", url: "https://arxiv.org/abs/1406.2661" },
    ],
    githubRepos: [
      { title: "AUTOMATIC1111/stable-diffusion-webui (140K+ stars)", url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui" },
      { title: "comfyanonymous/ComfyUI", url: "https://github.com/comfyanonymous/ComfyUI" },
      { title: "openai/whisper — Speech recognition", url: "https://github.com/openai/whisper" },
    ],
    tools: "Stable Diffusion, ComfyUI, DALL-E, Midjourney, Runway ML, Whisper",
    proTips: "Diffusion models have replaced GANs for image generation. Start by running Stable Diffusion locally with ComfyUI. For audio, OpenAI's Whisper is open-source and incredible.",
  },
  {
    id: "ai-agents", topic: "AI Agents & Agentic AI",
    description: "The hottest frontier in AI (2025-2026). AI agents can plan, use tools, browse the web, write code, and complete multi-step tasks autonomously.",
    phase: "🟣 Phase 6: Specialize & Build", phaseColor: "#a855f7", difficulty: "advanced", order: 15.5, week: 16,
    bestVideos: [
      { title: "What are AI Agents? — IBM Technology", url: "https://www.youtube.com/watch?v=F8NKVhkZZWI" },
      { title: "Andrew Ng on AI Agents — Sequoia Talk", url: "https://www.youtube.com/watch?v=sal78ACtGTc" },
    ],
    bestCourses: [
      { title: "DeepLearning.AI — AI Agents in LangGraph", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/" },
      { title: "Anthropic — Building Effective Agents Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/agentic" },
      { title: "CrewAI Documentation", url: "https://docs.crewai.com/" },
    ],
    books: [
      { title: "ReAct: Synergizing Reasoning and Acting in LLMs (2022)", url: "https://arxiv.org/abs/2210.03629" },
      { title: "Toolformer: Language Models Can Teach Themselves (2023)", url: "https://arxiv.org/abs/2302.04761" },
    ],
    githubRepos: [
      { title: "langchain-ai/langgraph — Agent framework", url: "https://github.com/langchain-ai/langgraph" },
      { title: "crewAIInc/crewAI — Multi-agent (25K+ stars)", url: "https://github.com/crewAIInc/crewAI" },
      { title: "microsoft/autogen — Multi-agent conversations", url: "https://github.com/microsoft/autogen" },
    ],
    tools: "LangGraph, CrewAI, AutoGen, Claude with tool use, OpenAI Assistants API",
    proTips: "AI Agents are where the industry is moving. Start by building a simple ReAct agent with LangGraph — give an LLM access to a calculator and web search, watch it reason.",
  },
  {
    id: "mlops", topic: "MLOps & Deploying AI Models",
    description: "Getting models from notebook to production. Learn model serving (FastAPI), containerization (Docker), monitoring, CI/CD for ML, and cloud deployment.",
    phase: "🟣 Phase 6: Specialize & Build", phaseColor: "#a855f7", difficulty: "advanced", order: 16, week: 16,
    bestVideos: [
      { title: "MLOps Full Course — freeCodeCamp", url: "https://www.youtube.com/watch?v=Kvp8R0YVZE4" },
      { title: "Docker for Data Science — Rob Mulla", url: "https://www.youtube.com/watch?v=0qG_0CPQhpg" },
    ],
    bestCourses: [
      { title: "Made With ML — MLOps Course (Free)", url: "https://madewithml.com/" },
      { title: "Full Stack Deep Learning (Free)", url: "https://fullstackdeeplearning.com/" },
    ],
    books: [
      { title: "Designing ML Systems by Chip Huyen — THE MLOps book", url: "https://www.amazon.com/Designing-Machine-Learning-Systems-Production-Ready/dp/1098107969" },
    ],
    githubRepos: [
      { title: "mlflow/mlflow — ML lifecycle (19K+ stars)", url: "https://github.com/mlflow/mlflow" },
      { title: "bentoml/BentoML — Model serving", url: "https://github.com/bentoml/BentoML" },
      { title: "gradio-app/gradio — Quick ML demos (35K+ stars)", url: "https://github.com/gradio-app/gradio" },
    ],
    tools: "Docker, FastAPI, Gradio, Streamlit, MLflow, W&B, Hugging Face Spaces, AWS SageMaker",
    proTips: "Build a portfolio project end-to-end: train → FastAPI → Docker → deploy to Hugging Face Spaces. Chip Huyen's MLOps book is essential reading.",
  },
  {
    id: "rl", topic: "Reinforcement Learning Deep Dive",
    description: "Go deeper into RL: Q-learning, DQN, Policy Gradients, PPO, Actor-Critic methods, and RLHF (how ChatGPT was trained).",
    phase: "🟣 Phase 6: Specialize & Build", phaseColor: "#a855f7", difficulty: "advanced", order: 16.5, week: 17,
    bestVideos: [
      { title: "David Silver's RL Course — DeepMind (LEGENDARY)", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ" },
      { title: "Deep RL — Pieter Abbeel (UC Berkeley)", url: "https://www.youtube.com/playlist?list=PL_iWQOsE6TfVYGEGiAOMaOzzv41Jfm_Ps" },
      { title: "AlphaGo Documentary — DeepMind", url: "https://www.youtube.com/watch?v=WXuK6gekU1Y" },
    ],
    bestCourses: [
      { title: "Spinning Up in Deep RL — OpenAI (Free)", url: "https://spinningup.openai.com/" },
      { title: "Hugging Face Deep RL Course (Free)", url: "https://huggingface.co/learn/deep-rl-course" },
    ],
    books: [
      { title: "RL: An Introduction by Sutton & Barto — THE RL bible (free)", url: "http://incompleteideas.net/book/the-book-2nd.html" },
    ],
    githubRepos: [
      { title: "openai/spinningup — RL educational resource", url: "https://github.com/openai/spinningup" },
      { title: "DLR-RM/stable-baselines3 — RL algorithms", url: "https://github.com/DLR-RM/stable-baselines3" },
      { title: "huggingface/trl — RLHF training library", url: "https://github.com/huggingface/trl" },
    ],
    tools: "Gymnasium (OpenAI Gym successor), Stable Baselines3, Hugging Face TRL, Unity ML-Agents",
    proTips: "David Silver's course is the gold standard for RL theory. Understanding PPO is especially important because it's the algorithm behind RLHF.",
  },
  {
    id: "portfolio", topic: "Build Your AI Portfolio & Get Hired",
    description: "Turn your skills into a career. Build 3-5 portfolio projects, contribute to open source, write technical blog posts, compete on Kaggle.",
    phase: "🟣 Phase 6: Specialize & Build", phaseColor: "#a855f7", difficulty: "advanced", order: 17, week: 17,
    bestVideos: [
      { title: "Building an AI Portfolio — Daniel Bourke", url: "https://www.youtube.com/watch?v=1aR8oz82KjE" },
      { title: "ML Interview Prep — Krish Naik", url: "https://www.youtube.com/watch?v=73d3F39iW4E" },
    ],
    bestCourses: [
      { title: "Kaggle — Competitions & Datasets", url: "https://www.kaggle.com/" },
      { title: "Chip Huyen's ML Interviews Book (Free)", url: "https://huyenchip.com/ml-interviews-book/" },
    ],
    books: [
      { title: "Introduction to ML Interviews by Chip Huyen — free", url: "https://huyenchip.com/ml-interviews-book/" },
      { title: "Designing ML Systems by Chip Huyen", url: "https://www.amazon.com/Designing-Machine-Learning-Systems-Production-Ready/dp/1098107969" },
    ],
    githubRepos: [
      { title: "donnemartin/system-design-primer — 280K+ stars", url: "https://github.com/donnemartin/system-design-primer" },
      { title: "eugeneyan/applied-ml — Real-world ML papers", url: "https://github.com/eugeneyan/applied-ml" },
    ],
    tools: "GitHub, Kaggle, Hugging Face Spaces, LinkedIn, Medium/Substack",
    proTips: "Your GitHub IS your resume. Build 3 standout projects: (1) end-to-end ML app with live demo, (2) Kaggle top 10%, (3) a novel creative project. Write blog posts explaining what you built.",
  },
  {
    id: "ai-safety", topic: "AI Safety, Ethics & Responsible AI",
    description: "The most important topic most courses skip. Understand bias, fairness, interpretability, alignment, governance, hallucinations, and responsible deployment.",
    phase: "🟣 Phase 6: Specialize & Build", phaseColor: "#a855f7", difficulty: "intermediate", order: 17.5, week: 17,
    bestVideos: [
      { title: "AI Safety — Robert Miles (Full Playlist)", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZCRwzHZVB0efAYAfXaah0dc" },
      { title: "Bias in AI — IBM Technology", url: "https://www.youtube.com/watch?v=X3UKsKxnCPM" },
    ],
    bestCourses: [
      { title: "AI Safety Fundamentals — BlueDot Impact (Free)", url: "https://aisafetyfundamentals.com/" },
      { title: "Anthropic — AI Safety Research", url: "https://www.anthropic.com/research" },
      { title: "Google — Responsible AI Practices", url: "https://ai.google/responsibility/responsible-ai-practices/" },
    ],
    books: [
      { title: "Weapons of Math Destruction by Cathy O'Neil", url: "https://www.amazon.com/Weapons-Math-Destruction-Increases-Inequality/dp/0553418815" },
      { title: "The Alignment Problem by Brian Christian", url: "https://www.amazon.com/Alignment-Problem-Machine-Learning-Values/dp/0393635821" },
    ],
    githubRepos: [
      { title: "fairlearn — ML fairness toolkit", url: "https://github.com/fairlearn/fairlearn" },
      { title: "slundberg/shap — Explain any ML model (23K+ stars)", url: "https://github.com/slundberg/shap" },
    ],
    tools: "Fairlearn, SHAP, LIME, AI Fairness 360 (IBM), What-If Tool (Google)",
    proTips: "This isn't optional anymore. The EU AI Act is now law — understanding AI regulation is a career advantage. Read 'Weapons of Math Destruction'.",
  },
  {
    id: "research-papers", topic: "Reading Research Papers & Staying Current",
    description: "AI moves fast — new papers weekly. Learn how to read ML papers efficiently, stay current, follow the right researchers.",
    phase: "🟣 Phase 6: Specialize & Build", phaseColor: "#a855f7", difficulty: "advanced", order: 18, week: 18,
    bestVideos: [
      { title: "How to Read ML Papers — Andrew Ng", url: "https://www.youtube.com/watch?v=733m6qBH-jI" },
      { title: "Yannic Kilcher — Paper Explanations (Best Channel)", url: "https://www.youtube.com/@YannicKilcher" },
      { title: "Two Minute Papers — Fast Summaries", url: "https://www.youtube.com/@TwoMinutePapers" },
    ],
    bestCourses: [
      { title: "arXiv — Where all AI papers are published", url: "https://arxiv.org/list/cs.AI/recent" },
      { title: "Papers With Code — Papers + Code", url: "https://paperswithcode.com/" },
      { title: "Semantic Scholar — AI-powered paper search", url: "https://www.semanticscholar.org/" },
    ],
    books: [
      { title: "Attention Is All You Need (2017) — start here", url: "https://arxiv.org/abs/1706.03762" },
      { title: "How to Read a Paper by S. Keshav", url: "http://ccr.sigcomm.org/online/files/p83-keshavA.pdf" },
    ],
    githubRepos: [
      { title: "papers-we-love — Classic CS papers", url: "https://github.com/papers-we-love/papers-we-love" },
      { title: "dair-ai/ML-Papers-of-the-Week", url: "https://github.com/dair-ai/ML-Papers-of-the-Week" },
    ],
    tools: "arXiv, Papers With Code, Semantic Scholar, Google Scholar, Zotero, Notion",
    proTips: "Don't read papers cover-to-cover — read Abstract → Conclusion → Figures → Methods. Yannic Kilcher's channel is the best for paper walkthroughs. Subscribe to The Batch (Andrew Ng).",
  },
] as RoadmapTopic[]).sort((a, b) => a.order - b.order);
