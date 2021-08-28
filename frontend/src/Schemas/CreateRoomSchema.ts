import * as Yup from 'yup';

const CreateRoomSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
});

export default CreateRoomSchema;
