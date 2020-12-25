export { default as BuyNow } from '../../components/BuyNow.vue'
export { default as BuyerDetailsForm } from '../../components/BuyerDetailsForm.vue'
export { default as FirebaseUi } from '../../components/FirebaseUI.vue'
export { default as Header } from '../../components/Header.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as PaymentOptionsBuyer } from '../../components/PaymentOptionsBuyer.vue'
export { default as PaymentOptionsSeller } from '../../components/PaymentOptionsSeller.vue'
export { default as PhotoActions } from '../../components/PhotoActions.vue'
export { default as ProductDetailsCard } from '../../components/ProductDetailsCard.vue'
export { default as ProductDetailsForm } from '../../components/ProductDetailsForm.vue'
export { default as ProductPhotos } from '../../components/ProductPhotos.vue'
export { default as ShippingOptions } from '../../components/ShippingOptions.vue'
export { default as SocialHead } from '../../components/SocialHead.vue'
export { default as YouPay } from '../../components/YouPay.vue'

export const LazyBuyNow = import('../../components/BuyNow.vue' /* webpackChunkName: "components/BuyNow" */).then(c => c.default || c)
export const LazyBuyerDetailsForm = import('../../components/BuyerDetailsForm.vue' /* webpackChunkName: "components/BuyerDetailsForm" */).then(c => c.default || c)
export const LazyFirebaseUi = import('../../components/FirebaseUI.vue' /* webpackChunkName: "components/FirebaseUI" */).then(c => c.default || c)
export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/Header" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazyPaymentOptionsBuyer = import('../../components/PaymentOptionsBuyer.vue' /* webpackChunkName: "components/PaymentOptionsBuyer" */).then(c => c.default || c)
export const LazyPaymentOptionsSeller = import('../../components/PaymentOptionsSeller.vue' /* webpackChunkName: "components/PaymentOptionsSeller" */).then(c => c.default || c)
export const LazyPhotoActions = import('../../components/PhotoActions.vue' /* webpackChunkName: "components/PhotoActions" */).then(c => c.default || c)
export const LazyProductDetailsCard = import('../../components/ProductDetailsCard.vue' /* webpackChunkName: "components/ProductDetailsCard" */).then(c => c.default || c)
export const LazyProductDetailsForm = import('../../components/ProductDetailsForm.vue' /* webpackChunkName: "components/ProductDetailsForm" */).then(c => c.default || c)
export const LazyProductPhotos = import('../../components/ProductPhotos.vue' /* webpackChunkName: "components/ProductPhotos" */).then(c => c.default || c)
export const LazyShippingOptions = import('../../components/ShippingOptions.vue' /* webpackChunkName: "components/ShippingOptions" */).then(c => c.default || c)
export const LazySocialHead = import('../../components/SocialHead.vue' /* webpackChunkName: "components/SocialHead" */).then(c => c.default || c)
export const LazyYouPay = import('../../components/YouPay.vue' /* webpackChunkName: "components/YouPay" */).then(c => c.default || c)
