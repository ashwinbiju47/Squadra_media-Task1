<template>
  <div id="home">
    <HeaderComponent @company-info-click="showCompanyInfo" />
    <div class="tab-container">
      <button 
        :class="{ active: currentTab === 'movies' }" 
        @click="currentTab = 'movies'"
      >
        Movies
      </button>
      <button 
        :class="{ active: currentTab === 'registered-users' }" 
        @click="currentTab = 'registered-users'"
      >
        Registered Users
      </button>
    </div>
    <div class="container">
      <div v-if="loading" class="loader-wrapper">
        <div class="loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>

      <div v-else-if="currentTab === 'movies'">
        <div class="sort-container">
          <label for="sort">Sort by:</label>
          <select id="sort" v-model="sortOption" @change="getMovies">
            <option value="voting">Voting</option>
            
          
          </select>
        </div>
        <div v-if="movies.length > 0" class="movie-list">
          <MovieCard
            v-for="movie in movies"
            :key="movie._id"
            :movie="movie"
            @vote="handleVote"
          />
        </div>
        <p v-else class="no-movies">No movies found.</p>
      </div>

      <div v-else-if="currentTab === 'registered-users'">
        <!-- Replace this with your registered users component or content -->
        <UserManagementPage />
      </div>

      <p v-else class="no-movies">No content available.</p>
    </div>
    <CompanyInfoModal
      v-if="showingCompanyInfo"
      @close="handleClose"
    />
  </div>
</template>

<script>
import axios from 'axios';
import MovieCard from './MovieCard.vue';
import HeaderComponent from './HeaderComponent.vue';
import CompanyInfoModal from './CompanyInfoModal.vue';
import UserManagementPage from './RegisteredUsers.vue'; // Import your User Management component

export default {
  name: 'HomePage',
  components: {
    HeaderComponent,
    MovieCard,
    CompanyInfoModal,
    UserManagementPage // Register the User Management component
  },
  data() {
    return {
      movies: [],
      loading: true,
      showingCompanyInfo: false,
      currentTab: 'movies', // Default tab
      sortOption: 'voting' // Default sort option
    };
  },
  methods: {
    async getMovies() {
      this.loading = true;
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

if (!token) {
  alert('You are not logged in. Please log in first.');
  this.$router.push('/'); // Redirect to login if token is missing
  return;
}
      try {
        const response = await axios.post('http://localhost:5000/api/movies', {
         
          category: 'movies',
          language: 'kannada',
          genre: 'all',
          sort: this.sortOption
        },{ headers: {
            'authorization': token // Include the token in the request header
      }},);
        if (response.data && response.data.result) {
          this.movies = response.data.result;
        } else {
          console.log('Unexpected response format:', response);
        }
      } catch (error) {
        console.log('Error fetching movies:', error);
      } finally {
        this.loading = false;
      }
    },
    handleVote(movieId, voteType) {
      // Implement voting logic here
      console.log(`Voted ${voteType} for movie ${movieId}`);
    },
    showCompanyInfo() {
      this.showingCompanyInfo = true;
    },
    handleClose() {
      this.showingCompanyInfo = false; // Hide the modal
    }
  },
  mounted() {
    this.getMovies();
  }
};
</script>
<style scoped>
#home {
  font-family: 'Roboto', sans-serif;
  background-color: #ffff;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loader {
  text-align: center;
  font-size: 24px;
  color: #42b983;
  margin-top: 50px;
}

.movie-list {
  list-style-type: none; /* Removes default list styling */
  padding: 0;
}

.no-movies {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 50px;
}

/* loading */
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust based on your layout */
}

.loader {
  display: flex;
  justify-content: space-between;
  width: 100px;
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #000000; /* Blue color */
  animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.tab-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.tab-container button {
  background: none;
  border: 1px solid black;
  color: grey;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.tab-container button.active,
.tab-container button:hover {
  background-color: black;
  color: white;
}


/* Sorting */
.sort-container {
  display: flex;
  justify-content: center; /* Centers the dropdown horizontally */
  align-items: center;
  margin-bottom: 20px;
}

.sort-container label {
  font-size: 14px; /* Makes the label smaller */
  margin-right: 10px; /* Adds space between the label and the dropdown */
}

.sort-container select {
  padding: 6px 10px; /* Adjusts padding for a smaller size */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px; /* Adjusts font size to make it smaller */
  cursor: pointer;
}

</style>
