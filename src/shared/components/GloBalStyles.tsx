import React from "react";

interface GloBalInterface {
  child: any;
}
function GlobalStyles({ child }: GloBalInterface) {
  return React.Children.only(child);
}

export default GlobalStyles;
