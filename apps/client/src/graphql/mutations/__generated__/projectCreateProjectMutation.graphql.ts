/**
 * @generated SignedSource<<6d1ecbfc072e57cc433c4d3117551130>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type ProjectInput = {
  client: string;
  description?: string | null | undefined;
  name: string;
  status: Status;
  user: string;
};
export type projectCreateProjectMutation$variables = {
  input: ProjectInput;
};
export type projectCreateProjectMutation$data = {
  readonly createProject: {
    readonly description: string;
    readonly id: string;
    readonly name: string;
    readonly status: Status;
  };
};
export type projectCreateProjectMutation = {
  response: projectCreateProjectMutation$data;
  variables: projectCreateProjectMutation$variables;
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
    "concreteType": "Project",
    "kind": "LinkedField",
    "name": "createProject",
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
        "name": "description",
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
    "name": "projectCreateProjectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "projectCreateProjectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6d70a8080f4b23a51dd24d7f16f2b9c8",
    "id": null,
    "metadata": {},
    "name": "projectCreateProjectMutation",
    "operationKind": "mutation",
    "text": "mutation projectCreateProjectMutation(\n  $input: ProjectInput!\n) {\n  createProject(input: $input) {\n    id\n    name\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "6e6f94ade57f7c877fac1685f13a4f55";

export default node;
