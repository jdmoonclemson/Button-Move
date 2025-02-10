document.addEventListener("DOMContentLoaded", function() {
    const viewingArea = document.getElementById("viewingArea");
    const colorSelect = document.getElementById("colorSelect");
    const makeButton = document.getElementById("makeButton");
    const moveToggle = document.getElementById("moveToggle");
    const totalSumDisplay = document.getElementById("totalSum");

    let buttons = [];
    let totalSum = 0;
    let moving = false;
    let interval;

    makeButton.addEventListener("click", function() {
        createButton();
    });

    moveToggle.addEventListener("click", function() {
        if (moving) {
            clearInterval(interval);
            moveToggle.textContent = "MOVE";
        } else {
            interval = setInterval(moveButtons, 100);
            moveToggle.textContent = "PAUSE";
        }
        moving = !moving;
    });

    function createButton() {
        const button = document.createElement("button");
        button.classList.add("movable-button");
        
        // Assign color
        button.style.backgroundColor = colorSelect.value;
        
        // Random number as label
        const randomNumber = Math.floor(Math.random() * 100);
        button.textContent = randomNumber;

        // Position within viewing area
        const areaWidth = viewingArea.clientWidth - 50;
        const areaHeight = viewingArea.clientHeight - 50;
        const randomX = Math.floor(Math.random() * areaWidth);
        const randomY = Math.floor(Math.random() * areaHeight);
        
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;

        // Click event to change color and update total
        button.addEventListener("click", function() {
            this.style.backgroundColor = colorSelect.value;
            totalSum += randomNumber;
            totalSumDisplay.textContent = totalSum;
        });

        // Store button for movement
        buttons.push({ element: button, dx: Math.random() * 4 - 2, dy: Math.random() * 4 - 2 });

        viewingArea.appendChild(button);
    }

    function moveButtons() {
        buttons.forEach(buttonObj => {
            const btn = buttonObj.element;
            let newX = btn.offsetLeft + buttonObj.dx;
            let newY = btn.offsetTop + buttonObj.dy;

            if (newX <= 0 || newX >= viewingArea.clientWidth - btn.clientWidth) {
                buttonObj.dx *= -1;
            }
            if (newY <= 0 || newY >= viewingArea.clientHeight - btn.clientHeight) {
                buttonObj.dy *= -1;
            }

            btn.style.left = `${newX}px`;
            btn.style.top = `${newY}px`;
        });
    }
});
