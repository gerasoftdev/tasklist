import { PrimaryButton, size } from '@repo/ui';
import { IoAdd } from 'react-icons/io5';

export const AddTaskPlusButton = () => {
  const handleClick = () => {
    const addTaskInput = document.getElementById('addTaskInlineInput');
    if (addTaskInput) {
      addTaskInput.focus();
    }
  };

  return (
    <PrimaryButton
      $size={null}
      className="p-md ml-auto rounded-full"
      onClick={handleClick}
    >
      <IoAdd size={size.xs} />
    </PrimaryButton>
  );
};
