/**
 * @generated SignedSource<<0100be00f0ca2ee935458aea40d2281f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type userProject_project$data = ReadonlyArray<{
  readonly description: string;
  readonly id: string;
  readonly name: string;
  readonly status: Status;
  readonly " $fragmentType": "userProject_project";
}>;
export type userProject_project$key = ReadonlyArray<{
  readonly " $data"?: userProject_project$data;
  readonly " $fragmentSpreads": FragmentRefs<"userProject_project">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "userProject_project",
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
  "type": "Project",
  "abstractKey": null
};

(node as any).hash = "108e72634c92959ff3bec72f54e5c211";

export default node;
