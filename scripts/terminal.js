// terminal.js
import { updateUptime } from './system_info.js';

export const outputElement = document.getElementById("output");
export const commandInput = document.getElementById("command");

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

export const commands = {
    help: function() {
        return `Available commands:\n- ls: List directories and blog posts\n- cd [directory]: Navigate between directories\n- cat [file]: Display content of a blog post\n- clear: Clear the terminal`;
    },
    "ls": function() {
        if (currentDirectory === "home") {
            return "home\nblog/";
        } else if (currentDirectory === "blog") {
            return Object.keys(blogs).map(file => `- ${file}`).join('\n');
        }
    },
    cd: function(args) {
        if (args[0] === "home" || args[0] === "blog") {
            currentDirectory = args[0];
            updatePrompt();
            return `Moved to ${args[0]} directory`;
        } else {
            playErrorSound();
            return `cd: ${args[0]}: No such directory`;
        }
    },
    cat: function(args) {
        if (currentDirectory === "blog") {
            const file = args[0];
            if (blogs[file]) {
                return `<h3>Title: ${blogs[file].title}</h3>\n<pre><code class="language-javascript">${Prism.highlight(blogs[file].content, Prism.languages.javascript, 'javascript')}</code></pre>`;
            } else {
                playErrorSound();
                return `cat: ${file}: No such file`;
            }
        } else {
            playErrorSound();
            return `cat: You are not in the blog directory`;
        }
    },
    clear: function() {
        // Reset the terminal output to the default HTML content
        outputElement.innerHTML = `
            <div id="ascii-system-container">
                <pre id="ascii-art">
       _____ _                _______        _       
      |_   _| |              |__   __|      | |      
        | | | |__   ___  _ __   | | ___  ___| |_ ___ 
        | | | '_ \\ / _ \\| '_ \\  | |/ _ \\/ __| __/ __|
       _| |_| | | | (_) | | | | | |  __/ (__| |_\\__ \\
      |_____|_| |_|\\___/|_| |_| |_|\\___|\\___|\\__|___/
                </pre>
                
                <pre id="system-info">
OS: Terminal Themed Blog OS 🌐
Kernel: 5.10.60-generic 🐧
Uptime: <span id="uptime">...</span> ⏱️
Packages: 34 (npm) 📦
Shell: TunedTerminal 1.0 🖥️
Resolution: 1920x1080 🎯
CPU: Intel i7-8750H (12) @ 2.2GHz 🚀
GPU: NVIDIA GeForce GTX 1050 Ti 🎮
Memory: 8GB 💾
                </pre>
            </div>
    
            <pre>Type <code>help</code> to see the list of commands.</pre>
        `;
    
        // Clear the input field
        commandInput.value = '';
    
        // Reinitialize uptime after the terminal is cleared
        const uptimeElement = document.getElementById('uptime');
        updateUptime(uptimeElement); // Call updateUptime after clearing
    
        // Return an empty string as output
        return '';
    },
    
    
    
    "rm-rf": function() {
        window.close();
    },

    "cd..": function() {
        if (currentDirectory === "blog") {
            currentDirectory = "home";
            updatePrompt();
            return `Moved to home directory`;
        } else if (currentDirectory === "home") {
            updatePrompt();
            return `Already in the home directory`;
        } 
        
        
        else {
            playErrorSound();
            return `cd..: No such directory`;
        }
    }
};

// Function to update the command prompt
export function updatePrompt() {
    let promptText = `$ [${currentDirectory}] > `;
    commandInput.placeholder = promptText;
}

// Function to scroll terminal to the bottom
export function scrollToBottom() {
    outputElement.scrollTop = outputElement.scrollHeight + outputElement.scrollHeight;
}
