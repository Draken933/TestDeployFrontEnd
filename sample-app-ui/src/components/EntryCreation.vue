<template>
    <div>
        <q-btn @click="showPopupEdit = true" icon="add" label="Eintrag" color="primary"  />

        <q-dialog v-model="showPopupEdit" persistent>
            <q-card style="min-width: 350px">
                        <q-card-section>
          <div class="text-h6">Konfiguration:</div>
        </q-card-section>
                <q-card-section>
                    <q-input outlined autofocus v-model="id" dense  label="Id"/>
                </q-card-section>

                <q-card-section>
                   <q-input outlined v-model="textDE" dense label="deutscher Text"/>
                </q-card-section>

                <q-card-section>
                    <q-input outlined v-model="textEN" dense label="englische Übersetzung (optional)"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Abbrechen" v-close-popup />
                    <q-btn flat label="Eintrag hinzufügen" v-close-popup v-on:click="createEntry"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            showPopupEdit: false,
            id:null,
            textDE:"",
            textEN:"",
            }
            
        },
    methods:{
        async createEntry(){
        const token = await this.$auth.getTokenSilently();

        const param = {
            id: this.id,
            textDE: this.textDE,
            textEN: this.textEN
        };
        // const param = {"textDE":"} + input2 +
        //         Ansaugschläuche in die entsprechenden externen Behälter stecken",
        //         "textEN":"place suction hoses into appropriate chemical containers"
        //         };
        await axios.post("https://hobtest2.azurewebsites.net/api/EntryItems", param, {
            headers: {
            Authorization: `Bearer ${token}`,   // send the access token through the 'Authorization' header
            'Content-Type': 'application/json' ,
            },

        });
        this.id = null;
        this.textDE = "";
        this.textEN = "";
        this.$emit("refresh");
        },
        resetEntryFields(){
            this.id = null;
            this.textDE = "";
            this.textEN = "";
        },

    }
};
</script>

<style>
#entryCreation{
  border: 1px solid rgba(50, 49, 92, 0.3);
  padding:10px;
}
#entryCreation > div{

  padding:10px;
}
</style>