// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button } from 'library/Button';
import { useConnect } from 'contexts/Connect';
import { useUi } from 'contexts/UI';
import { Wrapper } from './Wrapper';
import { FooterProps } from '../types';

export const Footer = (props: FooterProps) => {
  const { complete, setupType } = props;

  const { activeAccount } = useConnect();
  const { getSetupProgress, setActiveAccountSetupSection } = useUi();
  const setup = getSetupProgress(setupType, activeAccount);

  return (
    <Wrapper>
      <section>
        {complete ? (
          <Button
            inline
            primary
            title="Continue"
            onClick={() =>
              setActiveAccountSetupSection(setupType, setup.section + 1)
            }
          />
        ) : (
          <div style={{ opacity: 0.5 }}>
            <Button inline title="Continue" disabled />
          </div>
        )}
      </section>
    </Wrapper>
  );
};

export default Footer;