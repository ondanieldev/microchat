import { MutableRefObject } from 'react';
import { FormHandles } from '@unform/core';

interface IDefaultRequest {
  formRef: MutableRefObject<FormHandles | null>;
}

export default IDefaultRequest;
