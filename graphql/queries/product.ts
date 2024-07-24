import gql from "graphql-tag";

// GraphQL query for fetching products
export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      id
      name
      price
      quantity
      company_id
      category_id
    }
  }
`;

// GraphQL query category by id
export const GET_PRODUCT = gql`
  query getProduct($id: Int!) {
    products_by_pk(id: $id) {
      id
      name
      price
      quantity
      company_id
      category_id
    }
  }
`;
