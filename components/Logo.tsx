import React from "react";

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & { className?: string };

export default function Logo({ className = "h-16", alt = "Summit Sisters", ...props }: LogoProps) {
  return <img src="/logo.svg" alt={alt} className={className} {...props} />;
}
