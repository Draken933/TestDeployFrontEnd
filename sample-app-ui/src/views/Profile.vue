<template>
  <div class="q-pa-md">
    <q-card class="my-card" style="min-height:570px">
      <div class="column absolute-center items-center">
        <q-card-section>
          <img :src="$auth.user.picture">
        </q-card-section>
        <q-card-section>
          <div class="text-h7" text-center>
            <p> name: {{$auth.user.name}}</p>
            <p>nickname: {{$auth.user.nickname}}</p>
            <p>email: {{$auth.user.email }}</p>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>
