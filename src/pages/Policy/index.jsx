import ComingSoon from 'components/comingSoon'
import PrivateLayout from 'layouts/privateLayout'
import ResetPwdLayout from 'layouts/resetPwdLayout'
import React from 'react'
import PrivacyPolicyModal from './details'

export default function Index() {
  return (
    <ResetPwdLayout>
   {/* <ComingSoon title={'Privacy Policy'} /> */}
   <PrivacyPolicyModal />
    </ResetPwdLayout>
  )
}
