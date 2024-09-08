<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Signup here</h2>
      <form @submit.prevent="signup">
        <input v-model="name" placeholder="Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="phone" placeholder="Phone" required />
        <select v-model="profession">
          <option disabled value="">Select Profession</option>
          <option>Developer</option>
          <option>Designer</option>
        </select>
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
      <p class="message">{{ message }}</p>
     
      <p class="login-link">
        Already have an account? <router-link to="/">Login here</router-link>
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
      email: '',
      phone: '',
      profession: '',
      password: '',
      message: '',
     
      showAlert: false
    };
  },
  methods: {
    signup() {
      axios
        .post('http://localhost:5000/api/signup', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          profession: this.profession,
          password: this.password
        })
        .then((response) => {
          this.message = response.data.message;
          this.showAlert = true;
        
        // Hide the alert after 1 second
        setTimeout(() => {
          this.showAlert = false;
          this.$router.push('/'); // Redirect after hiding the alert
        }, 1000);
        
        })
        .catch((error) => {
          this.message = error.response.data.error;
        });
    }
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #000000, #2f2f2f);
  font-family: 'Roboto', sans-serif;
}

.signup-box {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

input,
select {
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
  background-color: #2f2f2f;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: grey;
}

.message {
  margin-top: 1rem;
  color: black;
}

.login-link {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.login-link a {
  color: grey;
  text-decoration: underline;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
