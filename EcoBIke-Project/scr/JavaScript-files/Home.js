// Sponsors tiers
document.addEventListener("DOMContentLoaded", function() {
    var span = document.querySelectorAll(".sponsorsFooter ul span");
    var saparateRows = document.querySelectorAll(".sponsorsFooter ul");
    var title = document.querySelector("#sponsorTitle");
  
    span.forEach(function(span, index) {
      span.addEventListener("mouseenter", function() {
        this.classList.add('hover');
        saparateRows[index].classList.add('enter');
        var setTitle = this.getAttribute("data-group-title");
        title.innerHTML = setTitle;
      });
  
      span.addEventListener("mouseleave", function() {
        this.classList.remove('hover');
        saparateRows[index].classList.remove('enter');
        var setTitle = title.getAttribute("data-default-title");
        title.innerHTML = setTitle;
      });
    });
  });
  //End of sponsors tiers