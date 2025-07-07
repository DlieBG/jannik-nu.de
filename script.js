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

    // Merch section click functionality
    const merchComingSoon = document.querySelector('.merch-coming-soon');
    const clothingEmojis = ['👕', '👖', '🧢', '👟', '👜', '👔', '👗', '🧥', '👠', '🩳', '👙', '🧦', '👓', '💍', '⌚'];
    let emojiCounter = 0;

    merchComingSoon.addEventListener('click', (e) => {
        // Create emoji element
        const emoji = document.createElement('div');
        emoji.classList.add('clothing-emoji');
        emoji.textContent = clothingEmojis[Math.floor(Math.random() * clothingEmojis.length)];
        
        // Position emoji at click position
        emoji.style.position = 'fixed';
        emoji.style.fontSize = '3rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '9999';
        emoji.style.left = `${e.clientX - 30}px`;
        emoji.style.top = `${e.clientY - 30}px`;
        
        document.body.appendChild(emoji);
        
        // Animate emoji
        gsap.fromTo(emoji, 
            { 
                scale: 0, 
                opacity: 0,
                rotation: Math.random() * 360
            },
            { 
                scale: 2, 
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    gsap.to(emoji, {
                        y: -200,
                        rotation: Math.random() * 360,
                        opacity: 0,
                        scale: 0.8,
                        duration: 4,
                        ease: 'power2.out',
                        onComplete: () => emoji.remove()
                    });
                }
            }
        );
        
        // Add confetti effect
        confetti({
            particleCount: 30,
            spread: 40,
            origin: { 
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            }
        });
        
        emojiCounter++;
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
        "Jannik Nu hat einmal einen Bären angestarrt. Der Bär hat geblinzelt.",
        "Wenn Jannik Nu ins Fitnessstudio geht, trainieren die Gewichte mit ihm.",
        "Jannik Nu braucht keinen Kompass. Der Norden richtet sich nach ihm.",
        "Wenn Jannik Nu Zwiebeln schneidet, weinen die Messer.",
        "Jannik Nu hat das Schweizer Taschenmesser erfunden. Mit seinen Fingernägeln.",
        "Jannik Nu geht nicht schwimmen. Das Wasser macht Platz.",
        "Jannik Nu hat einmal eine Partie Schach verloren. Aus Mitleid.",
        "Jannik Nu trägt keine Sonnenbrille. Die Sonne trägt eine Jannik-Nu-Brille.",
        "Wenn Jannik Nu einen Witz erzählt, lacht sogar die Stille.",
        "Jannik Nu muss sein Handy nicht aufladen. Es hat Respekt vor leeren Akkus.",
        "Jannik Nu hat keinen Führerschein. Er hat dem Auto Fahrstunden gegeben.",
        "Wenn Jannik Nu einen Regentanz macht, entschuldigt sich das Wetter.",
        "Jannik Nu spielt kein Verstecken. Die Dinge verstecken sich vor ihm.",
        "Jannik Nu hat dem Internet beigebracht, wie man surft.",
        "Wenn Jannik Nu programmiert, debuggt sich der Code selbst.",
        "Jannik Nu braucht kein GPS. Die Orte kommen zu ihm.",
        "Jannik Nu hat einmal einen Schneemann gebaut. Er steht jetzt im Museum."
    ];

    // Track shown facts in session storage
    if (!sessionStorage.getItem('shownFacts')) {
        sessionStorage.setItem('shownFacts', JSON.stringify([]));
    }

    factButton.addEventListener('click', () => {
        let shownFacts = JSON.parse(sessionStorage.getItem('shownFacts'));
        let availableFacts = jannikFacts.filter(fact => !shownFacts.includes(fact));
        
        // If all facts have been shown, reset the tracking
        if (availableFacts.length === 0) {
            shownFacts = [];
            availableFacts = [...jannikFacts];
            sessionStorage.setItem('shownFacts', JSON.stringify(shownFacts));
        }
        
        const randomIndex = Math.floor(Math.random() * availableFacts.length);
        const selectedFact = availableFacts[randomIndex];
        
        // Update display and tracking
        factDisplay.textContent = selectedFact;
        shownFacts.push(selectedFact);
        sessionStorage.setItem('shownFacts', JSON.stringify(shownFacts));
        
        // Reset opacity and then animate
        gsap.set(factDisplay, { opacity: 1 });
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
        


        // Pick a random Jannik Nu fact
        const randomFact = jannikFacts[Math.floor(Math.random() * jannikFacts.length)];

        // Create loading container
        loadingPage.innerHTML = `
            <div class="loading-grid">
                <div class="loading-row">
                    <img src="media/nu.load.jpg" class="loading-img">
                </div>
                <div class="loading-row">
                    <div class="loading-text" id="silly-loading-text">Sie werden weitergeleitet...</div>
                </div>
                <div class="loading-row">
                    <div class="loading-fact" style="margin-top: 10px;">${randomFact}</div>
                </div>
                <div class="loading-row">
                    <button id="cancel-redirect" class="cancel-redirect">Abbrechen</button>
                </div>
            </div>
        `;

        // Simple rotation animation for the image
        const loadingImg = loadingPage.querySelector('.loading-img');
        gsap.to(loadingImg, {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: 'linear'
        });

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
            question: "Kann Jannik Nu Zwiebeln zum Weinen bringen?",
            answers: ["Ja", "Nein"],
            correctAnswer: "Ja"
        },
        {
            question: "Schläft Jannik Nu oder wartet er nur?",
            answers: ["Er wartet", "Er schläft"],
            correctAnswer: "Er wartet"
        },
        {
            question: "Hat Jannik Nu ein freundliches Lächeln?",
            answers: ["Ja", "Nein"],
            correctAnswer: "Ja"
        },
        {
            question: "Muss Jannik Nu sein Handy aufladen?",
            answers: ["Nein, es hat Angst", "Ja"],
            correctAnswer: "Nein, es hat Angst"
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
            // If wrong answer was clicked, immediately swap the button text with the correct answer
            const correctAnswer = currentQuestion.correctAnswer;
            const wrongAnswer = answer;
            
            // Find the button that has the correct answer
            const correctButton = Array.from(buttons).find(b => b.textContent === correctAnswer);
            
            // Immediately swap the button texts
            button.textContent = correctAnswer;
            button.classList.add('correct');
            
            // Swap the other button to show the wrong answer
            if (correctButton) {
                correctButton.textContent = wrongAnswer;
                correctButton.style.opacity = '0.5';
            }
            
            // Animate the swapped button
            gsap.to(button, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 });
            confetti({ particleCount: 50, spread: 50 });
            
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

    // Time Machine functionality
    const timePeriods = [
        {
            emoji: "💥",
            description: "Jannik Nu beim Urknall: Er hat die Zeit erfunden."
        },
        {
            emoji: "🦖",
            description: "Jannik Nu in der Kreidezeit: Er hat die Dinos nicht ausgerottet - sie sind freiwillig ausgestorben, als sie seine Coolness sahen."
        },
        {
            emoji: "⚔️",
            description: "Mittelalter Jannik Nu: Seine Rüstung besteht aus purem Selbstbewusstsein."
        },
        {
            emoji: "🎭",
            description: "Renaissance Jannik Nu: Da Vinci malte die Mona Lisa nach ihm - sie lächelt, weil sie an Jannik denkt."
        },
        {
            emoji: "🚂",
            description: "Industrielle Revolution Jannik Nu: Dampfmaschinen laufen mit seiner überschüssigen Energie."
        },
        {
            emoji: "👨‍🚀",
            description: "Weltraum Jannik Nu: Die Aliens haben SEINE Existenz noch nicht bestätigt."
        },
        {
            emoji: "🤖",
            description: "Cyber Jannik Nu: Er muss keine Matrix hacken - sie programmiert sich selbst neu für ihn."
        },
        {
            emoji: "🧙‍♂️",
            description: "Fantasy Jannik Nu: Gandalf fragt IHN um Rat."
        },
        {
            emoji: "🏴‍☠️",
            description: "Piraten Jannik Nu: Der Kompass zeigt immer in seine Richtung, nicht nach Norden."
        },
        {
            emoji: "👨‍💻",
            description: "Programmier Jannik Nu: Er hat die Weltprogrammiert, aber die Welt hat ihn nicht programmiert."
        }
    ];

    const timePortal = document.querySelector('.time-portal');
    const portalImage = document.querySelector('.portal-image');
    const timePeriodText = document.getElementById('time-period');
    const timeTravelBtn = document.getElementById('time-travel-btn');
    let currentPeriodIndex = -1;

    // Add initial spinning class
    timePortal.classList.add('portal-spinning');

    function timeTravel() {
        // Stop spinning during the effect
        timePortal.classList.remove('portal-spinning');
        timePortal.classList.add('portal-flash');
        
        // Play with confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4a9eff', '#00ffff', '#ffffff']
        });

        // Get new random period (different from current)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * timePeriods.length);
        } while (newIndex === currentPeriodIndex);
        
        currentPeriodIndex = newIndex;
        const period = timePeriods[currentPeriodIndex];

        // Animate the change
        gsap.to(portalImage, {
            scale: 0,
            duration: 0.3,
            onComplete: () => {
                portalImage.textContent = period.emoji;
                gsap.to(portalImage, {
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            }
        });

        gsap.to(timePeriodText, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                timePeriodText.textContent = period.description;
                gsap.to(timePeriodText, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });

        // Remove flash animation class and restart spinning after delay
        setTimeout(() => {
            timePortal.classList.remove('portal-flash');
            // Wait 4 seconds before starting to spin again
            setTimeout(() => {
                timePortal.classList.add('portal-spinning');
            }, 4000);
        }, 500);

        // Disable the button and portal clicks during the animation and pause
        timeTravelBtn.disabled = true;
        timePortal.style.pointerEvents = 'none';
        
        // Re-enable interactions after the full animation and pause
        setTimeout(() => {
            timeTravelBtn.disabled = false;
            timePortal.style.pointerEvents = 'auto';
        }, 4500); // 500ms animation + 4000ms pause
    }

    timeTravelBtn.addEventListener('click', timeTravel);
    timePortal.addEventListener('click', timeTravel);
});