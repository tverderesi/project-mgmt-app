/**
 * @generated SignedSource<<e7c2e665888bfce18684e114e86ad4f6>>
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
export type clientCreateMutation$variables = {
  input: ClientInput;
};
export type clientCreateMutation$data = {
  readonly createClient: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly phone: string;
  };
};
export type clientCreateMutation = {
  response: clientCreateMutation$data;
  variables: clientCreateMutation$variables;
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
    "concreteType": "Client",
    "kind": "LinkedField",
    "name": "createClient",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "phone",
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
    "name": "clientCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "clientCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "348f077cb7a3e141c3628251c38fd014",
    "id": null,
    "metadata": {},
    "name": "clientCreateMutation",
    "operationKind": "mutation",
    "text": "mutation clientCreateMutation(\n  $input: ClientInput!\n) {\n  createClient(input: $input) {\n    id\n    name\n    email\n    phone\n  }\n}\n"
  }
};
})();

(node as any).hash = "6a22ca0cb74030f54a341993b97f6885";

export default node;
