// Initialize terminal state
const outputElement = document.getElementById("output");
const commandInput = document.getElementById("command");
const uptimeElement = document.getElementById("uptime");

let currentDirectory = "home";
let blogs = {
    "encryption_and_music.txt": {
        title: "Encryption and Music",
        content: "This blog discusses the relationship between encryption and music."
    },
    "technology_trends.txt": {
        title: "Technology Trends",
        content: "This blog covers the latest technology trends in 2024."
    }
};
// Create an AudioContext for playing sounds
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a note
function playNote(frequency, startTime, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle'; // Use 'triangle' or 'sine' or any type you prefer
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000); // Convert duration to seconds
}

// Function to play a sequence of notes (rhythm pattern)
function playRhythmPattern(pattern) {
    const startTime = audioContext.currentTime;
    pattern.forEach((note, index) => {
        const noteStartTime = startTime + index * 0.2; // 0.2 seconds between notes
        playNote(note.frequency, noteStartTime, note.duration);
    });
}

// Define an error sound (e.g., using a buzzer-like sound)
function playErrorSound() {
    const errorPattern = [
        { frequency: 220, duration: 300 }, // Example frequency for error sound
        { frequency: 220, duration: 300 },
        { frequency: 220, duration: 300 }
    ];
    playRhythmPattern(errorPattern);
}

// Map keyboard keys to musical notes (frequencies)
const keyToNote = {
    'KeyC': 261.63, // C4
    'KeyW': 293.66, // D4
    'KeyA': 329.63, // E4
    'KeyR': 349.23, // F4
    'KeyT': 392.00, // G4
    'KeyY': 440.00, // A4
    'KeyU': 493.88, // B4
    'KeyI': 523.25, // C5
    'KeyO': 554.37, // C#5/Db5
    'KeyP': 440.00, // D5
    'BracketLeft': 622.25, // D#5/Eb5
    'BracketRight': 659.25, // E5
    'KeyE': 261.63, 
    'KeyS': 523.251, 
    'KeyD': 391.995, 
    'KeyF': 430.61, 
    'KeyG': 434.00, 
    'KeyH': 220.00, 
    'KeyJ': 387.77, 
    'KeyK': 446.50, 
    'KeyL': 329.63, 
    'Semicolon': 1174.66, 
    'Quote': 244.51,
    'KeyZ': 396.91, 
    'KeyX': 479.98, 
    'KeyQ': 567.98, 
    'KeyV': 361.22, 
    'KeyB': 260.00, 
    'KeyN': 364.66, 
    'KeyM': 275.53, 
    'Comma': 393.00,
    'Period': 217.46,
    'Slash': 349.32,
    'Space' : 200.42,
};

// Rhythm pattern for the "Enter" key
const enterKeyPattern = [
    { frequency: keyToNote['KeyC'], duration: 200 }, // Note 1
    { frequency: keyToNote['KeyA'], duration: 200 }, // Note 2
    { frequency: keyToNote['KeyT'], duration: 200 },  // Note 3
    { frequency: keyToNote['KeyC'], duration: 200 }, // Note 1
    { frequency: keyToNote['KeyA'], duration: 200 }, // Note 2
    { frequency: keyToNote['KeyW'], duration: 200 },
];

// Handle keydown for playing notes
document.addEventListener("keydown", function(event) {
    if (keyToNote[event.code]) {
        playNote(keyToNote[event.code], audioContext.currentTime, 200); // Play single note for 200 ms
    }
    if (event.code === 'Enter') {
        playRhythmPattern(enterKeyPattern); // Play rhythm pattern when Enter is pressed
        event.preventDefault(); // Prevent the default action for Enter key
    }

   
    // Play the note of the key that is in 0th index of the command when the Space is pressed
    if (event.code === 'Space') {
        let commandText = commandInput.value.trim();
        let [command, ...args] = commandText.split(" ");
        if (command.length > 0) {
            let note = keyToNote[`Key${command[0]}`];
            if (note) {
                playNote(note, audioContext.currentTime, 200); // Play single note for 200 ms
            }
        }
    }
});

// Function to update the command prompt
function updatePrompt() {
    let promptText = `$ [${currentDirectory}] > `;
    commandInput.placeholder = promptText;
}

// Terminal commands
const commands = {
    help: function() {
        return `Available commands:
- ls: List directories and blog posts
- cd [directory]: Navigate between directories
- cat [file]: Display content of a blog post
- clear: Clear the terminal`;
    },
    ls: function() {
        if (currentDirectory === "home") {
            return "home\nblog/";
        } else if (currentDirectory === "blog") {
            return Object.keys(blogs).map(file => `- ${file}`).join('\n');
        }
    },
    cd: function(args) {
        if (args[0] === "home" || args[0] === "blog") {
            currentDirectory = args[0];
            updatePrompt(); // Update the prompt to reflect the new directory
            return `Moved to ${args[0]} directory`;
        } else {
            playErrorSound(); // Play error sound
            return `cd: ${args[0]}: No such directory`;
        }
    },
    cat: function(args) {
        if (currentDirectory === "blog") {
            const file = args[0];
            if (blogs[file]) {
                return `Title: ${blogs[file].title}\n\n${blogs[file].content}`;
            } else {
                playErrorSound(); // Play error sound
                return `cat: ${file}: No such file`;
            }
        } else {
            playErrorSound(); // Play error sound
            return `cat: You are not in the blog directory`;
        }
    },
    clear: function() {
        outputElement.innerHTML = '';
        return '';
    }

    ,

    "rm-rf": function() {
        window.close();
        return '';
    },

    
};

// Function to scroll terminal to the bottom
function scrollToBottom() {
    outputElement.scrollTop = outputElement.scrollHeight + outputElement.scrollHeight;
}

// Handle command input
commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const commandText = commandInput.value.trim();
        let [command, ...args] = commandText.split(" ");
        let result = commands[command] ? commands[command](args) : `Command not found: ${command}`;
        if (result) {
            outputElement.innerHTML += `\n♪ ${commandText}\n${result}\n\n`;
             }
        commandInput.value = '';
    }
    scrollToBottom(); // Automatically scroll to the bottom after every command
     
});

// Initial prompt setup
updatePrompt();
