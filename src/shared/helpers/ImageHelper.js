function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    return canvas;
}

function loadImage(imageUrl) {
    return new Promise(resolve => {
        let image = new Image();

        image.onLoad = () => {
            resolve(image);
        };

        image.src = imageUrl;
    });
}

function cropImage(imageSrc, rect) {
    return new Promise((resolve, reject) => {
        loadImage(imageSrc).then(image => {
            let canvas = createCanvas(rect.width, rect.height);
            let context = canvas.getContext('2d');

            context.drawImage(
                image,
                rect.left, rect.top, rect.width, rect.height, // source rectangle
                0, 0, rect.width, rect.height  // destination rectangle
            );

            resolve(canvas.toDataURL('image/png'));
        }, reject);
    });
}


function convertToDataURL(imageUrl) {
    return new Promise((resolve, reject) => {
        loadImage(imageUrl).then(image => {
            let canvas = createCanvas(image.width, image.height);
            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            resolve(canvas.toDataURL());
        }, reject);
    });
}