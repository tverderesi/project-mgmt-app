/**
 * @generated SignedSource<<258fc071c5cb4ea33f88b996db8e201e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LogoutButtonLogoutMutation$variables = Record<PropertyKey, never>;
export type LogoutButtonLogoutMutation$data = {
  readonly logout: boolean;
};
export type LogoutButtonLogoutMutation = {
  response: LogoutButtonLogoutMutation$data;
  variables: LogoutButtonLogoutMutation$variables;
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
    "name": "LogoutButtonLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LogoutButtonLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "88b440fdccf08490b7c4c860fd6db8b2",
    "id": null,
    "metadata": {},
    "name": "LogoutButtonLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation LogoutButtonLogoutMutation {\n  logout\n}\n"
  }
};
})();

(node as any).hash = "4b817d8e91cb53a8bcb3cd3268f3fec7";

export default node;
