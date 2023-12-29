/**
 * @generated SignedSource<<7ba2dfa4b9f47394aafeb40c704de78b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProjectInput = {
  autoProgress: boolean;
  clientId: string;
  description?: string | null | undefined;
  name: string;
  progress: number;
  status: string;
  userId: string;
};
export type projectCreateProjectMutation$variables = {
  input: ProjectInput;
};
export type projectCreateProjectMutation$data = {
  readonly createProject: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly progress: number;
    readonly status: string;
  } | null | undefined;
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
        "name": "progress",
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
    "cacheID": "d4466be84500f8484a9776c037da665a",
    "id": null,
    "metadata": {},
    "name": "projectCreateProjectMutation",
    "operationKind": "mutation",
    "text": "mutation projectCreateProjectMutation(\n  $input: ProjectInput!\n) {\n  createProject(input: $input) {\n    id\n    name\n    description\n    progress\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "582929a7ac79e634428e796d12ce3ac5";

export default node;
