/**
 * @generated SignedSource<<285cc9cd269c20b2caab81b5147ba8f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type userTaskCountByStatus_TaskCount$data = ReadonlyArray<{
  readonly count: number;
  readonly status: Status;
  readonly " $fragmentType": "userTaskCountByStatus_TaskCount";
}>;
export type userTaskCountByStatus_TaskCount$key = ReadonlyArray<{
  readonly " $data"?: userTaskCountByStatus_TaskCount$data;
  readonly " $fragmentSpreads": FragmentRefs<"userTaskCountByStatus_TaskCount">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "userTaskCountByStatus_TaskCount",
  "selections": [
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
      "kind": "ScalarField",
      "name": "count",
      "storageKey": null
    }
  ],
  "type": "TaskCountByStatus",
  "abstractKey": null
};

(node as any).hash = "3083c677120e3761a52f4dc7bb9b52ba";

export default node;
