<template>
  <v-app>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-btn text to="/" dark plain class="pa-0"
          ><h3>Resources Manager</h3></v-btn
        >
      </div>

      <v-spacer></v-spacer>
      <div v-if="!user.loggedIn">
        <v-btn small dark plain class="pa-0 mr-1" to="/login">Login</v-btn>
        <v-btn small dark plain class="pa-0" to="/register">Register</v-btn>
      </div>
      <v-btn v-else @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",

  computed: {
    user: function () {
      return this.$store.getters.user;
    },
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home",
          });
        });
    },
  },
};
</script>
