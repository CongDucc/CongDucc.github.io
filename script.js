// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

function moveNoButton(e) {
    // Prevent default touch behavior on mobile
    if (e.type === 'touchstart' || e.type === 'touchmove') {
        e.preventDefault();
    }
    
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Get viewport dimensions with safe margins
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 20;
    
    // Calculate safe bounds for the button center
    const minX = margin + btnWidth / 2;
    const maxX = viewportWidth - margin - btnWidth / 2;
    const minY = margin + btnHeight / 2;
    const maxY = viewportHeight - margin - btnHeight / 2;
    
    // Generate random position within safe bounds
    const newCenterX = Math.random() * (maxX - minX) + minX;
    const newCenterY = Math.random() * (maxY - minY) + minY;
    
    // Calculate current button center
    const currentCenterX = btnRect.left + btnWidth / 2;
    const currentCenterY = btnRect.top + btnHeight / 2;
    
    // Calculate translation needed
    let moveX = newCenterX - currentCenterX;
    let moveY = newCenterY - currentCenterY;
    
    // Get current transform values
    const currentTransform = noBtn.style.transform;
    let currentMoveX = 0;
    let currentMoveY = 0;
    
    if (currentTransform) {
        const match = currentTransform.match(/translate\(([\d.-]+)px,\s*([\d.-]+)px\)/);
        if (match) {
            currentMoveX = parseFloat(match[1]);
            currentMoveY = parseFloat(match[2]);
        }
    }
    
    // Add to existing translation
    const totalMoveX = currentMoveX + moveX;
    const totalMoveY = currentMoveY + moveY;
    
    noBtn.style.transition = "transform 0.2s ease";
    noBtn.style.transform = `translate(${totalMoveX}px, ${totalMoveY}px)`;
}

// Desktop: mouseover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile: touchstart and touchmove
noBtn.addEventListener("touchstart", moveNoButton, { passive: false });
noBtn.addEventListener("touchmove", moveNoButton, { passive: false });

// Prevent click on No button
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton(e);
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
