import { gql } from '@apollo/client'

export const REMOVE_CLIENT = gql`mutation removeClient($id: ID!) {
    removeClient(id: $id) {
    id
    name
    email
    phone
}
}`