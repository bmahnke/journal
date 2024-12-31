// src/components/react/TextEntryComponent.jsx
import { useState, useId, type ChangeEvent } from 'react';
import { getWordCount } from '../../util/text-util';

interface TextEntryComponentProps {
  label: string,
  value: string,
  maxLength: number,
  onUpdate: (value: string) => void
}

export default function TextEntryComponent(props: TextEntryComponentProps) {
  const key = useId();
  const text = props.value;
  const [remaining, setRemaining] = useState(props.maxLength - getWordCount(props.value))

  function handleOnChnage(event : ChangeEvent<HTMLTextAreaElement>) {
    const wc = getWordCount(event.target.value);
    let rm = props.maxLength - wc;
    if (rm < 0) rm = 0;

    setRemaining(rm);

    if (wc <= props.maxLength) {
      props.onUpdate(event.target.value);
      return true;
    }
    else {
      props.onUpdate(text.trim());
      return false;
    }
  }

  return (
    <div className='relative bg-slate-200 p-4 pb-6 rounded-md'>
      <div className='flex flex-col space-y-2'>
        <label className='text-center' htmlFor={key}>{props.label}</label>
        <textarea onChange={handleOnChnage} className='p-2 rounded-md' id={key} value={text} />
      </div>
      <p className='text-sm absolute right-4'>remaining words: {remaining}</p>
    </div>
  );
}