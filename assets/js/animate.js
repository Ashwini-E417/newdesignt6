document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    if(!entry.target.classList.contains("fade")){
                    entry.target.classList.add("fade");
                    // observerInstance.unobserve(entry.target); // Remove if you only want it to animate once
                    }
                }
                else if (!entry.isIntersecting && entry.intersectionRatio <0.2) {
                    entry.target.classList.remove("fade");
                }
            });
        },
        {
            threshold: [0.1,0.2] // Trigger when 10% of the section is visible
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});











document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-left");

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    if(!entry.target.classList.contains("fade")){
                    entry.target.classList.add("fade");
                    // observerInstance.unobserve(entry.target); // Remove if you only want it to animate once
                    }
                }
                else if (!entry.isIntersecting && entry.intersectionRatio <0.3) {
                    entry.target.classList.remove("fade");
                }
            });
        },
        {
            threshold: [0.1,0.3] // Trigger when 10% of the section is visible
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});












document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-right");

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    if(!entry.target.classList.contains("fade")){
                    entry.target.classList.add("fade");
                    // observerInstance.unobserve(entry.target); // Remove if you only want it to animate once
                    }
                }
                else if (!entry.isIntersecting && entry.intersectionRatio <0.3) {
                    entry.target.classList.remove("fade");
                }
            });
        },
        {
            threshold: [0.1,0.3] // Trigger when 10% of the section is visible
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});
