/* ==========================================================================
   JAVASCRIPT: Friend Study Buddy
   Beginner-Friendly Vanilla JavaScript Logic
   ========================================================================== */

// Wait for the DOM to be fully loaded before running our code
document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================================
     EXTRA FEATURE: Dark Mode Toggle
     Uses classList.toggle() to add/remove 'dark-mode' class on the body.
     ========================================================================== */
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  themeToggleBtn.addEventListener("click", () => {
    // Toggle the class on the body element
    document.body.classList.toggle("dark-mode");

    // Change button text based on current mode
    if (document.body.classList.contains("dark-mode")) {
      themeToggleBtn.textContent = "☀️ Light Mode";
    } else {
      themeToggleBtn.textContent = "🌙 Dark Mode";
    }
  });


  /* ==========================================================================
     FEATURE 1: Dynamic Study Plan Generator
     Takes user inputs (Subject, Topic, Time, Difficulty) and generates a plan.
     ========================================================================== */
  const studyPlanForm = document.getElementById("studyPlanForm");
  const planResult = document.getElementById("planResult");

  studyPlanForm.addEventListener("submit", (event) => {
    // Prevent the default browser form submission (which refreshes the page)
    event.preventDefault();

    // Read values from form inputs
    const subject = document.getElementById("subjectInput").value.trim();
    const topic = document.getElementById("topicInput").value.trim();
    const hours = parseInt(document.getElementById("timeInput").value);
    const difficulty = document.getElementById("difficultyInput").value;

    // Convert total hours into total minutes
    const totalMinutes = hours * 60;

    // Proportionally divide study phases based on total time
    // 1. Concept learning (30%)
    // 2. Examples & deep-dive (25%)
    // 3. Hands-on practice (25%)
    // 4. Quick revision (10%)
    // 5. Self-test (10%)
    const conceptTime = Math.round(totalMinutes * 0.30);
    const exampleTime = Math.round(totalMinutes * 0.25);
    const practiceTime = Math.round(totalMinutes * 0.25);
    const revisionTime = Math.round(totalMinutes * 0.10);
    const testTime = totalMinutes - (conceptTime + exampleTime + practiceTime + revisionTime);

    // Build the dynamic HTML output
    planResult.innerHTML = `
      <h3>📋 Study Plan for ${subject} (${topic})</h3>
      <p><strong>Level:</strong> ${difficulty} | <strong>Total Duration:</strong> ${hours} hour(s) (${totalMinutes} mins)</p>
      <br />
      <ul>
        <li><strong>${conceptTime} min</strong> — Learn fundamental concepts and read theory</li>
        <li><strong>${exampleTime} min</strong> — Study worked examples and analyze key patterns</li>
        <li><strong>${practiceTime} min</strong> — Solve practice questions and exercises on ${topic}</li>
        <li><strong>${revisionTime} min</strong> — Revise important notes, formulas, or summaries</li>
        <li><strong>${testTime} min</strong> — Quick self-test or flashcard review</li>
      </ul>
    `;

    // Make the result box visible
    planResult.classList.remove("hidden");
  });


  /* ==========================================================================
     FEATURE 2: Quick CS Quiz (5 MCQs)
     Stores questions in an Array of Objects and calculates score on submit.
     ========================================================================== */
  const quizContainer = document.getElementById("quizContainer");
  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");

  // Array of Quiz Question Objects
  const quizQuestions = [
    {
      question: "1. What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlink Text Mark Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: 0 // Index of correct option
    },
    {
      question: "2. Which CSS property is used to change text color?",
      options: [
        "font-style",
        "text-color",
        "color",
        "background-color"
      ],
      correctAnswer: 2
    },
    {
      question: "3. Which keyword is used to declare a constant variable in JavaScript?",
      options: [
        "var",
        "let",
        "constant",
        "const"
      ],
      correctAnswer: 3
    },
    {
      question: "4. What is the time complexity of accessing an array element by index in DSA?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      correctAnswer: 0
    },
    {
      question: "5. Which HTML tag is used to link an external JavaScript file?",
      options: [
        "<js>",
        "<script>",
        "<javascript>",
        "<link>"
      ],
      correctAnswer: 1
    }
  ];

  // Render questions dynamically on the page
  function renderQuiz() {
    quizContainer.innerHTML = "";

    quizQuestions.forEach((q, qIndex) => {
      // Create wrapper div for each question
      const questionDiv = document.createElement("div");
      questionDiv.className = "quiz-item";

      // Question title
      const questionTitle = document.createElement("p");
      questionTitle.className = "quiz-question-title";
      questionTitle.textContent = q.question;
      questionDiv.appendChild(questionTitle);

      // Options container
      const optionsContainer = document.createElement("div");
      optionsContainer.className = "quiz-options";

      // Loop through each option and create radio inputs
      q.options.forEach((opt, optIndex) => {
        const label = document.createElement("label");
        label.className = "quiz-option-label";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question_${qIndex}`;
        radio.value = optIndex;
        radio.required = true; // Ensure user selects an option for each question

        const textSpan = document.createElement("span");
        textSpan.textContent = opt;

        label.appendChild(radio);
        label.appendChild(textSpan);
        optionsContainer.appendChild(label);
      });

      questionDiv.appendChild(optionsContainer);
      quizContainer.appendChild(questionDiv);
    });
  }

  // Handle Quiz Submission
  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let score = 0;
    const total = quizQuestions.length;

    // Check answers using a loop
    quizQuestions.forEach((q, qIndex) => {
      const selectedOption = document.querySelector(`input[name="question_${qIndex}"]:checked`);
      if (selectedOption && parseInt(selectedOption.value) === q.correctAnswer) {
        score++;
      }
    });

    // Determine personalized feedback message
    let feedbackMessage = "";
    if (score === total) {
      feedbackMessage = "🌟 Perfect Score! You're a rockstar student!";
    } else if (score >= 3) {
      feedbackMessage = "👍 Good job! Keep practicing and you will master it!";
    } else {
      feedbackMessage = "💪 Don't give up! Revise the basic notes and try again!";
    }

    // Display quiz result
    quizResult.innerHTML = `
      <div class="score-badge">Your Score: ${score} / ${total}</div>
      <p>${feedbackMessage}</p>
    `;
    quizResult.classList.remove("hidden");
  });

  // Call renderQuiz once when the page loads
  renderQuiz();


  /* ==========================================================================
     FEATURE 3: Quick Revision Notes
     Stores structured revision summaries in an Object.
     ========================================================================== */
  const topicSelect = document.getElementById("topicSelect");
  const showRevisionBtn = document.getElementById("showRevisionBtn");
  const revisionResult = document.getElementById("revisionResult");

  // Revision notes stored as an Object with arrays
  const revisionNotes = {
    HTML: [
      "HTML stands for HyperText Markup Language.",
      "Uses tags like <h1>, <p>, <a>, <div>, and <section> to structure web pages.",
      "Forms use <input>, <select>, and <button> to gather user input.",
      "Semantic HTML tags (header, nav, main, footer) improve accessibility and SEO."
    ],
    CSS: [
      "CSS stands for Cascading Style Sheets, used to style HTML content.",
      "Selectors target elements (e.g., .class, #id, element tags).",
      "The Box Model consists of: Content, Padding, Border, and Margin.",
      "Flexbox and Grid create modern, flexible, and responsive layouts.",
      "Media queries (@media) help adapt designs for mobile and desktop screens."
    ],
    JavaScript: [
      "Variables store values using 'let' and 'const'.",
      "Functions contain reusable blocks of logic and operations.",
      "Arrays store lists of items ([1, 2, 3]) and Objects store key-value pairs.",
      "The DOM (Document Object Model) allows JS to interact with and modify HTML/CSS.",
      "Event listeners (addEventListener) respond to user actions like clicks and submits."
    ],
    DSA: [
      "DSA stands for Data Structures and Algorithms.",
      "Arrays store elements in contiguous memory with O(1) index access.",
      "Stacks follow LIFO (Last In, First Out) and Queues follow FIFO (First In, First Out).",
      "Time complexity (Big-O notation) measures how runtime grows with input size.",
      "Practicing standard patterns (two-pointers, sliding window, recursion) builds problem-solving skills."
    ]
  };

  showRevisionBtn.addEventListener("click", () => {
    const selectedTopic = topicSelect.value;
    const notesArray = revisionNotes[selectedTopic];

    if (notesArray) {
      let notesHtml = `<h3>📖 ${selectedTopic} Quick Revision</h3><ul>`;
      notesArray.forEach((note) => {
        notesHtml += `<li>${note}</li>`;
      });
      notesHtml += `</ul>`;

      revisionResult.innerHTML = notesHtml;
    }
  });


  /* ==========================================================================
     FEATURE 4: Random Motivation Generator
     Picks a random quote from an array of 10+ messages using Math.random().
     ========================================================================== */
  const motivateBtn = document.getElementById("motivateBtn");
  const quoteText = document.getElementById("quoteText");

  // Array of 12 Motivational Quotes
  const quotes = [
    "Small progress every day adds up to big results.",
    "Believe you can and you're halfway there.",
    "Consistency is what transforms average into excellence.",
    "Don't wish it were easier; work to become better.",
    "Focus on progress, not perfection.",
    "The secret of getting ahead is getting started.",
    "Mistakes are proof that you are trying and learning.",
    "Every expert was once a beginner. Keep going!",
    "Your future self will thank you for the effort you put in today.",
    "Study with focus today so you can enjoy your success tomorrow.",
    "One hour of deep focus beats four hours of distracted browsing.",
    "You don't have to be great to start, but you have to start to be great."
  ];

  motivateBtn.addEventListener("click", () => {
    // Generate a random index between 0 and (quotes.length - 1)
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Update the quote text
    quoteText.textContent = quotes[randomIndex];
  });

});
