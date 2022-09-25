import { Link } from "react-router-dom";

export default function CarpetaNodoDistribucion({ nodoDistribucion }) {
  const { ingresos, egresos, unidad } = nodoDistribucion;

  const ingresoValues = Object.values(ingresos || {});
  const sumaIngresos =
    ingresoValues.length > 0 ? ingresoValues.reduce((a, b) => a + b) : 0;

  return (
    <Link to={`/${nodoDistribucion.id}`}>
      <article>
        <div className="d-flex">
          <h4>{nodoDistribucion.nombre}</h4>
          {nodoDistribucion.sinIngresos !== true ? (
            <small
              style={{ fontSize: "1.5em" }}
            >{`${sumaIngresos} ${unidad}`}</small>
          ) : (
            <></>
          )}
        </div>
        <div style={{ paddingLeft: "2em" }}>
          {egresos instanceof Array ? (
            egresos?.map((nodoEgreso) => (
              <CarpetaNodoDistribucion
                key={nodoEgreso.id}
                nodoDistribucion={nodoEgreso}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </article>
    </Link>
  );
}
