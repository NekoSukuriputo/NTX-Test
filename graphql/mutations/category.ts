import gql from "graphql-tag";

// create category mutation
export const CREATE_CATEGORY_ONE = gql`
  mutation createCategory($name: String!) {
    insert_categories(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

// update category mutation
export const UPDATE_CATEGORY_ONE = gql`
  mutation updateCategory($id: Int!, $name: String!) {
    update_categories_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
    }
  }
`;

// delete category mutation
export const DELETE_CATEGORY_ONE = gql`
  mutation deleteCategory($id: Int!) {
    delete_categories_by_pk(id: $id) {
      id
      name
    }
  }
`;
