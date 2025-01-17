import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMiaSbEU5Mwo6KM_CE-W-b3ikgQq-AqOQ",
  authDomain: "ankithamburgpt.firebaseapp.com",
  projectId: "ankithamburgpt",
  storageBucket: "ankithamburgpt.firebasestorage.app",
  messagingSenderId: "98446620887",
  appId: "1:98446620887:web:3724ad39c8e0b9b5219892",
  measurementId: "G-C8HPDXLLK3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const workoutContainer = document.getElementById("workout-container");
const loadingMessage = document.getElementById("loading-message");
const dayFilter = document.getElementById("day-filter");

// Fetch and display workouts
async function fetchWorkouts(userId, filterDay = "all") {
  try {
    const workoutsRef = collection(db, "workouts");
    const q = query(workoutsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    // Clear existing content
    workoutContainer.innerHTML = "";
    if (querySnapshot.empty) {
      workoutContainer.innerHTML = `<p style="text-align: center; padding: 20px; color: #888;">No workouts assigned yet.</p>`;
      return;
    }

    let hasWorkouts = false;
    querySnapshot.forEach((doc) => {
      const workout = doc.data();

      // Apply filter
      if (filterDay === "all" || workout.day === filterDay) {
        hasWorkouts = true;
        const workoutElement = `
          <div class="day-section">
            <h3>${workout.day || "Unknown Day"}</h3>
            <div class="workout-item">
              <h4>${workout.title || "Untitled Workout"}</h4>
              <p>${workout.description || "No description provided."}</p>
            </div>
          </div>
        `;
        workoutContainer.innerHTML += workoutElement;
      }
    });

    if (!hasWorkouts) {
      workoutContainer.innerHTML = `<p style="text-align: center; padding: 20px; color: #888;">No workouts found for the selected day.</p>`;
    }
  } catch (error) {
    console.error("Error fetching workouts:", error);
    workoutContainer.innerHTML = `<p style="text-align: center; padding: 20px; color: red;">Failed to load workouts. Please try again later.</p>`;
  }
}

// Event listener for day filter
dayFilter.addEventListener("change", () => {
  const selectedDay = dayFilter.value;
  fetchWorkouts("user123", selectedDay); // Replace "user123" with the actual user ID
});

// Initial fetch
fetchWorkouts("user123");
