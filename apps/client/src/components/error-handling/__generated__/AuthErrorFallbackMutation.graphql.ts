/**
 * @generated SignedSource<<850144145c1b90b9f0948b9819821d65>>
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
export type AuthErrorFallbackMutation$variables = {
  input: LogoutInput;
};
export type AuthErrorFallbackMutation$data = {
  readonly logout: {
    readonly success: boolean | null | undefined;
  } | null | undefined;
};
export type AuthErrorFallbackMutation = {
  response: AuthErrorFallbackMutation$data;
  variables: AuthErrorFallbackMutation$variables;
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
    "name": "AuthErrorFallbackMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthErrorFallbackMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "685e086e483431a1b173b3cc2259250e",
    "id": null,
    "metadata": {},
    "name": "AuthErrorFallbackMutation",
    "operationKind": "mutation",
    "text": "mutation AuthErrorFallbackMutation(\n  $input: LogoutInput!\n) {\n  logout(input: $input) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "395005d98202ffc0988843b6d6d3039f";

export default node;
