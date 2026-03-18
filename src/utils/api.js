import axios from 'axios';

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }) {
    console.log('register: ', { name, email, password });
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
      email,
      password,
    });
    // return response.data;
    // response.data isinya:
    // {
    //   status: "success",
    //   message: "User created",
    //   data: { user: { id, name, email, avatar } }
    // }
    console.log('response register:', response.data);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return response.data.data.user;
  }

  async function login({ email, password }) {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    // response.data isinya:
    // {
    //   status: "success",
    //   message: "Login successful",
    //   data: { token }
    // }
    // console.log('response login:', response.data);
    const { status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message);
    }
    return response.data.data.token;
  }

  // tidak perlu Content-Type, axios otomatis
  async function _fetchWithAuth(url, options = {}) {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Access token not found');
    }
    const response = await axios({
      url: `${BASE_URL}${url}`,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // sudah return { status, message, data }
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth('/users/me');
    // response isinya:
    // {
    //   status: "success",
    //   data: { user: { id, name, email, avatar } }
    // }
    console.log('response getOwnProfile:', response);
    console.log('response getOwnProfile:', response.data.user);
    if (response.status !== 'success') {
      throw new Error('Failed to fetch profile');
    }
    return response.data.user;
  }

  async function getAllUsers() {
    // response = { status, data: { users } }
    const response = await _fetchWithAuth('/users');
    if (response.status !== 'success') {
      throw new Error('Failed to fetch users');
    }
    return response.data.users;
  }

  async function getAllThreads() {
    // response = { status, data: { threads } }
    const response = await _fetchWithAuth('/threads');
    if (response.status !== 'success') {
      throw new Error('Failed to fetch threads');
    }
    return response.data.threads;
  }

  async function getThreadDetail(id) {
    const response = await _fetchWithAuth(`/threads/${id}`, {
      method: 'GET',
    });
    if (response.status !== 'success') {
      throw new Error('Failed to fetch thread detail');
    }
    console.log('response getThreadDetail:', response.data);
    return response.data.detailThread;
  }

  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth('/threads', {
      method: 'POST',
      data: {
        title,
        body,
        category,
      },
    });
    if (response.status !== 'success') {
      throw new Error('Failed to create thread');
    }
    return response.data.thread;
  }

  async function upVoteThread(id) {
    const response = await _fetchWithAuth(`/threads/${id}/up-vote`, {
      method: 'POST',
    });
    if (response.status !== 'success') {
      throw new Error('Failed to upvote thread');
    }
    console.log('response upVoteThread:', response.data);
    return response.data.thread;
  }

  async function downVoteThread(id) {
    const response = await _fetchWithAuth(`/threads/${id}/down-vote`, {
      method: 'POST',
    });
    if (response.status !== 'success') {
      throw new Error('Failed to downvote thread');
    }
    return response.data.thread;
  }

  async function neutralVoteThread(id) {
    const response = await _fetchWithAuth(`/threads/${id}/neutral-vote`, {
      method: 'POST',
    });
    if (response.status !== 'success') {
      throw new Error('Failed to neutral vote thread');
    }
    return response.data.thread;
  }
  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(`/threads/${threadId}/comments`, {
      method: 'POST',
      data: {
        content,
      },
    });
    if (response.status !== 'success') {
      throw new Error('Failed to create comment');
    }
    return response.data.comment;
  }

  async function upVoteComment(threadId, commentId) {
    console.log(
      'api upVoteComment threadId and commentId:',
      threadId,
      commentId
    );
    const response = await _fetchWithAuth(
      `/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
      }
    );
    if (response.status !== 'success') {
      throw new Error('Failed to upvote comment');
    }
    return response.data.comment;
  }

  async function downVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
      }
    );
    if (response.status !== 'success') {
      throw new Error('Failed to downvote comment');
    }
    return response.data.comment;
  }

  async function neutralVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
      }
    );
    if (response.status !== 'success') {
      throw new Error('Failed to neutral vote comment');
    }
    return response.data.comment;
  }

  async function getLeaderboard() {
    const response = await _fetchWithAuth('/leaderboard');
    if (response.status !== 'success') {
      throw new Error('Failed to fetch leaderboard');
    }
    return response.data.leaderboard;
  }
  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
    createThread,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    createComment,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboard,
  };
})();

export default api;
