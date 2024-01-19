/**
 * @generated SignedSource<<e84b610653655d3c213412a092d6e5cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
export type UserInput = {
  confirmEmail: string;
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  username: string;
};
export type SignUpFormMutation$variables = {
  input: UserInput;
};
export type SignUpFormMutation$data = {
  readonly createUser: {
    readonly id: string;
    readonly name: string;
    readonly role: Role;
  };
};
export type SignUpFormMutation = {
  response: SignUpFormMutation$data;
  variables: SignUpFormMutation$variables;
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createUser",
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
        "name": "role",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8678a37295437ad4d29d85a1b5e65de6",
    "id": null,
    "metadata": {},
    "name": "SignUpFormMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpFormMutation(\n  $input: UserInput!\n) {\n  createUser(input: $input) {\n    id\n    role\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "a92b1de73e31328ec82384d012284f7e";

export default node;
