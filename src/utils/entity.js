import {
  addDoc,
  getDoc,
  getDocs,
  doc,
  where,
  deleteDoc,
  query as dbQuery,
  setDoc,
} from "firebase/firestore";

export default class EntityModel {
  constructor() {
    if (this.constructor === EntityModel) {
      throw new Error("Abstract class instantiation.");
    }
  }

  /**
   * Return the current values of the model as a key-ed object.
   * @type {any}
   */
  get values() {
    throw new Error("Abstract attribute instantiation.");
  }

  /**
   * Ensure the attributes of the model contain the proper values. Throw a
   * ModelError is one or multiple fields is not correct.
   */
  async validate() {
    throw new Error("Abstract method instantiation.");
  }

  /** Save instance of the object to Firebase. */
  async save() {
    await this.validate();
    return await addDoc(this.collection, this.values);
  }

  /** Save instance of the object to Firebase while setting the object ID. */
  async saveWithId(id) {
    await this.validate();
    return await setDoc(doc(this.collection, id), this.values);
  }

  /** Find multiple objects based on a given query. @returns {Array<Entity>} */
  static async find(query) {
    const queries = [];
    for (const [key, value] of Object.entries(query)) {
      queries.push(where(key, "==", value));
    }
    const snapshot = await getDocs(dbQuery(this.collection, ...queries));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  /** Find a specific object based on a given id. @returns {Entity} */
  static async findOne(id) {
    const snapshot = await getDoc(doc(this.collection, id));
    const { collection, ...data } = snapshot.data(); // Remove collection
    return { id, ...data };
  }

  /** Given an id, find a specific object an delete it. @returns {Entity} */
  static async deleteOne(id) {
    await deleteDoc(doc(this.collection, id));
  }
}
