function fading() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) { 
        $('header').addClass('header-showing');
        $('.colorbackground-fixed').css('opacity', '1');
    } else {
        $('.colorbackground-fixed').css('opacity', '0');
      $('header').removeClass('header-showing');
      $('header').css('background-color', 'transparent');
    }

    if (document.body.scrollTop > 850 || document.documentElement.scrollTop > 850) { 
        $('.colorbackground-fixed').css('opacity', '1');
    } else {
        $('.colorbackground-fixed').css('opacity', '0');
    }
    
//  $('.colorbackground-fixed').css('opacity', document.documentElement.scrollTop/100)
}

window.onscroll = function() {
    fading();
}


