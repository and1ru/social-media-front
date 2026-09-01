import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/private/chats', {replace:true});
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-extrabold tracking-widest text-indigo-500">
          404
        </h1>

        <p className="text-gray-400 text-lg pt-4">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <button
          onClick={handleGoBack}
          className="inline-block px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200 cursor-pointer shadow-lg"
        >
          come back
        </button>
      </div>
    </div>
  );
};
