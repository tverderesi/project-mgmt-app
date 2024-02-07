/**
 * @generated SignedSource<<5d893a6486b35c72206d179a6519edde>>
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
  connections: ReadonlyArray<string>;
  input: CreateClientInput;
};
export type clientCreateMutation$data = {
  readonly createClient: {
    readonly clientEdge: {
      readonly node: {
        readonly email: string | null | undefined;
        readonly id: string;
        readonly name: string | null | undefined;
        readonly phone: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type clientCreateMutation = {
  response: clientCreateMutation$data;
  variables: clientCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ClientEdge",
  "kind": "LinkedField",
  "name": "clientEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Client",
      "kind": "LinkedField",
      "name": "node",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "clientCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateClientPayload",
        "kind": "LinkedField",
        "name": "createClient",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "clientCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateClientPayload",
        "kind": "LinkedField",
        "name": "createClient",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "clientEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1d8552c3bcdebaf2d558dee1d1977b3c",
    "id": null,
    "metadata": {},
    "name": "clientCreateMutation",
    "operationKind": "mutation",
    "text": "mutation clientCreateMutation(\n  $input: CreateClientInput!\n) {\n  createClient(input: $input) {\n    clientEdge {\n      node {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bec21447799d2f9e18ca4c03029ee308";

export default node;
