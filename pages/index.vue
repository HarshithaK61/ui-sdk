<template>
  <!-- <UCard>
    <h1><b>Enable Network</b></h1>
    <UContainer>
     <div
      v-for="chain in chains"
      :key="chain"
      class="flex items-center justify-between"
      style="margin-top: 10px;"
    >
      <span>{{ chain }}</span>
      <UToggle
        :model-value="toggles[chain]"
        @update:modelValue="value => onToggle(chain, value)"
      />
    </div>

    
  </UContainer>
  </UCard> -->

  <!-- <div>Hello</div> -->
  <UContainer></UContainer>
    
</template>

<script setup lang="ts">

await navigateTo('/sdk-managed');

</script>