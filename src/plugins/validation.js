export const isRequired = [(v) => !!v || 'Required field.']
export const isInt = [(v) => Number.isInteger(Number(v)) || 'Integer field.']
export const is40OrLess = [v => (v || '').length <= 40 || `A maximum of 40 characters is allowed`]
export const is400OrLess = [v => (v || '').length <= 400 || `A maximum of 400 characters is allowed`]

            