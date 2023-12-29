/**
 * @generated SignedSource<<fa8fdbb677fdf43bbe513802cf72fb95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type authLogoutMutation$variables = Record<PropertyKey, never>;
export type authLogoutMutation$data = {
  readonly logout: boolean | null | undefined;
};
export type authLogoutMutation = {
  response: authLogoutMutation$data;
  variables: authLogoutMutation$variables;
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
    "name": "authLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "authLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f7246dd7ad83a4ca117cb85cb1bd79cf",
    "id": null,
    "metadata": {},
    "name": "authLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation authLogoutMutation {\n  logout\n}\n"
  }
};
})();

(node as any).hash = "310e140564f7cabdc2bd488c526c6eea";

export default node;
