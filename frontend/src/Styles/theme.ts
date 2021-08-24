import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: props => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : '#f4f4f4',
        minHeight: '100% ',
      },
      '*': {
        _focus: {
          boxShadow: 'none !important',
        },
      },
    }),
  },
});

export default theme;
