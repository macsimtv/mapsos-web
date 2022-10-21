<template>
    <div class="dashboard">
        <h1>
            Dashboard
        </h1>
        <div>
            <nuxt-link to="/" class="home__sidebar-add-link">Go back home</nuxt-link>
        </div>
        <!-- Add marker form -->
        <form class="dashboard__form" @submit.prevent="addMarker">
            <div class="dashboard__form-title">
                <h2>Add marker</h2>
            </div>
            <div class="dashboard__form-input">
                <label for="title">Name</label>
                <input type="text" id="title" v-model="addMarkerData.name" placeholder="Ex: Iphone">
            </div>
            <div class="dashboard__form-input">
                <label for="description">Description</label>
                <input type="text" id="description" v-model="addMarkerData.description" placeholder="Ex: Iphone de....">
            </div>
            <div class="dashboard__form-input">
                <label for="latitude">Latitude</label>
                <input type="text" id="latitude" v-model="addMarkerData.lat" placeholder="47.3346765">
            </div>
            <div class="dashboard__form-input">
                <label for="longitude">Longitude</label>
                <input type="text" id="longitude" v-model="addMarkerData.lng" placeholder="-1.6649439">
            </div>
            <div class="dashboard__form-input">
                <button type="submit">Add marker</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: null,
            markers: [],
            addMarkerData: {
                name: null,
                description: null,
                lat: null,
                lng: null,
            },
        };
    },
    mounted() {
        this.isAuth();
    },
    methods: {
        async isAuth() {
            this.token = localStorage.getItem('token');

            if (!this.token) {
                return this.$router.push('/login');
            }

            try {
                this.$axios.setHeader("Authorization", "Bearer " + this.token);
                var res = await this.$axios.post('/auth/me');
            } catch (err) {
                localStorage.removeItem('token');
                return this.$router.push('/login');
            }

            if (res.status !== 200) {
                localStorage.removeItem('token');
                return this.$router.push('/login');
            }
        },
        async addMarker() {
            try {
                this.$axios.setHeader("Authorization", "Bearer " + this.token);
                var res = await this.$axios.post('/markers', {
                    name: this.addMarkerData.name,
                    description: this.addMarkerData.description,
                    latitude: this.addMarkerData.lat,
                    longitude: this.addMarkerData.lng,
                });
            } catch (err) {
                console.log(err);
                return this.$toast.error("Error adding marker");
            }

            if (res.status !== 201) {
                return this.$toast.error("Error adding marker");
            }

            this.$toast.success("Marker added");
        }
    }
}
</script>