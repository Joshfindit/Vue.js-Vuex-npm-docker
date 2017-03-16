import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  noteList: [],
  notes: [],
  activeNote: {}
}

const mutations = {

  GET_NOTE_LIST (state) {
    // this.loading = true;
    // this.jsonIndex = [];
    var url = encodeURI("static/artefacts/index.json");

    // axios.get('/user?ID=12345')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    axios.get(url, {headers: {"Authorization": "Token token=" + "this.websession"}}).then(
      function (request) {
        var simpleArray = [];
        // success callback
        var parsedJSON = request.data;
        // console.log(parsedJSON);

        for (var propertyIndex in parsedJSON) {
          if (parsedJSON[propertyIndex].artefact) {
            var setText
            if ( !parsedJSON[propertyIndex].artefact.content ) {
              setText = parsedJSON[propertyIndex].artefact.description
            } else {
              setText = parsedJSON[propertyIndex].artefact.content
            }

            simpleArray.push({ favorite: false, name: parsedJSON[propertyIndex].artefact.name, text: setText, uuid: parsedJSON[propertyIndex].artefact.id});
          }
        }

        // var simpleArray = [];
        // for (var i = 1; i <= 7; i++) { // > # Fixing nano syntax highlighting again
        //   simpleArray.push(i);
        //   console.log(parsedJSON[i])
        // };
        // this.setJsonIndex (simpleArray);

        // Sort by name
        simpleArray.sort(function(a, b) {
          if(a.name){
            var textA = a.name.toUpperCase();
          }
          else {
            var textA = ""
          }
          if(b.name){
            var textB = b.name.toUpperCase();
          }
          else {
            var textB = ""
          }
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        // console.log(simpleArray[0].uuid);
        state.noteList = simpleArray;
        state.notes = simpleArray;
        // this.loading = false;
        // return simpleArray;
      }.bind(this),
      function (response) {
        // error callback
        // this.loading = false;
      }
    );

    // url = encodeURI("https://jsonplaceholder.typicode.com/photos/" + "1")
    // $.getJSON(url, function (parsedJSON) {
    //   v.jsonIndex = parsedJSON;
    // })
  },

  GET_SINGLE_NOTE (state) {
    // this.loading = true;
    // this.artefact = getBlankArtefactData();
    var uuid = "8f466172-3c6e-431f-b430-05a5e849ac5f"
    var url = encodeURI("/static/artefacts/" + uuid + ".json");

    axios.get(url, {headers: {"Authorization": "Token token=" + "this.websession"}}).then(
      function (request) {
        // success callback
        var returnedJSON = request.data.artefact;
        var thisNote = {}
        // this.response = request.data;
        // console.log(returnedJSON);
        thisNote.uuid = returnedJSON.id;
        thisNote.name = returnedJSON.name;
        thisNote.text = returnedJSON.content;
        thisNote.description = returnedJSON.description;
        thisNote.artefacts = [];
        for (var thisArtefact in returnedJSON.artefacts){
          //console.log(returnedJSON.artefacts[thisArtefact]);
          thisNote.artefacts.push(returnedJSON.artefacts[thisArtefact].id);
        };
        // this.artefact.identities_with_permission_display = [];
        // for (thisIdentity in returnedJSON.identities_with_permission){
        //   //console.log(returnedJSON.identities_with_permission[thisIdentity]);
        //   this.artefact.identities_with_permission_display.push(returnedJSON.identities_with_permission[thisIdentity].username);
        // };
        // this.artefact.connectedArtefacts = returnedJSON.artefacts;
        // // console.log(returnedJSON.artefacts);
        // // console.log(this.artefact.connectedArtefacts);
        // //this.thumbnail = parsedJSON.thumbnailUrl;
        // returnedJSONMinusRaw = returnedJSON;
        // this.deleteFromObjectByKeyPart ("Raw", returnedJSONMinusRaw);
        // // delete parsedJSONMinusRaw["originalMetaDataDumpRaw"];
        // // v.json = parsedJSON;
        // // this.json = parsedJSONMinusRaw;
        // this.json = returnedJSONMinusRaw.artefact;
        // this.loading = false;

        state.notes.push(thisNote)

      }.bind(this),
      function (response) {
        // error callback
        // this.json = {error: "Error"};
        // this.loading = false;
      }
    )
  },

  ADD_NOTE (state) {
    const newNote = {
      name: 'New Note Name',
      text: 'New note',
      favorite: false,
      uuid: null
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },

  EDIT_NOTE (state, text) {
    state.activeNote.text = text
  },

  DELETE_NOTE (state) {
    var index = state.notes.indexOf(state.activeNote)
    state.notes.splice(index, 1)
    state.activeNote = state.notes.length > 0 ? state.notes[0] : {}
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
  },

  SET_ACTIVE_NOTE (state, note) {
    state.activeNote = note
  }
}

const getters = {
  activeNote: state => state.activeNote
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
