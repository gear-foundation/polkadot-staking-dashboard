// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type {
  ValidatorEntry as DefaultValidatorEntry,
  ValidatorSupportedChains as DefaultValidatorSupportedChains,
} from '@w3ux/validator-assets';

export interface CommunityContextInterface {
  validatorCommunity: ValidatorEntry[];
}

export type ValidatorSupportedChains = DefaultValidatorSupportedChains | 'vara';

export type ValidatorEntry = DefaultValidatorEntry & {
  validators: Partial<Record<ValidatorSupportedChains, string[]>>;
};
