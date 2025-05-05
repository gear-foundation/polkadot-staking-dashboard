// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { NetworkList } from 'config/networks';
import { useNetwork } from 'contexts/Network';

export const useUnitPrice = () => {
  const { network } = useNetwork();

  const fetchUnitPrice = async () => {
    const endpoint = `https://api.coingecko.com/api/v3/simple/price`;

    const urls = [
      `${endpoint}?ids=${NetworkList[network].api.id}&vs_currencies=usd&include_24hr_change=true`,
    ];

    const responses = await Promise.all(
      urls.map((u) => fetch(u, { method: 'GET' }))
    );

    const texts = await Promise.all(responses.map((res) => res.json()));
    const newPrice = texts[0][NetworkList[network].api.id];

    if (newPrice.usd !== undefined && newPrice.usd_24h_change !== undefined) {
      const price: string = (Math.ceil(newPrice.usd * 1000) / 1000).toFixed(3);

      return {
        lastPrice: price,
        change: (Math.round(newPrice.usd_24h_change * 1000) / 1000).toFixed(3),
      };
    }

    return null;
  };

  return fetchUnitPrice;
};
