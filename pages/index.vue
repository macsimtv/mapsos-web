<template>
  <div class="home">
    <div class="home__container">
      <div class="home__sidebar">
        <div class="home__sidebar-header">
          <h1 class="home__sidebar-header-title">MapOs</h1>
        </div>
        <div class="home__sidebar-add">
          <nuxt-link to="/dashboard" class="home__sidebar-add-link">Go to dashboard</nuxt-link>
        </div>
        <div class="home__sidebar-list">
          <div class="home__sidebar-list-item" v-for="marker, index in markers" :key="index">
            <svg class="phone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            <p>{{ marker.name }}</p>
            <svg @click="destroyMarker(marker._id)" class="trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
        </div>
      </div>
      <div class="home__map">
        <client-only>
          <l-map id="map" :zoom=4 :center="[0, 0]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker v-for="marker, index of markers" :key="index" :lat-lng="[marker.latitude, marker.longitude]"></l-marker>
          </l-map>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      markers: [],
    };
  },
  async mounted() {
    await this.isAuth();
    await this.getMarker();
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
    async getMarker() {
      try {
        this.$axios.setHeader("Authorization", "Bearer " + this.token);
        var res = await this.$axios.get('/markers');
      } catch (err) {
        return this.$toast.error("Error getting markers");
      }

      console.log(res);

      if (res.status !== 200) {
        return this.$toast.error("Error getting markers");
      }

      this.markers = res.data.markers;
    },
    async destroyMarker(id) {
      try {
        this.$axios.setHeader("Authorization", "Bearer " + this.token);
        var res = await this.$axios.delete('/markers/' + id);
      } catch (err) {
        return this.$toast.error("Error deleting marker");
      }

      if (res.status !== 200) {
        return this.$toast.error("Error deleting marker");
      }

      this.$toast.success("Marker deleted");
      this.getMarker();
    }
  }
}
</script>