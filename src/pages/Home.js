import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Dimmer, Loader, Transition } from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import { AuthContext } from '../context/auth'
import PostForm from '../components/PostForm'

import { FETCH_POSTS_QUERY } from '../utils/graphql'

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, data: { getPosts: posts } = {}, error } = useQuery(FETCH_POSTS_QUERY)
    
    if (error) {
        console.log(error)
    }

    return (
        <Grid columns={3} divided className={loading? 'loading' : ''}>
            <Grid.Row>
                <h1 className="page-title">Recent Post</h1>
            </Grid.Row>
            {
                user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )
            }
            <Grid.Row>
                { loading? (
                    <Dimmer active>
                        <Loader size="large"/>
                    </Dimmer>
                ) : (
                   <Transition.Group>
                       {
                            posts && posts.map((post) => (
                                <Grid.Column key={post.id}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))
                       }
                   </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}



export default Home
