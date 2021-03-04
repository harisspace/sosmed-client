import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

function PostForm() {
    const [errors, setErrors] = useState('')
    const { values, onSubmit, handleChange } = useForm(createPostCallback, {
        body: ''
    })
    
    const [ createPost ] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({query: FETCH_POSTS_QUERY})
            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...newData]
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: { newData }} })

            values.body = ''
        },
        onError(err){
            setErrors(err.graphQLErrors[0].message)
        }
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post</h2>
            <Form.Field>
                <Form.Input placeholder="Hi World!" name="body" onChange={handleChange} value={values.body} error={errors ? true : false} />
                <Button type="submit" color="teal">
                    Create Post
                </Button>
            </Form.Field>
        </Form>
        {
            errors && (
                <div className="ui error message">
                    <ul className="list">
                        <li>{errors}</li>
                    </ul>
                </div>
            )
        }
        </>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                username
                id
                createdAt
            }
            comments {
                username
                createdAt
                id 
            }
        }
    }
`

export default PostForm
