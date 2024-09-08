<!-- CompanyInfoModal.vue -->
<template>
  <div class="modal-backdrop">
    <div class="modal">
      <span class="close-icon" @click="closeModal">&times;</span>
      <h2>Company Info</h2>
      <p><i class="fas fa-building"></i> Company: Ashwin Technologies Pvt Ltd</p>
      <p><i class="fas fa-map-marker-alt"></i> Address: Indiranagar, Bengaluru-56</p>
      <p><i class="fas fa-phone"></i> Phone: +91 9794675409</p>
      <p><i class="fas fa-envelope"></i> Email: info@ashwintec.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyInfoModal',
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
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

.modal {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
}

h2 {
  text-align: center;
}

p {
  margin: 10px 0;
}

p i {
  margin-right: 10px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  background-color: white;
  padding: 0px;
  border-radius: 50%;
}


</style>
