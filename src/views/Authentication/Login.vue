<template>
  <div>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                outlined
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="password"
                outlined
                :rules="passwordRules"
                type="password"
                label="Password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn block color="primary" class="mr-4" @click="login">
            Login
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
    <v-card class="mt-3">
      <v-card-title> Login with third-party option </v-card-title>
      <div class="d-flex justify-space-around pb-4">
        <v-btn @click="googleAuth" fab
          ><i class="fab fa-lg fa-google"></i
        ></v-btn>
        <v-btn @click="fbAuth" fab><i class="fab fa-lg fa-facebook"></i></v-btn>
        <v-btn id="sign-in-button" @click="phoneAuth" fab
          ><i class="fab fa-lg fa-github"></i
        ></v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must have 5+ characters",
    ],
  }),
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    googleAuth() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("Dashboard");
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    fbAuth() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("Dashboard");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    phoneAuth() {},
  },
};
</script>

<style>
</style>