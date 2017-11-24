export const hasError = meta => meta.touched && meta.error ? meta.error : null

export const isRequired = value => (value ? undefined : 'Required field')
