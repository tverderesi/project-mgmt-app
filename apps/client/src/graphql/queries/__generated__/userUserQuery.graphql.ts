/**
 * @generated SignedSource<<0a7035ebec9aaabfaecb0c5713e45920>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userUserQuery$variables = {
  id: string;
};
export type userUserQuery$data = {
  readonly user: {
    readonly clientCount: number | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly email: string | null | undefined;
    readonly id: string;
    readonly name: string | null | undefined;
    readonly projectCount: number | null | undefined;
    readonly updatedAt: string | null | undefined;
    readonly username: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"userClientCount_clientCount" | "userClient_Connection" | "userProjectCount_projectCount" | "userProject_ProjectConnection" | "userTaskCount_TaskCount">;
  } | null | undefined;
};
export type userUserQuery = {
  response: userUserQuery$data;
  variables: userUserQuery$variables;
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
  "name": "username",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectCount",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v12 = {
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
      "name": "endCursor",
      "storageKey": null
    },
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "userUserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "userProject_ProjectConnection"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "userClient_Connection"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "userProjectCount_projectCount"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "userClientCount_clientCount"
          },
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
    "name": "userUserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectConnection",
            "kind": "LinkedField",
            "name": "projects",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProjectEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Project",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "connection",
            "key": "User_projects",
            "kind": "LinkedHandle",
            "name": "projects"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ClientConnection",
            "kind": "LinkedField",
            "name": "clients",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClientEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Client",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "phone",
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "connection",
            "key": "User_clients",
            "kind": "LinkedHandle",
            "name": "clients"
          },
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "21c8294191d9eaf43f56a1e4d8ef7bbe",
    "id": null,
    "metadata": {},
    "name": "userUserQuery",
    "operationKind": "query",
    "text": "query userUserQuery(\n  $id: String!\n) {\n  user(id: $id) {\n    id\n    name\n    username\n    email\n    createdAt\n    updatedAt\n    projectCount\n    clientCount\n    ...userProject_ProjectConnection\n    ...userClient_Connection\n    ...userProjectCount_projectCount\n    ...userClientCount_clientCount\n    ...userTaskCount_TaskCount\n  }\n}\n\nfragment userClientCount_clientCount on User {\n  clientCount\n  id\n}\n\nfragment userClient_Connection on User {\n  clients {\n    edges {\n      node {\n        id\n        name\n        email\n        phone\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment userProjectCount_projectCount on User {\n  projectCount\n  id\n}\n\nfragment userProject_ProjectConnection on User {\n  projects {\n    edges {\n      node {\n        id\n        name\n        description\n        createdAt\n        updatedAt\n        status\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment userTaskCount_TaskCount on User {\n  taskCount {\n    NOT_STARTED\n    IN_PROGRESS\n    COMPLETED\n    TOTAL\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "c16b243c38da22337d42205cd57a1208";

export default node;
