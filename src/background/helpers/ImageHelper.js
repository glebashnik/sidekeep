function loadImage(imageUrl) {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = imageUrl;
    });
}

function createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    return canvas;
}

export default {
    toDataURL(imageUrl, maxWidth, maxHeight) {
        return new Promise(resolve => {
            loadImage(imageUrl).then(image => {
                let width = image.width;
                let height = image.height;

                if (maxHeight && maxHeight && (width > maxWidth || height > maxHeight)) {
                    const widthScale = maxWidth / image.width;
                    const heightScale = maxHeight / image.height;
                    const scale = Math.min(widthScale, heightScale);
                    width = image.width * scale;
                    height = image.height * scale;
                }

                const canvas = createCanvas(width, height);
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, width, height);
                resolve(canvas.toDataURL('image/png'));
            });
        });
    }
};