<template>
  <!-- Using the 'store.fetchUser' add a list of user's submissions, similarly how it's being done in NewsView component...
    Remember that the store.fetchItem API does not distinguish between comments, stories or polls.
    You will have to filter to leave only the ones that have type 'story'.
    To view the full docs on how the data is formatted you can see https://github.com/HackerNews/API#items
   -->
  <div class="user-submissions-view" :class="{ loading: !submissions.length }">
    <!-- item list -->
    <item
      v-for="item in submissions"
      :item="item"
      :index="$index | formatItemIndex"
      track-by="id">
    </item>
  </div>
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
      user: {},
      submissions: []
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
      let userData;

      // user the 'store.emit' API to change the title emitting the 'titleChange' event
      // the title should be in the format: "username's submissions"
      store.emit('titleChange', `${to.params.id}'s submissions`);

      // use the mentioned 'store.fetchUser' and 'store.fetchItems' to return an object
      // with the same fields you defined above
      return store.fetchUser(to.params.id).then((user) => {
        userData = user;
        return Promise.all(user.submitted.map((id) => store.fetchItem(id)));
      }).then((items) => {
        return {
          user: userData,
          submissions: items.filter((item) => item.type === 'story')
        }
      });
    },
    deactivate () {
      console.log('Router lifecycle: UserSubmissionsView deactivated.')
      store.emit('titleChange', '')
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
