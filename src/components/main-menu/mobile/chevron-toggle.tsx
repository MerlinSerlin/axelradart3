import { ChevronDown } from "lucide-react";
import { useMobileMenuStore } from "@/store/mobile-menu";

const ChevronToggle = () => {
  const isDrawerOpen = useMobileMenuStore((state) => state.isDrawerOpen)

  return (
      <ChevronDown
        className={`transition-transform duration-300 ${
          isDrawerOpen ? "rotate-180" : "rotate-0"
        }`}
      />
  );
};

export default ChevronToggle;