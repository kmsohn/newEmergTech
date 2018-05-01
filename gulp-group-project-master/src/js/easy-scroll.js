 // on nav links or up button click animated easy scroll to section
    $(document).ready(function () {
      $("a[href^='#']").click(function (e) {
        e.preventDefault();
        var position = $($(this).attr("href")).offset().top - 71;
        $("body, html").animate({
          scrollTop: position
        }, 1000);
      });
    });