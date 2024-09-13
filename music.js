// Create an AudioContext for playing sounds
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, startTime, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle'; // Sine wave is smooth and clear
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000); // Convert duration to seconds
}

function playRhythmPattern(pattern) {
    const startTime = audioContext.currentTime;
    pattern.forEach((note, index) => {
        const noteStartTime = startTime + index * 0.1; // 0.1 seconds between notes
        playNote(note.frequency, noteStartTime, note.duration);
    });
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
    // Add more mappings if needed
};

const enterKeyPattern = [
    { frequency: keyToNote['KeyC'], duration: 200 }, // Note 1
    { frequency: keyToNote['KeyA'], duration: 200 }, // Note 2
    { frequency: keyToNote['KeyT'], duration: 200 },  // Note 3
    { frequency: keyToNote['KeyC'], duration: 200 }, // Note 1
    { frequency: keyToNote['KeyA'], duration: 200 }, // Note 2
    { frequency: keyToNote['KeyW'], duration: 200 },
];

// Export functions and variables for use in other modules
export { playNote, playRhythmPattern, keyToNote, enterKeyPattern };
