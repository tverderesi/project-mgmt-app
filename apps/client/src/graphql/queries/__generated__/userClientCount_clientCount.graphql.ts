/**
 * @generated SignedSource<<7a7abcd00c85112e29964d845f1f7cf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userClientCount_clientCount$data = {
  readonly clientCount: number | null | undefined;
  readonly " $fragmentType": "userClientCount_clientCount";
};
export type userClientCount_clientCount$key = {
  readonly " $data"?: userClientCount_clientCount$data;
  readonly " $fragmentSpreads": FragmentRefs<"userClientCount_clientCount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userClientCount_clientCount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clientCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "cae476b22a36fd3797cbf611046da166";

export default node;
