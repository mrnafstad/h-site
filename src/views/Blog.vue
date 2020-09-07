<template>
  <v-container fluid class="text-center">
    <v-row v-if="allPosts" align="center">
      <v-col>
        <v-list v-for="(post, idx) in allPosts" :key="idx">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                post.timeOfPost.toDate().toDateString()
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ post.post }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <NewPost v-if="auth" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewPost from "../components/NewPost.vue";

export default {
  name: "Blog",
  components: {
    NewPost,
  },
  methods: {
    ...mapActions(["getPosts", "newLike"]),
    like(post) {
      console.log(post);
      this.newLike(post.id);
    },
  },
  computed: {
    ...mapGetters(["allPosts", "auth"]),
  },
  created() {
    this.getPosts().then(console.log("posts fetched"));
  },
};
</script>

<style></style>
