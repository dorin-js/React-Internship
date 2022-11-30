/* eslint-disable no-useless-escape */
export default {
  firstname: {
    required: {
      value: true,
      message: 'Input is required',
    },
    maxLength: {
      value: 30,
      message: 'The input is too long',
    },
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Name should contain letters only',
    },
  },
  lastname: {
    required: {
      value: true,
      message: 'Input is required',
    },
    maxLength: {
      value: 30,
      message: 'The input is too long',
    },
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Name should contain letters only',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Email is required',
    },
    maxLength: {
      value: 30,
      message: 'The input is too long',
    },
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.]\w+)(\.\w{2,5})?$/,
      message: 'Incorrect email format',
    },
  },
  birthDate: {
    required: {
      value: true,
      message: 'Birth date is required',
    },
  },
};
