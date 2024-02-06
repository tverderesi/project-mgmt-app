/**
 * @generated SignedSource<<f6ca9390420feb878e54c382ee0a1ed0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LogoutInput = {
  clientMutationId?: string | null | undefined;
};
export type authLogoutMutation$variables = {
  input: LogoutInput;
};
export type authLogoutMutation$data = {
  readonly logout: {
    readonly success: boolean | null | undefined;
  } | null | undefined;
};
export type authLogoutMutation = {
  response: authLogoutMutation$data;
  variables: authLogoutMutation$variables;
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
    "concreteType": "LogoutPayload",
    "kind": "LinkedField",
    "name": "logout",
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
    "name": "authLogoutMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "authLogoutMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a484fd98f57f4c14467d2b241d8646f9",
    "id": null,
    "metadata": {},
    "name": "authLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation authLogoutMutation(\n  $input: LogoutInput!\n) {\n  logout(input: $input) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "7350103a5431c3fdadf0c09fe5af6e3f";

export default node;
