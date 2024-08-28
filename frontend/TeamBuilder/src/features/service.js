const BACKEND_URL = 'https://shumin11-teambuilder.onrender.com'

const getMembers = async ({ page = 1, pageSize = 5 } = {}) => {
  const response = await fetch(`${BACKEND_URL}/users?page=${page}&pageSize=${pageSize}`, {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache"
    }
  });
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`Error: Received status code ${response.status}`);
    return [];
  }
};

const addMember = async (member) => {
  const response = await fetch(`${BACKEND_URL}/users/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(member)
  });
  return response.json();
};

const deleteMember = async (index) => {
  const response = await fetch(`${BACKEND_URL}/users/delete/${index}`, {
    method: "DELETE"
  });
  return response.json();
};

const deleteAllMembers = async () => {
  const response = await fetch(`${BACKEND_URL}/users/delete`, {
    method: "DELETE"
  });
  return response.json();
};

const editMember = async (index, member) => {
  const response = await fetch(`${BACKEND_URL}/users/update/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(member)
  });
  return response.json();
};

const getMembersByAgeRange = async ({ minAge, maxAge }) => {
  const response = await fetch(`${BACKEND_URL}/users/members/age-range?minAge=${minAge}&maxAge=${maxAge}`, {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache"
    }
  });
  if (response.status === 200) {
    return response.json();
  } else {
    console.error(`Error: Received status code ${response.status}`);
    return [];
  }
};

export default { getMembers , addMember, deleteMember, deleteAllMembers, editMember, getMembersByAgeRange};