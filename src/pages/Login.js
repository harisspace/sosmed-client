import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'

function Login(props) {
    const [errors, setErrors] = useState({})
    const context = useContext(AuthContext)
    
    const { handleChange, onSubmit, values } = useForm(loginUserCallback, {
            username: '',
            password: ''
        })
   

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function loginUserCallback() {
        return loginUser()
    }

    

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} className={loading? 'loading' : ''}>
                <h1 className="page-title">Login</h1>
                <Form.Input error={errors.username?  true : false} label="Username" placeholder="Username..." name="username" type="text" value={values.username} onChange={handleChange} />
                <Form.Input error={errors.password?  true : false} label="Password" placeholder="Password..." name="password" type="password" value={values.password} onChange={handleChange} />
                <Button type='submit' color="teal">Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
   mutation Login(
       $username: String!
       $password: String!
   ) {
       login(username: $username password: $password) {
           id
           email
           token
           createdAt
           username
       }
   }
`

export default Login
