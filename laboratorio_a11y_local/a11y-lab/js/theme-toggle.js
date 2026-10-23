document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.a11y-lab-theme-toggle');

    if (!toggle) {
        return;
    }

    const savedTheme = localStorage.getItem('a11y-lab-theme');

    if (savedTheme === 'dark') {
        toggle.setAttribute('aria-pressed', 'true');
        toggle.textContent = 'Modo Claro';

        document.documentElement.classList.add('dark-experiment');
    }

    toggle.addEventListener('click', function () {
        const isDark = toggle.getAttribute('aria-pressed') === 'true';
        const newIsDark = !isDark;

        toggle.setAttribute(
            'aria-pressed',
            String(newIsDark)
        );

        toggle.textContent = newIsDark
            ? 'Modo Claro'
            : 'Modo Escuro';

        document.documentElement.classList.toggle(
            'dark-experiment',
            newIsDark
        );

        localStorage.setItem(
            'a11y-lab-theme',
            newIsDark ? 'dark' : 'light'
        );
    });
});