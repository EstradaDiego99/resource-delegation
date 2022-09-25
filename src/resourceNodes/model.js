import { getFirestore, collection as dbCollection } from "firebase/firestore";
import EntityModel from "../utils/entity.js";
import { firebaseApp } from "../../firebaseApp.js";

const converter = {
  toFirestore: (resourceNode) => resourceNode,
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new ResourceNode(data);
  },
};

// Get a reference to the database service
const db = getFirestore(firebaseApp);
const collection = dbCollection(db, "resourceNodes").withConverter(converter);

export default class ResourceNode extends EntityModel {
  /** @type {CollectionReference} Collection to be used in firebase. */
  static collection = collection;

  constructor(data) {
    super();

    /** @type {CollectionReference} Collection to be used in firebase. */
    this.collection = collection;

    this.nombre = data.nombre;
    this.unidad = data.unidad;
    this.ingresos = data.ingresos;
    this.egresos = data.egresos;
    this.sinIngresos = data.sinIngresos;
    this.sinEgresos = data.sinEgresos;
  }

  /**
   * Return the current values of the model as a key-ed object.
   */
  get values() {
    return {
      nombre: this.nombre,
      unidad: this.unidad,
      ingresos: this.ingresos,
      egresos: this.egresos,
      sinIngresos: this.sinIngresos,
      sinEgresos: this.sinEgresos,
    };
  }

  /**
   * Ensure the attributes of the model contain the proper values. Throw a
   * ModelError is one or multiple fields is not correct.
   */
  async validate() {
    // eslint-disable-next-line no-unused-vars
    const errors = {};
  }
}
