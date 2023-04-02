"use strict";
window.addEventListener('load', () => {
    moveImageUp();
});
function moveImageUp() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "img/vorschlaege_30_03_2022.png";
    let yPos = canvas.height;
    img.onload = function () {
        // Skaliere das Bild auf die volle Breite des Canvas
        const scaleFactor = canvas.width / img.width;
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;
        // Zeichne das Bild an der richtigen Position, um keine Lücke zu erzeugen
        const yStart = canvas.height - scaledHeight;
        let xPos = (canvas.width - scaledWidth) / 2;
        function draw() {
            // Lösche den vorherigen Frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Zeichne das Bild an der aktuellen Position
            ctx.drawImage(img, xPos, yPos, scaledWidth, scaledHeight);
            // Verringere die y-Position, um das Bild nach oben zu bewegen
            yPos -= 1;
            // Wenn das Bild den oberen Rand erreicht hat, setze es auf den unteren Rand zurück
            if (yPos < yStart - scaledHeight) {
                yPos = canvas.height;
            }
            // Wenn das Bild den unteren Rand erreicht hat, zeichne es erneut am oberen Rand
            if (yPos >= canvas.height) {
                ctx.drawImage(img, xPos, yStart - scaledHeight, scaledWidth, scaledHeight);
            }
            // Rufe die draw-Funktion erneut auf, um eine nahtlose Animation zu erzielen
            requestAnimationFrame(draw);
        }
        // Starte die Animation, sobald das Bild geladen wurde
        draw();
    };
}
