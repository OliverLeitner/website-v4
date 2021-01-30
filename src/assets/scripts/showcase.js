const toggleBurger = () => {
  let burgerIcon = document.getElementById('burger');
  let dropMenu = document.getElementById('teamList');
  burgerIcon.classList.toggle('is-active');
  dropMenu.classList.toggle('is-active');
};
// Toggles 
/*const $burgers = getAll('.burger');
if ($burgers.length > 0) {
  $burgers.forEach($el => {
    $el.addEventListener('click', () => {
      const target = $el.dataset.target;
      const $target = document.getElementById(target);
      $el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}*/
// Get that hamburger menu cookin' //
/*document.addEventListener("DOMContentLoaded", function() {
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});*/

// Smooth Anchor Scrolling
// TODO: without jquery
/*$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});*/

// When the user scrolls down 20px from the top of the document, show the scroll up button
/*window.onscroll = function() {
  scrollFunction();
};*/

/*function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("toTop").style.display = "block";
  } else {
    document.getElementById("toTop").style.display = "none";
  }
}*/

// Preloader
// TODO: without jquery...
/*$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");
});
$(window).load(function() {
  var Body = $("body");
  Body.addClass("preloader-site");
});*/
