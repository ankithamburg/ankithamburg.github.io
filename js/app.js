// Handle User Authentication
auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, show dashboard
        document.querySelector('.dashboard-container').style.display = 'block';
        // You can get user information if needed, e.g., user.uid or user.email
        console.log("User logged in:", user.email);
    } else {
        // User is not signed in, redirect to login
        window.location.href = "login.html";
    }
});

// Assign Workout Plan
document.getElementById('assignWorkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form inputs
    const title = document.getElementById('workoutTitleInput').value;
    const description = document.getElementById('workoutDescriptionInput').value;

    // Update the workout plan in Firestore
    const workoutRef = db.collection('workouts').doc('today');
    workoutRef.set({
        title: title,
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        // Update UI with assigned workout
        document.getElementById('workoutTitle').textContent = title;
        document.getElementById('workoutDescription').textContent = description;

        // Clear input fields
        document.getElementById('workoutTitleInput').value = '';
        document.getElementById('workoutDescriptionInput').value = '';
        console.log('Workout assigned successfully!');
    })
    .catch((error) => {
        console.error("Error assigning workout: ", error);
    });
});

// Fetch the assigned workout on page load
window.onload = function() {
    const workoutRef = db.collection('workouts').doc('today');
    workoutRef.get().then((doc) => {
        if (doc.exists) {
            const workoutData = doc.data();
            document.getElementById('workoutTitle').textContent = workoutData.title;
            document.getElementById('workoutDescription').textContent = workoutData.description;
        } else {
            document.getElementById('workoutTitle').textContent = 'No workout assigned yet';
            document.getElementById('workoutDescription').textContent = 'Please check back later for your daily workout.';
        }
    }).catch((error) => {
        console.error("Error getting workout: ", error);
    });
};
