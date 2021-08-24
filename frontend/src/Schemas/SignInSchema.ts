import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  nickname: Yup.string().required('nickname is required'),
  password: Yup.string().required('password is required'),
});

export default SignInSchema;
