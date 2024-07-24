import gql from "graphql-tag";

// create product mutation
export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $price: numeric!
    $quantity: Int!
    $category_id: Int! #$company_id: Int!
  ) {
    insert_products(
      objects: {
        name: $name
        price: $price
        quantity: $quantity
        category_id: $category_id
        #   company_id: $company_id
      }
    ) {
      affected_rows
      returning {
        id
        name
        price
        quantity
        category_id
      }
    }
  }
`;

// update product mutation
export const UPDATE_PRODUCT_ONE = gql`
  mutation updateProduct(
    $id: Int!
    $name: String!
    $price: numeric!
    $quantity: Int!
    $category_id: Int! #
  ) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        price: $price
        quantity: $quantity
        category_id: $category_id
      }
    ) {
      id
      name
      price
      quantity
      category_id
    }
  }
`;

// delete product mutation
export const DELETE_PRODUCT_ONE = gql`
  mutation deleteProduct($id: Int!) {
    delete_products_by_pk(id: $id) {
      id
      name
      price
      quantity
      company_id
      category_id
    }
  }
`;
