<template>
  <div>
    <ClientOnly>
      <l-map
        style="height: 600px"
        :zoom="6"
        :center="[-6.208763, 106.845599]"
        @click="clearLines"
        :use-global-leaflet="true"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <l-marker-cluster>
          <l-marker
            v-for="location in locations"
            :key="location.id"
            :lat-lng="[location.latitude, location.longitude]"
            :icon="customIcon"
            @click="handleMarkerClick(location)"
          >
            <l-popup>
              <div class="popup-content">
                <h3>{{ location.name }}</h3>
                <ul>
                  <li v-for="company in location.companies" :key="company.id">
                    {{ company.name }}
                  </li>
                </ul>
              </div>
            </l-popup>
          </l-marker>
        </l-marker-cluster>
        <l-polyline v-if="lines.length" :lat-lngs="lines" :color="'blue'">
          <l-div-icon
            v-for="(distance, index) in distances"
            :key="index"
            :lat-lng="midpoint(lines[index], lines[index + 1])"
          >
            {{ distance }} km
          </l-div-icon>
        </l-polyline>
      </l-map>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useLocation } from "~/stores/useLocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Define custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [21, 42],
  iconAnchor: [10, 41],
  popupAnchor: [0, -41],
});

const locationStore = useLocation();
const locations = computed(() => locationStore.getLocations);

const clickedPoints = ref([]);
const lines = computed(() =>
  clickedPoints.value.map((point) => [point.latitude, point.longitude])
);
const distances = computed(() => {
  const dist = [];
  for (let i = 0; i < clickedPoints.value.length - 1; i++) {
    const p1 = new L.LatLng(
      clickedPoints.value[i].latitude,
      clickedPoints.value[i].longitude
    );
    const p2 = new L.LatLng(
      clickedPoints.value[i + 1].latitude,
      clickedPoints.value[i + 1].longitude
    );
    dist.push((p1.distanceTo(p2) / 1000).toFixed(2)); // Convert to km and format to 2 decimal places
  }
  return dist;
});

const handleMarkerClick = (location) => {
  clickedPoints.value.push(location);
};

const clearLines = () => {
  clickedPoints.value = [];
};

const midpoint = (p1, p2) => {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
};

onBeforeMount(async () => {
  await locationStore.fetchLocations();
});
</script>

<style scoped>
.leaflet-div-icon {
  background: steelblue;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  font-weight: bold;
  font-size: large;
  text-align: center;
  line-height: 21px;
}

.popup-content {
  max-width: 200px;
}

@media (max-width: 600px) {
  .popup-content {
    max-width: 150px;
  }
}
</style>
