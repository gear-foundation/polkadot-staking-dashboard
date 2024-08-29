// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

import { NetworkList } from 'config/networks';

export const defaultNetworkContext = {
  network: NetworkList.vara.name,
  networkData: NetworkList.vara,
  switchNetwork: () => {},
};

export const defaultNetwork = 'vara';
