// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { NetworkList } from 'config/networks'
import type { NetworkContextInterface } from './types'

export const defaultNetworkContext: NetworkContextInterface = {
  network: NetworkList.vara.name,
  networkData: NetworkList.vara,
  switchNetwork: async () => new Promise((resolve) => resolve(undefined)),
}

export const defaultNetwork = 'vara'
