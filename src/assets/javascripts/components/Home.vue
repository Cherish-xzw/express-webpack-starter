<template>
  <div class="home text-center">
    <i class="logo"></i>
    <h2>Essential Links</h2>
    <p>
        <a href="https://webpack.js.org/" target="_blank">Webpack</a>
        <a href="http://expressjs.com/" target="_blank">Express</a>
    </p>
    <h2>Learn More</h2>
    <router-link to="/about">About</router-link>
    <group><cell title="title" value="value" @click.native="showAlert"></cell></group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux';

  export default {
    components: {
      Group,
      Cell
    },
    name: "Home",
    methods: {
      showAlert(){
        this.$vux.alert.show({
          content:"hello"
        })
      }
    }
  }
</script>
