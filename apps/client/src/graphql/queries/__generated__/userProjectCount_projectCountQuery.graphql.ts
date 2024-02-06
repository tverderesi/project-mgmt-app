/**
 * @generated SignedSource<<974f8b932963320e5080728b8ab1ccf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userProjectCount_projectCountQuery$variables = {
  id: string;
};
export type userProjectCount_projectCountQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"userProjectCount_projectCount">;
  } | null | undefined;
};
export type userProjectCount_projectCountQuery = {
  response: userProjectCount_projectCountQuery$data;
  variables: userProjectCount_projectCountQuery$variables;
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
    "name": "userProjectCount_projectCountQuery",
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
            "name": "userProjectCount_projectCount"
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
    "name": "userProjectCount_projectCountQuery",
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
                "name": "projectCount",
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
    "cacheID": "3dbc51f67d9224f6c6004c7846c04ab6",
    "id": null,
    "metadata": {},
    "name": "userProjectCount_projectCountQuery",
    "operationKind": "query",
    "text": "query userProjectCount_projectCountQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...userProjectCount_projectCount\n    id\n  }\n}\n\nfragment userProjectCount_projectCount on User {\n  projectCount\n  id\n}\n"
  }
};
})();

(node as any).hash = "6e0259131153c934878d9d9d57362e2f";

export default node;
