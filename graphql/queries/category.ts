import gql from "graphql-tag";

// GraphQL query for fetching categories
export const GET_CATEGORIES = gql`
  query getCategories{
    categories {
      id
      name
    }
  }
`;

// GraphQL query category by id
export const GET_CATEGORY = gql`
  query getCategory($id: Int!) {
    categories_by_pk(id: $id) {
      id
      name
    }
  }
`;
