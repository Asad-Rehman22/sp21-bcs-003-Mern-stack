$(document).ready(function () {
    function register() {
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

        if (password === confirmPassword) {
            alert('Password does not match')
            return
        }

        // Make an AJAX request to the registration API
        $.ajax({
            url: 'http://localhost:3000/register',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            },
            
            success: function (response) {
                console.log(data);
                alert(response.message);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }

    // Attach the register function to the button click event
    $('#registerButton').on('click', register);
});
