    const fullscreenContainer = document.getElementById('fullscreenContainer');

    // Function to check if in fullscreen mode
    function isFullscreen() {
        return (
            document.fullscreenElement || 
            document.mozFullScreenElement || 
            document.webkitFullscreenElement || 
            document.msFullscreenElement
        );
    }

    // Function to enter fullscreen mode
    function enterFullscreen() {
        // Request fullscreen mode for different browsers
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }

        // Show fullscreen container
        fullscreenContainer.style.display = 'flex';
        fullscreenAudio.play();
    }

    // Function to exit fullscreen mode
    function exitFullscreen() {
        // Exit fullscreen mode for different browsers
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }

    // Listen for the fullscreen change event to handle when fullscreen is exited
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari/Chrome
    document.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
    document.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE/Edge

    // Handle fullscreen change event to hide the fullscreen container when exiting fullscreen
    function handleFullscreenChange() {
        if (!isFullscreen()) {
            // Hide the fullscreen container when exiting fullscreen
            fullscreenContainer.style.display = 'none';

            // Re-enter fullscreen after 1 second
            setTimeout(() => {
                if (!isFullscreen()) { // Only re-enter if not in fullscreen
                    enterFullscreen();
                }
            }, 1000);
        }
    }
    // Initialize WaveSurfer instance
    