import { IPet } from "@/lib/domain/core/entities/petEntity";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ISpecialistsContext, SpecialistsContext } from "../../../context/SpecialistsContext";
import { twMerge } from "tailwind-merge";

interface ISpeciesProps {
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
  /*pet: IPet;
  setPet: Dispatch<SetStateAction<IPet>>;*/
}

export default function Species({
  values,
  setValues,
}: ISpeciesProps) {
  const { state, actions, dispatch } =
    useContext<ISpecialistsContext>(SpecialistsContext);
  const { getSpecies } = actions;
  const { data: species, loading, successful, error } = state.species;

  useEffect(() => {
    getSpecies()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful && species.data?.length > 0) {
      setValues({ ...values, specieId: species.data[0].specieId });
      //setPet({ ...pet, specieId: species.data[0].specieId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <>
      <p className="font-light text-slate-500 text-sm">Especie</p>
      <select
        className={twMerge([
          "min-w-[4rem] w-full max-w-full",
          "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
          "focus:outline-none focus:border-slate-400",
          "placeholder-slate-800"
        ])}
        disabled={loading || error !== null}
        onChange={(e) => {
          setValues({ ...values, specieId: +e.target.value });
          //setPet({ ...pet, specieId: +e.target.value });
        }}
      >
        {loading && <option disabled>Cargando especies</option>}

        {error && <option disabled>Algo ha salido mal</option>}

        {successful && species.data?.length === 0 && (
          <option disabled>No se encontraron especies</option>
        )}

        {successful &&
          species.data?.length > 0 &&
          species.data.map((specie) => (
            <option key={specie.specieId} value={specie.specieId}>
              {specie.name}
            </option>
          ))}
      </select>
    </>
  );
}
