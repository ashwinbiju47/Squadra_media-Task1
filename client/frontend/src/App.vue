<template>
  <div id="app">
 
    <nav>
      <!-- <router-link to="/">Login</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/users">Registered Users</router-link> -->
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Add your global styles here */
body{
  background:  linear-gradient(135deg, #000000, #2f2f2f);
}
</style>
