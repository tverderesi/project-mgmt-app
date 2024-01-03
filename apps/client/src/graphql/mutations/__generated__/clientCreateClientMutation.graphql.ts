/**
 * @generated SignedSource<<ad8cac7a5da2a802778e0e60b1ff31c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ClientInput = {
  email: string;
  name: string;
  phone: string;
  user: string;
};
export type clientCreateClientMutation$variables = {
  input: ClientInput;
};
export type clientCreateClientMutation$data = {
  readonly createClient: {
    readonly email: string;
    readonly name: string;
    readonly phone: string;
  };
};
export type clientCreateClientMutation = {
  response: clientCreateClientMutation$data;
  variables: clientCreateClientMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "clientCreateClientMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Client",
        "kind": "LinkedField",
        "name": "createClient",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "clientCreateClientMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Client",
        "kind": "LinkedField",
        "name": "createClient",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "780d0148424fd852cb52a3e9089fb1d3",
    "id": null,
    "metadata": {},
    "name": "clientCreateClientMutation",
    "operationKind": "mutation",
    "text": "mutation clientCreateClientMutation(\n  $input: ClientInput!\n) {\n  createClient(input: $input) {\n    phone\n    name\n    email\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0ff1dfa05d34f26266c90727520cdb1e";

export default node;
