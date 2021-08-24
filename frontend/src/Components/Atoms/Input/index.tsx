import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { v4 } from 'uuid';
import {
  Input as BaseInput,
  FormControl,
  FormHelperText,
  InputProps,
  FormLabel,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
  InputRightAddon,
} from '@chakra-ui/react';

import InputError from '../InputError';

interface IProps extends InputProps {
  name: string;
  type: string;
  rightAddon?: string | JSX.Element;
  label?: string;
  helper?: string;
  helperColor?: string;
  readonly?: boolean;
  focusColor?: string;
}

const Input: React.FC<IProps> = ({
  name,
  label,
  helper,
  rightAddon,
  type,
  helperColor,
  focusColor,
  ...rest
}) => {
  const { fieldName, error, registerField, defaultValue } = useField(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const inputType = useMemo(() => {
    if (type === 'password' && showPassword) return 'text';
    if (type === 'password' && !showPassword) return 'password';
    return type;
  }, [type, showPassword]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName, inputRef]);

  return (
    <FormControl id={v4()}>
      {label && <FormLabel mb="5px">{label}</FormLabel>}
      <InputGroup>
        <BaseInput
          variant="outline"
          name={name}
          ref={inputRef}
          type={inputType}
          defaultValue={defaultValue}
          step={type === 'number' ? '0.01' : ''}
          _focus={{ borderColor: focusColor || 'inherit' }}
          {...rest}
        />
        {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
        {type === 'password' && (
          <InputRightElement>
            {showPassword ? (
              <Icon as={FiEyeOff} onClick={() => setShowPassword(false)} />
            ) : (
              <Icon as={FiEye} onClick={() => setShowPassword(true)} />
            )}

            {error && (
              <Box mr="20px" ml="10px">
                <InputError error={error} />
              </Box>
            )}
          </InputRightElement>
        )}
        {type !== 'password' && error && (
          <InputRightElement>
            <InputError error={error} />
          </InputRightElement>
        )}
      </InputGroup>

      {helper && (
        <FormHelperText color={helperColor || 'inherit'}>
          {helper}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Input;
