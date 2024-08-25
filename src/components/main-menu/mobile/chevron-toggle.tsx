import { ChevronDown } from "lucide-react";
import { useMobileMenuStore } from "@/store/mobile-menu";

export interface ChevronToggleProps {
  isDrawerOpen: boolean;
}

const ChevronToggle = (props: ChevronToggleProps) => {
  // const isDrawerOpen = useMobileMenuStore((state) => state.isDrawerOpen)

  return (
      <ChevronDown
        className={`transition-transform duration-300 ${
          props.isDrawerOpen ? "rotate-180" : "rotate-0"
        }`}
      />
  );
};

export default ChevronToggle;