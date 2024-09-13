// uptime.js

export function updateUptime(uptimeElement) {
    const startTime = Date.now();
    
    setInterval(() => {
        const now = Date.now();
        const uptimeSeconds = Math.floor((now - startTime) / 1000);
        
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;

        uptimeElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}




// Function to update the resolution display
function updateResolution() {
    // Get the resolution element
    const resolutionElement = document.getElementById('resolution');
    
    // Get the screen width and height
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Update the resolution element with current width and height
    resolutionElement.textContent = `${width}x${height}`;
}

// Run the update function when the page loads
window.onload = updateResolution;

// Optionally, update the resolution if the window is resized
window.onresize = updateResolution;
