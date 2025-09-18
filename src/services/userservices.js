const API_BASE_URL = "http://127.0.0.1:8000";

// ===== Helper =====
function mapFromToApi(data) {
  return {
    scheme_name: data.scheme_name || "",
    description: data.description || "",
    eligibility: data.eligibility || "",
    date: data.date || new Date().toISOString().slice(0, 10),
    benefits: data.benefits || "",
    how_to_apply: data.how_to_apply || "",
    required_documents: data.required_documents || "",
    contact_info: data.contact_info || "",
    category: data.category || "",
  };
}

// ===== Admin Login =====
export async function adminLogin(userid, password) {
  const response = await fetch(`${API_BASE_URL}/api/admin-login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid, password }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Admin login failed");
  }

  const data = await response.json();
  localStorage.setItem("adminToken", data.token);
  localStorage.setItem("isAdmin", "true");
  localStorage.setItem("adminUsername", userid);
  return data;
}

// ===== User Signup =====
export async function signup(name, email, password, gender, dob, city) {
  const response = await fetch(`${API_BASE_URL}/api/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, gender, dob, city }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Signup failed");
  }

  return await response.json();
}

// ===== User Login =====
export async function userLogin(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/userlogin/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "User login failed");
  }

  const data = await response.json();
  localStorage.setItem("userToken", data.token);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userName", data.name);
  return data;
}

// ===== Schemes CRUD =====

// Fetch All Schemes
export async function fetchSchemes() {
  const res = await fetch(`${API_BASE_URL}/api/schemes/Getschemes`);
  if (!res.ok) throw new Error("Failed to fetch schemes");
  return await res.json();
}

// Create Scheme
export async function createScheme(data) {
  const response = await fetch(`${API_BASE_URL}/api/schemes/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapFromToApi(data)),
  });

  if (!response.ok) {
    let errMsg = "Failed to create scheme";
    try {
      const err = await response.json();
      errMsg = err.error || JSON.stringify(err);
    } catch {
      errMsg = "Internal server error";
    }
    throw new Error(errMsg);
  }

  return await response.json();
}

// Update Scheme
export async function updateScheme(id, data) {
  const response = await fetch(`${API_BASE_URL}/api/schemes/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapFromToApi(data)),
  });

  if (!response.ok) {
    let errMsg = "Failed to update scheme";
    try {
      const err = await response.json();
      errMsg = err.error || JSON.stringify(err);
    } catch {
      errMsg = "Internal server error";
    }
    throw new Error(errMsg);
  }

  return await response.json();
}

// Delete Scheme
export async function deleteScheme(id) {
  const response = await fetch(`${API_BASE_URL}/api/schemes/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let errMsg = "Failed to delete scheme";
    try {
      const err = await response.json();
      errMsg = err.error || JSON.stringify(err);
    } catch {
      errMsg = "Internal server error";
    }
    throw new Error(errMsg);
  }

  return true;
}
