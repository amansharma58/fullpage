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
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',  // The container where the waveform will be drawn
        waveColor: '#3498db',    // Color of the waveform
        progressColor: '#2980b9',  // Color of the progress
        height: 150,             // Height of the waveform
        barWidth: 3,             // Width of the individual bars
        responsive: true,        // Make it responsive to window resizing
        loopSelection: true,     // Enable looping of selection (optional, if you want to loop the entire audio)
      });
  
      // Load a default audio file or a sample if available
      function loadDefaultAudio() {
        // Set the loading message
        document.getElementById('loadingMessage').style.display = 'block';
        wavesurfer.load('a538e993-0faa-488d-b820-ac0a2f9e7815_04-03-25_19-4.wav');
  
        // Listen for the waveform's ready event and hide the loading message
        wavesurfer.on('ready', function() {
          document.getElementById('loadingMessage').style.display = 'none';
  
          // Automatically start playing when the audio is ready
          wavesurfer.play();
  
          // Set loop behavior: this ensures the audio loops once it reaches the end
          wavesurfer.on('finish', function() {
            wavesurfer.seekTo(0); // Go to the start
            wavesurfer.play();    // Start playing again
          });
        });
  
        // Error handling in case the audio file cannot be loaded
        wavesurfer.on('error', function() {
          document.getElementById('loadingMessage').innerText = 'Failed to load audio. Please check the file.';
        });
      }
  
      // Load default audio
      loadDefaultAudio();
  
      // Play/Pause functionality
      document.getElementById('playPauseButton').addEventListener('click', function() {
        if (wavesurfer.isPlaying()) {
          wavesurfer.pause();
          this.innerHTML = 'Play';
        } else {
          wavesurfer.play();
          this.innerHTML = 'Pause';
        }
      });
  
      // Upload functionality to load custom audio file
      document.getElementById('uploadAudio').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            // Show the loading message when the user uploads a file
            document.getElementById('loadingMessage').style.display = 'block';
  
            // Load the file into WaveSurfer
            wavesurfer.loadBlob(event.target.result);
  
            // Hide the loading message once the audio file is loaded
            wavesurfer.on('ready', function() {
              document.getElementById('loadingMessage').style.display = 'none';
  
              // Automatically start playing when the audio is ready
              wavesurfer.play();
  
              // Set loop behavior for the uploaded audio as well
              wavesurfer.on('finish', function() {
                wavesurfer.seekTo(0); // Go to the start
                wavesurfer.play();    // Start playing again
              });
            });
  
            // Error handling
            wavesurfer.on('error', function() {
              document.getElementById('loadingMessage').innerText = 'Failed to load audio. Please check the file.';
            });
          };
          reader.readAsArrayBuffer(file);
        }
      });