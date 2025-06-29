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
        "Wenn Jannik Nu Liegestütze macht, drückt er nicht sich selbst nach oben, sondern die Erde nach unten."
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
        
        // Create loading container
        loadingPage.innerHTML = `
            <div class="loading-grid">
                <div class="loading-row">
                    <img src="media/nu.load.jpg" class="loading-img">
                </div>
                <div class="loading-row">
                    <div class="loading-text">Sie werden jeden Moment weitergeleitet</div>
                </div>
            </div>
        `;

        // Rotate animation
        const loadingImg = loadingPage.querySelector('.loading-img');
        gsap.to(loadingImg, {
            rotation: 360,
            duration: 1,
            repeat: -1,
            ease: 'linear'
        });

        // Set flag that we're going to Instagram
        sessionStorage.setItem('goingToInsta', 'true');
        
        setTimeout(() => {
            window.location.href = 'https://www.instagram.com/jannik_nu/';
        }, 2000);

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
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionElement = document.getElementById('quiz-question');
    const answersElement = document.getElementById('quiz-answers');

    function loadQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersElement.innerHTML = '';

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', (e) => {
                // Find and highlight the "Yes" button
                const buttons = answersElement.querySelectorAll('button');
                const yesButton = Array.from(buttons).find(btn => btn.textContent === 'Ja');
                if (yesButton) {
                    yesButton.style.backgroundColor = '#00ff00';
                }
                score++;
                confetti();
                
                setTimeout(() => {
                    currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
                    loadQuestion();
                }, 1000);
            });
            answersElement.appendChild(button);
        });
    }

    loadQuestion();
});