/**
 * @generated SignedSource<<2d158280a50e8d84212ddba005344c3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type userUserStatsQuery$variables = {
  id: string;
};
export type userUserStatsQuery$data = {
  readonly userStats: {
    readonly clientCount: number;
    readonly projectCount: number;
    readonly taskCount: ReadonlyArray<{
      readonly count: number | null | undefined;
      readonly status: string | null | undefined;
    } | null | undefined>;
    readonly totalTaskCount: number;
  } | null | undefined;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "UserStats",
    "kind": "LinkedField",
    "name": "userStats",
    "plural": false,
    "selections": [
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
        "concreteType": "taskCount",
        "kind": "LinkedField",
        "name": "taskCount",
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
    "name": "userUserStatsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userUserStatsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4527c6d21f8c43afb1a67da4aae2fdbd",
    "id": null,
    "metadata": {},
    "name": "userUserStatsQuery",
    "operationKind": "query",
    "text": "query userUserStatsQuery(\n  $id: ID!\n) {\n  userStats(id: $id) {\n    projectCount\n    clientCount\n    totalTaskCount\n    taskCount {\n      status\n      count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d7d22af8b7927fe9eef96a9f3181db85";

export default node;
