/**
 * @generated SignedSource<<70f664b43be5a678e8532c968f48d62b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userTaskCount_TaskCount$data = {
  readonly id: string;
  readonly taskCount: {
    readonly COMPLETED: number | null | undefined;
    readonly IN_PROGRESS: number | null | undefined;
    readonly NOT_STARTED: number | null | undefined;
    readonly TOTAL: number | null | undefined;
  };
  readonly " $fragmentType": "userTaskCount_TaskCount";
};
export type userTaskCount_TaskCount$key = {
  readonly " $data"?: userTaskCount_TaskCount$data;
  readonly " $fragmentSpreads": FragmentRefs<"userTaskCount_TaskCount">;
};

import userTaskCount_TaskCountQuery_graphql from './userTaskCount_TaskCountQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": userTaskCount_TaskCountQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "userTaskCount_TaskCount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "TaskCount",
      "kind": "LinkedField",
      "name": "taskCount",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "NOT_STARTED",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "IN_PROGRESS",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "COMPLETED",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "TOTAL",
          "storageKey": null
        }
      ],
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

(node as any).hash = "65b1b6c9afcc01741f2d8baffa95fe76";

export default node;
