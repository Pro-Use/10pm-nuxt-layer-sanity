<script setup>
const { myLayer } = useAppConfig()
const config = useRuntimeConfig()
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{ myLayer.name }} {{ config.public.sanityId }}</pre>
  </div>
</template>
