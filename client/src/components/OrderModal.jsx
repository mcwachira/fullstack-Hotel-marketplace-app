import React from 'react'
import { Modal } from 'antd'

const OrderModal = ({ session,
    orderedBy, showModal, setShowModal }) => {
    console.log(orderedBy)
    return (
        <Modal open title='Order Payment Info' onCancel={() => setShowModal(!showModal)} >

            <p>
                Payment Intent: {session.payment_intent}
            </p>

            <p>
                Payment status: {session.payment_status}
            </p>


            <p>
                Amount Total: {session.currency.toUpperCase()}{" "}
                {session.amount_total / 100}
            </p>
            <p>
                Stripe Customer Id:{session.customer}
            </p>

            <p>
                Customer : {orderedBy.fullName}
            </p>

        </Modal>
    )
}

export default OrderModal