/**
 * @generated SignedSource<<57deae9b55e5b48603d8eb4a5e09e82d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type userDeleteMutation$variables = {
  id: string;
};
export type userDeleteMutation$data = {
  readonly deleteUser: boolean;
};
export type userDeleteMutation = {
  response: userDeleteMutation$data;
  variables: userDeleteMutation$variables;
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
    "name": "userDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c9b12df0ff2f5da05d05d6175f9c0eef",
    "id": null,
    "metadata": {},
    "name": "userDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation userDeleteMutation(\n  $id: ID!\n) {\n  deleteUser(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "589b76123f35c045bc012bf10db62579";

export default node;
