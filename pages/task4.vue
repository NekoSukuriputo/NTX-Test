<template>
  <div>
    <ClientOnly>
      <LMap
        style="height: 600px"
        :zoom="6"
        :center="[-6.208763, 106.845599]"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker
          v-for="location in locations"
          :key="location.id"
          :lat-lng="[location.latitude, location.longitude]"
        >
          <LIcon :icon-url="iconUrl" :icon-size="iconSize" />

          <LPopup v-for="company in location.companies" :key="company.id">
            {{ company.name }}
          </LPopup>
        </LMarker>
      </LMap>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";

const iconWidth = ref(21);
const iconHeight = ref(42);

const iconUrl = computed(() => `/marker.png`);
const iconSize = computed(() => [iconWidth.value, iconHeight.value]);

const locationStore = useLocation();
const locations = computed(() => {
  return locationStore.getLocations;
});
onBeforeMount(async () => {
  await locationStore.fetchLocations();
});
onMounted(() => {});
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
</style>
