document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    // Email regex pattern
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:<,.>?]).{8,}$/;

    if (!emailPattern.test(email)) {
        document.getElementById('registerStatus').innerHTML = "Please enter a valid email address";
        var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
        myModal.show();
        return;
    }

    // Validate password format
    if (!passwordPattern.test(password)) {
        document.getElementById('registerStatus').innerHTML = "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.";
        var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
        myModal.show();
        return;
    }


    if (password !== confirmPassword) {
        document.getElementById('registerStatus').innerHTML = "Passwords do not match";
        var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
        myModal.show();
        return;
    }

    fetch('http://127.0.0.1:8000/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        })
    })
        .then(response => {

            if (response.ok) {
                document.getElementById('registerStatus').innerHTML = "Sign up successful. Verification email sent.";
                var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
                myModal.show();

                setTimeout(function () {
                    window.location.href = '../views/login.html'; 
                }, 3000);
            }
            else {
                throw new Error('Custom user with this email already exists.');
            }
        })
        .catch(error => {
            document.getElementById('registerStatus').innerHTML = error.message;
            var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
            myModal.show();
        });
});
