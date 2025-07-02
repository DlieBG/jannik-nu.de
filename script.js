document.addEventListener('DOMContentLoaded', () => {
    gsap.from('.hero-title', { duration: 1, y: -50, opacity: 0, ease: 'bounce' });
    gsap.from('.hero-subtitle', { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: 'power2.out' });

    const heroTitle = document.querySelector('.hero-title');
    heroTitle.addEventListener('click', () => {
        const explosion = document.createElement('div');
        explosion.classList.add('explosion-text');
        explosion.textContent = 'BOOM!';
        heroTitle.appendChild(explosion);

        gsap.to(explosion, { 
            duration: 0.5, 
            scale: 2, 
            opacity: 0, 
            onComplete: () => explosion.remove() 
        });
    });



    const factDisplay = document.getElementById('fact-display');
    const factButton = document.getElementById('fact-button');

    const jannikFacts = [
        "Jannik Nu isst keinen Honig. Er kaut Bienen.",
        "Jannik Nu wirft keinen Schatten. Die Wand will nur so aussehen wie er.",
        "Jannik Nu schläft nicht. Er wartet.",
        "Jannik Nu kann Zwiebeln zum Weinen bringen.",
        "Das Auto von Jannik Nu braucht kein Benzin. Es fährt aus Respekt.",
        "Jannik Nu ist bereits vor 10 Jahren gestorben. Der Tod hat nur noch nicht den Mut, es ihm zu sagen.",
        "Jannik Nu hat bis zur Unendlichkeit gezählt. Zweimal.",
        "Wenn Jannik Nu Liegestütze macht, drückt er nicht sich selbst nach oben, sondern die Erde nach unten.",
        "Jannik Nu hat einmal einen Bären angestarrt. Der Bär hat geblinzelt."
    ];

    factButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * jannikFacts.length);
        factDisplay.textContent = jannikFacts[randomIndex];
        gsap.from(factDisplay, { duration: 0.5, y: -20, opacity: 0, ease: 'power2.out' });
        confetti();
    });

    const instaButton = document.querySelector('.insta-button');
    const loadingPage = document.getElementById('loading-page');

    // Check if returning from Instagram
    if (sessionStorage.getItem('returningFromInsta')) {
        loadingPage.style.display = 'none';
        sessionStorage.removeItem('returningFromInsta');
    }

    instaButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show loading page
        loadingPage.style.display = 'flex';
        
        // Silly emojis to pick from
        const sillyEmojis = ['🦆', '🤡', '🦄', '💥', '🕺', '🦖', '🦸‍♂️', '🦍', '🦑', '🦀', '🦆', '🦚', '🦜', '🦩', '🦥', '🦦', '🦨', '🦫', '🦈', '🦭', '🦮', '🦯', '🦷', '🦸‍♀️', '🦹‍♂️', '🦹‍♀️', '🦺', '🦻', '🦼', '🦽', '🦾', '🦿', '🧀', '🧊', '🧃', '🧋', '🧍‍♂️', '🧍‍♀️', '🧑‍🎤', '🧑‍🚀', '🧑‍🚒', '🧑‍🔬', '🧑‍💻', '🧑‍🎨', '🧑‍🚒', '🧑‍🌾', '🧑‍🍳', '🧑‍🎓', '🧑‍🏫', '🧑‍🏭', '🧑‍💼', '🧑‍🔧', '🧑‍🔬', '🧑‍⚕️', '🧑‍🌾', '🧑‍🍳', '🧑‍🎓', '🧑‍🏫', '🧑‍🏭', '🧑‍💼', '🧑‍🔧', '🧑‍🔬', '🧑‍⚕️'];
        const randomEmoji = sillyEmojis[Math.floor(Math.random() * sillyEmojis.length)];

        // Silly loading texts
        const sillyTexts = [
            'Wird geladen...',
            'Jannik Nu wird informiert...',
            'Bitte warten Sie auf Coolness...',
            'Die Ente wird vorbereitet...',
            'Jannik Nu macht Liegestütze...',
            'Gleich geht\'s los...',
            'Jannik Nu zählt bis Unendlichkeit...',
            'Coolness wird geladen...',
            'Jannik Nu wird angerufen...',
            'Die Seite wird mit Respekt geladen...',
            'Jannik Nu trainiert einen Bären...',
            'Explosion wird vorbereitet...',
            'Jannik Nu schläft nicht. Er wartet...',
            'Sie werden gleich weitergenudelt...',
            'Bitte warten Sie auf das Meme...',
            'Jannik Nu startet den Server...',
            'Die Wand will so aussehen wie er...',
            'Jannik Nu kaut Bienen...',
            'Jannik Nu bringt Zwiebeln zum Weinen...'
        ];
        let sillyTextIndex = 0;

        // Pick a random Jannik Nu fact
        const randomFact = jannikFacts[Math.floor(Math.random() * jannikFacts.length)];

        // Create loading container
        loadingPage.innerHTML = `
            <div class="loading-grid">
                <div class="loading-row">
                    <span class="loading-emoji" style="font-size: 6rem; display: inline-block;">${randomEmoji}</span>
                </div>
                <div class="loading-row">
                    <img src="media/nu.load.jpg" class="loading-img silly-bounce">
                </div>
                <div class="loading-row">
                    <div class="loading-text" id="silly-loading-text">${sillyTexts[0]}</div>
                </div>
                <div class="loading-row">
                    <div class="loading-fact" style="color: #ffca28; font-size: 1.2rem; margin-top: 10px;">${randomFact}</div>
                </div>
                <div class="loading-row">
                    <button id="cancel-redirect" class="cancel-redirect">Abbrechen</button>
                </div>
            </div>
        `;

        // Animate emoji
        const loadingEmoji = loadingPage.querySelector('.loading-emoji');
        gsap.to(loadingEmoji, {
            rotation: 360,
            duration: 0.7,
            repeat: -1,
            ease: 'linear'
        });

        // Animate image (wobble/bounce)
        const loadingImg = loadingPage.querySelector('.loading-img');
        gsap.to(loadingImg, {
            y: 20,
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 0.5,
            ease: 'sine.inOut'
        });

        // Cycle silly loading texts
        const sillyTextDiv = document.getElementById('silly-loading-text');
        const sillyTextInterval = setInterval(() => {
            sillyTextIndex = (sillyTextIndex + 1) % sillyTexts.length;
            sillyTextDiv.textContent = sillyTexts[sillyTextIndex];
        }, 400);

        // Cancel button logic
        const cancelBtn = document.getElementById('cancel-redirect');
        cancelBtn.addEventListener('click', () => {
            gsap.fromTo(cancelBtn, { x: 0 }, { x: 20, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => {
                cancelBtn.textContent = 'Zu spät!';
                cancelBtn.disabled = true;
            }});
        });

        // Set flag that we're going to Instagram
        sessionStorage.setItem('goingToInsta', 'true');
        
        setTimeout(() => {
            clearInterval(sillyTextInterval);
            window.location.href = 'https://www.instagram.com/jannik_nu/';
        }, 5000);

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    });

    // Check if we were redirected back from Instagram
    window.addEventListener('pageshow', (event) => {
        if (event.persisted && sessionStorage.getItem('goingToInsta')) {
            sessionStorage.removeItem('goingToInsta');
            sessionStorage.setItem('returningFromInsta', 'true');
            loadingPage.style.display = 'none';
        }
    });

    const quizQuestions = [
        {
            question: "Ist Jannik Nu cool?",
            answers: ["Ja", "Nein"],
            correctAnswer: "Ja"
        },
        {
            question: "Hat Jannik Nu ein freundliches Lächeln?",
            answers: ["Ja", "Nein"],
            correctAnswer: "Ja"
        },
        {
            question: "Magst auch DU Jannik NU?",
            answers: ["Ja", "Nein"],
            correctAnswer: "Ja"
        },
        {
            question: "Ist Jannik Nu ein guter Freund?",
            answers: ["Ja", "Nein"],
            correctAnswer: "Ja"
        },
        {
            question: "Hättest du gerne einen Jannik Nu in deinem Leben?",
            answers: ["Ja", "Nein"],
            correctAnswer: "Ja"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionElement = document.getElementById('quiz-question');
    const answersElement = document.getElementById('quiz-answers');
    const progressElement = document.getElementById('quiz-progress');
    const resultElement = document.getElementById('quiz-result');

    function loadQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersElement.innerHTML = '';
        progressElement.textContent = `Frage ${currentQuestionIndex + 1} von ${quizQuestions.length}`;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => handleAnswer(button, answer));
            answersElement.appendChild(button);
        });
    }

    function handleAnswer(button, answer) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const buttons = answersElement.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = true;
        });

        const correct = answer === currentQuestion.correctAnswer;
        
        if (!correct) {
            // If wrong answer was clicked, find the correct button and "redirect" the click
            const correctButton = Array.from(buttons).find(b => b.textContent === currentQuestion.correctAnswer);
            
            // First show the wrong button was clicked briefly
            button.classList.add('incorrect');
            gsap.to(button, { scale: 1.1, duration: 0.1 });
            
            // Then after a short delay, remove the incorrect styling and highlight the correct one
            setTimeout(() => {
                button.classList.remove('incorrect');
                button.style.opacity = '0.5'; // Dim the wrong button
                
                // Highlight the correct button as if it was clicked
                if (correctButton) {
                    correctButton.classList.add('correct');
                    gsap.to(correctButton, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 });
                    confetti({ particleCount: 50, spread: 50 });
                }
                
                // Always increment score since we "redirect" to correct answer
                score++;
                
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < quizQuestions.length) {
                        loadQuestion();
                    } else {
                        showResults();
                    }
                }, 1200);
            }, 300);
        } else {
            // If correct answer was clicked, proceed normally
            score++;
            button.classList.add('correct');
            confetti({ particleCount: 50, spread: 50 });
            gsap.to(button, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            }, 1500);
        }
    }

    function showResults() {
        questionElement.textContent = '';
        answersElement.innerHTML = '';
        progressElement.textContent = '';
        resultElement.textContent = `Du hast ${score} von ${quizQuestions.length} Punkten!`;
        gsap.from(resultElement, { opacity: 0, y: -20, duration: 1 });
    }

    loadQuestion();
});