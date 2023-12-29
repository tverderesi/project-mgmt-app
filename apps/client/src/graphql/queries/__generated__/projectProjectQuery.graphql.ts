/**
 * @generated SignedSource<<47010ad6fc6dbdc4ef3bb4ee554983c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type projectProjectQuery$variables = {
  id: string;
};
export type projectProjectQuery$data = {
  readonly project: {
    readonly autoProgress: boolean;
    readonly client: {
      readonly email: string;
      readonly id: string;
      readonly name: string;
      readonly phone: string;
    };
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly progress: number;
    readonly status: string;
    readonly tasks: ReadonlyArray<{
      readonly autoProgress: boolean;
      readonly description: string | null | undefined;
      readonly id: string;
      readonly name: string;
      readonly progress: number;
      readonly status: string;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type projectProjectQuery = {
  response: projectProjectQuery$data;
  variables: projectProjectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "progress",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "autoProgress",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Project",
    "kind": "LinkedField",
    "name": "project",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Client",
        "kind": "LinkedField",
        "name": "client",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Task",
        "kind": "LinkedField",
        "name": "tasks",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
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
    "name": "projectProjectQuery",
    "selections": (v7/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "projectProjectQuery",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "941e31d61a168bda8d602dd4ad70197b",
    "id": null,
    "metadata": {},
    "name": "projectProjectQuery",
    "operationKind": "query",
    "text": "query projectProjectQuery(\n  $id: ID!\n) {\n  project(id: $id) {\n    id\n    name\n    description\n    status\n    progress\n    autoProgress\n    client {\n      id\n      name\n      email\n      phone\n    }\n    tasks {\n      id\n      name\n      description\n      status\n      progress\n      autoProgress\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c5204017795218ed8ae52bd3e5584ee5";

export default node;
