import { cn } from "@/lib/utils";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}
export function Container({
  children,
  className,
  as: Component = "div"
}: ContainerProps) {
  return;
}