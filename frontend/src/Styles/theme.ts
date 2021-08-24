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
        '::-webkit-scrollbar': {
          width: '5px',
        },
        '::-webkit-scrollbar-thumb': {
          background: props.colorMode === 'dark' ? '#b4b7bd' : '#999',
          borderRadius: '5px',
          border: 'none',
        },
        '::-webkit-scrollbar-track': {
          background: props.colorMode === 'dark' ? '#3b4253' : '#eee',
          boxShadow: 'none',
        },
        _focus: {
          boxShadow: 'none !important',
        },
      },
    }),
  },
});

export default theme;
