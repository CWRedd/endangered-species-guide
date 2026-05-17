// Species Identification Quiz

const quizData = [
  {
    id: 1,
    question: "What type of organism did you see?",
    options: [
      { text: "🐦 Bird", value: "bird" },
      { text: "🦊 Mammal", value: "mammal" },
      { text: "🐢 Reptile", value: "reptile" },
      { text: "🌿 Plant", value: "plant" }
    ]
  },
  {
    id: 2,
    question: "What size was it?",
    options: [
      { text: "📏 Small (hand-sized or smaller)", value: "small" },
      { text: "📐 Medium (cat-sized)", value: "medium" },
      { text: "📊 Large (dog-sized or larger)", value: "large" },
      { text: "🌳 Very Large (larger than humans)", value: "xlarge" }
    ]
  },
  {
    id: 3,
    question: "What habitat were you in?",
    options: [
      { text: "🌲 Forest", value: "forest" },
      { text: "🌾 Grassland/Field", value: "grassland" },
      { text: "💧 Water/Wetland", value: "water" },
      { text: "🏙️ Urban/Suburban", value: "urban" }
    ]
  },
  {
    id: 4,
    question: "What was the primary color?",
    options: [
      { text: "🟤 Brown/Tan", value: "brown" },
      { text: "⚫ Black/Dark", value: "black" },
      { text: "🟢 Green", value: "green" },
      { text: "🟡 Yellow/Orange/Red", value: "bright" }
    ]
  },
  {
    id: 5,
    question: "Do you think it's invasive or native?",
    options: [
      { text: "✓ Native (belongs here)", value: "native" },
      { text: "✕ Invasive (seems out of place)", value: "invasive" },
      { text: "❓ Not sure", value: "unsure" },
      { text: "🔄 Possibly both", value: "both" }
    ]
  }
];

let currentQuestion = 0;
let answers = {};

function initializeQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;
  
  showQuestion();
}

function showQuestion() {
  const quiz = quizData[currentQuestion];
  const quizContainer = document.getElementById('quiz-container');
  
  if (currentQuestion >= quizData.length) {
    showResults();
    return;
  }
  
  const progress = ((currentQuestion) / quizData.length) * 100;
  
  quizContainer.innerHTML = `
    <div class="quiz-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="progress-text">Question ${currentQuestion + 1} of ${quizData.length}</div>
    </div>
    
    <div class="quiz-question">
      <h3>${quiz.question}</h3>
      <div class="quiz-options">
        ${quiz.options.map((option, idx) => `
          <div class="quiz-option" onclick="selectAnswer('${option.value}', this)">
            <div class="quiz-option-arrow">${option.text.split(' ')[0]}</div>
            <div class="quiz-option-text">${option.text.substring(option.text.indexOf(' ') + 1)}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: space-between;">
      <button onclick="previousQuestion()" style="padding: 10px 16px; background: #e5e5e5; border: none; border-radius: 6px; cursor: pointer; ${currentQuestion === 0 ? 'opacity: 0.5; cursor: not-allowed;' : ''}">← Previous</button>
      <button onclick="nextQuestion()" id="next-btn" style="padding: 10px 16px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer;" disabled>Next →</button>
    </div>
  `;
}

function selectAnswer(value, element) {
  // Remove previous selection
  document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
  
  // Add selection to clicked option
  element.classList.add('selected');
  answers[quizData[currentQuestion].id] = value;
  
  // Enable next button
  document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
  if (answers[quizData[currentQuestion].id]) {
    currentQuestion++;
    showQuestion();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function showResults() {
  const quizContainer = document.getElementById('quiz-container');
  
  // Determine likely species based on answers
  let recommendations = getRecommendations();
  
  quizContainer.innerHTML = `
    <div class="quiz-result">
      <h3>🎉 Based on Your Answers</h3>
      <p>Here are species that match your description:</p>
      <div style="text-align: left; margin: 20px 0;">
        ${recommendations.map(rec => `
          <div style="background: #f0f0f0; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
            <strong>${rec.name}</strong> (${rec.scientific})<br>
            <small>${rec.reason}</small>
          </div>
        `).join('')}
      </div>
      <p>Next steps:</p>
      <ul style="text-align: left; display: inline-block;">
        <li>Take a clear photo</li>
        <li>Note the exact location</li>
        <li>Report to iNaturalist or EDDMapS</li>
        <li>Share your findings!</li>
      </ul>
      <button onclick="restartQuiz()" style="margin-top: 20px; padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer;">Start Over</button>
      <a href="report-species.html" style="margin-left: 10px; padding: 10px 20px; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; text-decoration: none; display: inline-block;">Report This Sighting →</a>
    </div>
  `;
}

function getRecommendations() {
  const ans = answers;
  const recommendations = [];
  
  // Simple matching logic
  if (ans[1] === 'bird' && ans[3] === 'bright') {
    recommendations.push({
      name: 'Red-tailed Hawk',
      scientific: 'Buteo jamaicensis',
      reason: 'Large bird, reddish coloring, open areas'
    });
  }
  
  if (ans[1] === 'mammal' && ans[2] === 'large' && ans[3] === 'black') {
    recommendations.push({
      name: 'Black Bear',
      scientific: 'Ursus americanus',
      reason: 'Large dark mammal, forest habitat'
    });
  }
  
  if (ans[1] === 'reptile' && ans[2] === 'small' && ans[3] === 'brown') {
    recommendations.push({
      name: 'Eastern Box Turtle',
      scientific: 'Terrapene carolina',
      reason: 'Small reptile, brown coloring, ground level'
    });
  }
  
  if (ans[1] === 'plant' && ans[3] === 'green') {
    recommendations.push({
      name: 'Southern Magnolia',
      scientific: 'Magnolia grandiflora',
      reason: 'Native evergreen tree, Georgia forests'
    });
  }
  
  if (ans[2] === 'grassland' && ans[5] === 'invasive') {
    recommendations.push({
      name: 'Japanese Honeysuckle',
      scientific: 'Lonicera japonica',
      reason: 'Invasive vine, spreads rapidly'
    });
  }
  
  if (ans[3] === 'green' && ans[5] === 'invasive') {
    recommendations.push({
      name: 'Kudzu',
      scientific: 'Pueraria montana',
      reason: 'Invasive vine, rapid growth, covers plants'
    });
  }
  
  // Default if no specific match
  if (recommendations.length === 0) {
    recommendations.push({
      name: 'Unknown Species',
      scientific: 'Needs further identification',
      reason: 'Visit iNaturalist or contact Georgia Wildlife'
    });
  }
  
  return recommendations;
}

function restartQuiz() {
  currentQuestion = 0;
  answers = {};
  showQuestion();
}

// Initialize quiz when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeQuiz);
} else {
  initializeQuiz();
}
