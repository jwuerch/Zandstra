(function($) {
    var HelloWorldDevs = function() {

    };

    HelloWorldDevs.prototype.mailForm = function (form, success_msg, uid) {
        var $form = $(form);
        $form.submit(function(e) {
            e.preventDefault();
            var formData = $form.serialize();
            var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule'
            $('.form-error').remove();
            $.ajax({
                type: 'POST',
                url: formAction,
                data: formData,
                dataType: 'json',
                encode: true
            }).done(function (response) {
                $form.replaceWith($(success_msg).html());
            }).error(function (response) {
                var $error_list = $('<ul>');
                if(response.responseJSON == undefined) {
                    $error_list.append($('<li>').text('There was a problem with your submission. Please ensure all fields are correctly entered.'));
                } else {
                    $.each(response.responseJSON, function(key, value) {
                        $error_list.append($('<li>').text(value));
                    });
                }
                $form.before('<div class="form-error"></div>');
                $('.form-error').html($error_list).fadeIn();
            });
        });
    };

    var HWD = new HelloWorldDevs();
    HWD.mailForm('#mail-form', '#success_msg' , '7fb35345-752d-4792-9480-cd3db6674a62');

    $('.mobile-primary-menu a').click(function () {
        if ($('#primary-menu').find('ul.mobile-primary-menu').length > 0) {
            $('ul.mobile-primary-menu').toggleClass("show");
        }
    });


    $(window).load(function() {
        $('#oc-slider-2').owlCarousel({
            items: 1,
            nav: true,
            loop: true,
            autoHeight: true,
            navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>']
        });
    });

    $('.services-carousel').owlCarousel({
        items: 1,
        margin:0,
        autowidth:true,
        loop: true,
        autoplay: true,
        autoplaySpeed: 400,
        autoplayTimeout: 6000,
        autoplayHoverPause:true,
        nav: true,
        stopOnHover: true,
        autoplayHoverPause: true,
        dots: false,
        navText: [
            '<i class="icon-chevron-left"></i>',
            '<i class="icon-chevron-right"></i>'
        ],
        responsive: {
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    if ($(window).width() <= 1200) {
        $('.move-mobile').detach().appendTo('.mobile-attach');
    } else {
        $('.move-mobile').detach().appendTo('.desktop-attach');

    }
    $(window).resize(function() {
        if ($(window).width() <= 1200) {
            $('.move-mobile').detach().appendTo('.mobile-attach');
        } else {
            $('.move-mobile').detach().appendTo('.desktop-attach');

        }
    });





})(jQuery);