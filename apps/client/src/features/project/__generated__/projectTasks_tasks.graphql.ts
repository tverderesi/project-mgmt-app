/**
 * @generated SignedSource<<737243bb5e53a71d2adef71a833d1eb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Status = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type projectTasks_tasks$data = ReadonlyArray<{
  readonly description: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly status: Status;
  readonly " $fragmentType": "projectTasks_tasks";
}>;
export type projectTasks_tasks$key = ReadonlyArray<{
  readonly " $data"?: projectTasks_tasks$data;
  readonly " $fragmentSpreads": FragmentRefs<"projectTasks_tasks">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "projectTasks_tasks",
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
  "type": "Task",
  "abstractKey": null
};

(node as any).hash = "b842d22c29d3b9ba65da71265d1f36ca";

export default node;
