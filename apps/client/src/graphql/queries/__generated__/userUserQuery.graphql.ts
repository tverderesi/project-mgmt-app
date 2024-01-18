/**
 * @generated SignedSource<<3c711709019a7beb3abd72044d28403a>>
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
    readonly clients: ReadonlyArray<{
      readonly id: string;
    } | null | undefined>;
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly projects: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"userProject_project">;
    } | null | undefined>;
    readonly taskCountByStatus: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"userTaskCountByStatus_TaskCount">;
    } | null | undefined> | null | undefined;
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"userClientCount_clientCount" | "userProjectCount_projectCount" | "userTaskCount_taskCount">;
  };
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
  "concreteType": "Client",
  "kind": "LinkedField",
  "name": "clients",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v7 = {
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Project",
            "kind": "LinkedField",
            "name": "projects",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "userProject_project"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
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
            "name": "userTaskCount_taskCount"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TaskCountByStatus",
            "kind": "LinkedField",
            "name": "taskCountByStatus",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "userTaskCountByStatus_TaskCount"
              }
            ],
            "storageKey": null
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Project",
            "kind": "LinkedField",
            "name": "projects",
            "plural": true,
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
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "projectCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clientCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalTaskCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TaskCountByStatus",
            "kind": "LinkedField",
            "name": "taskCountByStatus",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "count",
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
    "cacheID": "18c1ee5bf517b2d6c883e8baf32dd1c9",
    "id": null,
    "metadata": {},
    "name": "userUserQuery",
    "operationKind": "query",
    "text": "query userUserQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    username\n    email\n    projects {\n      ...userProject_project\n      id\n    }\n    clients {\n      id\n    }\n    ...userProjectCount_projectCount\n    ...userClientCount_clientCount\n    ...userTaskCount_taskCount\n    taskCountByStatus {\n      ...userTaskCountByStatus_TaskCount\n    }\n  }\n}\n\nfragment userClientCount_clientCount on User {\n  clientCount\n}\n\nfragment userProjectCount_projectCount on User {\n  projectCount\n}\n\nfragment userProject_project on Project {\n  id\n  name\n  description\n  status\n}\n\nfragment userTaskCountByStatus_TaskCount on TaskCountByStatus {\n  status\n  count\n}\n\nfragment userTaskCount_taskCount on User {\n  totalTaskCount\n}\n"
  }
};
})();

(node as any).hash = "f1199889bd249d35e2e42387d545f061";

export default node;
