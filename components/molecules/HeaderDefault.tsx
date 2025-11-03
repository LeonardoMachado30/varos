export default function HeaderDefault() {
  return (
    <header className="w-full border-b border-gray-800  shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-gray-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg  tracking-tight">
            ConsultoriaPro
          </span>
        </div>
        <nav className="flex gap-6">
          <a href="/dashboard" className=" transition font-medium">
            Dashboard
          </a>
          <a href="/consultor/cadastro" className=" transition font-medium">
            Cadastrar Consultor
          </a>
        </nav>
      </div>
    </header>
  );
}
