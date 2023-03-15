import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";
import { useState } from "react";
import { InputRightElement, Button, InputGroup } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PasswordTextField = ({ label, name, placeholder, register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isInvalid={errors.password} mb="6">
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 2,
              message: "Minimum length should be 2",
            },
          })}
        />
        <InputRightElement h="full">
          <Button
            variant="ghost"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordTextField;
