<template>
    <div class="movie-card" v-if="movie">
      <div class="movie-poster-container">
        <img :src="movie.poster" :alt="movie.title" class="movie-poster">
        <div class="movie-overlay">
          <div class="vote-info">
            <span class="vote-count"><i class="fas fa-users"></i> {{ movie.totalVoted || 0 }}</span>
            <span class="upvote-count"><i class="fas fa-thumbs-up"></i> {{ (movie.upVoted && movie.upVoted.length) || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="movie-info">
        <h2 class="movie-title">{{ movie.title || 'Untitled' }}</h2>
        <div class="movie-meta">
          <span class="genre">{{ movie.genre || 'Unknown Genre' }}</span>
          <span class="separator">|</span>
          <span class="language">{{ movie.language || 'Unknown Language' }}</span>
          <span class="separator">|</span>
          <span class="runtime">{{ formatRuntime(movie.runTime) }}</span>
        </div>
        <p class="movie-director"><strong>Director:</strong> {{ (movie.director && movie.director.join(', ')) || 'Unknown' }}</p>
        <p class="movie-stars"><strong>Stars:</strong> {{ (movie.stars && movie.stars.join(', ')) || 'Unknown' }}</p>
        <p class="release-date"><strong>Release Date:</strong> {{ formatDate(movie.releasedDate) }}</p>
        <p class="page-views"><i class="fas fa-eye"></i> {{ movie.pageViews || 0 }} views</p>
        <div class="movie-description" v-if="movie.description">
          <p>{{ truncateDescription(movie.description) }}</p>
          <button v-if="movie.description && movie.description.length > 150" @click="toggleDescription" class="read-more">
            {{ showFullDescription ? 'Read less' : 'Read more' }}
          </button>
        </div>
        <div class="voting-section">
          <button @click="handleVote('up')" class="vote-btn up" :class="{ voted: userVote === 'up' }">
            <i class="fas fa-thumbs-up"></i> Upvote
          </button>
          <button @click="handleVote('down')" class="vote-btn down" :class="{ voted: userVote === 'down' }">
            <i class="fas fa-thumbs-down"></i> Downvote
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieCard',
    props: {
      movie: {
        type: Object,
        required: true
      }
    },
    emits: ['vote'],
    data() {
      return {
        showFullDescription: false,
        userVote: null
      };
    },
    methods: {
      handleVote(type) {
        this.userVote = type;
        this.$emit('vote', { movieId: this.movie._id, voteType: type });
      },
      truncateDescription(text, length = 150) {
        if (!text) return '';
        return text.length > length ? text.slice(0, length) + '...' : text;
      },
      toggleDescription() {
        this.showFullDescription = !this.showFullDescription;
      },
      formatRuntime(minutes) {
        if (!minutes) return 'Unknown';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
      },
      formatDate(timestamp) {
        if (!timestamp) return 'Unknown';
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
  };
  </script>
  
  
  <style scoped>
  .movie-card {
    display: flex;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .movie-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  .movie-poster-container {
    position: relative;
    width: 200px;
    height: 300px;
    overflow: hidden;
  }
  
  .movie-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .movie-card:hover .movie-poster {
    transform: scale(1.05);
  }
  
  .movie-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .movie-card:hover .movie-overlay {
    opacity: 1;
  }
  
  .vote-info {
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 14px;
  }
  
  .movie-info {
    flex: 1;
    padding: 25px;
    display: flex;
    flex-direction: column;
  }
  
  .movie-title {
    font-size: 24px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 10px 0;
  }
  
  .movie-meta {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 15px;
  }
  
  .separator {
    margin: 0 10px;
  }
  
  .movie-director, .movie-stars, .release-date, .page-views {
    font-size: 16px;
    color: #34495e;
    margin: 5px 0;
  }
  
  .movie-description {
    font-size: 16px;
    color: #34495e;
    line-height: 1.6;
    margin-top: 15px;
  }
  
  .read-more {
    background: none;
    border: none;
    color: #3498db;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    margin-top: 10px;
  }
  
  .voting-section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .vote-btn {
    background: #ecf0f1;
    border: none;
    border-radius: 4px;
    color: #34495e;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 15px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .vote-btn:hover {
    background: #bdc3c7;
    transform: translateY(-2px);
  }
  
  .vote-btn.voted {
    background: #3498db;
    color: white;
  }
  
  .vote-btn.up.voted {
    background: #2ecc71;
  }
  
  .vote-btn.down.voted {
    background: #e74c3c;
  }
  
  @media (max-width: 768px) {
    .movie-card {
      flex-direction: column;
    }
  
    .movie-poster-container {
      width: 100%;
      height: 250px;
    }
  
    .voting-section {
      flex-direction: column;
      gap: 10px;
    }
  }
  </style>