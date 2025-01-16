// Import Firebase modules
import { getFirestore, collection, addDoc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';
import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMiaSbEU5Mwo6KM_CE-W-b3ikgQq-AqOQ",
    authDomain: "ankithamburgpt.firebaseapp.com",
    projectId: "ankithamburgpt",
    storageBucket: "ankithamburgpt.firebasestorage.app",
    messagingSenderId: "98446620887",
    appId: "1:98446620887:web:3724ad39c8e0b9b5219892",
    measurementId: "G-C8HPDXLLK3"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Event listener to fetch workouts once the DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    const userId = 'user123';  // Replace with actual user ID (e.g., from user session)
    fetchWorkouts(userId);
});

// Function to assign a workout to a user
async function assignWorkout(userId, title, description) {
    try {
        const workoutsRef = collection(db, 'workouts');
        await addDoc(workoutsRef, {
            userId: userId,
            title: title,
            description: description,
            dateAssigned: new Date(),
        });
        console.log('Workout assigned successfully');
    } catch (error) {
        console.error('Error assigning workout:', error);
    }
}

// Function to fetch workouts assigned to a user and display them
async function fetchWorkouts(userId) {
    try {
        const workoutsRef = collection(db, 'workouts');
        const q = query(workoutsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        // Ensure the fields are available before updating them
        const workoutTitleElem = document.getElementById('workoutTitle');
        const workoutDescriptionElem = document.getElementById('workoutDescription');

        // Ensure the elements exist before updating them
        if (!workoutTitleElem || !workoutDescriptionElem) {
            console.error('Elements not found in the DOM');
            return;
        }

        // Set default loading or no-data message initially
        workoutTitleElem.innerText = 'Loading...';
        workoutDescriptionElem.innerText = 'Please wait...';

        if (querySnapshot.empty) {
            console.log('No workouts found.');
            workoutTitleElem.innerText = 'No workout assigned yet';
            workoutDescriptionElem.innerText = 'Please check back later for your daily workout.';
        } else {
            querySnapshot.forEach((doc) => {
                const workoutData = doc.data();
                console.log('Document data:', workoutData); // Log document data to debug

                // Extracting workout data
                const title = workoutData.title;
                const description = workoutData.description;

                // Handling Firebase Timestamp
                const timestamp = workoutData.dateAssigned;
                const assignedDate = timestamp ? new Date(timestamp.seconds * 1000) : new Date();
                const formattedDate = assignedDate.toLocaleDateString(); // Format the date as needed

                // Update the fields with the workout data
                workoutTitleElem.innerText = title || 'No workout assigned yet';
                workoutDescriptionElem.innerText = description || 'Please check back later for your daily workout.';

                // Optional: Display the date assigned (can be placed in another field if needed)
                document.getElementById('workoutDateAssigned').innerText = `Assigned on: ${formattedDate}`;

                // Fill the form fields (optional)
                document.getElementById('workoutTitleInput').value = title;
                document.getElementById('workoutDescriptionInput').value = description;
            });
        }
    } catch (error) {
        console.error('Error fetching workouts:', error);
    }
}

// Event listener for the form submission
document.getElementById('assignWorkoutForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const userId = 'user123';  // This should be dynamically fetched (e.g., from a user login session)
    const title = document.getElementById('workoutTitleInput').value;
    const description = document.getElementById('workoutDescriptionInput').value;

    assignWorkout(userId, title, description);
});
