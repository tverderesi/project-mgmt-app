/**
 * @generated SignedSource<<3459729f77a9d4ff57d44d11fe3cfd18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userClientCount_clientCountQuery$variables = {
  id: string;
};
export type userClientCount_clientCountQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"userClientCount_clientCount">;
  } | null | undefined;
};
export type userClientCount_clientCountQuery = {
  response: userClientCount_clientCountQuery$data;
  variables: userClientCount_clientCountQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "userClientCount_clientCountQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "userClientCount_clientCount"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userClientCount_clientCountQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "clientCount",
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "445a58e6109aa34291c3740e64982b31",
    "id": null,
    "metadata": {},
    "name": "userClientCount_clientCountQuery",
    "operationKind": "query",
    "text": "query userClientCount_clientCountQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...userClientCount_clientCount\n    id\n  }\n}\n\nfragment userClientCount_clientCount on User {\n  clientCount\n  id\n}\n"
  }
};
})();

(node as any).hash = "5f4402bc0b0805aa205687b36979b0ed";

export default node;
