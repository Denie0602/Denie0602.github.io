document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const imageInput = document.getElementById('image-input');
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            analyzeFace(imageData);
        };
        reader.readAsDataURL(file);
    }
});

function analyzeFace(imageData) {
    // Contoh analisis wajah sederhana dengan menggunakan Face API (atau API lainnya)
    fetch('https://api.example.com/face-analysis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.json())
    .then(data => {
        displayResult(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (data.faces && data.faces.length > 0) {
        data.faces.forEach(face => {
            const faceDetails = document.createElement('div');
            faceDetails.innerHTML = `
                <p>Wajah terdeteksi:</p>
                <p>Umur: ${face.age}</p>
                <p>Jenis Kelamin: ${face.gender}</p>
                <p>Emosi: ${face.emotion}</p>
            `;
            resultDiv.appendChild(faceDetails);
        });
    } else {
        resultDiv.innerHTML = '<p>Tidak ada wajah terdeteksi.</p>';
    }
}