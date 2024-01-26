/**
 * @generated SignedSource<<d978501c48be273ac92d2c91d3cb9637>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ProjectNavigationItemQuery$variables = {
  user?: string | null | undefined;
};
export type ProjectNavigationItemQuery$data = {
  readonly projectCount: number;
};
export type ProjectNavigationItemQuery = {
  response: ProjectNavigationItemQuery$data;
  variables: ProjectNavigationItemQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user",
        "variableName": "user"
      }
    ],
    "kind": "ScalarField",
    "name": "projectCount",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectNavigationItemQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProjectNavigationItemQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9798200bc69e5b961002630785542dfb",
    "id": null,
    "metadata": {},
    "name": "ProjectNavigationItemQuery",
    "operationKind": "query",
    "text": "query ProjectNavigationItemQuery(\n  $user: ID\n) {\n  projectCount(user: $user)\n}\n"
  }
};
})();

(node as any).hash = "f7bb46fdfc7bcd6961b82f1ed6ebf06f";

export default node;
