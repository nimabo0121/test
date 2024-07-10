function toggleCanvas() {
  var canvas = document.getElementById("offcanvas");
  var hamburger = document.getElementById("hamburger");
  canvas.classList.toggle("active");
  hamburger.classList.toggle("active");
}

document
  .getElementById("aboutUsLink")
  .addEventListener("click", function (e) {
    e.preventDefault();
    var dropdown = document.getElementById("aboutUsDropdown");
    var link = document.getElementById("aboutUsLink");
    dropdown.classList.toggle("show");
    link.classList.toggle("open");
  });
  