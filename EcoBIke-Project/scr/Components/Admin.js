import { initializeFirebase } from "../Components/Firebase.js";

// Tables for Admin
export async function fetchAndDisplayUsers() {
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");
    const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"); 
  
    const app = await initializeFirebase();
    const db = getFirestore(app);
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);
    const usersCollectionRef1 = collection(db, "orders");
    const querySnapshot1 = await getDocs(usersCollectionRef1);
    
    const usersTable = document.getElementById("usersTable");
    const usersTable2 = document.getElementById("usersTable2");
    if(usersTable){
    usersTable.innerHTML = `
    <div class="title" style="margin-top: -1rem; margin-left: 33rem;">
        ADMIN TABLES
    </div>
    <h2 class = "table-text">Users</h2>
    <div id="usersTableContainer">
      <table id="usersTable">
        <tr><th>Name</th><th>Email</th><th>User ID</th></tr>
      </table>
    </div>`;

    usersTable2.innerHTML = `
    <h2 class = "table-text">Orders</h2>
    <div id="usersTableContainer">
      <table id="usersTable2">
        <tr><th>User ID</th><th>Name</th><th>Phone Number</th><th>Adress</th><th>City</th><th>Country</th><th>Order Price</th></tr>
      </table>
    </div>`;
  
    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        usersTable.innerHTML += `<tr class = "about-content"><td>${userData.name}<td>${userData.email}</td><td>${userData.id}</td></tr>`;
    });

    querySnapshot1.forEach((doc) => {
        const userData = doc.data();
        usersTable2.innerHTML += `<tr class = "about-content"><td>${userData.userId}</td><td>${userData.fullName}</td><td>${userData.phoneNumber}</td><td>${userData.address}</td><td>${userData.city}</td><td>${userData.country}</td><td>${userData.totalPrice}</td></tr>`;
    });
  }
}