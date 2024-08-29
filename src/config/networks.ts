// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import VaraIconSVG from 'img/vara_icon.svg?react';
import VaraInlineSVG from 'img/vara_inline.svg?react';
import VaraTokenSVG from 'img/vara_token.svg?react';
import VaraLogoSVG from 'img/logo-vara-black.svg?react';

import type { NetworkName, Networks } from 'types';
import BigNumber from 'bignumber.js';

// DEPRECATION: Paged Rewards
//
// Temporary until paged rewards migration has completed on all networks. Wait 84 eras from Polkadot
// start: 1420 + 84 = 1504, when full history depth will be moved over to new paged rewards storage.
export const NetworksWithPagedRewards: NetworkName[] = [
  'polkadot',
  'kusama',
  'westend',
  'vara',
];
export const PagedRewardsStartEra: Record<NetworkName, BigNumber | null> = {
  polkadot: new BigNumber(1420),
  kusama: new BigNumber(6514),
  westend: new BigNumber(7167),
  vara: new BigNumber(826),
};

export const NetworkList: Networks = {
  vara: {
    name: 'vara',
    endpoints: {
      lightClient: 'vara',
      defaultRpcEndpoint: 'Gear',
      rpcEndpoints: {
        Gear: 'wss://rpc.vara.network',
      },
    },
    namespace: 'fe1b4c55fd4d668101126434206571a7',
    colors: {
      primary: {
        light: 'rgb(127, 255, 225)',
        dark: 'rgba(14,211,163,0.8)',
      },
      secondary: {
        light: 'rgb(127, 255, 225)',
        dark: 'rgb(127, 255, 225)',
      },
      stroke: {
        light: 'rgb(127, 255, 225)',
        dark: 'rgb(127, 255, 225)',
      },
      transparent: {
        light: 'rgb(127, 255, 225)',
        dark: 'rgb(127, 255, 225)',
      },
      pending: {
        light: 'rgb(127, 255, 225)',
        dark: 'rgb(127, 255, 225)',
      },
    },
    unit: 'VARA',
    units: 12,
    ss58: 0, // active account is not getting connected with a custom value
    brand: {
      icon: VaraIconSVG,
      token: VaraTokenSVG,
      logo: {
        svg: VaraLogoSVG,
        width: '5.1em',
      },
      inline: {
        svg: VaraInlineSVG,
        size: '0.96em',
      },
    },
    api: {
      unit: 'VARA',
      id: 'vara-network',
    },
    defaultFeeReserve: 0.1,
    maxExposurePageSize: new BigNumber(512),
  },
};
