import css from "./SuccessMessage.module.css";

interface SuccessMessageProps {
  children: React.ReactNode;
}

export default function SuccessMessage({ children }: SuccessMessageProps) {
  return <p className={css.text}>{children}</p>;
}
