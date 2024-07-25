import gql from "graphql-tag";

export const GET_LOCATION = gql`
  query getLocation($id: Int!) {
    locations_by_pk(id: $id) {
      id
      name
      latitude
      longitude
    }
  }
`;

export const GET_LOCATIONS = gql`
  query getLocations {
    locations {
      id
      name
      latitude
      longitude
      companies {
        id
        name
      }
    }
  }
`;
