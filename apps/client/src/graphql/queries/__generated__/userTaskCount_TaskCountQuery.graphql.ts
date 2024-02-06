/**
 * @generated SignedSource<<296ea8d07b0ba78d998f2d342f454489>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userTaskCount_TaskCountQuery$variables = {
  id: string;
};
export type userTaskCount_TaskCountQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"userTaskCount_TaskCount">;
  } | null | undefined;
};
export type userTaskCount_TaskCountQuery = {
  response: userTaskCount_TaskCountQuery$data;
  variables: userTaskCount_TaskCountQuery$variables;
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
    "name": "userTaskCount_TaskCountQuery",
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
            "name": "userTaskCount_TaskCount"
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
    "name": "userTaskCount_TaskCountQuery",
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
                "concreteType": "TaskCount",
                "kind": "LinkedField",
                "name": "taskCount",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "NOT_STARTED",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "IN_PROGRESS",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "COMPLETED",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "TOTAL",
                    "storageKey": null
                  }
                ],
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
    "cacheID": "72ec3254d7238edf294117eac791b0c4",
    "id": null,
    "metadata": {},
    "name": "userTaskCount_TaskCountQuery",
    "operationKind": "query",
    "text": "query userTaskCount_TaskCountQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...userTaskCount_TaskCount\n    id\n  }\n}\n\nfragment userTaskCount_TaskCount on User {\n  taskCount {\n    NOT_STARTED\n    IN_PROGRESS\n    COMPLETED\n    TOTAL\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "65b1b6c9afcc01741f2d8baffa95fe76";

export default node;
