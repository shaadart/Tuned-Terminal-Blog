import { updateUptime, updateResolution } from './system_info.js';

export const outputElement = document.getElementById("output");
export const commandInput = document.getElementById("command");

let currentDirectory = "home";
let blogs = {
    "encryption_and_music.docx": {
        title: "Encryption and Music",
        content: "This blog discusses the relationship between encryption and music. PLEASE VISIT ON 16th!"
    },
   
};
export const commands = {
    help: function() {
        return `Available commands:\n <span class="command">ls</span>List directories and blog posts\n <span class="command">cd [directory]</span>Moves you into a specific directory (or folder)\n <span class="command">cat [file]</span>Read the content of a blog post\n <span class="command">clear</span>Clear the terminal`;
    },
    "ls": function() {
        if (currentDirectory === "home") {
            return "<span class='directory'>home</span>\n<span class='directory'>blog/</span>";
        } else if (currentDirectory === "blog") {
            return Object.keys(blogs).map(file => `<span class='file'>- ${file}</span>`).join('\n');
        }
    },
    "cd": function(args) {
        if (args[0] === "home" || args[0] === "blog") {
            currentDirectory = args[0];
            updatePrompt();
            return `<span class="command">Moved to ${args[0]} directory</span>`;
        } else {
            playErrorSound();
            return `<span class="error">cd: ${args[0]}: No such directory</span>`;
        }
    },
    cat: function(args) {
        if (currentDirectory === "blog") {
            const file = args[0];
            if (blogs[file]) {
                return `<h3>Title: ${blogs[file].title}</h3>\n<pre><code class="language-javascript">${Prism.highlight(blogs[file].content, Prism.languages.javascript, 'javascript')}</code></pre>`;
            } else {
                playErrorSound();
                return `<span class="error">cat: ${file}: No such file</span>`;
            }
        } else {
            playErrorSound();
            return `<span class="error">cat: You are not in the blog directory</span>`;
        }
    },
    "clear": function() {
        // Reset the terminal output to the default HTML content
        outputElement.innerHTML = `
           <!-- Container for ASCII art and system info -->
            <div id="ascii-system-container">
                <pre id="ascii-art">
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⡴⢧⣀⠀⠀⣀⣠⠤⠤⠤⠤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⠏⢀⡴⠊⠁⠀⠀⠀⠀⠀⠀⠈⠙⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢶⣶⣒⣶⠦⣤⣀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣟⠲⡌⠙⢦⠈⢧⠀
⠀⠀⠀⣠⢴⡾⢟⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡴⢃⡠⠋⣠⠋⠀
⠐⠀⠞⣱⠋⢰⠁⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠤⢖⣋⡥⢖⣫⠔⠋⠀⠀⠀
⠈⠠⡀⠹⢤⣈⣙⠚⠶⠤⠤⠤⠴⠶⣒⣒⣚⣩⠭⢵⣒⣻⠭⢖⠏⠁⢀⣀⠀⠀⠀⠀
⠠⠀⠈⠓⠒⠦⠭⠭⠭⣭⠭⠭⠭⠭⠿⠓⠒⠛⠉⠉⠀⠀⣠⠏⠀⠀⠘⠞⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⢤⣀⠀⠀⠀⠀⠀⠀⣀⡤⠞⠁⠀⣰⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⠿⠀⠀⠀⠀⠀⠈⠉⠙⠒⠒⠛⠉⠁⠀⠀⠀⠉⢳⡞⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  </pre>
                
                <pre id="system-info">
<code>OS</code> : Terminal Themed Blog OS 🌐
<code>Kernel</code> : UPES CSA  🐧
<code>Theme</code> : Cyberpunk Security 🌃
<code>Uptime</code> : <span id="uptime">...</span>⏱️
<code>Packages</code> : 34 (npm) 📦
<code>Shell</code> : TunedTerminal 1.0 🖥️
<code>Resolution</code> : <span id="resolution">x</span>🎯
<code>CPU</code> : Intel CSA-8750H (UPES-12) @ 2.2GHz 🚀
<code>GPU</code> : NVIDIA GeForce GTX 1050 Ti 🎮
<code>Memory</code> : 4KB 💾
                    
                </pre>
            </div>

            <pre>type <code>help</code> to see the list of commands.</pre>
        </div>`;

        // Clear the input field
        commandInput.value = '';

        // Reinitialize uptime after the terminal is cleared
        const uptimeElement = document.getElementById('uptime');
       
        if (uptimeElement) {
            updateUptime(uptimeElement); // Call updateUptime after clearing
        }

        const resolutionElement = document.getElementById('resolution');
        if (resolutionElement) {
            updateResolution(resolutionElement);
        }

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
            return `<span class="command">Moved to home directory</span>`;
        } else if (currentDirectory === "home") {
            updatePrompt();
            return `<span class="command">Already in the home directory</span>`;
        } else {
            playErrorSound();
            return `<span class="error">cd..: No such directory</span>`;
        }
    }
};


// Function to update the command prompt
export function updatePrompt() {
    let promptText = `~[${currentDirectory}] > `;
    commandInput.placeholder = promptText;
}

// Function to scroll terminal to the bottom
export function scrollToBottom() {
    outputElement.scrollTop = outputElement.scrollHeight + outputElement.scrollHeight;
}
