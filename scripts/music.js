// music.js

export const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a note
export function playNote(frequency, startTime, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);
}

// Function to play a sequence of notes (rhythm pattern)
export function playRhythmPattern(pattern) {
    const startTime = audioContext.currentTime;
    pattern.forEach((note, index) => {
        const noteStartTime = startTime + index * 0.2;
        playNote(note.frequency, noteStartTime, note.duration);
    });
}

// Error sound
export function playErrorSound() {
    const errorPattern = [
        { frequency: 220, duration: 300 },
        { frequency: 220, duration: 300 },
        { frequency: 220, duration: 300 }
    ];
    playRhythmPattern(errorPattern);
}

// Rhythm pattern for the Enter key
export const enterKeyPattern = [
    { frequency: 261.63, duration: 200 }, // C4
    { frequency: 329.63, duration: 200 }, // E4
    { frequency: 392.00, duration: 200 }, // G4
    { frequency: 261.63, duration: 200 }, // C4
    { frequency: 329.63, duration: 200 }, // E4
    { frequency: 293.66, duration: 200 }  // D4
];

// Keyboard note mapping
export const keyToNote = {
    'KeyC': 261.63, 'KeyW': 293.66, 'KeyA': 329.63, 'KeyR': 349.23, 'KeyT': 392.00, 'KeyY': 440.00, 'KeyU': 493.88, 'KeyI': 523.25, 'KeyO': 554.37, 'KeyP': 440.00, 
    'BracketLeft': 622.25, 'BracketRight': 659.25, 'KeyE': 261.63, 'KeyS': 523.251, 'KeyD': 391.995, 'KeyF': 430.61, 'KeyG': 434.00, 'KeyH': 220.00, 
    'KeyJ': 387.77, 'KeyK': 446.50, 'KeyL': 329.63, 'Semicolon': 1174.66, 'Quote': 244.51, 'KeyZ': 396.91, 'KeyX': 479.98, 'KeyQ': 567.98, 'KeyV': 361.22, 
    'KeyB': 260.00, 'KeyN': 364.66, 'KeyM': 275.53, 'Comma': 393.00, 'Period': 217.46, 'Slash': 349.32, 'Space': 200.42
};