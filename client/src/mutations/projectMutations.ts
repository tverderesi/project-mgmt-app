import { gql } from '@apollo/client'

export const DELETE_PROJECT = gql`mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
    id

}
}`


export const ADD_PROJECT = gql`mutation addProject($name: String!, $status: ProjectStatus!, $description: String!, $clientId: ID!){
    addProject(name: $name, description: $description, status: $status, clientId: $clientId){
       id
       name
       description
       status
       client{
        name
        email
        phone
        id
       }
    }
}`

export const UPDATE_PROJECT = gql`
mutation UpdateProject(
  $id: ID!
  $name: String!
  $description: String!
  $status: ProjectStatusUpdate!
) {
  updateProject(
    id: $id
    name: $name
    description: $description
    status: $status
  ) {
    id
    name
    description
    status
    client {
      id
      name
      email
      phone
    }
  }
}
`;