import React, { useContext } from 'react'
import { Card, Button, Image, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

function PostCard({ post: { id, username, body, createdAt, commentCount, likeCount, likes }}) {
    const { user } = useContext(AuthContext)

    return (
        <Card fluid style={{ overflow: 'hidden'}}>
            <Card.Content>
            <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>
                {body}
            </Card.Description>
            </Card.Content>
            <Card.Content extra style={{ display: 'flex', flex: 1}}>
                <LikeButton post={{ id, likes, likeCount }} user={user} />
                <Button labelPosition='right' as='div'  >
                    <Button basic color='blue' size='mini' to={`/posts/${id}`} as={Link}>
                        <Icon name='comment' />
                        Comments
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {
                        user && user.username === username && <DeleteButton postId={id} />
                    }
            </Card.Content>
      </Card>
    )
}

export default PostCard
