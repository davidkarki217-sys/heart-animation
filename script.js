const scene = document.getElementById("scene");
const text = document.querySelector(".love-text");

const particles = [];

const particleCount = 180;


// =============================
// CREATE PARTICLES
// =============================

for (let i = 0; i < particleCount; i++) {

    const p = document.createElement("div");

    p.classList.add("particle");

    scene.appendChild(p);

    particles.push(p);

    // Start randomly around screen
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = Math.random() * 100 + "vh";
}


// =============================
// HEART SHAPE
// =============================

function heartPosition(t) {

    // Parametric heart equation

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x: x,
        y: -y
    };
}


// =============================
// FORM HEART
// =============================

function formHeart() {

    particles.forEach((particle, i) => {

        const t =
            (Math.PI * 2 * i) / particles.length;

        const heart = heartPosition(t);

        // Random size variation

        const size = 16;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const x =
            centerX + heart.x * size;

        const y =
            centerY + heart.y * size;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.transform =
            "translate(-50%, -50%) scale(" +
            (0.7 + Math.random() * 0.7) +
            ")";
    });
}


// =============================
// BLAST
// =============================

function blastHeart() {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    particles.forEach((particle) => {

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            150 + Math.random() * 450;

        const x =
            centerX + Math.cos(angle) * distance;

        const y =
            centerY + Math.sin(angle) * distance;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.transform =
            "translate(-50%, -50%) scale(0)";

        particle.style.opacity = "0";
    });

    // Show text

    setTimeout(() => {

        text.classList.add("show");

    }, 250);
}


// =============================
// RESET
// =============================

function resetAnimation() {

    text.classList.remove("show");

    particles.forEach((particle) => {

        particle.style.opacity = "1";

        particle.style.left =
            Math.random() * window.innerWidth + "px";

        particle.style.top =
            Math.random() * window.innerHeight + "px";

        particle.style.transform =
            "translate(-50%, -50%) scale(1)";
    });
}


// =============================
// MAIN ANIMATION
// =============================

function startAnimation() {

    resetAnimation();

    // Wait

    setTimeout(() => {

        // Particles form heart

        formHeart();

    }, 700);


    // Hold heart then blast

    setTimeout(() => {

        blastHeart();

    }, 2700);


    // Remove text

    setTimeout(() => {

        text.classList.remove("show");

    }, 5000);


    // Start again

    setTimeout(() => {

        startAnimation();

    }, 5700);
}


// Start

startAnimation();