import Input from "antd/es/input/Input";
import Search from "antd/es/input/Search";
import { CSSProperties } from "react";

interface InputProps {
  search?: boolean;
  input?: boolean;
  className?: string;
  inputProps?: {
    placeholder?: string;
    onSearch: (value: string) => void;
    style?: CSSProperties;
  };
}
function InputComponent({ search, input, inputProps, className }: InputProps) {
  if (search) {
    return <Search {...inputProps} className={className} />;
  }
  return <Input {...inputProps} className={className} />;
}

export default InputComponent;
