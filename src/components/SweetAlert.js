import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//Asks if you want to continue
export const sweetConfirmHandler = (
  action = () => {},
  type = 'warning',
  text = 'Once deleted, you will not be able to recover this data!'
) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: 'Are you sure?',
    text: text,
    type: type,
    showCloseButton: true,
    showCancelButton: true,
  }).then((willDelete) => {
    if (willDelete.value) {
      action();
      return MySwal.fire('', 'Action completed!', 'success');
    } else {
      return MySwal.fire('', 'Action cancelled!', 'error');
    }
  });
};
