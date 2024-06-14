jQuery(document).ready(function ($) {
    $('.button[data-action="generate-art"]').click(function () {
        const artContainer = $('#art-description');
        const parent = $(this).parents('.elevation');
        parent.addClass('pressed');

        window['drawFunctions'] = [];

        $.ajax({
            url: 'http://localhost:3000/api/generate',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ prompt: globalPrompt }),
            success: function (data) {
                window['drawFunctions'].push(data.draw_function);

                artContainer.fadeOut(200, function () {
                    artContainer.text(data.description);
                    artContainer.fadeIn(200);
                });

                parent.removeClass('pressed');
            },
            error: function (error) {
                console.log('Error:', error);
                parent.removeClass('pressed');
            }
        });
    });

    // #prompt make this textarea auto resize
    $('#prompt').on('input', function () {
        const lineSize = 36;
        const lines = $(this).val().split('\n').length;
        $(this).css('height', `${lineSize * lines}px`);

    });

});