// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import VaraIconSVG from 'assets/svg/chains/varaIcon.svg?react'
import VaraInlineSVG from 'assets/svg/chains/varaInline.svg?react'
import VaraTokenSVG from 'assets/svg/token/vara.svg?react'
import BigNumber from 'bignumber.js'
import type { Networks, SystemChain } from 'common-types'

export const NetworkList: Networks = {
  vara: {
    name: 'vara',
    endpoints: {
      lightClientKey: 'vara',
      lightClient: async () => await import('polkadot-api/chains/polkadot'),
      defaultRpcEndpoint: 'Gear',
      rpcEndpoints: {
        Gear: 'wss://rpc.vara.network',
      },
    },
    unit: 'VARA',
    units: 12,
    ss58: 0, // active account is not getting connected with a custom value
    brand: {
      icon: VaraIconSVG,
      token: VaraTokenSVG,
      inline: {
        svg: VaraInlineSVG,
        size: '1.05em',
      },
    },
    api: {
      unit: 'VARA',
    },
    defaultFeeReserve: 0.1,
    maxExposurePageSize: new BigNumber(512),
  },
}

export const SystemChainList: Record<string, SystemChain> = {
  'people-vara': {
    name: 'people-vara',
    ss58: 0, // active account is not getting connected with a custom value
    units: 12,
    unit: 'VARA',
    endpoints: {
      lightClientKey: 'vara',
      lightClient: async () =>
        await import('polkadot-api/chains/polkadot_people'),
      rpcEndpoints: {
        Gear: 'wss://rpc.vara.network',
      },
    },
    relayChain: 'vara',
  },
}
