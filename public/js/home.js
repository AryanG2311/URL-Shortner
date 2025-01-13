const copyButton = document.getElementById('copyButton');
const inputBox = document.getElementById('inputBox');

copyButton.addEventListener('click', () => {
    inputBox.select(); // Select the text inside the input box
    inputBox.setSelectionRange(0, 99999); // For mobile devices

    // Use the clipboard API to copy the text
    navigator.clipboard.writeText(inputBox.value)
        .then(() => {
            alert('Copied to clipboard!');
        })
        .catch((err) => {
            console.error('Failed to copy text: ', err);
        });
});