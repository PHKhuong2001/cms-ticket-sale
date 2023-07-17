import Search from "antd/es/input/Search";
import { CSSProperties, useState } from "react";

interface InputProps {
  search?: boolean;
  input?: boolean;
  className?: string;
  valueSearchTicketNumber?: string;
  inputProps?: {
    placeholder?: string;
    onSearch: (value: string) => void;
    style?: CSSProperties;
  };
}
function InputComponent({
  search,
  input,
  inputProps,
  className,
  valueSearchTicketNumber,
}: InputProps) {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("search");
  const [valueSearchTicket, setValueSearchTicket] = useState(searchValue || "");
  const handlerChangeValue = (e: any) => {
    setValueSearchTicket(e.target.value);
  };
  if (search) {
    return (
      <Search
        {...inputProps}
        value={valueSearchTicket}
        className={className}
        onChange={handlerChangeValue}
      />
    );
  }
  return <Search {...inputProps} className={className} />;
}

export default InputComponent;
