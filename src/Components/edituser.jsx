import axios from "axios"

export async function GetUser(setFormData) {
  try {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("_id");
    
    if (!token || !user_id) {
      console.error("Missing token or user ID");
      return { success: false, error: "Missing authentication data" };
    }

    const res = await axios.get(`http://localhost:8000/edit/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const user = res.data;

      console.log(user);
      setFormData({
        name: `${user.firstName} ${user.lastName}` || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phoneNo || "",
        location: user.location || "",
        dateOfBirth: user.dob ? user.dob.slice(0, 10) : "",
      });
      
      return { success: true, data: user };
    }
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return { success: false, error: err.message || "Failed to fetch user" };
  }
}