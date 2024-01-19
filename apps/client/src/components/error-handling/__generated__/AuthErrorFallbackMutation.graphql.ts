/**
 * @generated SignedSource<<073cd091b10d00bda2599cf800ccf085>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AuthErrorFallbackMutation$variables = Record<PropertyKey, never>;
export type AuthErrorFallbackMutation$data = {
  readonly logout: boolean;
};
export type AuthErrorFallbackMutation = {
  response: AuthErrorFallbackMutation$data;
  variables: AuthErrorFallbackMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "logout",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthErrorFallbackMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthErrorFallbackMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "cc41bc08841c5f7ceffdca43fbf31063",
    "id": null,
    "metadata": {},
    "name": "AuthErrorFallbackMutation",
    "operationKind": "mutation",
    "text": "mutation AuthErrorFallbackMutation {\n  logout\n}\n"
  }
};
})();

(node as any).hash = "e2f0c6fa5dadb327125ad6b494f5bf34";

export default node;
