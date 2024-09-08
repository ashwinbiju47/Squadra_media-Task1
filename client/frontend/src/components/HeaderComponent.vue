<template>
  <header>
    <nav>
      <h1>Movie Portal</h1>
      <div>
        <button @click="$emit('company-info-click')">   <i class="fa fa-info-circle"></i> Company Info</button>
        <button class="logout-button" @click="logout">
          <i class="fa fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    logout() {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      
      // Redirect to the login page
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
header {
  background-color: black;
  color: white;
  padding: 10px 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}

button {
  background-color: white;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

button:hover {
  background-color: #e0e0e0;
}

.logout-button {
color: black;
  background-color:white; 
}

.logout-button i {
  margin-right: 5px;
}

/* Ensure Font Awesome is included in your project */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
