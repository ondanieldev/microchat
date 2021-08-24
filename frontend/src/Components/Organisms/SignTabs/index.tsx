import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { useColors } from 'Hooks/colors';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

const SignTabs: React.FC = () => {
  const { orange, purple } = useColors();

  return (
    <Tabs isFitted variant="enclosed" mt="20px">
      <TabList mb="1em">
        <Tab _selected={{ color: orange, borderBottomColor: orange }}>
          sign in
        </Tab>
        <Tab _selected={{ color: purple, borderBottomColor: purple }}>
          sign up
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SignInForm />
        </TabPanel>
        <TabPanel>
          <SignUpForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SignTabs;
