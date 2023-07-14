//your code here
document.addEventListener("DOMContentLoaded", function() {
  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");
  const h = document.getElementById("h");

  let selectedImages = [];
  let verifyClicked = false;

  // Generate random index for the repeated image
  const repeatedImageIndex = Math.floor(Math.random() * 5);

  // Generate random arrangement of images
  const imageIndices = getRandomImageIndices();

  // Render images
  renderImages();

  // Add event listener to image container
  imageContainer.addEventListener("click", function(event) {
    const clickedImage = event.target;
    const clickedIndex = clickedImage.getAttribute("data-index");

    if (selectedImages.length < 2 && !selectedImages.includes(clickedImage)) {
      clickedImage.classList.add("selected");
      selectedImages.push(clickedImage);

      if (selectedImages.length === 2) {
        verifyButton.classList.remove("hidden");
      }
    }

    if (selectedImages.length === 2) {
      verifyButton.addEventListener("click", verifyClickedImages);
    }
  });

  // Add event listener to reset button
  resetButton.addEventListener("click", function() {
    reset();
  });

  // Function to render images
  function renderImages() {
    for (let i = 0; i < imageIndices.length; i++) {
      const img = document.createElement("img");
      img.src = getImageUrl(i);
      img.classList.add("img" + (i + 1));
      img.setAttribute("data-index", i);
      imageContainer.appendChild(img);
    }
  }

  // Function to generate random arrangement of images
  function getRandomImageIndices() {
    const indices = [0, 1, 2, 3, 4, repeatedImageIndex];
    shuffleArray(indices);
    return indices;
  }

  // Function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to get image URL based on index
  function getImageUrl(index) {
    switch (index) {
      case 0:
        return "https://picsum.photos/id/237/200/300";
      case 1:
        return "https://picsum.photos/seed/picsum/200/300";
      case 2:
        return "https://picsum.photos/200/300?grayscale";
      case 3:
        return "https://picsum.photos/200/300/";
      case 4:
        return "https://picsum.photos/200/300.jpg";
      case 5:
        return getImageUrl(repeatedImageIndex);
    }
  }

  // Function to handle verification of clicked images
  function verifyClickedImages() {
    verifyButton.removeEventListener("click", verifyClickedImages);
    verifyClicked = true;

    const img1Index = selectedImages[0].getAttribute("data-index");
    const img2Index = selectedImages[1].getAttribute("data-index");

    if (img1Index === img2Index) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    para.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    verifyButton.classList.add("hidden");
  }

  // Function to reset the state
  function reset() {
    selectedImages.forEach(function(image) {
      image.classList.remove("selected");
    });

    selectedImages = [];
    verifyClicked = false;

    para.classList.add("hidden");
    resetButton.classList.add("hidden");
    verifyButton.classList.add("hidden");
    h.classList.remove("hidden");
  }
});
