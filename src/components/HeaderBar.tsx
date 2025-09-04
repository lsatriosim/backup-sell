type HeaderProps = {
  title: string;
};

export default function HeaderBar({ title }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-md flex items-center justify-center z-10 text-neutral-700">
      <h1 className="text-lg font-semibold font-rubik">{title}</h1>
    </header>
  );
}