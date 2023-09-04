import { useState } from "react";
import { useActions } from "../state/hooks/useActions";
import { useTypedSelector } from "../state/hooks/useTypedSelector";

export const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();

  const { loading, error, data } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchRepositories(term);
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={term} onChange={(e) => setTerm(e.target.value)} />
      <button>Search</button>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </form>
  );
};
