/**
 * @generated SignedSource<<8ef6db17db1d61ceec5b5f24a211dd39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type userUserStatsQuery$variables = {
  id: string;
};
export type userUserStatsQuery$data = {
  readonly user: {
    readonly clientCount: number | null | undefined;
    readonly projectCount: number | null | undefined;
    readonly taskCountByStatus: ReadonlyArray<{
      readonly count: number;
      readonly status: Status;
    } | null | undefined> | null | undefined;
    readonly totalTaskCount: number | null | undefined;
  };
};
export type userUserStatsQuery = {
  response: userUserStatsQuery$data;
  variables: userUserStatsQuery$variables;
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
  "name": "projectCount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalTaskCount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "TaskCountByStatus",
  "kind": "LinkedField",
  "name": "taskCountByStatus",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "count",
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
    "name": "userUserStatsQuery",
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
          (v5/*: any*/)
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
    "name": "userUserStatsQuery",
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e3452cdd12dc47c128f354f1e397577d",
    "id": null,
    "metadata": {},
    "name": "userUserStatsQuery",
    "operationKind": "query",
    "text": "query userUserStatsQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    projectCount\n    clientCount\n    totalTaskCount\n    taskCountByStatus {\n      status\n      count\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8860553587b595995b07113c1173aa4e";

export default node;
