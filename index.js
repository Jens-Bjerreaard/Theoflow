

  
// Function to load content dynamically and set the active class
function loadPage(event, page) {
    event.preventDefault(); // Stop the link from actually navigating
  
    // Fetch the content of the clicked page
    fetch(page)
      .then((response) => response.text()) // Get the text content from the response
      .then((data) => {
        document.getElementById('content-area').innerHTML = data; // Load content into the content area
        setActiveLink(event.currentTarget); // Set the clicked link as active
      })
      .catch((error) => console.error('Error loading page:', error)); // Handle errors
  }
  
  

document.addEventListener('DOMContentLoaded', function () {
    // Function to load pages dynamically
    function loadPage(event, page) {
        event.preventDefault(); // Prevent default link behavior
        
        fetch(page)
            .then(response => response.text())
            .then(data => {
                // Insert fetched content into content-area
                document.getElementById('content-area').innerHTML = data;
                
                // Reinitialize modal-related functions after content is loaded
                if (page === 'onboard.html') {
                    initializeModal();
                }
            })
            .catch(error => console.error('Error loading the page:', error));
    }

    // Function to initialize the modal
    function initializeModal() {
        const openModalBtn = document.getElementById("openModalBtn");
        const modalPlaceholder = document.getElementById("modal-placeholder");

        if (openModalBtn) {
            openModalBtn.onclick = function () {
                fetch('pop-up.html')
                    .then(response => response.text())
                    .then(data => {
                        // Insert the fetched HTML into the placeholder
                        modalPlaceholder.innerHTML = data;

                        // Display the modal
                        const modal = document.getElementById("myModal");
                        modal.style.display = "block";

                        // Get the <span> element that closes the modal
                        const closeBtn = modal.querySelector(".close-btn");

                        // When the user clicks on <span> (x), close the modal
                        closeBtn.onclick = function () {
                            modal.style.display = "none";
                        };

                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        };
                    })
                    .catch(error => console.error('Error loading the modal:', error));
            };
        }
    }

    // Initial page load
    loadPage(new Event('click'), 'onboard.html'); // Load onboard page by default

    // Expose loadPage globally
    window.loadPage = loadPage;
});


