// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useApi } from 'contexts/Api';
import { useBalances } from 'contexts/Balances';
import { useConnect } from 'contexts/Connect';
import { useModal } from 'contexts/Modal';
import { useStaking } from 'contexts/Staking';
import { useTransferOptions } from 'contexts/TransferOptions';
import { useTxFees } from 'contexts/TxFees';
import { EstimatedTxFee } from 'library/EstimatedTxFee';
import { Warning } from 'library/Form/Warning';
import { useSubmitExtrinsic } from 'library/Hooks/useSubmitExtrinsic';
import { Title } from 'library/Modal/Title';
import { FormFooter } from 'modals/UpdateBond/Forms/FormFooter';
import { NotesWrapper, PaddingWrapper } from 'modals/Wrappers';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { planckBnToUnit, unitToPlanckBn } from 'Utils';
import { Separator } from '../../Wrappers';

export const Unstake = () => {
  const { t } = useTranslation('modals');
  const { api, network, consts } = useApi();
  const { units } = network;
  const { setStatus: setModalStatus, setResize } = useModal();
  const { activeAccount, accountHasSigner } = useConnect();
  const { getControllerNotImported } = useStaking();
  const { getBondedAccount, getAccountNominations } = useBalances();
  const { getTransferOptions } = useTransferOptions();
  const { txFeesValid } = useTxFees();

  const controller = getBondedAccount(activeAccount);
  const nominations = getAccountNominations(activeAccount);
  const controllerNotImported = getControllerNotImported(controller);
  const { bondDuration } = consts;
  const allTransferOptions = getTransferOptions(activeAccount);
  const { active } = allTransferOptions.nominate;

  // convert BN values to number
  const freeToUnbond = planckBnToUnit(active, units);

  // local bond value
  const [bond, setBond] = useState({
    bond: freeToUnbond,
  });

  // bond valid
  const [bondValid, setBondValid] = useState(false);

  // unbond all validation
  const isValid = (() => {
    return freeToUnbond > 0 && !controllerNotImported;
  })();

  // update bond value on task change
  useEffect(() => {
    const _bond = freeToUnbond;
    setBond({ bond: _bond });
    setBondValid(isValid);
  }, [freeToUnbond, isValid]);

  // modal resize on form update
  useEffect(() => {
    setResize();
  }, [bond]);

  // tx to submit
  const getTx = () => {
    const tx = null;
    if (!bondValid || !api || !activeAccount) {
      return tx;
    }
    // controller must be imported to unstake
    if (controllerNotImported) {
      return tx;
    }
    // remove decimal errors
    const bondToSubmit = unitToPlanckBn(String(bond.bond), units);

    if (bondToSubmit.isZero()) {
      return api.tx.staking.chill();
    }
    const txs = [api.tx.staking.chill(), api.tx.staking.unbond(bondToSubmit)];
    return api.tx.utility.batch(txs);
  };

  const { submitTx, submitting } = useSubmitExtrinsic({
    tx: getTx(),
    from: controller,
    shouldSubmit: bondValid,
    callbackSubmit: () => {
      setModalStatus(2);
    },
    callbackInBlock: () => {},
  });

  return (
    <>
      <Title title="Unstake" icon={faSignOutAlt} />
      <PaddingWrapper>
        {!accountHasSigner(controller) && <Warning text={t('readOnly')} />}
        {controllerNotImported ? (
          <Warning text={t('controllerImported')} />
        ) : (
          <></>
        )}
        <h2 className="title">
          Unbond {freeToUnbond} {network.unit}
        </h2>
        <Separator />
        {nominations.length > 0 && (
          <>
            <h2 className="title">Stop Nominating 10 Validators</h2>
            <Separator />
          </>
        )}
        <NotesWrapper noPadding>
          <p>{t('onceUnbonding', { bondDuration })}</p>
          {bondValid && <EstimatedTxFee />}
        </NotesWrapper>
        <FormFooter
          submitTx={submitTx}
          submitting={submitting}
          isValid={bondValid && accountHasSigner(controller) && txFeesValid}
        />
      </PaddingWrapper>
    </>
  );
};
