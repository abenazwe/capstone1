

function authenticateUser(email, password) {
    const apiUrl = 'http://127.0.0.1:8000/login/';

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                if (response.status == 404){
                    throw new Error('User not found. Please try again');
                }

                return response.json();
            }
            return response.json();
        });

}

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();


    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    authenticateUser(email, password)
        .then(response => {
            console.log(response.error)

            if (response.message === "Login successful"){

                document.getElementById('loginStatus').innerHTML = response.message;
                var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                myModal.show();
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                localStorage.setItem('email', response.email);
                setTimeout(function () {
                    window.location.href = '../views/table_new.html'; 
                }, 3000);
            }
            else if (response.error){
                document.getElementById('loginStatus').innerHTML = response.error;
                var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                myModal.show();
            }
            else{
                document.getElementById('loginStatus').innerHTML = "Login failed. Please try again";
                var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                myModal.show();
            }

            
        })
        .catch(error => {
            console.log(error);
            document.getElementById('loginStatus').innerHTML = error.message;
            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            myModal.show();
        });
});
