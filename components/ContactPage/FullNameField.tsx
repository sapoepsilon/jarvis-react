interface FullNameFieldProps {
  fullName: string;
  setFullName: (name: string) => void;
  errors: { fullName?: string };
}

function FullNameField({ fullName, setFullName, errors }: FullNameFieldProps) {
  return (
    <div>
      <label
        htmlFor="fullName"
        className="block text-sm font-medium text-gray-700"
      >
        Full Name
      </label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className={`mt-1 p-2 block w-full border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
      />
      {errors.fullName && (
        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
      )}
    </div>
  );
}

export default FullNameField;
