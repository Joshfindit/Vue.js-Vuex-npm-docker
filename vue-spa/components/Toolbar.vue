<template>
  <div id="toolbar">
    <i @click="addNote" class="glyphicon glyphicon-plus"></i>
    <i @click="toggleFavorite"
      class="glyphicon glyphicon-star"
      :class="{starred: activeNote.favorite}"></i>
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
  </div>
</template>

<script>

export default {
  computed: {
    activeNote () {
      return this.$store.getters.activeNote
    }
  },
  methods: {
    addNote () {
      this.$store.dispatch('addNote')
    },
    toggleFavorite () {
      this.$store.dispatch('toggleFavorite')
    },
    deleteNote () {
      this.$store.dispatch('deleteNote')
    }
  }
  // vuex: {
  //   getters: {
  //     activeNote: state => state.activeNote
  //   },
  //   actions: {
  //     addNote,
  //     deleteNote,
  //     toggleFavorite
  //   }
  // }
}
</script>
