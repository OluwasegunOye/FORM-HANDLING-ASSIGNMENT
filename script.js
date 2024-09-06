document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registrationForm');
    const formSummary = document.getElementById('formSummary');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const contactField = document.getElementById('contact');
    const termsField = document.getElementById('terms');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        // Capture form data
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const contact = contactField.value;
        const termsAccepted = termsField.checked;

        // Validate form data
        let errors = [];
        if (!name) errors.push("Name is required.");
        if (!email) errors.push("Email is required.");
        if (!validateEmail(email)) errors.push("Invalid email format.");
        if (!contact) errors.push("Preferred contact method is required.");
        if (!termsAccepted) errors.push("You must accept the terms and conditions.");

        // Display errors or form summary
        if (errors.length > 0) {
            formSummary.innerHTML = errors.map(error => `<div class="error">${error}</div>`).join('');
        } else {
            formSummary.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Preferred Contact Method:</strong> ${contact}</p>
                <p><strong>Terms Accepted:</strong> ${termsAccepted ? "Yes" : "No"}</p>
            `;
        }
    });

    // Real-time validation
    emailField.addEventListener('input', function() {
        if (!validateEmail(emailField.value)) {
            emailField.setCustomValidity('Invalid email format');
        } else {
            emailField.setCustomValidity('');
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
