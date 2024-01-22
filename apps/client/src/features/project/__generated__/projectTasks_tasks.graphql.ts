/**
 * @generated SignedSource<<c8429e04f951ffb702a085b34559f17d>>
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
  readonly status: Status;
  readonly title: string;
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
      "name": "title",
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

(node as any).hash = "65491695cd185623e636e21a9acb656e";

export default node;
