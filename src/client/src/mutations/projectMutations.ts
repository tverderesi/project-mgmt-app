import { gql } from '@apollo/client'

export const DELETE_PROJECT = gql`mutation removeProject($id: ID!) {
    removeProject(id: $id) {
    id
    name
    email
    phone
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