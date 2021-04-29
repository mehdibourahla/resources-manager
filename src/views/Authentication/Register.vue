<template>
  <v-card>
    <v-card-title>Register</v-card-title>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              outlined
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              outlined
              label="Last name"
              required
            ></v-text-field>
          </v-col>

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

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password_confirmation"
              outlined
              label="Confirm Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn block color="primary" class="mr-4" @click="register">
          Register
        </v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must have 5+ characters",
      ],
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.firstname + " " + this.lastname,
            })
            .then(() => {
              this.$router.push("/dashboard");
            });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style>
</style>