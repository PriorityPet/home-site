import { IPet } from "@/lib/domain/core/entities/petEntity";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ISpecialistsContext, SpecialistsContext } from "../../../context/SpecialistsContext";
import { InputSelect } from "@/presentation/components/core/Inputs";
import { twMerge } from "tailwind-merge";

interface IBreedsProps {
  values: {
    name: string;
    specieId: number;
    breedId: number;
  };
  setValues: Dispatch<
    SetStateAction<{
      name: string;
    specieId: number;
    breedId: number;
    }>
  >;
  /**pet: IPet;
  setPet: Dispatch<SetStateAction<IPet>>;*/
}

export default function Breeds({
  values,
  setValues,
}: IBreedsProps) {
  const { state, actions, dispatch } =
    useContext<ISpecialistsContext>(SpecialistsContext);
  const { getBreeds } = actions;
  const { data: breeds, loading, successful, error } = state.breeds;

  useEffect(() => {
    if (values.specieId !== 0)
      getBreeds({ specieId: values.specieId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.specieId]);

  useEffect(() => {
    if (successful && breeds.data?.length > 0) {
      setValues({ ...values, breedId: breeds.data[0].breedId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  if (values.specieId === 0) return <div />;

  return (
    <>
      <p className="font-light text-slate-500 text-sm">Raza</p>
      <select
        className={twMerge([
          "min-w-[4rem] w-full max-w-full",
          "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
          "focus:outline-none focus:border-slate-400",
          "placeholder-slate-800"
        ])}
        disabled={loading || error !== null}
        onChange={(e: any) => {
          setValues({ ...values, breedId: +e.target.value });
        }}
      >
        {loading && <option disabled>Cargando razas</option>}

        {error && <option disabled>Algo ha salido mal</option>}

        {successful && breeds.data?.length === 0 && (
          <option disabled>No se encontraron razas</option>
        )}

        {successful &&
          breeds.data?.length > 0 &&
          breeds.data.map((breed) => (
            <option key={breed.breedId} value={breed.breedId}>
              {breed.name}
            </option>
          ))}
      </select>
    </>
  );
}
