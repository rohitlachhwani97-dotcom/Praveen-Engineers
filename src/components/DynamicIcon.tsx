import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = "w-6 h-6", size }: DynamicIconProps) {
  // Safe mapping of string names to Lucide icons
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    // Fallback if icon is missing or misspelled
    return <Icons.Settings className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
