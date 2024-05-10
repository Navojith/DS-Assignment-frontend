import { useState } from 'react';

interface Props {
  prompt: string;
  options: string[];
  setSelected: (option: string) => void;
  sequential?: boolean;
}

const CustomSelect = ({
  prompt,
  options,
  setSelected,
  sequential = false,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      sequential &&
      parseInt(selectedOption) - parseInt(e.target.value) <= 1
    ) {
      setShowToast(true);
      return;
    }
    setSelectedOption(e.target.value);
    setSelected(e.target.value);
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-warning">
            <span>
              {'Content must be added Sequentially'}
              <button
                className="bg-inherit pr-0 border-none cursor-pointer"
                onClick={() => setShowToast(false)}
              >
                X
              </button>
            </span>
          </div>
        </div>
      )}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{prompt}</span>
        </div>
        <select
          className="select select-bordered"
          onChange={handleChange}
          value={selectedOption}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default CustomSelect;
