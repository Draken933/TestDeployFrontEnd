<template>
  <div class="q-pa-md">
    <div class= "row" id="entryfield">

      <div class="col-1.2">
        <div class ="column">
          <div class="col">
            <q-badge>Id: {{Id}}</q-badge>
          </div>
          <div  v-if="!editMode" class="col">
              <q-btn v-on:click="deleteThisEntry" class="q-mr-xs q-mt-xs" flat round padding="2px 2px" color="primary" icon="delete" />
              <q-btn v-on:click="enterEditMode" class="q-mt-xs" flat round padding="2px 2px" color="primary" icon="edit" />
          </div>
          <div v-else class="col">
              <q-btn v-on:click="saveEditing" class="q-mr-xs q-mt-xs" outline round padding="2px 2px" color="positive" icon="done" />
              <q-btn v-on:click="abortEditing" class="q-mt-xs" outline round padding="2px 2px" color="negative" icon="clear" />
          </div>
          <div class ="col">
 
          </div>
        </div>
      </div>
      <div class="col">
        <div v-if="!editMode" class="column" >
          <div v-if="deutsch" class="col">
            <q-input outlined dense readonly v-bind:value="textDE" label="Deutsch"/>
          </div>
          <div v-if="englisch" class="col">
            <q-input outlined dense readonly v-bind:value="textEN" label="Englisch"/>
          </div>
        </div>
        <div v-else class="column" >
          <div v-if="deutsch" class="col">
            <q-input v-on:keyup="saveInput($event,'inputDE')" dense filled v-model="textDE" label="Deutsch"/>
          </div>
          <div v-if="englisch" class="col">
            <q-input v-on:keyup="saveInput($event,'inputEN')" dense filled v-model="textEN" label="Englisch"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default{
  data(){
    return{
      dense: false,
      editMode: false,
      input:{
      inputDE:"",
      inputEN:"",
      },

    }
  },
  mounted(){
    console.log('Component has been mounted!');
    this.input.inputDE = this.textDE; 
    this.input.inputEN = this.textEN;
  },
  props:[
    'Id',
    'textDE',
    'textEN',
    'deutsch',
    'englisch'
  ],
  // data() {
  //   return {
  //     textDE:
  //     textEN: 
  //   }
  // }
  methods:{
    saveInput(event,lang){
      this.input[lang]=event.target.value;
    },
    enterEditMode(){
      this.editMode = !this.editMode;
    },
    abortEditing(){
      this.editMode = !this.editMode;
    },
    async saveEditing(){
      const token = await this.$auth.getTokenSilently();
      const param = {
        id:this.Id,
        textDE: this.input.inputDE,
        textEN: this.input.inputEN
      }
      // const param = {"textDE":"} + input2 +
      //         Ansaugschläuche in die entsprechenden externen Behälter stecken",
      //         "textEN":"place suction hoses into appropriate chemical containers"
      //         };
      await axios.put(("/api/EntryItems/"+ this.Id), param, {
        headers: {
          Authorization: `Bearer ${token}`,   // send the access token through the 'Authorization' header
          'Content-Type': 'application/json' 
        },
      });
      this.editMode = !this.editMode;
      this.$emit("refresh");
    },
    async deleteThisEntry(){
      const token = await this.$auth.getTokenSilently();
  
      await axios.delete(("/api/EntryItems/"+ this.Id),{
        headers: {
          Authorization: `Bearer ${token}`,   // send the access token through the 'Authorization' header
          'Content-Type': 'application/json' 
        },
      });
      this.$emit("refresh");

    }

  }  
};
</script>

<style lang="scss" scoped>
.q-pa-md{
  padding: 5px 0px;
}
.row{
    padding: 5px 10px;

}
#entryfield{
  //background: rgba($color: #929191, $alpha: .05);
  border: 1px solid rgba(50, 49, 92, 0.3);
}

</style>