import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  nickname: Yup.string().required('nickname is required'),
  password: Yup.string().required('password is required'),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'passwords must match',
  ),
});

export default SignUpSchema;
