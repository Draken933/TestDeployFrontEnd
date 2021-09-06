<template>
  <div class="q-pa-md">
    <q-card class="my-card">
    <div class="q-pa-md">
      <div class="row justify-end" id="menuBar">
        <div class="col-0.5">
          <q-btn @click="callApi" color="primary" icon-right="refresh"/>
        </div>
        <div class="col-1.2">
          <EntryCreation v-on:refresh="callApi"></EntryCreation>
        </div>
        <div class="col-1.2">
          <q-btn-dropdown align="right" color="primary" label="Sprache" style="width: 180px">  
            <q-list>
              <q-item clickable>
                <q-item-section avatar><Flag code="DE"/></q-item-section>
                <q-item-section>DE</q-item-section>
                <q-item-section><q-toggle v-model="deutsch" /></q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar><Flag code="US"/></q-item-section>
                <q-item-section>EN</q-item-section>
                <q-item-section><q-toggle v-model="englisch" /></q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>



        <Entry
          v-for="entry in entrys"
          v-bind:key="entry.id"
          v-bind:Id="entry.id"
          v-bind:textDE="entry.textDE"
          v-bind:textEN="entry.textEN"
          v-bind:deutsch="deutsch"
          v-bind:englisch="englisch"
          v-on:refresh="callApi"
        ></Entry>
    </div>
    </q-card>
  </div>

</template>

<script>
import axios from "axios";
import Entry from '@/components/Entry.vue';
import EntryCreation from '@/components/EntryCreation.vue';

export default {
  name: "external-api",
  data() {
    return {
      apiMessage: "",
      entrys: [
      ],
      input: "",
      deutsch: true,
      englisch: true,
    };
  },
  components: {
    Entry,
    EntryCreation
  },
    async mounted() {
    console.log('Component has been mounted!');
    const token = await this.$auth.getTokenSilently();

    // Use Axios to make a call to the API
    const { data } = await axios.get("/api/EntryItems", {
      headers: {
        Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
      }
    });

    this.entrys = [];
    // for(var i in data)
    // {
    // let parsedJSON=  JSON.parse(data[i]);
    // this.entrys.[i] = parsedJSON;
    // }
    
    for(var i in data){
      this.entrys.push(data[i]);
    }
    this.apiMessage = data;
    this.entrys.sort(function(a,b){return a.id-b.id});
  },

  methods: {
      async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();

      // Use Axios to make a call to the API
      const { data } = await axios.get("/api/EntryItems", {
        headers: {
          Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
        }
      });

      this.entrys = [];
      // for(var i in data)
      // {
      // let parsedJSON=  JSON.parse(data[i]);
      // this.entrys.[i] = parsedJSON;
      // }
     
      for(var i in data){
        this.entrys.push(data[i]);
      }
      this.apiMessage = data;
      this.entrys.sort(function(a,b){return a.id-b.id});
      },

  }
};

</script>


<style lang="scss" scoped>
#menuBar{
  padding: 0px 0px;

}

#menuBar > div{
  padding: 0px 1px;
}




</style>

