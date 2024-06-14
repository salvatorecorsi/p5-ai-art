function setup() {
    window['drawFunctions'] = [];
    const artContainer = document.getElementById('art-container');
    const canvas = createCanvas(artContainer.offsetWidth, artContainer.offsetHeight, WEBGL);
    canvas.parent('art-container');
}

function draw() {
    translate(-width / 2, -height / 2);

    window['drawFunctions'].forEach((fn) => {
        if (typeof eval(fn)() === 'function') {
            try {
                eval(fn)();
            }
            catch (error) {
                console.log('Error:', error);
            }
        }
    });
}