import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../hook/useAxios';
import useAuth from '../../../hook/useAuth';
import Swal from 'sweetalert2';




const CheckoutForm = ({ packageData }) => {
  const { user } = useAuth()
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [clientSecrets, setclientSecrets] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [paymentdata,setpaymentdata]=useState([])
  const axiosSecure = useAxios()
  const { _id, price, package: packag, TrainerName, slot, Classes, CustomerName, CustomerEmail } = packageData || {}
 
  useEffect(() => {
    // console.log(price)
    if (price) {
      axiosSecure.post('/CreatePaymentIntent', { price })
        .then(res => {
          console.log(res.data.clientSecret);
          setclientSecrets(res.data.clientSecret)
        })
    }
  }, [price])
  const handelsubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log('payment Error', error)
      setError(error.message)
    }
    else {
      console.log('payment method success', paymentMethod)
      setError('')
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecrets,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          }
        }
      })
    if (confirmError) {
      console.log('confirmError', confirmError)
    }
    else {
      console.log('payment-intent', paymentIntent)
      if (paymentIntent.status === "succeeded") {
        console.log('transaction id', paymentIntent.id)
        setTransactionId(paymentIntent.id)
        const paymentInfo = {
          email: user?.email,
          CustomerName,
          price,
          date: new Date(),
          package: packag,
          TrainerName,
          slot,
          Classes,
          transactionId: paymentIntent.id,
          bookingId:_id
        }
        const res = await axiosSecure.post('/payments', paymentInfo)
        console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500
          });
       
        }
      }
    }
  }
  return (
    <div className='w-[100%] min-h-screen'>
      <form onSubmit={handelsubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
        <button className='bg-teal-600 px-6 rounded-lg py-2 my-4 text-xl' type='submit' disabled={!stripe || !clientSecrets} >
          Pay
        </button>
        <h2 className='text-red-500 text-xs '>{error}</h2>
        {transactionId && <span className='text-green-500'>your transactionId:{transactionId}</span>}
      </form>
    </div>
  );
};

export default CheckoutForm;