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

// Simulate system uptime
let startTime = new Date();
function calculateUptime() {
    let now = new Date();
    let diff = Math.floor((now - startTime) / 1000);
    let seconds = diff % 60;
    let minutes = Math.floor(diff / 60) % 60;
    let hours = Math.floor(diff / 3600) % 24;
    let days = Math.floor(diff / 86400);
    uptimeElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(calculateUptime, 1000);

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
            return `Moved to ${args[0]} directory`;
        } else {
            return `cd: ${args[0]}: No such directory`;
        }
    },
    cat: function(args) {
        if (currentDirectory === "blog") {
            const file = args[0];
            if (blogs[file]) {
                return `Title: ${blogs[file].title}\n\n${blogs[file].content}`;
            } else {
                return `cat: ${file}: No such file`;
            }
        } else {
            return `cat: You are not in the blog directory`;
        }
    },
    clear: function() {
        outputElement.innerHTML = '';
        return '';
    }
};

// Handle command input
commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const commandText = commandInput.value.trim();
        let [command, ...args] = commandText.split(" ");
        let result = commands[command] ? commands[command](args) : `Command not found: ${command}`;
        if (result) {
            outputElement.innerHTML += `\n$ ${commandText}\n${result}\n`;
        }
        commandInput.value = '';
        outputElement.scrollTop = outputElement.scrollHeight;
    }
});
