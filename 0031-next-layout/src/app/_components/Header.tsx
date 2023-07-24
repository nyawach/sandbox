type Props = {
  title?: string;
};

export const Header = ({ title = "0031" }: Props) => (
  <header className="p-4 text-center bg-slate-50">{title}</header>
);
