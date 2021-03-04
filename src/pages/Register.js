import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'

function Register(props) {
    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})
    
    const { handleChange, onSubmit, values } = useForm(registerUser, {
            username: '',
            password: '',
            email: '',
            confirmPassword: ''
        })
   

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            context.login(result.data.register)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function registerUser() {
        return addUser()
    }

    

    return (
        <div className="form-container">
        <Form onSubmit={onSubmit} className={loading? 'loading' : ''}>
                <h1 className="page-title">Register</h1>
                <Form.Input error={errors.username?  true : false} label="Username" placeholder="Username..." name="username" type="text" value={values.username} onChange={handleChange} />
                <Form.Input error={errors.email?  true : false} label="Email" placeholder="Email..." name="email" type="email" value={values.email} onChange={handleChange} />
                <Form.Input error={errors.password?  true : false} label="Password" placeholder="Password..." name="password" type="password" value={values.password} onChange={handleChange} />
                <Form.Input error={errors.confirmPassword?  true : false} label="Confirm Password" placeholder="Confirm Password..." name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} />
                <Button type='submit' color="teal">Register</Button>
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

const REGISTER_USER = gql`
    mutation Register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username token createdAt
        }
    }
`

export default Register
