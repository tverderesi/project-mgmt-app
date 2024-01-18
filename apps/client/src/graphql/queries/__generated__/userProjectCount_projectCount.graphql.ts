/**
 * @generated SignedSource<<b3976b6f073ca1f3d366e80f22ee8371>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userProjectCount_projectCount$data = {
  readonly projectCount: number | null | undefined;
  readonly " $fragmentType": "userProjectCount_projectCount";
};
export type userProjectCount_projectCount$key = {
  readonly " $data"?: userProjectCount_projectCount$data;
  readonly " $fragmentSpreads": FragmentRefs<"userProjectCount_projectCount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userProjectCount_projectCount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "projectCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "9e84ed6cb63ed868f6490e01e1f5e8ba";

export default node;
