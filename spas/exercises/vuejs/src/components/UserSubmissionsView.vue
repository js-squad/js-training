<template>
  <!-- Using the 'store.fetchUser' add a list of user's submissions, similarly how it's being done in NewsView component...
    Remember that the store.fetchItem API does not distinguish between comments, stories or polls.
    You will have to filter to leave only the ones that have type 'story'.
    To view the full docs on how the data is formatted you can see https://github.com/HackerNews/API#items
   -->
</template>

<script>
import store from '../store'
import Item from './Item.vue'

export default {

  name: 'UserSubmissionsView',

  components: {
    Item
  },

  data () {
    return {
      // here initialize the fields your view will need
    }
  },

  created () {
    console.log('Component lifecycle: UserSubmissionsView created.')
  },

  destroyed () {
    console.log('Component lifecycle: UserSubmissionsView destroyed.');
  },

  route: {
    data ({ to }) {
      document.title = `Profile: ${to.params.id} | Vue.js HN Clone`;

      // user the 'store.emit' API to change the title emitting the 'titleChange' event
      // the title should be in the format: "username's submissions"

      // use the mentioned 'store.fetchUser' and 'store.fetchItems' to return an object
      // with the same fields you defined above
    },
    deactivate () {
      console.log('Router lifecycle: UserSubmissionsView deactivated.')
    },
    activate () {
      console.log('Router lifecycle: UserSubmissionsView activated.')
    }
  },
  filters: {
    formatItemIndex (index) {
      return index + 1
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"
.loading:before
    content "Loading..."
    position absolute
    top 16px
    left 20px

.user-submissions-view
  color $gray
  li
    margin 5px 0
  .label
    display inline-block
    min-width 60px
  .about
    margin-top 1em
  .links a
    text-decoration underline
</style>
