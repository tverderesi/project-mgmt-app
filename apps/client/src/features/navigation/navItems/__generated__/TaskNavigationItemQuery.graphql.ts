/**
 * @generated SignedSource<<3ad466452e0d26a53d4980dc727359a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TaskNavigationItemQuery$variables = {
  user?: string | null | undefined;
};
export type TaskNavigationItemQuery$data = {
  readonly taskCountByStatus: {
    readonly COMPLETED: number;
    readonly IN_PROGRESS: number;
    readonly NOT_STARTED: number;
    readonly TOTAL: number;
  };
};
export type TaskNavigationItemQuery = {
  response: TaskNavigationItemQuery$data;
  variables: TaskNavigationItemQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user",
        "variableName": "user"
      }
    ],
    "concreteType": "TaskCountByStatus",
    "kind": "LinkedField",
    "name": "taskCountByStatus",
    "plural": false,
    "selections": [
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
        "name": "IN_PROGRESS",
        "storageKey": null
      },
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
        "name": "TOTAL",
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
    "name": "TaskNavigationItemQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskNavigationItemQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d5275b5fce62d0c9efa08ce69e4a6214",
    "id": null,
    "metadata": {},
    "name": "TaskNavigationItemQuery",
    "operationKind": "query",
    "text": "query TaskNavigationItemQuery(\n  $user: ID\n) {\n  taskCountByStatus(user: $user) {\n    COMPLETED\n    IN_PROGRESS\n    NOT_STARTED\n    TOTAL\n  }\n}\n"
  }
};
})();

(node as any).hash = "786ccd3bc62d59361e27a4e82878b995";

export default node;
