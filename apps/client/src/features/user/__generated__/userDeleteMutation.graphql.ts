/**
 * @generated SignedSource<<f0293eb34b8160d9e26400e0f248c447>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteUserInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type userDeleteMutation$variables = {
  input: DeleteUserInput;
};
export type userDeleteMutation$data = {
  readonly deleteUser: {
    readonly success: boolean | null | undefined;
  } | null | undefined;
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
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DeleteUserPayload",
    "kind": "LinkedField",
    "name": "deleteUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
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
    "cacheID": "e255e260019d48bd92fbedb3dd2e5769",
    "id": null,
    "metadata": {},
    "name": "userDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation userDeleteMutation(\n  $input: DeleteUserInput!\n) {\n  deleteUser(input: $input) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "e973e88bdf4263fcf7fbc1a7832a9b9d";

export default node;
