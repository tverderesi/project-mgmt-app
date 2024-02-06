/**
 * @generated SignedSource<<8917554a46fe3cd1dbd48a66316d4bf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userProjectCount_projectCount$data = {
  readonly id: string;
  readonly projectCount: number | null | undefined;
  readonly " $fragmentType": "userProjectCount_projectCount";
};
export type userProjectCount_projectCount$key = {
  readonly " $data"?: userProjectCount_projectCount$data;
  readonly " $fragmentSpreads": FragmentRefs<"userProjectCount_projectCount">;
};

import userProjectCount_projectCountQuery_graphql from './userProjectCount_projectCountQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": userProjectCount_projectCountQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "userProjectCount_projectCount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "projectCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "6e0259131153c934878d9d9d57362e2f";

export default node;
