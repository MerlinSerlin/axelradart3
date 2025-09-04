'use client'

import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href?: string; // Optional specific URL to navigate to
  label?: string; // Optional custom label
  className?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
}

export default function BackButton({ 
  href, 
  label = "Back", 
  className,
  variant = "ghost",
  size = "default"
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button 
      onClick={handleBack}
      variant={variant}
      size={size}
      className={cn("flex items-center gap-2", className)}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}