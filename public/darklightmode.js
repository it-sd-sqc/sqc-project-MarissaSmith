document.addEventListener('DOMContentLoaded', function () {
  // Your JavaScript code here
const button = document.getElementById('myButton')
const body = document.body // Get the body element

// Add a click event listener to the button
button.addEventListener('click', function () {
  // Toggle between light and dark mode
  if (body.classList.contains('dark-mode')) {
    // Switch to light mode
    body.classList.remove('dark-mode')
  } else {
    // Switch to dark mode
    body.classList.add('dark-mode');
  }
})
});