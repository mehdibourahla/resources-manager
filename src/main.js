import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyA6A5chuBlf1YK4gP1Mf_nVp-I7pcIphYo",
  authDomain: "resources-manager-vue.firebaseapp.com",
  projectId: "resources-manager-vue",
  storageBucket: "resources-manager-vue.appspot.com",
  messagingSenderId: "728032972835",
  appId: "1:728032972835:web:8637b22e2c98486e346196",
  measurementId: "G-18Y217LK8Y",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount("#app");
