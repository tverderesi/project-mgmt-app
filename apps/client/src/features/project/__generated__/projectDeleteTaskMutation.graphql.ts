/**
 * @generated SignedSource<<ddd3ca7cf0315b524f909158d6623c88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type projectDeleteTaskMutation$variables = {
  id: string;
};
export type projectDeleteTaskMutation$data = {
  readonly deleteTask: string;
};
export type projectDeleteTaskMutation = {
  response: projectDeleteTaskMutation$data;
  variables: projectDeleteTaskMutation$variables;
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
    "name": "deleteTask",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "projectDeleteTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "projectDeleteTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "156b819ac38d9c84a534397a022617e2",
    "id": null,
    "metadata": {},
    "name": "projectDeleteTaskMutation",
    "operationKind": "mutation",
    "text": "mutation projectDeleteTaskMutation(\n  $id: ID!\n) {\n  deleteTask(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "e809f92b4d89980880f9b39faa24a251";

export default node;
