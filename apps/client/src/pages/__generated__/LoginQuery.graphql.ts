/**
 * @generated SignedSource<<bda663b9d0051c6b6c95838148096001>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LoginQuery$variables = Record<PropertyKey, never>;
export type LoginQuery$data = {
  readonly isLoggedIn: boolean;
};
export type LoginQuery = {
  response: LoginQuery$data;
  variables: LoginQuery$variables;
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
    "name": "LoginQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LoginQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "efa77cb247d9eeac262c3f0c42186814",
    "id": null,
    "metadata": {},
    "name": "LoginQuery",
    "operationKind": "query",
    "text": "query LoginQuery {\n  isLoggedIn\n}\n"
  }
};
})();

(node as any).hash = "0ae81ee065a9811791881b5f9c315553";

export default node;
