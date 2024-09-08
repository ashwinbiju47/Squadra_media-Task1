<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login here</h2>
      <form @submit.prevent="login">
        <input v-model="name" placeholder="Name" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p class="message">{{ message }}</p>
      <p class="register-link">
        Don't have an account? <router-link to="/signup">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      password: '',
      message: ''
    };
  },
  methods: {
    login() {
      axios
        .post('http://localhost:5000/api/login', {
          name: this.name,
          password: this.password
        })
        .then((response) => {
          this.message = response.data.message;
          // Store the JWT token in localStorage
          localStorage.setItem('token', response.data.token);

          this.$router.push('/home');
        })
        .catch((error) => {
          this.message = error.response.data.error;
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #000000, #434343);
   font-family: 'Roboto', sans-serif;
}

.login-box {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

.message {
  margin-top: 1rem;
  color: red;
}

.register-link {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.register-link a {
  color: grey;
  text-decoration:underline;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
