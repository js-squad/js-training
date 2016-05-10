<template>
  <div id="wrapper">
    <!-- header -->
    <div id="header">
      <a id="yc" href="http://www.ycombinator.com">
        <img src="https://news.ycombinator.com/y18.gif">
      </a>
      <h1><a href="#/">Hacker News</a>    </h1>
      <font color="#ffffff">{{title}}</font>
    </div>

    <!-- add html to display the usersConnections property -->
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
import store from '../store'
import io from 'socket.io-client';

store.io = io('http://localhost:8000');

export default {
  name: 'App',
  data() {
    return {
      store,
      title: '',
      usersConnections: 0
    }
  },
  created () {
    store.on('titleChange', this.updateTitle);

    // subscribe to the "usersConnection" event and update the usersConnections property
  }, 
  destroyed () {
    store.removeListener('titleChange', this.updateTitle)
  },
  methods: {
    updateTitle (title) {
      this.title = title;
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

html, body
  font-family Verdana
  font-size 13px
  height 100%

ul
  list-style-type none
  padding 0
  margin 0

a
  color #000
  cursor pointer
  text-decoration none
  
#wrapper
  background-color $bg
  position relative
  width 85%
  min-height 80px
  margin 0 auto

#header
  background-color #f60
  height 24px
  position relative
  h1
    font-weight bold
    font-size 13px
    display inline-block
    vertical-align middle
    margin 0
  .source
    color #fff
    font-size 11px
    position absolute
    top 4px
    right 4px
    a
      color #fff
      &:hover
        text-decoration underline

#yc
  border 1px solid #fff
  margin 2px
  display inline-block
  vertical-align middle
  img
    vertical-align middle

.view
  position absolute
  background-color $bg
  width 100%
  transition opacity .2s ease
  box-sizing border-box
  padding 8px 20px
  &.v-enter, &.v-leave
    opacity 0

@media screen and (max-width: 700px)
  html, body
    margin 0
  #wrapper
    width 100%
</style>
