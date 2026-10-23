document.querySelectorAll('.tutorial-toc a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {

        document
            .querySelectorAll('.tutorial-toc a[aria-current="location"]')
            .forEach(function (current) {
                current.removeAttribute('aria-current');
            });

        this.setAttribute('aria-current', 'location');
    });
});