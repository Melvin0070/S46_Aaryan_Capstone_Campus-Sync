export const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
  export const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
  
    const options = {
    //   key: '', 
    //   amount: '50000',
    //   currency: 'INR',
    //   name: '',
    //   description: 'Test Transaction',
    //   image: '',
    //   order_id: '', 
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  