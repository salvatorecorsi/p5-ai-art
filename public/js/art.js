function setup() {
    window['drawFunctions'] = [];
    const artContainer = document.getElementById('art-container');
    const canvas = createCanvas(artContainer.offsetWidth, artContainer.offsetHeight, WEBGL);
    canvas.parent('art-container');

}
function draw() {
    window['drawFunctions'].forEach((fn) => {
        if (typeof eval(fn)() === 'function') {
            eval(fn)();
            console.log('asd')
        }
    });
}