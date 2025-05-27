<template>
  <Modal v-model="show" title="Datos de mi cuenta">
    <div class="edit-form">
      
    
      <div class="form-field">
        <label>Nombre</label>
        <div class="field-value">{{ editableFields.firstName }}</div>
      </div>

      <div class="form-field">
        <label>Apellido</label>
        <div class="field-value">{{ editableFields.lastName }}</div>
      </div>

      <div class="form-field">
        <label>Email</label>
        <div class="field-value">{{ editableFields.email }}</div>
      </div>

      <div class="form-field">
        <label>CVU</label>
        <div class="field-value">
          {{ editableFields.cvu }}
          <span class="material-symbols-rounded copy-icon" @click="copyToClipboard(editableFields.cvu)">
            content_copy
          </span>
        </div>
      </div>


      <div class="form-field">
        <div class="field-header">
          <label>Alias</label>
          <button 
            v-if="!editingField.alias" 
            class="edit-button"
            @click="startEditing('alias')"
          >
            <span class="material-symbols-rounded">edit</span>
          </button>
          <button 
            v-else 
            class="save-button"
            @click="saveField('alias')"
          >
            <span class="material-symbols-rounded">check</span>
          </button>
        </div>
        <input
          v-if="editingField.alias"
          v-model="editableFields.alias"
          type="text"
          class="edit-input"
          @keyup.enter="saveField('alias')"
        />
        <div v-else class="field-value">
          {{ editableFields.alias }}
          <span class="material-symbols-rounded copy-icon" @click="copyToClipboard(editableFields.alias)">
            content_copy
          </span>
        </div>
      </div>
    <div class="buttons-container">
      <button class="submit-button" @click="saveChanges">Guardar cambios</button>
      <button class="cancel-button" @click="closeModal">Cancelar</button>
    </div>
  </div>
  </Modal>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'
import Modal from './Modal.vue'
import { useAccountStore } from '@/stores/AccountStore'

import { watch } from 'vue'
const accountStore = useAccountStore()

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

const editableFields = ref({
  firstName: '',
  lastName: '',
  email: '',
  cvu: '',
  alias: ''
})


watch(() => props.perfil, (newPerfil) => {
  if (newPerfil) {
    editableFields.value.firstName = newPerfil.firstName || newPerfil.nombre || ''
    editableFields.value.lastName = newPerfil.lastName || newPerfil.apellido || ''
    editableFields.value.email = newPerfil.email || ''
    editableFields.value.alias = newPerfil.alias || ''
    editableFields.value.cvu = accountStore.cvu || ''
  }
}, { immediate: true }) 

const resetFields = () => {
  editableFields.value = {
    firstName: props.perfil.firstName || props.perfil.nombre || '',
    lastName: props.perfil.lastName || props.perfil.apellido || '',
    email: props.perfil.email || '',
    alias: props.perfil.alias || '',
    cvu: accountStore.cvu || ''
  }
}


const editingField = ref({})

const startEditing = (field) => {
  editingField.value[field] = true
}

const saveField = (field) => {
  editingField.value[field] = false
}

const saveChanges = async () => {
  try {
    const { alias } = editableFields.value
    await accountStore.updateAlias(alias)

    emit('update:perfil', {
      ...props.perfil,
      alias
    })

    show.value = false
    alert('Perfil actualizado correctamente')
  } catch (error) {
    console.error('ERROR al guardar cambios:', error)
    alert('Hubo un error al guardar los cambios')
  }
}



const closeModal = () => {
  resetFields()
  show.value = false
}


const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

onMounted(async () => {
  try {
    await accountStore.getAccountInfo()
    editableFields.value.alias = accountStore.alias
    editableFields.value.cvu = accountStore.cvu
  } catch (err) {
    console.error('No se pudo cargar alias/cvu:', err)
  }
})
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
  color: var(--dark-blue);
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.copy-icon:hover {
  color: var(--blue-button-hover);
}


</style>