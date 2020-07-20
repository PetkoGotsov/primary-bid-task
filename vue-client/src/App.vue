<template>
    <v-app>
        <div class="d-flex justify-center">
            <h1 id="addUrl">Add URL</h1>
        </div>
        <div v-bind="apiResponse">
            <v-col cols="6" style="margin: 0px auto;">
                {{ apiResponse }}
            </v-col>
        </div>
        <div class="d-flex justify-center">
            <v-col cols="6" style="margin: 0px auto;">
                <v-text-field v-model="newUrl" label="Add Url" solo></v-text-field>
            </v-col>
        </div>
        <div class="d-flex justify-center">
            <v-btn @click="addURL()" color="primary">Add URL</v-btn>
        </div>
        <!-- url list -->
        <div class="d-flex justify-center">
            <h1>Created URLs</h1>
        </div>
        <div v-for="url in createdUrls" :key="url._id">
            <v-card class="mx-auto" color="blue" dark max-width="800">
                <v-card-text class="font-weight-bold title white--text">
                    {{ url.trimmedValue }}
                    <v-list-item id="url-list-item" class="grow">
                        <v-btn @click="deleteUrl(url.id)" class="mx-2" small
                               color="red"> Delete </v-btn>
                    </v-list-item>
                </v-card-text>
            </v-card>
        </div>
    </v-app>
</template>
<script lang="ts">
    import Vue from "vue";
    import Vuetify from 'vuetify';
    import axios from "axios";

    Vue.use(Vuetify);
    const apiUrl = "http://localhost:3000/url/api/urls";

    export default Vue.extend({
        vuetify: new Vuetify(),
        props: ['initialNewUrl', 'initialCreatedUrls', 'initialApiResponse'],
        data() {
            return {
                newUrl: this.initialNewUrl,
                createdUrls: this.initialCreatedUrls,
                apiResponse: this.initialApiResponse
            }
        },
        methods: {
            addURL() {
                axios.post(apiUrl, {
                    value: this.newUrl
                }).then(response => {
                    this.createdUrls = response.data;
                    this.apiResponse = "Success";
                }).catch((error) => {
                    if (error.response) {
                        this.apiResponse = error.response.data;
                    }
                });
            },
            deleteUrl(urlID: any) {
                axios
                    .delete(apiUrl + "?id=" + urlID).then(response => {
                        this.createdUrls = response.data;
                        this.apiResponse = "Success";
                    }).catch((error) => {
                        if (error.response) {
                            this.apiResponse = error.response.data;
                        }
                    });
            }
        },
        created() {
            // fetch created urls
            axios.get(apiUrl)
                .then(response => (this.createdUrls = response.data))
                .catch(error => console.log(error));
        }
    });
</script>