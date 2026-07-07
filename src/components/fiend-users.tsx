import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FindUser = () => {
  const [name, setName] = useState<string>("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/private/users?name=${name}`)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <section>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input type="text" placeholder="user name"
            className="border rounded-lg p-2 focus:outline-none w-80 self-center" value={name} onChange={handleInput} />
        </form>
    </section>
  );
};
