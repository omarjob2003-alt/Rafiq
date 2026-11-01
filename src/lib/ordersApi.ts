export interface OrderItemDto {
  productId: string
  productNameAr: string
  productNameEn: string | null
  productImageUrl: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface OrderDto {
  id: number
  orderNumber: string
  status: string
  shippingMethod: string
  paymentMethod: string
  subtotal: number
  couponCode: string | null
  discountAmount: number
  shippingCost: number
  total: number
  createdAt: string
  contactName: string
  shippingCity: string
  shippingArea: string
  shippingStreetAddress: string
  items: OrderItemDto[]
}

export interface TrackDto {
  orderNumber: string
  status: string
  createdAt: string
  statusSteps: string[]
  currentStepIndex: number
}