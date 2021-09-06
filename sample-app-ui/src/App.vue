<!--
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Sample App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >

    </q-drawer>

    <q-page-container>
      <HelloWorld />
    </q-page-container>
  </q-layout> 
</template>
-->

<template>
  <div id="app">
        <div class="q-pa-md">
          <q-card>
          <q-toolbar class="bg-primary text-white">
            <img src="@/assets/logo-hobart.png" height="35px" width="120px"/>
            <q-toolbar-title>SampleApp</q-toolbar-title>
            <div id="nav">
              <router-link to="/">Home</router-link> |
              <router-link to="/about">About</router-link> |
              <router-link v-if="$auth.isAuthenticated" to="/profile">Profile | </router-link> 
              <router-link to="/external-api">External Api</router-link>
            </div>
            <div v-if="!$auth.loading">
              <div class="q-pl-md q-pr-xs">
                <q-btn v-if="!$auth.isAuthenticated" @click="login" flat round color="white" icon="login"/>
                <q-btn v-if="$auth.isAuthenticated" @click="logout" flat round color="white" icon="logout"/>
              </div>
            </div>
          </q-toolbar>
          </q-card>
        </div>
        <router-view/>
  </div>
</template>


<script>
  export default {
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style>
a{
    color: #f0f0f0;
}
a:hover,
a:active{
  color: #f1a80a;

}

</style>
