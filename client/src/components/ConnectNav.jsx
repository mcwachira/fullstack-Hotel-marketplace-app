import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Avatar, Badge } from 'antd';
import { getAccountBalance, payoutSettings } from '../actions/stripe';
import { currencyFormatter } from '../utils/CurrencyFormatter';
import { SettingOutlined, WindowsFilled } from '@ant-design/icons'
import { toast } from 'react-toastify'
import moment from 'moment'

const { Meta } = Card;
const { Ribbon } = Badge
const ConnectNav = () => {
    const { auth } = useSelector((state) => ({ ...state }))
    const { token } = auth

    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const user = auth.user;
    // console.log(user.fullN)

    const handlePayoutSettings = async () => {

        try {
            setLoading(true)
            const res = await payoutSettings(token)
            console.log(res.data)
            window.location.href = res.data.url

        } catch (error) {

            console.log(error)
            setLoading(false)
            toast.error(error)
        }

    }

    const getBalance = async (authToken) => {

        const res = await getAccountBalance(authToken)

        setBalance(res.data)
    }
    useEffect(() => {

        getBalance(auth.token)

    }, [auth])

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
                        <Ribbon text='Avaliable' color='grey'>
                            <Card className="bg-light pt-1 pointer">
                                {balance && balance.pending && balance.pending.map((bp, i) => (
                                    <span key={i} className='lead'>
                                        {currencyFormatter(bp)}
                                    </span>
                                ))}
                            </Card>
                        </Ribbon>

                        <Ribbon text='payouts' color='silver' >
                            <Card className="bg-light pointer" onClick={handlePayoutSettings}>

                                <SettingOutlined className='h5 pt-2' />
                            </Card>
                        </Ribbon>
                    </>
                )
            }
        </div>
    )
}

export default ConnectNav