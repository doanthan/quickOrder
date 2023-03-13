import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

const TextField = ({
  label,
  type,
  name,
  placeholder,
  rules,
  register,
  errors,
}) => {
  return (
    <FormControl mb="6" isInvalid={errors.name}>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Input
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
      />
      <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
