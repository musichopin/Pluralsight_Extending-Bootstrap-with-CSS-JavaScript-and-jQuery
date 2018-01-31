$(document).ready(function () {
  $('body').removeClass('notransition');
});

/* Use to display a progress message */
function DisplayProgressMessage(ctl, msg) {
  // Disable the button and change text
  $(ctl).prop("disabled", true).text(msg);
  // Gray out background on page
  $("body").addClass("pdsa-submit-progress-bg");

  // Wrap in setTimeout so the UI can update the spinners 
  // (even 0 sec is enough)
  // **this is needed when we post using php in real world
  // so that thread is released**
  setTimeout(function () {
    // makes the pop-up message visible
    $(".pdsa-submit-progress").removeClass("hidden");
  }, 0);

  return true;
}