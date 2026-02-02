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

let isNoBtnMoved = false;

function moveNoButton(e) {
    // Prevent default touch behavior on mobile
    if (e.type === 'touchstart' || e.type === 'touchmove') {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const btnWidth = noBtn.offsetWidth || 120;
    const btnHeight = noBtn.offsetHeight || 50;
    
    // Get safe viewport dimensions (account for iOS Safari bottom bar)
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const margin = 30;
    
    // On first move, switch to fixed positioning
    if (!isNoBtnMoved) {
        noBtn.style.position = 'fixed';
        noBtn.style.zIndex = '9999';
        isNoBtnMoved = true;
    }
    
    // Calculate safe bounds
    const minX = margin;
    const maxX = viewportWidth - btnWidth - margin;
    const minY = margin;
    const maxY = viewportHeight - btnHeight - margin;
    
    // Generate random position within safe bounds
    let newX = Math.floor(Math.random() * (maxX - minX)) + minX;
    let newY = Math.floor(Math.random() * (maxY - minY)) + minY;
    
    // Ensure values are within bounds
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));
    
    // Apply position directly (no transform)
    noBtn.style.transition = "left 0.2s ease, top 0.2s ease";
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = 'none';
}

// Desktop: mouseover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile: touchstart only (not touchmove to avoid rapid firing)
noBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton(e);
}, { passive: false });

// Prevent click on No button
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
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
