/**
 * @generated SignedSource<<b6ff96a7a134775042f26fa77b93d1d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userClientCount_clientCount$data = {
  readonly clientCount: number | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "userClientCount_clientCount";
};
export type userClientCount_clientCount$key = {
  readonly " $data"?: userClientCount_clientCount$data;
  readonly " $fragmentSpreads": FragmentRefs<"userClientCount_clientCount">;
};

import userClientCount_clientCountQuery_graphql from './userClientCount_clientCountQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": userClientCount_clientCountQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "userClientCount_clientCount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clientCount",
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

(node as any).hash = "5f4402bc0b0805aa205687b36979b0ed";

export default node;
