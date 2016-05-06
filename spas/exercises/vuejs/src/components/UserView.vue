<template>
  <div class="user-view" v-show="user">
    <ul>
      <li><span class="label">user:</span> {{user.id}}</li>
      <li><span class="label">created:</span> {{user.created | fromNow}} ago</li>
      <li><span class="label">karma:</span> {{user.karma}}</li>
      <li>
        <span class="label">about:</span>
        <div class="about">
          {{{user.about}}}
        </div>
      </li>
    </ul>
    <p class="links">
      <!-- change the href prop to redirect to the route you added on main.js for user's submissions -->
      <a :href="">submissions</a><br>

      <!-- change the href prop to redirect to the route you added on main.js for user's comments -->
      <a :href="">comments</a>
    </p>
  </div>
</template>

<script>
import store from '../store'

export default {

  name: 'UserView',

  data () {
    return {
      user: {}
    }
  },

  created () {
    console.log('Component lifecycle: UserView created.')
  },

  route: {
    data ({ to }) {
      // Promise sugar syntax: return an object that contains Promise fields.
      // http://router.vuejs.org/en/pipeline/data.html#promise-sugar
      document.title = `Profile: ${to.params.id}| Vue.js HN Clone`
      return {
        user: store.fetchUser(to.params.id)
      }
    },
    activate () {
      console.log('Router lifecycle: UserView activated.')
    },
    deactivate () {
      console.log('Router lifecycle: UserView deactivated.')
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.user-view
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
