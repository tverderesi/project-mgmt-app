/**
 * @generated SignedSource<<0d7b2c3002afdb16fa3ecaf7df8eb0f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ClientNavigationItemQuery$variables = {
  user?: string | null | undefined;
};
export type ClientNavigationItemQuery$data = {
  readonly clientCount: number;
};
export type ClientNavigationItemQuery = {
  response: ClientNavigationItemQuery$data;
  variables: ClientNavigationItemQuery$variables;
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
    "kind": "ScalarField",
    "name": "clientCount",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClientNavigationItemQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClientNavigationItemQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e878b87a62c9e18edd6e4b9770243434",
    "id": null,
    "metadata": {},
    "name": "ClientNavigationItemQuery",
    "operationKind": "query",
    "text": "query ClientNavigationItemQuery(\n  $user: ID\n) {\n  clientCount(user: $user)\n}\n"
  }
};
})();

(node as any).hash = "2494c98d28766f50fd3a69b40d02c592";

export default node;
