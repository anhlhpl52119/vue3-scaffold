<template>
  <router-view #="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<script lang="ts" setup>
</script>
<style scoped></style>
