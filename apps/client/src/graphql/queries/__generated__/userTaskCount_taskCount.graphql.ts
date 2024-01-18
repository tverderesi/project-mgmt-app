/**
 * @generated SignedSource<<79115193ae122e035bd2840ae499c02a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userTaskCount_taskCount$data = {
  readonly totalTaskCount: number | null | undefined;
  readonly " $fragmentType": "userTaskCount_taskCount";
};
export type userTaskCount_taskCount$key = {
  readonly " $data"?: userTaskCount_taskCount$data;
  readonly " $fragmentSpreads": FragmentRefs<"userTaskCount_taskCount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userTaskCount_taskCount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalTaskCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "0e806d583e27eab346f842e754d7f21d";

export default node;
