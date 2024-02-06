/**
 * @generated SignedSource<<37b2a8f3a59dcdee6c1f15329ace8a82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateClientInput = {
  clientMutationId?: string | null | undefined;
  email: string;
  name: string;
  phone?: string | null | undefined;
  user: string;
};
export type clientCreateMutation$variables = {
  input: CreateClientInput;
};
export type clientCreateMutation$data = {
  readonly createClient: {
    readonly client: {
      readonly email: string | null | undefined;
      readonly id: string;
      readonly name: string | null | undefined;
      readonly phone: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type clientCreateMutation = {
  response: clientCreateMutation$data;
  variables: clientCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateClientPayload",
    "kind": "LinkedField",
    "name": "createClient",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Client",
        "kind": "LinkedField",
        "name": "client",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "clientCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "clientCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a3b614382284798543d0bbd676169eb9",
    "id": null,
    "metadata": {},
    "name": "clientCreateMutation",
    "operationKind": "mutation",
    "text": "mutation clientCreateMutation(\n  $input: CreateClientInput!\n) {\n  createClient(input: $input) {\n    client {\n      id\n      name\n      email\n      phone\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "51926def511e183f4532938b758544fc";

export default node;
