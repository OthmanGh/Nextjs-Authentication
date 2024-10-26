import Input from './ui/Input';
import Label from './ui/Label';

const renderFieldset = (
  id: string,
  labelText: string,
  type: string,
  value: string,
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return (
    <fieldset className='flex flex-col gap-1'>
      <Label htmlFor={id} labelText={labelText} />
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </fieldset>
  );
};

export default renderFieldset;
