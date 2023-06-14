<template>
    <RouterView #="{ Component }">
        <component :is="Component" />
    </RouterView>
</template>
<script lang="ts" setup></script>
<style scoped></style>
