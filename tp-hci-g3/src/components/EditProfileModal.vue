<template>
  <Modal v-model="show" title="Datos de mi cuenta">
    <div class="edit-form">
      <div
        v-for="key in editableKeys"
        :key="key"
        class="form-field"
      >
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
  :readonly="key === 'cvu'"
/>
        <div v-else class="field-value">
          {{ editableFields[key] }}
        </div>
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
    </div>

    <div class="buttons-container">
      <button class="submit-button" @click="saveChanges">Guardar cambios</button>
      <button class="cancel-button" @click="closeModal">Cancelar</button>
    </div>
  </Modal>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Modal from './Modal.vue'
import { useUserStore } from '@/stores/UserStore'
import { useAccountStore } from '@/stores/AccountStore'

const userStore = useUserStore()
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

const labels = {
  nombre: 'Nombre',
  apellido: 'Apellido',
  email: 'Email',
  cvu: 'CVU',
  alias: 'Alias'
}

const inputTypes = {
  nombre: 'text',
  apellido: 'text',
  email: 'email',
  cvu: 'text',
  alias: 'text'
}

const editableFields = ref({
  nombre: props.perfil.firstname || props.perfil.nombre || '',
  apellido: props.perfil.lastname || props.perfil.apellido || '',
  email: props.perfil.email || '',
  cvu: '',
  alias: ''
})

const editingField = ref({})

const editableKeys = computed(() =>
  Object.keys(editableFields.value).filter(k => k !== 'cvu')
)

const startEditing = (field) => {
  editingField.value[field] = true
}

const saveField = (field) => {
  editingField.value[field] = false
}

const saveChanges = async () => {
  try {
    const { nombre, apellido, email, alias } = editableFields.value
    await userStore.updateUser({
      firstname: nombre,
      lastname: apellido,
      email
    })
    await accountStore.updateAlias(alias)

    await userStore.updateUser({
  firstName: nombre,
  lastName: apellido,
  email
})


emit('update:perfil', {
  ...props.perfil,
  nombre,
  apellido,
  email,
  alias,
  firstName: nombre,
  lastName: apellido
})
    show.value = false
    alert('Perfil actualizado correctamente')
  } catch (error) {
    console.error('ERROR al guardar cambios:', error)
    alert('Hubo un error al guardar los cambios')
  }
}

const resetFields = () => {
  editableFields.value = {
    nombre: props.perfil.firstName || props.perfil.nombre || '',
    apellido: props.perfil.lastName || props.perfil.apellido || '',
    email: props.perfil.email || '',
    alias: props.perfil.alias || '',
    cvu: accountStore.cvu || ''
  }
}

const closeModal = () => {
  resetFields()
  show.value = false
}

watch(() => props.perfil, () => {
  resetFields()
}, { immediate: true, deep: true })

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
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.copy-icon:hover {
  background-color: var(--button-grey-hover);
}
</style>