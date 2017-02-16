
$(document).ready(function () {
  // Bind layout control events
  // title
  $('#h1title').on('click', function() { window.location.replace("/"); });
  // navbuttons
  $('input.nav-bar[type="button"]').each(function () {
    let button = $(this);
    switch(button.attr('name')) {
      case 'home':
        button.on('click', function() { window.location.replace("/"); });
        break;
      case 'login':
        button.on('click', function() { window.location.replace("/login"); });
        break;
      case 'account':
        button.on('click', function() { window.location.replace("/account"); });
        break;
      case 'logout':
        button.on('click', function() { window.location.replace("/logout"); });
        break;
    }
  });
});