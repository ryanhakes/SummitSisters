import Image, { type ImageProps } from "next/image";

type LogoProps = Omit<ImageProps, "src" | "alt"> & {
  alt?: string;
};

export default function Logo({ alt = "Summit Sisters", width = 160, height = 64, ...props }: LogoProps) {
  return <Image src="/logo.svg" alt={alt} width={width} height={height} {...props} />;
}
