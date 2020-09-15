<template>
  <v-container v-if="projects.length > 0">
    <v-row align="center" justify="center">
      <v-col md="8">
        <v-expansion-panels class="text-left">
          <v-expansion-panel v-for="(project, idx) in projects" :key="idx">
            <v-expansion-panel-header
              expand-icon="mdi-book-open-variant"
              disable-icon-rotate
            >{{ project.name }}</v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Description</th>
                      <th class="text-left">URL</th>
                      <th class="text-left">Github</th>
                      <th class="text-left">Collaborators</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ project.desc }}</td>
                      <td @click="open(project.siteUrl)">
                        <a>{{ project.siteUrl }}</a>
                      </td>
                      <td @click="open(project.repoUrl)">
                        <a>{{ project.repoUrl }}</a>
                      </td>
                      <td>{{ project.collaborators }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-spacer></v-spacer>

        <v-card v-if="auth">
          <v-text-field label="name" v-model="project.name" type="string" />
          <v-select v-model="project.state" :items="states" label="State"></v-select>
          <v-row>
            <v-col>
              <v-text-field label="Repository" v-model="project.repoUrl" type="string" />
            </v-col>
            <v-col>
              <v-text-field label="URL" v-model="project.Url" type="string" />
            </v-col>
            <v-col>
              <v-text-field label="Collaborators" v-model="project.collabs" type="string" />
            </v-col>
          </v-row>
          <v-textarea label="Description" v-model="project.desc" type="string" autoGrow />
        </v-card>
        <v-btn v-if="auth" @click="submitProject" color="info" block outlined>Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Projects",
  data() {
    return {
      project: {
        collabs: "Solo",
        Url: "",
        repoUrl: "",
        desc: "",
        state: "",
        name: ""
      },
      states: ["Building", "Live", "Complete", "Dead"]
    };
  },
  methods: {
    ...mapActions(["getProjects", "newProject"]),
    open(URL) {
      window.open(URL, "_blank");
    },
    submitProject() {
      this.newProject(this.project).then(console.log(this.project));
    }
  },
  computed: {
    ...mapGetters(["projects", "auth"])
  },
  created() {
    if (this.projects.length < 1) {
      this.getProjects().then(console.log("Projects fetched"));
    }
  }
};
</script>

<style></style>
