<template>
  <div>
    <ClientOnly>
      <l-map
        ref="mapRef"
        style="height: 600px"
        :zoom="6"
        :center="[-6.208763, 106.845599]"
        @ready="onMapReady"
        @click="clearLines"
        :use-global-leaflet="true"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
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
      </l-map>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount, nextTick } from "vue";
import { useLocation } from "~/stores/useLocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Define custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [21, 42],
  iconAnchor: [10, 41],
  popupAnchor: [0, -41],
});

const locationStore = useLocation();
const locations = computed(() => locationStore.getLocations);

const mapRef = ref(null);
const clickedPoints = ref([]);
let routingControl = null;

const handleMarkerClick = (location) => {
  clickedPoints.value.push(location);
  updateRoutingControl();
};

const clearLines = () => {
  clickedPoints.value = [];
  if (routingControl) {
    routingControl.setWaypoints([]);
  }
};

const updateRoutingControl = () => {
  if (!mapRef.value || !mapRef.value.leafletObject) return;

  if (!routingControl) {
    routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
      },
    }).addTo(mapRef.value.leafletObject);
  }

  const waypoints = clickedPoints.value.map((point) =>
    L.latLng(point.latitude, point.longitude)
  );

  routingControl.setWaypoints(waypoints);
};

// When the map is ready
const onMapReady = () => {
  console.log(mapRef.value.leafletObject);
  updateRoutingControl();
};

onBeforeMount(async () => {
  await locationStore.fetchLocations();
});

watch(clickedPoints, updateRoutingControl);
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
