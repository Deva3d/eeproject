fetch('/api/rooms', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({}) // You can include any data you want to send to the server here
})
.then(response => response.json())
.then(data => {
    console.log('Room created:', data.roomCode);
    // Handle the response from the server (e.g., display room code to the user)
})
.catch(error => {
    console.error('Error creating room:', error);
    // Handle errors (e.g., display error message to the user)
});
// Get the modal
 var createRoomModal = document.getElementById("createRoomModal");

 // Get the button that opens the modal
 var createRoomBtn = document.getElementsByClassName("btn1")[1];

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];



 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
     createRoomModal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
     if (event.target == createRoomModal) {
         createRoomModal.style.display = "none";
     }
 }


// random code

let roomCode = Math.floor(100000 + Math.random() * 900000);
localStorage.setItem('roomCode', roomCode);

document.getElementById("roomCode").innerHTML = roomCode;
 // Function to create a room

// Function to open the create room modal
function openCreateRoomModal() {
    document.getElementById("createRoomModal").style.display = "block";
    document.getElementById("overlay").style.display = "block"; // Display the shadow overlay
}

// Function to close the create room modal
function closeCreateRoomModal() {
    document.getElementById("createRoomModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    location.reload()
}

// Function to open the join room modal
function openJoinRoomModal() {
    document.getElementById("joinRoomModal").style.display = "block";
    document.getElementById("overlay").style.display = "block"; // Display the shadow overlay
}

// Function to close the join room modal
function closeJoinRoomModal() {
    document.getElementById("joinRoomModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    location.reload()
}

// Function to create a room
function createRoom() {
    fetch('/api/create_room/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Room created:', data.room_code);
        // Handle the response from the server
        // Redirect to create.html or display room code to the user
    })
    .catch(error => {
        console.error('Error creating room:', error);
        // Handle errors
    });
}

document.querySelector('.close').addEventListener('click', closeCreateRoomModal);

// Listen for changes in the number of persons input field
document.getElementById("numOfPersons").addEventListener("input", createRoom);

// Function to handle scrolling of input fields
document.getElementById("personsInput").addEventListener("wheel", function(event) {
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    this.scrollTop -= (delta * 30);
    event.preventDefault();
}, false);

// Function to create a room and navigate to create.html
function votingroom() {
    // Retrieve input names entered by the user
    var inputNames = [];
    var inputFields = document.querySelectorAll('#personsInput input[type="text"]');
    inputFields.forEach(function(inputField) {
        inputNames.push(inputField.value);
    });     

    // Store input names and room code in sessionStorage to access in create.html
    sessionStorage.setItem('inputNames', JSON.stringify(inputNames));
    

    // Navigate to create.html
    window.location.href = 'create.html';
}


// Function to join room
function joinRoom() {
    var inputRoomCode = parseInt(document.getElementById("joinRoomCodeInput").value);

    fetch('/api/check_room/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            room_code: inputRoomCode
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            // Room exists, redirect to join.html with room code as parameter
            window.location.href = 'join.html?room_code=' + inputRoomCode;
        } else {
            // Room doesn't exist, show error message
            var errorElement = document.getElementById("joinRoomError");
            errorElement.textContent = "Invalid Code";
            errorElement.style.display = "block"; // Ensure the error message is visible
        }
    })
    .catch(error => {
        console.error('Error joining room:', error);
        // Handle errors
    });
}


// Function to handle joining room when clicking the button in the join room modal
document.getElementById("joinRoomButton").addEventListener("click", joinRoom);

