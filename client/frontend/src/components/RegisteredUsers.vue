<template>
  <div class="user-management">
    <header class="header">
      <!-- <button @click="goBackHome" class="btn back-home">
        <i class="fas fa-arrow-left"></i> Back Home
      </button> -->
      <h1>User Management</h1>
    </header>
    <div class="user-list">
      <div v-for="user in users" :key="user._id" class="user-tile">
        <div class="user-info">
          <h2>{{ user.name }}</h2>
          <p>{{ user.phone }}</p>
        </div>
        <div class="user-actions">
          <button @click="openEditModal(user)" class="btn edit">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button @click="openDeleteModal(user)" class="btn delete">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit User</h2>
        <input v-model="editingUser.name" placeholder="Name" />
        <input v-model="editingUser.phone" placeholder="Phone" />
        <div class="modal-actions">
          <button @click="updateUser" class="btn save">Save</button>
          <button @click="closeEditModal" class="btn cancel">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete User Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h2>Delete User</h2>
        <p>Are you sure you want to delete {{ deletingUser.name }}?</p>
        <div class="modal-actions">
          <button @click="deleteUser" class="btn delete">Delete</button>
          <button @click="closeDeleteModal" class="btn cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      showEditModal: false,
      showDeleteModal: false,
      editingUser: null,
      deletingUser: null,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        alert('You are not logged in. Please log in first.');
        this.$router.push('/login'); // Redirect to login if token is missing
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            'authorization': token // Include the token in the request header
          }
        });

        this.users = response.data; // Store the fetched users in the component's data
      } catch (error) {
        console.error(error);
        alert('Failed to fetch users'+ error);
        this.$router.push('/'); // Redirect to login on failure
      }
    }
    ,
    openEditModal(user) {
      this.editingUser = { ...user };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editingUser = null;
    },
    updateUser() {
      axios.put(`http://localhost:5000/api/users/${this.editingUser._id}`, {
        name: this.editingUser.name,
        phone: this.editingUser.phone,
      })
        .then((response) => {
          alert(response.data.message);
          this.fetchUsers();
          this.closeEditModal();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    },
    openDeleteModal(user) {
      this.deletingUser = user;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deletingUser = null;
    },
    deleteUser() {
      axios.delete(`http://localhost:5000/api/users/${this.deletingUser._id}`)
        .then((response) => {
          alert(response.data.message);
          this.fetchUsers();
          this.closeDeleteModal();
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    },
    goBackHome() {
      this.$router.push('/home');
    }
  },
};
</script>

<style scoped>
.user-management {
  font-family: 'Roboto', sans-serif;
  margin: 0 auto;
  background-color: #f0f0f0;
 height: 100vh;
}

.header {
  background-color: grey;
  color: white;
  padding: 20px;
  border-radius: 8px 8px 0px 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.btn.back-home {
  background-color: #fff;
  color: #3498db;
  border: 1px solid #3498db;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.btn.back-home i {
  margin-right: 8px;
}

.btn.back-home:hover {
  background-color: #f0f0f0;
}

.user-list { padding: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  margin: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.user-tile:last-child {
  border-bottom: none;
}

.user-tile:hover {
  background-color: #f9f9f9;
}

.user-info h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.user-info p {
  margin: 5px 0 0;
  color: #666;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn.edit {
  background-color: #2ecc71;
  color: white;
}

.btn.edit:hover {
  background-color: #27ae60;
}

.btn.delete {
  background-color: #e74c3c;
  color: white;
}

.btn.delete:hover {
  background-color: #c0392b;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn.save {
  background-color: #3498db;
  color: white;
}

.btn.save:hover {
  background-color: #2980b9;
}

.btn.cancel {
  background-color: #95a5a6;
  color: white;
}

.btn.cancel:hover {
  background-color: #7f8c8d;
}
</style>
