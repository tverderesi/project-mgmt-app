/**
 * @generated SignedSource<<3fc678b9ad545b77a316a2e270d7a0bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userClient_client$data = ReadonlyArray<{
  readonly email: string;
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly " $fragmentType": "userClient_client";
}>;
export type userClient_client$key = ReadonlyArray<{
  readonly " $data"?: userClient_client$data;
  readonly " $fragmentSpreads": FragmentRefs<"userClient_client">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "userClient_client",
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
      "storageKey": null
    }
  ],
  "type": "Client",
  "abstractKey": null
};

(node as any).hash = "8d0bc6b63d2e1ac983c5975a35c5b956";

export default node;
