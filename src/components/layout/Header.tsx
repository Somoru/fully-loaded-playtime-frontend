
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
};

const Header = ({ title, showBackButton = false, rightAction }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-secondary border-b border-gray-800 h-14 flex items-center px-4 z-50">
      <div className="flex items-center justify-between w-full max-w-md mx-auto">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-1 rounded-full hover:bg-gray-800"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="font-bold text-lg">{title}</h1>
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
};

export default Header;
