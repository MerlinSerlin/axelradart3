import { ChevronDown } from "lucide-react";

export interface ChevronToggleProps {
  isDrawerOpen: boolean;
}

const ChevronToggle = (props: ChevronToggleProps) => {

  return (
      <ChevronDown
        className={`transition-transform duration-300 ${
          props.isDrawerOpen ? "rotate-180" : "rotate-0"
        }`}
      />
  );
};

export default ChevronToggle;