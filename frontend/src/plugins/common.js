import Vue from 'vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import SuccessMessage from '@/components/common/SuccessMessage.vue'
import DialogPicture from '@/components/common/DialogPicture.vue'
import BaseActionInput from '@/components/common/FormComponents/ActionInput.vue'
import BaseDateInput from '@/components/common/FormComponents/Date.vue'
import BaseNumberInput from '@/components/common/FormComponents/NumberInput.vue'
import BaseRadioInput from '@/components/common/FormComponents/RadioInput.vue'
import BaseSelectChips from '@/components/common/FormComponents/SelectChips.vue'
import BaseSelectList from '@/components/common/FormComponents/SelectList.vue'
import BaseTextInput from '@/components/common/FormComponents/TextInput.vue'
import BaseToggleInput from '@/components/common/FormComponents/ToggleInput.vue'
import BaseUploadModule from '@/components/common/FormComponents/UploadModule.vue'

Vue.component('DialogPicture', DialogPicture)
Vue.component('ErrorMessage', ErrorMessage)
Vue.component('SuccessMessage', SuccessMessage)
Vue.component('BaseActionInput', BaseActionInput)
Vue.component('BaseDateInput', BaseDateInput)
Vue.component('BaseNumberInput', BaseNumberInput)
Vue.component('BaseRadioInput', BaseRadioInput)
Vue.component('BaseSelectChips', BaseSelectChips)
Vue.component('BaseSelectList', BaseSelectList)
Vue.component('BaseTextInput', BaseTextInput)
Vue.component('BaseToggleInput', BaseToggleInput)
Vue.component('BaseUploadModule', BaseUploadModule)
