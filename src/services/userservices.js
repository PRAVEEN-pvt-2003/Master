const API_BASE_URL = 'http://127.0.0.1:8000';

function mapFromToApi(data) {
  return {
    scheme_name: data.scheme_name || "",
    description: data.description || "",
    eligibility: data.eligibility || "",
    date: data.date || new Date().toISOString().slice(0, 10),
    category:data.category,
  };
}

// Admin Login
export async function adminLogin(userid, password) {
  const response = await fetch(`${API_BASE_URL}/api/admin-login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid, password }),
  });

  if (!response.ok) throw new Error('Login failed');
  return await response.json();
}

// User Signup
export async function signup(name, email, password,gender, dob, city) {
  const response = await fetch(`${API_BASE_URL}/api/signup/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password,gender, dob, city }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Signup failed');
  }

  return await response.json();
}

// User Login
export async function userLogin(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/userlogin/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'User login failed');
  }

  return await response.json();
}

// All Schemes
export async function fetchSchemes() {
  const response = await fetch(`${API_BASE_URL}/api/schemes/Getschemes`);
  if (!response.ok) throw new Error('Failed to fetch schemes');
  return await response.json();
}

// Create New Scheme
export async function createScheme(data) {
  const response = await fetch(`${API_BASE_URL}/api/schemes/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create scheme';
    try {
      const err = await response.json();
      errorMessage = err.error || JSON.stringify(err);
    } catch {
      const errText = await response.text();
      console.error('Server returned non-JSON error:', errText);
      errorMessage = 'Internal server error';
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}

// Update Scheme
export async function updateScheme(id, data) {
  const response = await fetch(`${API_BASE_URL}/api/schemes/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapFromToApi(data)),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to update scheme';
    try {
      const err = await response.json();
      errorMessage = err.error || JSON.stringify(err);
    } catch {
      const errText = await response.text();
      console.error('Server returned non-JSON error:', errText);
      errorMessage = 'Internal server error';
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}

// Delete Scheme
export async function deleteScheme(id) {
  const response = await fetch(`${API_BASE_URL}/api/schemes/${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to delete scheme';
    try {
      const err = await response.json();
      errorMessage = err.error || JSON.stringify(err);
    } catch {
      const errText = await response.text();
      console.error('Server returned non-JSON error:', errText);
      errorMessage = 'Internal server error';
    }

    throw new Error(errorMessage);
  }

  return true;
}
