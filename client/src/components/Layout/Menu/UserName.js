import React, { useState, useEffect } from "react";

const UserProfile = () => {
  // State to store user data
  const [userData, setUserData] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/v1/user/getUser"); // Replace with your actual API endpoint
        const result = await response.json();

        if (result.success) {
          setUserData(result.data); // Set the fetched data in state
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {/* Dynamically render the username */}
      <p className="text-center text-warning">
        Welcome : {userData ? userData.name : "Loading..."}
      </p>
    </div>
  );
};

export default UserProfile;
