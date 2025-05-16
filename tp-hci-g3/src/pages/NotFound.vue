<template>
<h1 class= "name">WingPay</h1>
<div class="main-container">
    <h1>Ops, something went wrong</h1>
    <img
        :src="getImageUrl()"
        alt="Not Found Image"
        class="not-found-image"
    />
    <h1>[Error: 404]</h1>
</div>
</template>

<script>
export default {
    methods: {
        getImageUrl() {
            return new URL('../assets/images/NotFound.png', import.meta.url).href;
        }
    }
};
</script>
<style>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    text-align: center; 
}

.name{
    display: flex;
    align-self: left;
    padding: 2rem;
}
.not-found-image {
    max-width: 25%;
    height: auto;
}
</style>