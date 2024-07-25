import { GET_LOCATIONS } from "~/graphql/queries/location";
import type { Location } from "~/types/Location";

export const useLocation = defineStore("useLocation", {
  state: () => ({
    location: "",
    locations: [] as Location[],
  }),
  getters: {
    getLocation: (state) => {
      return state.location;
    },
    getLocations: (state) => {
      return state.locations;
    },
  },
  actions: {
    setLocation(location: string) {
      this.location = location;
    },
    setLocations(locations: Location[]) {
      this.locations = locations;
    },
    async fetchLocations() {
      try {
        const { onResult, onError } = useQuery(GET_LOCATIONS);
        onResult(({ data }) => {
          this.locations = data?.locations || [];
        });
        onError((error) => {
          throw error;
        });
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    },
  },
});
