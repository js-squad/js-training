<template>
  <!-- Using the 'store.fetchUser' API add a list of the user's comments, 
  similarly how it's being done in the ItemView component...
    Remember that the store.fetchItem API does not distinguish between comments, stories or polls.
    You will have to filter to leave only the ones that have type 'comments'.
    To view the full docs on how the data is formatted you can see https://github.com/HackerNews/API#items
   -->
</template>

<script>
import store from '../store'
import Comment from './Comment.vue'

export default {

  name: 'UserCommentsView',

  components: {
    Comment
  },

  data () {
    return {
      // here initialize the fields your view will need
    }
  },

  created () {
    console.log('Component lifecycle: UserCommentsView created.')
  },

  destroyed () {
    console.log('Component lifecycle: UserCommentsView destroyed.')
  },

  route: {
    data ({ to }) {
      // Promise sugar syntax: return an object that contains Promise fields.
      // http://router.vuejs.org/en/pipeline/data.html#promise-sugar
      document.title = `User's comments: ${to.params.id} | Vue.js HN Clone`;


      // user the 'store.emit' API to change the title emitting the 'titleChange' event
      // the title should be in the format: "username's comments"

      // use the mentioned 'store.fetchUser' and 'store.fetchItems' to return an object
      // with the same fields you defined above
    },

    activate () {
      console.log('Router lifecycle: UserCommentsView activated.')
    },

    deactivate () {
      console.log('Router lifecycle: UserCommentsView deactivated.')
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
s