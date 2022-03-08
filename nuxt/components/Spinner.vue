<template>
  <div id="spinner"></div>
</template>

<script>
export default {
  name: "Spinner"
};
</script>

<style>
#spinner {
  border: 5px solid #683bce;
  border-left-color: #ff1d89;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>