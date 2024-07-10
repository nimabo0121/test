document.addEventListener("DOMContentLoaded", () => {
  let backToTop = document.getElementById("backToTop");

  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth", // 平滑滾動
      });
    });
  }
});