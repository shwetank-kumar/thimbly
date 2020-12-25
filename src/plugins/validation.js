export const isRequired = [(v) => !!v || 'Required field.']
export const isInt = [(v) => Number.isInteger(Number(v)) || 'Integer field.']
