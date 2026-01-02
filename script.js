// 1. DOM Elements Selection
const passwordDisplay = document.getElementById('passwordDisplay');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValueDisplay = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

// 2. Character Pools
const CHAR_SETS = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
};

// 3. Event Listener for Slider
lengthSlider.addEventListener('input', (e) => {
    lengthValueDisplay.innerText = e.target.value;
});

// 4. Main Password Generation Function
function generatePassword() {
    let activeChars = "";
    let finalPassword = "";
    const passwordLength = +lengthSlider.value;

    if (includeUppercase.checked) {
        activeChars += CHAR_SETS.upper;
    }
    if (includeLowercase.checked) {
        activeChars += CHAR_SETS.lower;
    }
    if (includeNumbers.checked) {
        activeChars += CHAR_SETS.numbers;
    }
    if (includeSymbols.checked) {
        activeChars += CHAR_SETS.symbols;
    }

    if (activeChars === "") {
        passwordDisplay.value = "Error: Select options";
        passwordDisplay.style.color = "#ff6b6b"; 
        setTimeout(() => {
             passwordDisplay.style.color = "#ffffff";
             passwordDisplay.value = "Awaiting Input...";
        }, 2000);
        return;
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * activeChars.length);
        finalPassword += activeChars[randomIndex];
    }

    passwordDisplay.value = finalPassword;
}

// 5. Copy to Clipboard Function
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.value;
    
    // Prevent copying if field is empty or showing error
    if(!password || password === "Awaiting Input..." || password.includes("Error")) return;

    // Copy logic
    navigator.clipboard.writeText(password).then(() => {
        // Visual Feedback: Change icon to checkmark
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 2000);
    });
});

// 6. Attach Event Listener to Generate Button
generateBtn.addEventListener('click', generatePassword);

// Initialize slider value
lengthValueDisplay.innerText = lengthSlider.value;