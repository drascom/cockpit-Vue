// Helper & Partial Functions
const minLen = (l) => (v) => (v && v.length >= l) || `min. ${l} Characters`
const maxLen = (l) => (v) => (v && v.length <= l) || `max. ${l} Characters`
const required = (msg) => (v) => !!v || msg
const requiredArray = (msg) => (v) => (Array.isArray(v) && v.length > 1) || msg
const emailRules = [
    (v) => !!v || 'Email is required',
    (v) => (/.+@.+\..+/).test(v) || 'E-mail must be valid'
  ]
  // Rules
const rules = {
  requiredField: required('Bu alan gerekli'),
  requiredEmail: emailRules,
  requiredSel: required('Seçmeniz gerekli'),
  requiredSelMult: requiredArray('En az 2 tane şeçiniz.'),
  max50: maxLen(50),
  max12: maxLen(12),
  min6: minLen(6)
}
export default rules