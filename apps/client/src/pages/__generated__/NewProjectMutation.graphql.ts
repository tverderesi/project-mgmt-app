/**
 * @generated SignedSource<<01c4b77970db2a5f98cbcb230c00598c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
export type CreateProjectInput = {
  client: string;
  clientMutationId?: string | null | undefined;
  description?: string | null | undefined;
  name: string;
  status?: ProjectStatus | null | undefined;
  user: string;
};
export type NewProjectMutation$variables = {
  input: CreateProjectInput;
};
export type NewProjectMutation$data = {
  readonly createProject: {
    readonly project: {
      readonly client: {
        readonly id: string;
        readonly name: string | null | undefined;
      } | null | undefined;
      readonly description: string | null | undefined;
      readonly id: string;
      readonly name: string | null | undefined;
      readonly status: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type NewProjectMutation = {
  response: NewProjectMutation$data;
  variables: NewProjectMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateProjectPayload",
    "kind": "LinkedField",
    "name": "createProject",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "project",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
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
    "name": "NewProjectMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewProjectMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "4acd6cd79decdad807e53ec630fd9a06",
    "id": null,
    "metadata": {},
    "name": "NewProjectMutation",
    "operationKind": "mutation",
    "text": "mutation NewProjectMutation(\n  $input: CreateProjectInput!\n) {\n  createProject(input: $input) {\n    project {\n      id\n      name\n      description\n      status\n      client {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae62bbca0009f4a6bf965c66c6139e15";

export default node;
