import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Avatar } from 'antd';
// import { Avatar } from '@ant-design/icons'
import moment from 'moment'

const { Meta } = Card;
const ConnectNav = () => {
    const { auth } = useSelector((state) => ({ ...state }))

    const user = auth.user;
    console.log(user)

    return (

        <div className="d-flex justify-content-around">
            <Card>
                <Meta
                    avatar={<Avatar>
                        {user.fullName[0]}
                    </Avatar>}
                    title={user.fullName}
                    description={`Joined ${moment(user.createdAt).fromNow()}`}></Meta>
            </Card>
            {
                auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && (
                    <>
                        <div>
                            Pending balance
                        </div>
                        <div>
                            Payout settings
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ConnectNav