export default {
  colors: {
    primary: '#4caf50',
    secondary: '#ff9800',
    brown: '#795548',
    disk: '#81c784',
  },
  buttons: {
    primary: {
      cursor: 'pointer',

      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  forms: {
    select: {
      width: '100%',
      border: '1px solid rgba(0, 0, 0, 0.5)',
      p: 1,
      background: 'transparent',
      borderRadius: '3px',
    },
    input: {
      border: '1px solid rgba(0, 0, 0, 0.5)',
      p: 1,
      borderRadius: '3px',
      width: '100%',
    },
  },
};
