jQuery(document).ready(function ($) {
    $('.button[data-action="generate-art"]').click(function () {
        const prompt = 'dancing shapes with colors and gradients';
        const canvasElement = $('#art-container');
        $.ajax({
            url: 'http://localhost:3000/api/generate',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ prompt: prompt, canvasSize: {width: canvasElement.width(), height: canvasElement.height()} }),
            success: function (data) {
                window['drawFunctions'].push(data.function);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
});
