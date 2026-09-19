const openBtn = document.getElementById("openBtn");
const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");


// ============================
// OPEN SURPRISE
// ============================

openBtn.addEventListener("click", () => {

    opening.style.transition = "1s ease";
    opening.style.opacity = "0";
    opening.style.transform = "scale(1.05)";

    setTimeout(() => {

        opening.style.display = "none";
        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        createConfetti();

    }, 1000);

});


// ============================
// MUSIC
// ============================

let playing = false;

musicBtn.addEventListener("click", () => {

    if (!playing) {

        music.play().catch(() => {});

        musicBtn.textContent = "❚❚";
        playing = true;

    } else {

        music.pause();

        musicBtn.textContent = "♫";
        playing = false;

    }

});


// ============================
// COUNTDOWN
// ============================

function updateCountdown() {

    const target = new Date("September 20, 2026 00:00:00").getTime();
    const now = new Date().getTime();

    const distance = target - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "20";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (distance / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


// ============================
// CONFETTI
// ============================

function createConfetti() {

    const container = document.getElementById("confetti");

    const symbols = [
        "✦",
        "✧",
        "•",
        "♡",
        "✦"
    ];

    for (let i = 0; i < 90; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.fontSize =
            Math.random() * 12 + 7 + "px";

        piece.style.animationDuration =
            Math.random() * 3 + 3 + "s";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.opacity =
            Math.random() * .8 + .2;

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 7000);

    }

}


// ============================
// SCROLL REVEAL
// ============================

const revealElements = document.querySelectorAll(
    ".message-card, .wish, .countdown-section, .twenty-section"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.animation =
                    "fadeUp .9s ease forwards";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {

    element.style.opacity = "0";

    observer.observe(element);

});