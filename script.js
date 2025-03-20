document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('image-preview');
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('image_file', file);

        // Show loading animation
        document.getElementById('loading').style.display = 'block';

        // Replace 'YOUR_API_KEY' with your actual Remove.bg API key
        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': '4EuuYkj857A2M7Xoaaeha6gQ',
            },
            body: formData,
        })
        .then(response => response.blob())
        .then(blob => {
            // Hide loading animation
            document.getElementById('loading').style.display = 'none';

            // Create a download link for the processed image
            const url = URL.createObjectURL(blob);
            const downloadLink = document.getElementById('download-link');
            downloadLink.href = url;
            downloadLink.download = 'no-bg.png';
            downloadLink.style.display = 'inline-block';

            // Show the processed image
            const imagePreview = document.getElementById('image-preview');
            imagePreview.innerHTML = `<img src="${url}" alt="Processed Image">`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('loading').style.display = 'none';
            alert('An error occurred while processing the image.');
        });
    }
});