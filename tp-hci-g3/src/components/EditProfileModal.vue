<template>
  <Modal v-model="show" title="Datos de mi cuenta">
    <div class="edit-form">
      <div v-for="(value, key) in editableFields" :key="key" class="form-field">
        <div class="field-header">
          <label>{{ labels[key] }}</label>
          <button 
            v-if="!editingField[key]" 
            class="edit-button"
            @click="startEditing(key)"
          >
            <span class="material-symbols-rounded">edit</span>
          </button>
          <button 
            v-else 
            class="save-button"
            @click="saveField(key)"
          >
            <span class="material-symbols-rounded">check</span>
          </button>
        </div>
        <input
          v-if="editingField[key]"
          v-model="editableFields[key]"
          :type="inputTypes[key]"
          class="edit-input"
          @keyup.enter="saveField(key)"
        />
        <div v-else class="field-value">
          {{ value }}
          <span v-if="key === 'cvu' || key === 'alias'" 
                class="material-symbols-rounded copy-icon" 
                @click="copyToClipboard(value)">
            content_copy
          </span>
        </div>
      </div>
    </div>
    <div class="buttons-container">
      <button class="submit-button" @click="saveChanges">Guardar cambios</button>
      <button class="cancel-button" @click="closeModal">Cancelar</button>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from './Modal.vue'

const props = defineProps({
  modelValue: Boolean,
  perfil: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'update:perfil'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const labels = {
  dni: 'DNI',
  nombre: 'Nombre',
  apellido: 'Apellido',
  email: 'Email',
  telefono: 'Número',
  cvu: 'CVU',
  alias: 'Alias'
}

const inputTypes = {
  dni: 'text',
  nombre: 'text',
  apellido: 'text',
  email: 'email',
  telefono: 'tel',
  cvu: 'text',
  alias: 'text'
}

const editableFields = ref({ ...props.perfil })
const editingField = ref({})

const startEditing = (field) => {
  editingField.value[field] = true
}

const saveField = (field) => {
  editingField.value[field] = false
}

const saveChanges = () => {
  emit('update:perfil', { ...editableFields.value })
  show.value = false
}

const closeModal = () => {
  editableFields.value = { ...props.perfil }
  show.value = false
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<style scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-header label {
  font-weight: bold;
  color: var(--dark-blue);
}

.edit-button, .save-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: var(--button-grey-hover);
}

.save-button {
  color: var(--green);
}

.save-button:hover {
  background-color: rgba(0, 168, 98, 0.1);
}

.field-value {
  color: var(--dark-grey-text);
  padding: 0.5rem;
  background-color: var(--background-grey);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-input {
  padding: 0.5rem;
  border: 2px solid var(--blue-link);
  border-radius: 8px;
  font-size: var(--font-text);
}

.buttons-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.submit-button {
  background-color: var(--dark-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button {
  background-color: var(--background-grey);
  color: var(--dark-blue);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: var(--blue-button-hover);
}

.cancel-button:hover {
  background-color: #d1d5db;
}

.copy-icon {
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.copy-icon:hover {
  background-color: var(--button-grey-hover);
}
</style>