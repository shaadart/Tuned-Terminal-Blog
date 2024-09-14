import { updatePrompt, scrollToBottom, commands } from './terminal.js';
import { playNote, playRhythmPattern, playErrorSound, keyToNote, enterKeyPattern, audioContext } from './music.js';
import { updateUptime } from './system_info.js';

const commandInput = document.getElementById("command");
const outputElement = document.getElementById("output");
const uptimeElement = document.getElementById("uptime");

// Call the uptime function on page load
updateUptime(uptimeElement);

// Resume AudioContext on user gesture
document.addEventListener("click", () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

// Handle keydown for playing notes
document.addEventListener("keydown", function(event) {
    if (keyToNote[event.code]) {
        playNote(keyToNote[event.code], audioContext.currentTime, 200);
    }
    if (event.code === 'Enter') {
        playRhythmPattern(enterKeyPattern);
        event.preventDefault();
    }
    if (event.code === 'Space') {
        let commandText = commandInput.value.trim();
        let [command, ...args] = commandText.split(" ");
        if (command.length > 0 && keyToNote[`Key${command[0]}`]) {
            playNote(keyToNote[`Key${command[0]}`], audioContext.currentTime, 200);
        }
    }
});

// Handle command input
commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const commandText = commandInput.value.trim();
        let [command, ...args] = commandText.split(" ");
        let result = commands[command] ? commands[command](args) : `Command not found: ${command}`;
        
        if (result) {
            outputElement.innerHTML += `\n♪ ${commandText}\n${result}\n`;
        }
        commandInput.value = '';
        scrollToBottom();
    }
});

// Initial prompt setup
updatePrompt();