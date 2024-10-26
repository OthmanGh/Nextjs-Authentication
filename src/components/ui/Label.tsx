type LabelProps = {
  htmlFor: string;
  labelText: string;
};

export default function Label({ htmlFor, labelText }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className='flex items-center gap-[3px] text-sm text-primary'
    >
      <span>{labelText}</span>
      <span className='text-red-500 font-semibold text-lg'>*</span>
    </label>
  );
}
