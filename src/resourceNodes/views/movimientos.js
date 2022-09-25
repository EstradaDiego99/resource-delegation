/** Template form for the different type of fields. */
export default function Movimientos({ onChangeFunction, lista, movimiento }) {
  return (
    <div>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {movimiento}:
      </label>
      <input
        type="text"
        id="movimiento"
        onChange={(e) =>
          onChangeFunction((lista) => {
            lista.concat(e.target.value);
          })
        }
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="..."
        required
      />
    </div>
  );
}
