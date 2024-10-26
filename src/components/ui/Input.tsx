type InputProps = {
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='rounded-md px-2 py-[7px] outline-none border-[2px] border-gray-400 focus:border-primary placeholder:text-sm placeholder:text-gray-400 text-dark'
    />
  );
}
