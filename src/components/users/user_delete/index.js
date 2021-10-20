import { Button } from 'rbx';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import UsersService from '../../../services/users';

function UsersDelete() {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const deleteUser = async () => {
    if (window.confirm('Tem certeza de que deseja excluir esta conta?')){
      UsersService.delete()
      setRedirectToHome(true)
    }
  }

  if(redirectToHome)
    return <Redirect to={{pathname: "/"}} />

  return (
    <Button color="danger" onClick={() => deleteUser()}>
      Excluir a conta
    </Button>
  )

}

export default UsersDelete;