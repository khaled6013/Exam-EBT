document.addEventListener('DOMContentLoaded', () => {
    
    // --- Live Date & Time Logic ---
    function updateClock() {
        const now = new Date();
        const options = { 
            weekday: 'long', year: 'numeric', month: 'long', 
            day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' 
        };
        const clockElement = document.getElementById('live-clock');
        if(clockElement) {
            clockElement.innerText = now.toLocaleDateString('en-US', options);
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Counter Up Animation Logic ---
    const counters = document.querySelectorAll('.counter');
    const animationSpeed = 200; // Animation-er speed (beshi hole slow hobe)

    const runCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / animationSpeed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Scroll korle jokhon section-ti shamne ashbe tokhon animation shuru hobe
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            runCounter();
            observer.disconnect(); // Ekbar animation hoye gele bondho hoye jabe
        }
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('statistics');
    if(statsSection) observer.observe(statsSection);
});