/**
 * @generated SignedSource<<e9fc4cf121a898a539045deabdf95d0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AppLayoutQuery$variables = Record<PropertyKey, never>;
export type AppLayoutQuery$data = {
  readonly isLoggedIn: boolean | null | undefined;
};
export type AppLayoutQuery = {
  response: AppLayoutQuery$data;
  variables: AppLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isLoggedIn",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppLayoutQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppLayoutQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e004f58ad1423c6458170c3dbdead6fb",
    "id": null,
    "metadata": {},
    "name": "AppLayoutQuery",
    "operationKind": "query",
    "text": "query AppLayoutQuery {\n  isLoggedIn\n}\n"
  }
};
})();

(node as any).hash = "fa7a19b04ec20e37392047c8e052dd1e";

export default node;
