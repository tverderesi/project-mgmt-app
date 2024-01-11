/**
 * @generated SignedSource<<b5c16aa70cdb916c7ef0f15f4e742e75>>
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
  readonly deleteUser: {
    readonly error: {
      readonly message: string;
      readonly type: string;
    } | null | undefined;
    readonly status: string | null | undefined;
  };
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
    "concreteType": "DeleteUserReturn",
    "kind": "LinkedField",
    "name": "deleteUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Error",
        "kind": "LinkedField",
        "name": "error",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
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
    "cacheID": "b1ca030b915c58872701eec9d9f0d8a2",
    "id": null,
    "metadata": {},
    "name": "userDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation userDeleteMutation(\n  $id: ID!\n) {\n  deleteUser(id: $id) {\n    error {\n      message\n      type\n    }\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "7c73ff1f6949edd41de35bf792d6e9c3";

export default node;
