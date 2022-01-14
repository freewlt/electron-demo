<template>
  <div id="app">
    <div id="content">
      <div id="routers">
        <router-link to="/">
          Home
        </router-link> |
        <router-link to="/about">
          About
        </router-link>
      </div>
<!--      <locale-changer style="position: fixed; right: 30px; top: 50px;" />-->
      <locale-changer></locale-changer>
    </div>
    <Home/>
    <Socket/>
    <router-view />
    <!-- <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <Login/>
    <router-link to="/home">登录</router-link>
    <home/>
    <WebSocket2/>-->
  </div>
</template>

<script>
// import { remote } from "electron";

// import HelloWorld from './components/HelloWorld.vue'
// import Login from "./views/login.vue";
import Home from "./views/Home.vue";
import Socket from "./views/socket.vue";
// import WebSocket2 from "./views/websocket2.vue";

import LocaleChanger from "./components/localeChanger";
export default {
    name: "App",
    components: {
        LocaleChanger,
        Home,
        Socket,
        // Login,
        // WebSocket2
    },
    data() {
        return {
            // win: remote.getCurrentWindow(),
            // originSize: true,
        };
    },
    created(){
    },
    methods: {
        // autoMaximize() {
        //     if(this.originSize) {
        //         this.win.maximize();
        //     } else {
        //         this.win.restore();
        //     }
        //     this.originSize = !this.originSize;
        // }
    }

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.logo{
  width: 10%;
}
</style>
