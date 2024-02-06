/**
 * @generated SignedSource<<032c0c35b35de1a4405bf80049b023b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginInput = {
  clientMutationId?: string | null | undefined;
  password: string;
  user: string;
};
export type LoginFormLoginMutation$variables = {
  input: LoginInput;
};
export type LoginFormLoginMutation$data = {
  readonly login: {
    readonly user: {
      readonly id: string;
      readonly name: string | null | undefined;
      readonly username: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type LoginFormLoginMutation = {
  response: LoginFormLoginMutation$data;
  variables: LoginFormLoginMutation$variables;
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
    "concreteType": "LoginPayload",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
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
    "name": "LoginFormLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginFormLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5efe14110fcf499178dbb63892a5272f",
    "id": null,
    "metadata": {},
    "name": "LoginFormLoginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginFormLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    user {\n      id\n      username\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7300703ae5d0d384f90fcd0ccb160135";

export default node;
