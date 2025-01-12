const images = [
    '/assets/components/footer/media/portrait1.jpg',
    '/assets/components/footer/media/portrait2.jpg',
    '/assets/components/footer/media/portrait3.jpg'
    // Add more image paths as needed
];
const randomImage = images[Math.floor(Math.random() * images.length)];
document.getElementById('random-portrait').src = randomImage;