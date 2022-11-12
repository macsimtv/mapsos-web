<template>
  <div class="home">
    <div class="home__container">
      <div class="home__sidebar">
        <div class="home__sidebar-left">
          <div class="home__sidebar-left-logo">
            <img src="~/assets/img/logo.png" alt="MapsOs">
          </div>
          <div class="home__sidebar-left-navigation">
            <div @click="panel = ''" class="home__sidebar-left-navigation-item" :class="{ active: panel === '' }">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div @click="panel = 'add'" class="home__sidebar-left-navigation-item" :class="{ active: panel === 'add' }">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
          <div class="home__sidebar-left-profile">
            <svg v-tooltip="'Log Out'" @click="onLogOut" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <div class="home__sidebar-right">
          <!-- Add -->
          <template v-if="panel == 'add'">
            <div class="home__sidebar-right-add">
              <p class="home__sidebar-right-add-title">
                Add a new marker.
              </p>
              <form @submit.prevent="addMarker" class="home__sidebar-right-add-form">
                <div class="home__sidebar-right-add-form-groups">
                  <div class="home__sidebar-right-add-form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" placeholder="Iphone" v-model="markerAdd.name" required>
                  </div>
                  <div class="home__sidebar-right-add-form-group">
                    <label for="description">Description</label>
                    <input type="text" id="description" placeholder="Description of the marker" v-model="markerAdd.description" required>
                  </div>
                  <div class="home__sidebar-right-add-form-group">
                    <label for="lat">Latitude</label>
                    <input type="text" id="lat" placeholder="52.32926296" v-model="markerAdd.lat" required>
                  </div>
                  <div class="home__sidebar-right-add-form-group">
                    <label for="lng">Longitude</label>
                    <input type="text" id="lng" placeholder="-1.1503942" v-model="markerAdd.lng" required>
                  </div>
                  <div class="home__sidebar-right-add-form-group">
                    <button type="submit">
                      Add Marker
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </template>
          <!-- Default -->
          <template v-else>
            <div class="home__sidebar-right-list">
              <div class="home__sidebar-right-list-item" v-for="marker, index in markers" :key="index">
                <svg @click="setMapViewToPoint([marker.latitude, marker.longitude])" class="phone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <p @click="setMapViewToPoint([marker.latitude, marker.longitude])" >{{ marker.name }}</p>
                <svg @click="openMarkerEditor(marker._id)" class="edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <svg @click="destroyMarker(marker._id)" class="trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="home__map">
        <nuxt-link class="statistic-link" to="statistic">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
        </nuxt-link>
        <client-only>
          <l-map id="map" :zoom="mapZoom" :center="mapCenter">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <template v-if="markers.length > 0">
              <l-marker v-for="marker, index of markers" :key="index" :lat-lng="[marker.latitude, marker.longitude]">
                <l-popup>
                  <div>
                    <h3 style="font-weight: 700;">
                      {{ marker.name }}
                    </h3>
                    <p>
                      {{ marker.description }}
                    </p>
                  </div>
                </l-popup>
                <l-icon
                  :icon-url="getMarkerImg()"
                  :icon-size="[35, 35]"
                  :icon-anchor="[35/2, 35/2]"
                />
              </l-marker>
            </template>
          </l-map>
        </client-only>
      </div>
      <div v-if="modal" class="home__modal">
        <div class="home__modal-container">
          <div class="home__modal-form">
            <div class="home__modal-head">
              <h2 class="home__modal-title">Edit Marker</h2>
              <div class="home__modal-close">
                <svg @click="modal = false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <form @submit.prevent="editMarker" class="home__modal-form-body">
              <div class="home__modal-form-group">
                <label for="name">Name</label>
                <input v-model="markerEdit.name" type="text" id="name" required />
              </div>
              <div class="home__modal-form-group">
                <label for="description">Description</label>
                <input v-model="markerEdit.description" id="description" required/>
              </div>
              <div class="home__modal-form-group">
                <label for="latitude">Latitude</label>
                <input v-model="markerEdit.lat" type="text" id="latitude" required/>
              </div>
              <div class="home__modal-form-group">
                <label for="longitude">Longitude</label>
                <input v-model="markerEdit.lng" type="text" id="longitude" required/>
              </div>
              <div class="home__modal-form-group">
                <button class="home__modal-form-btn">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      panel: '',
      modal: false,
      markers: [],
      markerAdd: {
        name: null,
        description: null,
        lat: null,
        lng: null
      },
      markerEdit: {
        id: null,
        name: null,
        description: null,
        lat: null,
        lng: null
      },
      mapCenter: [0, 0],
      mapZoom: 10,
    };
  },
  async mounted() {
    await this.isAuth();
    await this.getMarker();
    this.mapCenter = await this.calculateCenter();
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
    onLogOut() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    async getMarker() {
      try {
        this.$axios.setHeader("Authorization", "Bearer " + this.token);
        var res = await this.$axios.get('/markers');
      } catch (err) {
        return this.$toast.error("Error getting markers");
      }

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
      this.mapCenter = await this.calculateCenter();
    },
    async addMarker() {
      try {
        const newMarker = {
          name: this.markerAdd.name,
          description: this.markerAdd.description,
          latitude: this.markerAdd.lat,
          longitude: this.markerAdd.lng
        }

        this.$axios.setHeader("Authorization", "Bearer " + this.token);
        const res = await this.$axios.post('/markers', newMarker);

        if(res.status !== 201) {
          return this.$toast.error('Error adding the new marker.')
        }

        await this.getMarker();
        this.$toast.success('Marker Added');

        this.mapCenter = [this.markerAdd.lat, this.markerAdd.lng];
        this.mapZoom = 15;

        this.panel = '';
      } catch (err) {
        return this.$toast.error("Error adding the new marker.");
      }
    },
    async editMarker() {
      try {
        const newMarker = {
          name: this.markerEdit.name,
          description: this.markerEdit.description,
          latitude: this.markerEdit.lat,
          longitude: this.markerEdit.lng
        }

        this.$axios.setHeader("Authorization", "Bearer " + this.token);
        const res = await this.$axios.put('/markers/' + this.markerEdit.id, newMarker);

        if(res.status !== 200) {
          return this.$toast.error('Error updating the marker.')
        }

        await this.getMarker();
        this.$toast.success('Marker Updated');

        this.mapCenter = [this.markerEdit.lat, this.markerEdit.lng];
        this.mapZoom = 15;

        this.modal = false;

        // Erase the markerEdit object
        this.markerEdit = {
          name: null,
          description: null,
          lat: null,
          lng: null
        }
      } catch (err) {
        // Erase the markerEdit object
        this.markerEdit = {
          name: null,
          description: null,
          lat: null,
          lng: null
        }
        return this.$toast.error("Error updating the marker.");
      }
    },
    async calculateCenter() {
      let lat = 0;
      let lng = 0;

      for(let marker of this.markers) {
        lat += marker.latitude;
        lng += marker.longitude;
      }

      if(this.markers.length > 0) {
        lat = lat / this.markers.length;
        lng = lng / this.markers.length;
      } else {
        lat = 48.84958259285654;
        lng = 2.3468127407723838;
      }

      return [lat, lng];
    },
    setMapViewToPoint(point) {
      this.mapZoom = 15;
      this.mapCenter = point;
    },
    getMarkerImg() {
      return require('~/assets/img/marker.gif');
    },
    openMarkerEditor(id) {
      this.modal = true;

      const marker = this.markers.find(marker => marker._id === id);

      this.markerEdit = {
        id: marker._id,
        name: marker.name,
        description: marker.description,
        lat: marker.latitude,
        lng: marker.longitude
      }
    },
  }
}
</script>