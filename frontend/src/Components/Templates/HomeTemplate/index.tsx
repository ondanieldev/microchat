import React from 'react';

import PageContainer from 'Components/Atoms/PageContainer';
import HomeTitle from 'Components/Atoms/HomeTitle';
import HomeCard from 'Components/Atoms/HomeCard';
import SignTabs from 'Components/Organisms/SignTabs';
import ColorIcon from 'Components/Atoms/ColorIcon';

const HomeTemplate: React.FC = () => {
  return (
    <PageContainer>
      <ColorIcon />

      <HomeCard>
        <HomeTitle />

        <SignTabs />
      </HomeCard>
    </PageContainer>
  );
};

export default HomeTemplate;
