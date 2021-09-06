<template>
  <div class="q-pa-md">
    <q-card class="my-card" style="min-height:570px">
      <div class="text absolute-top">
        <HelloWorld/>
      </div>
    </q-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
};
</script>
