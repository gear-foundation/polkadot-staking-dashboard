// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import VaraIconSVG from 'img/vara_icon.svg?react';
import VaraInlineSVG from 'img/vara_inline.svg?react';
import VaraTokenSVG from 'config/tokens/svg/VARA.svg?react';
import VaraLogoSVG from 'img/vara_logo.svg?react';
import type { Networks, SystemChain } from 'types';
import BigNumber from 'bignumber.js';

export const NetworkList: Networks = {
  vara: {
    name: 'vara',
    endpoints: {
      lightClient: 'vara',
      defaultRpcEndpoint: 'Gear',
      rpcEndpoints: {
        Gear: 'wss://testnet.vara.network',
      },
    },
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
      inline: {
        svg: VaraInlineSVG,
        size: '0.96em',
      },
      logo: {
        svg: VaraLogoSVG,
      },
    },
    api: {
      unit: 'VARA',
      priceTicker: 'VARAUSDT',
    },
    defaultFeeReserve: 0.1,
    maxExposurePageSize: new BigNumber(512),
  },
};

export const SystemChainList: Record<string, SystemChain> = {
  'people-vara': {
    name: 'people-vara',
    ss58: 0, // active account is not getting connected with a custom value
    units: 12,
    unit: 'DOT',
    endpoints: {
      lightClient: 'people_vara', // NOTE: Currently not being used. TODO: Revise this and activate once People chain specs are available to use.
      rpcEndpoints: {
        Gear: 'wss://testnet.vara.network',
      },
    },
  },
};
