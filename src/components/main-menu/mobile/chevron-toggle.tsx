import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface ChevronToggleProps {
  isOpen: boolean;
}

const ChevronToggle = (props: ChevronToggleProps) => {

  return (
      <ChevronDown
        className={`transition-transform duration-300 ${
          props.isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
  );
};

export default ChevronToggle;