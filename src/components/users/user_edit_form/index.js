import { Button, Column, Control, Field, Help, Input, Label } from "rbx";
import React, { Fragment, useEffect, useState } from "react";
import UsersService from '../../../services/users';

function UsersEditForm() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);

  const initializeUser = async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    setName(user['name']);
    setEmail(user['email']);
  }

  useEffect(() =>{
    initializeUser()
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await UsersService.update({email: email, name: name});
      setStatus("success")
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Field>
          <Control>
            <Label className="has-text-grey">Nome</Label>
            <Input
              type="name"
              value={ name || ""}
              onChange={ e => setName(e.target.value)}
              required
              name="name"
            />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label className="has-text-grey">Email</Label>
            <Input
              type="email"
              value={ email || ""}
              onChange={ e => setEmail(e.target.value)}
              required
              name="email"
            />
          </Control>
        </Field>

        <Field>
          <Control>
            <Column.Group>
              <Column className="has-text-right">
                <Button color="custom-purple">Atualizar</Button>
              </Column>
            </Column.Group>
          </Control>
        </Field>
        {status == 'error' &&
          <Help color='danger'>Problema atualização</Help>
        }
        {status == 'success' &&
          <Help color='success'>Atualização com sucesso!</Help>
        }
      </form>
    </Fragment>
  )
 
}

export default UsersEditForm;