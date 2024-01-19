/**
 * @generated SignedSource<<f38abf9b449baef038cda71dec3adc9b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useLoggedInRedirectQuery$variables = Record<PropertyKey, never>;
export type useLoggedInRedirectQuery$data = {
  readonly isLoggedIn: boolean;
};
export type useLoggedInRedirectQuery = {
  response: useLoggedInRedirectQuery$data;
  variables: useLoggedInRedirectQuery$variables;
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
    "name": "useLoggedInRedirectQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useLoggedInRedirectQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "66afb7642f5698d2fb54d6b61e49df51",
    "id": null,
    "metadata": {},
    "name": "useLoggedInRedirectQuery",
    "operationKind": "query",
    "text": "query useLoggedInRedirectQuery {\n  isLoggedIn\n}\n"
  }
};
})();

(node as any).hash = "5c7d6330f5cfaf24cdbfad8ccc89c4c5";

export default node;
