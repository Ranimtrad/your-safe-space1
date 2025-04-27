// Function to save a feeling to localStorage
function saveFeeling() {
  const feelingText = document.getElementById("feelingText").value;

  if (feelingText.trim() === "") {
    alert("Please write something before saving!");
    return;
  }

  const currentDate = new Date().toLocaleDateString(); // Get current date in DD/MM/YYYY format
  const feelingData = {
    text: feelingText,
    date: currentDate,
    image: "cute.jpeg" // Default image for now (can choose another image randomly later if needed)
  };

  // Get existing feelings from localStorage or initialize an empty array if none exist
  let feelings = JSON.parse(localStorage.getItem("feelings")) || [];

  // Add the new feeling to the array
  feelings.push(feelingData);

  // Save the updated feelings array to localStorage
  localStorage.setItem("feelings", JSON.stringify(feelings));

  // Clear the textarea after saving
  document.getElementById("feelingText").value = "";

  // Redirect to home page after saving
  window.location.href = "home.html";
}

// Function to display feelings from localStorage
function displayFeelings() {
  const feelingsContainer = document.getElementById("feelingsContainer");

  // Get feelings from localStorage
  const feelings = JSON.parse(localStorage.getItem("feelings")) || [];

  // Clear the container before displaying new feelings
  feelingsContainer.innerHTML = "";

  // Display each feeling
  feelings.forEach((feeling, index) => {
    const feelingBox = document.createElement("div");
    feelingBox.classList.add("feeling-box");

    feelingBox.innerHTML = `
      <div class="feeling-header">
        <img src="Images/${feeling.image}" alt="Feeling Image" class="feeling-image" style="width:150px; height:auto;">
        <span class="feeling-date">${feeling.date}</span>
      </div>
      <div class="feeling-text">${feeling.text}</div>
      <textarea class="comment-box" placeholder="Write a comment..."></textarea>
      <button onclick="deleteFeeling(${index})" class="delete-button">🗑️ Delete</button>
    `;

    feelingsContainer.appendChild(feelingBox);
  });
}

// Function to delete a feeling
function deleteFeeling(index) {
  let feelings = JSON.parse(localStorage.getItem("feelings")) || [];
  feelings.splice(index, 1); // Remove the feeling from the array
  localStorage.setItem("feelings", JSON.stringify(feelings)); // Save the updated array back to localStorage
  displayFeelings(); // Re-display the feelings
}

// Call the displayFeelings function when the page loads
window.onload = displayFeelings;


