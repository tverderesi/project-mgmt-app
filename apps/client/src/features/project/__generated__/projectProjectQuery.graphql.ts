/**
 * @generated SignedSource<<9f89ab954de0f9a2793392c183d36dbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type projectProjectQuery$variables = {
  id: string;
};
export type projectProjectQuery$data = {
  readonly project: {
    readonly client: {
      readonly " $fragmentSpreads": FragmentRefs<"projectClient_client">;
    } | null | undefined;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string | null | undefined;
    readonly status: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"projectTasks_Connection">;
  } | null | undefined;
};
export type projectProjectQuery = {
  response: projectProjectQuery$data;
  variables: projectProjectQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "projectProjectQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "project",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "projectClient_client"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "projectTasks_Connection"
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
    "name": "projectProjectQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "project",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TaskConnection",
            "kind": "LinkedField",
            "name": "taskEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TaskEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Task",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "connection",
            "key": "project_taskEdge",
            "kind": "LinkedHandle",
            "name": "taskEdge"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7817f160c64da24974371da05bdeb017",
    "id": null,
    "metadata": {},
    "name": "projectProjectQuery",
    "operationKind": "query",
    "text": "query projectProjectQuery(\n  $id: String!\n) {\n  project(id: $id) {\n    id\n    name\n    description\n    status\n    client {\n      ...projectClient_client\n      id\n    }\n    ...projectTasks_Connection\n  }\n}\n\nfragment projectClient_client on Client {\n  name\n  email\n  phone\n}\n\nfragment projectTasks_Connection on Project {\n  taskEdge {\n    edges {\n      node {\n        id\n        title\n        description\n        status\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "3aa5a567b397c621dbb718ef19bf8994";

export default node;
