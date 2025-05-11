<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click="closeOnOverlayClick && $emit('update:modelValue', false)">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="title-container">
            <h3>{{ title }}</h3>
            <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
          </div>
          <button class="close-button" @click="$emit('update:modelValue', false)">
            <span class="material-symbols-rounded">close</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 20px;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #03192C;
  text-align: center;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #03192C;
  transition: color 0.2s ease;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.close-button:hover {
  color: #666;
}

.modal-body {
  color: #03192C;
}

.title-container {
  text-align: center;
}

.subtitle {
  color: #666666;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
}
</style> 