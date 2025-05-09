<template>
  <div
    class="card"
    :style="{
      backgroundColor: bgColor,
      width: width,
      height: height,
      position: position,
      top: top,
      left: left,
      right: right,
      bottom: bottom,
    }"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  bgColor: { type: String, default: '#ffffff' }, 
  width: { type: String, default: '200px' },     
  height: { type: String, default: '150px' },  
  position: { type: String, default: 'static' }, //relative, absolute, etc.
  top: String,
  left: String,
  right: String,
  bottom: String,
})
</script>

<style scoped>
.card {
width: var(--card-width, 300px);
height: var(--card-height, 250px);
background-color: var(--card-bg-color, #fff);
border-radius: 20px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
padding-left: 0;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
}


</style>

  