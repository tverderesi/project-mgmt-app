/**
 * @generated SignedSource<<6f8cf62504cb06bcd5fe9196f9ae68fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deleteUserMutation$variables = {
  id: string;
};
export type deleteUserMutation$data = {
  readonly deleteUser: boolean;
};
export type deleteUserMutation = {
  response: deleteUserMutation$data;
  variables: deleteUserMutation$variables;
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
    "kind": "ScalarField",
    "name": "deleteUser",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "deleteUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "deleteUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "caea193d6071620dc7da218163425c14",
    "id": null,
    "metadata": {},
    "name": "deleteUserMutation",
    "operationKind": "mutation",
    "text": "mutation deleteUserMutation(\n  $id: ID!\n) {\n  deleteUser(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "f7c2cb43b57e5c3e8d965656a625c6c8";

export default node;
