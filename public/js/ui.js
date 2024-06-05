jQuery(document).ready(function ($) {
    $('.button[data-action="generate-art"]').click(function () {
        const prompt = 'A painting of a beautiful landscape';
        $.ajax({
            url: 'http://localhost:3000/api/generate',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ prompt: prompt }),
            success: function (data) {
                window['drawFunctions'].push(data.function);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
});
