/**
 * @generated SignedSource<<74e4e2b13a952005922e8b3fae642a4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type projectClient_client$data = {
  readonly email: string;
  readonly name: string;
  readonly phone: string;
  readonly " $fragmentType": "projectClient_client";
};
export type projectClient_client$key = {
  readonly " $data"?: projectClient_client$data;
  readonly " $fragmentSpreads": FragmentRefs<"projectClient_client">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "projectClient_client",
  "selections": [
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

(node as any).hash = "1048642e9cbf8fcb77ffb666aeba5d9e";

export default node;
