const icons = document.querySelectorAll('.pluse');

icons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const content = icon.parentElement.parentElement.nextElementSibling;
        content.classList.toggle('hidden')
    })
})
