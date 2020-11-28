<template>
  <div>
    <h4 class="px-2">Payment Options (Placeholder)</h4>
    <div id="paypal-button-container" class="pt-2"></div>
    <p class="text-center font-weight-light">
      Enables accepting "Pay with Paypal payments".
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isPaypalLoaded: false,
    }
  },
  head() {
    return {
      title: 'Payment Page - My awesome project',
      script: [
        {
          hid: 'Paypal',
          src:
            'https://www.paypal.com/sdk/js?client-id=AR6R-6_rv5YCSR0l4Jmxwukggy8zcIjZ6owaA-Q9md4iMSFJjj2T7pmq_n3rnXdjwcS0ZbgEqsZuKx-Y',
          defer: true,
          // Changed after script load
          callback: () => {
            // this.isPaypalLoaded = true
            var FUNDING_SOURCES = [
              paypal.FUNDING.PAYPAL,
              // paypal.FUNDING.VENMO,
              // paypal.FUNDING.CREDIT,
              // paypal.FUNDING.CARD,
            ]
            // Loop over each funding source / payment method
            FUNDING_SOURCES.forEach(function (fundingSource) {
              // Initialize the buttons
              var button = paypal.Buttons({
                fundingSource: fundingSource,
                style: {
                  layout: 'vertical',
                  color: 'silver',
                  shape: 'pill',
                  label: 'paypal',
                },
              })

              // Check if the button is eligible
              if (button.isEligible()) {
                // Render the standalone button for that funding source
                button.render('#paypal-button-container')
              }
            })
          },
        },
      ],
    }
  },
}
</script>
