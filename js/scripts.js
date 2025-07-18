document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function uploadMedia() {
    const input = document.getElementById('mediaUpload');
    const preview = document.getElementById('mediaPreview');
    const files = input.files;

    if (files.length === 0) {
        alert('Please select files to upload.');
        return;
    }

    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            if (file.type.startsWith('image/')) {
                div.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" class="slide-in">`;
            } else if (file.type.startsWith('video/')) {
                div.innerHTML = `<video controls class="slide-in"><source src="${e.target.result}" type="${file.type}"></video>`;
            }
            preview.appendChild(div);
        };
        reader.readAsDataURL(file);
    }
}

// Fade-in and slide-in animations on scroll
const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.classList.contains('fade-in') 
                ? 'fadeIn 1.5s ease-in forwards' 
                : 'slideIn 1s ease-in forwards';
        }
    });
}, { threshold: 0.2 });

animatedElements.forEach(element => observer.observe(element));

// Carousel auto-scroll
const carousel = document.querySelector('.carousel');
if (carousel) {
    let scrollAmount = 0;
    setInterval(() => {
        scrollAmount += 2;
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
        }
        carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 50);
}